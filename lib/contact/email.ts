import { Resend } from "resend";

import { ClientConfirmation } from "@/emails/ClientConfirmation";
import { NewLeadNotification } from "@/emails/NewLeadNotification";

import type { ContactFields } from "./schema";

/**
 * Lazily-constructed Resend client. Constructing it on demand keeps the module
 * import-safe even if the API key is missing at build time.
 */
let client: Resend | null = null;

function getClient(): Resend {
  if (client) return client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  client = new Resend(apiKey);
  return client;
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export interface SendContactEmailsResult {
  ok: boolean;
}

/**
 * Send the internal lead notification and the client confirmation.
 *
 * The internal notification is treated as critical: if it fails, the whole
 * operation reports failure. The client confirmation is best-effort — a failure
 * there is logged but does not fail the request, since the lead is already
 * captured internally.
 */
export async function sendContactEmails(
  fields: ContactFields,
): Promise<SendContactEmailsResult> {
  const resend = getClient();

  const fromEmail = process.env.FROM_EMAIL;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!fromEmail || !contactEmail) {
    throw new Error("FROM_EMAIL or CONTACT_EMAIL is not configured.");
  }

  const from = `Axenity <${fromEmail}>`;
  const submittedAt = formatTimestamp(new Date());

  // 1) Internal notification — critical. replyTo points at the client so a
  //    reply from the inbox goes straight back to them.
  const internal = await resend.emails.send({
    from,
    to: contactEmail,
    replyTo: fields.email,
    subject: `🚀 New Project Inquiry — ${fields.projectType}`,
    react: NewLeadNotification({
      name: fields.name,
      email: fields.email,
      company: fields.company || undefined,
      projectType: fields.projectType,
      message: fields.message,
      submittedAt,
    }),
  });

  if (internal.error) {
    console.error("[email] Internal notification failed:", internal.error);
    return { ok: false };
  }

  // 2) Client confirmation — best effort.
  const confirmation = await resend.emails.send({
    from,
    to: fields.email,
    replyTo: contactEmail,
    subject: "We've Received Your Inquiry | Axenity",
    react: ClientConfirmation({
      name: fields.name,
      projectType: fields.projectType,
    }),
  });

  if (confirmation.error) {
    console.error(
      "[email] Client confirmation failed (non-fatal):",
      confirmation.error,
    );
  }

  return { ok: true };
}
