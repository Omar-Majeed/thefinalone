"use client";

import { useCallback, useState } from "react";

import { type ProjectType } from "@/constants/contact";
import { contactSchema } from "@/lib/contact/schema";

export type ContactFormState = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  message: string;
  /** Honeypot — must stay empty for real users. */
  website: string;
};

export type ContactFormErrors = Partial<
  Record<keyof ContactFormState, string>
>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_STATE: ContactFormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
};

const GENERIC_ERROR = "Something went wrong. Please try again later.";

/** Lightweight client-side validation mirroring the Zod server rules. */
function validate(state: ContactFormState): ContactFormErrors {
  const next: ContactFormErrors = {};
  if (!state.name.trim()) next.name = "Please enter your name.";
  else if (state.name.trim().length < 2)
    next.name = "Name must be at least 2 characters.";

  if (!state.email.trim()) next.email = "Please enter your email.";
  else if (!EMAIL_RE.test(state.email))
    next.email = "Enter a valid email address.";

  if (!state.projectType) next.projectType = "Select a service.";

  if (!state.message.trim())
    next.message = "Tell us a bit about your project.";
  else if (state.message.trim().length < 10)
    next.message = "Please add a little more detail (10+ characters).";

  return next;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormState, string[]>>;
}

/**
 * Shared controller for the contact forms used on the homepage and the
 * dedicated contact page. Owns form state, validation, the Turnstile token,
 * and the full submission lifecycle so both surfaces behave identically.
 */
export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const setField = useCallback(
    <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
      if (serverError) setServerError(null);
    },
    [serverError],
  );

  const resetToken = useCallback(() => setToken(null), []);

  const submit = useCallback(async () => {
    if (isSubmitting) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!token) {
      setServerError(
        "Please complete the verification challenge before submitting.",
      );
      return;
    }

    // Re-validate the full payload (incl. token) against the shared schema.
    const candidate = { ...form, token };
    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const mapped: ContactFormErrors = {};
      (Object.keys(flat) as (keyof ContactFormState)[]).forEach((key) => {
        const msg = flat[key]?.[0];
        if (msg) mapped[key] = msg;
      });
      setErrors(mapped);
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse | null;

      if (res.ok && data?.success) {
        setStatus("success");
        return;
      }

      // Map server-side field errors back onto the form when present.
      if (data?.fieldErrors) {
        const mapped: ContactFormErrors = {};
        (Object.keys(data.fieldErrors) as (keyof ContactFormState)[]).forEach(
          (key) => {
            const msg = data.fieldErrors?.[key]?.[0];
            if (msg) mapped[key] = msg;
          },
        );
        setErrors((prev) => ({ ...prev, ...mapped }));
      }

      setStatus("error");
      setServerError(data?.error ?? GENERIC_ERROR);
      // A used/expired token must be re-issued before the next attempt.
      setToken(null);
    } catch {
      setStatus("error");
      setServerError(GENERIC_ERROR);
      setToken(null);
    }
  }, [form, token, isSubmitting]);

  return {
    form,
    errors,
    status,
    isSubmitting,
    isSuccess,
    serverError,
    token,
    setToken,
    resetToken,
    setField,
    submit,
  };
}
