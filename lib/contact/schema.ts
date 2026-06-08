import { z } from "zod";
import { PROJECT_TYPES } from "@/constants/contact";

/**
 * Shared contact submission schema.
 *
 * Used on the server (API route) as the source of truth and exported so the
 * client can stay aligned with the same field constraints.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(100, "Company must be 100 characters or fewer.")
    .optional()
    .or(z.literal("")),
  projectType: z
    .string()
    .trim()
    .min(1, "Select a service.")
    .max(100, "Project type must be 100 characters or fewer.")
    .refine(
      (value) => (PROJECT_TYPES as readonly string[]).includes(value),
      "Select a valid service.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your project (at least 10 characters).")
    .max(5000, "Message must be 5000 characters or fewer."),
  /** Cloudflare Turnstile token issued by the client widget. */
  token: z.string().min(1, "Verification failed. Please try again."),
  /** Honeypot — must remain empty. Real users never see this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Fields the user actually fills in (excludes token + honeypot). */
export type ContactFields = Pick<
  ContactInput,
  "name" | "email" | "company" | "projectType" | "message"
>;
