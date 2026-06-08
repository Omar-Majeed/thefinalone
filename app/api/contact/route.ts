import { NextResponse } from "next/server";

import { sendContactEmails } from "@/lib/contact/email";
import { getClientIp } from "@/lib/contact/ip";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sanitizeContactFields } from "@/lib/contact/sanitize";
import { contactSchema } from "@/lib/contact/schema";
import { verifyTurnstileToken } from "@/lib/contact/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Generic client-facing failure copy — never leak server internals. */
const GENERIC_ERROR = "Something went wrong. Please try again later.";
const RATE_LIMIT_ERROR =
  "Too many requests. Please try again in a little while.";
const SPAM_ERROR = "Your submission could not be processed.";
const VERIFY_ERROR = "Verification failed. Please refresh and try again.";

function json(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(req: Request) {
  // 1) Parse body.
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ success: false, error: GENERIC_ERROR }, 400);
  }

  // 2) Validate shape with Zod.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return json(
      {
        success: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      400,
    );
  }

  const data = parsed.data;

  // 3) Honeypot — silently reject bots that fill the hidden field.
  if (data.website && data.website.length > 0) {
    return json({ success: false, error: SPAM_ERROR }, 400);
  }

  // 4) Rate limit per IP (5 / hour).
  const ip = getClientIp(req);
  const rate = await checkRateLimit(ip);
  if (!rate.success) {
    const headers = rate.retryAfterSeconds
      ? { "Retry-After": String(rate.retryAfterSeconds) }
      : undefined;
    return json({ success: false, error: RATE_LIMIT_ERROR }, 429, headers);
  }

  // 5) Verify Turnstile token server-side.
  const verified = await verifyTurnstileToken(data.token, ip);
  if (!verified) {
    return json({ success: false, error: VERIFY_ERROR }, 403);
  }

  // 6) Sanitize every field before it touches an email.
  const fields = sanitizeContactFields({
    name: data.name,
    email: data.email,
    company: data.company ?? "",
    projectType: data.projectType,
    message: data.message,
  });

  // 7) Send both emails.
  try {
    const result = await sendContactEmails(fields);
    if (!result.ok) {
      return json({ success: false, error: GENERIC_ERROR }, 502);
    }
  } catch (error) {
    console.error("[contact] Unexpected send failure:", error);
    return json({ success: false, error: GENERIC_ERROR }, 500);
  }

  return json(
    {
      success: true,
      message:
        "Thank you for contacting Axenity. Your inquiry has been successfully received. Our team will review your request and get back to you shortly.",
    },
    200,
  );
}

/** Reject every non-POST method with 405. */
export async function GET() {
  return json({ success: false, error: "Method not allowed." }, 405, {
    Allow: "POST",
  });
}

export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
