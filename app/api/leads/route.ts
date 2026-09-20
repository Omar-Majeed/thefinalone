import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { track } from "@vercel/analytics/server";

import { getClientIp } from "@/lib/contact/ip";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sanitizeText } from "@/lib/contact/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_ERROR = "Something went wrong. Please try again later.";
const RATE_LIMIT_ERROR =
  "Too many requests. Please try again in a little while.";

/**
 * Chat leads arrive incrementally — the user may bail before every field is
 * populated. Every field is optional, but we still cap lengths and validate
 * the email format when a value is present.
 */
const leadSchema = z.object({
  name: z.string().trim().max(200).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .max(254)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Invalid email",
    ),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  interest: z.string().trim().max(200).optional().or(z.literal("")),
});

function json(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, { status, headers });
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  resendClient = new Resend(apiKey);
  return resendClient;
}

interface LeadFields {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
}

async function persistLead(
  fields: LeadFields,
  submittedAt: string,
): Promise<{ ok: boolean }> {
  const fromEmail = process.env.FROM_EMAIL;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!fromEmail || !contactEmail) {
    throw new Error("FROM_EMAIL or CONTACT_EMAIL is not configured.");
  }

  const from = `Axenity Chat <${fromEmail}>`;
  const subject = `💬 New Chat Lead${fields.name ? ` — ${fields.name}` : ""}`;

  const lines = [
    `A new lead came in via the chat widget on ${submittedAt}.`,
    "",
    `Name:     ${fields.name || "(not provided)"}`,
    `Email:    ${fields.email || "(not provided)"}`,
    `Company:  ${fields.company || "(not provided)"}`,
    `Phone:    ${fields.phone || "(not provided)"}`,
    `Interest: ${fields.interest || "(not provided)"}`,
  ];
  const text = lines.join("\n");
  const html = `<pre style="font: 14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif; white-space: pre-wrap;">${text.replace(/</g, "&lt;")}</pre>`;

  const result = await getResend().emails.send({
    from,
    to: contactEmail,
    replyTo: fields.email || contactEmail,
    subject,
    text,
    html,
  });

  if (result.error) {
    console.error("[leads] Resend failed:", result.error);
    return { ok: false };
  }
  return { ok: true };
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: GENERIC_ERROR }, 400);
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, error: "Invalid lead payload" }, 400);
  }

  const ip = getClientIp(req);
  const rate = await checkRateLimit(ip);
  if (!rate.success) {
    const headers = rate.retryAfterSeconds
      ? { "Retry-After": String(rate.retryAfterSeconds) }
      : undefined;
    return json({ ok: false, error: RATE_LIMIT_ERROR }, 429, headers);
  }

  const fields: LeadFields = {
    name: sanitizeText(parsed.data.name || ""),
    email: sanitizeText(parsed.data.email || ""),
    company: sanitizeText(parsed.data.company || ""),
    phone: sanitizeText(parsed.data.phone || ""),
    interest: sanitizeText(parsed.data.interest || ""),
  };

  try {
    const result = await persistLead(fields, formatTimestamp(new Date()));
    if (!result.ok) {
      return json({ ok: false, error: GENERIC_ERROR }, 502);
    }
  } catch (error) {
    console.error("[leads] Unexpected persistence failure:", error);
    return json({ ok: false, error: GENERIC_ERROR }, 500);
  }

  try {
    await track("lead_submitted", { source: "chat_widget" });
  } catch (error) {
    console.error("[leads] Analytics track failed (non-fatal):", error);
  }

  return json({ ok: true, message: "Lead captured" }, 200);
}

export async function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, {
    Allow: "POST",
  });
}

export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
