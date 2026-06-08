import DOMPurify from "isomorphic-dompurify";

import type { ContactFields } from "./schema";

/**
 * Strip every tag/attribute from a user-supplied string and collapse the
 * leftover whitespace. We never render contact input as HTML, so the safest
 * policy is to allow zero markup — this removes `<script>`, event handlers,
 * and any HTML injection vector entirely.
 */
export function sanitizeText(value: string): string {
  const cleaned = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Same as {@link sanitizeText} but preserves newlines so multi-line messages
 * keep their structure when rendered into the email template.
 */
export function sanitizeMultiline(value: string): string {
  const cleaned = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  return cleaned
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Sanitize every field that ends up inside an outgoing email. */
export function sanitizeContactFields(fields: ContactFields): ContactFields {
  return {
    name: sanitizeText(fields.name),
    email: sanitizeText(fields.email),
    company: fields.company ? sanitizeText(fields.company) : "",
    projectType: sanitizeText(fields.projectType),
    message: sanitizeMultiline(fields.message),
  };
}
