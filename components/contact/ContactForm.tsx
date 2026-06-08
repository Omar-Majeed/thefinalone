"use client";

import { type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";
import { CONTACT_COPY, PROJECT_TYPES, type ProjectType } from "@/constants/contact";
import { useContactForm } from "@/hooks/useContactForm";
import { TurnstileWidget } from "@/components/contact/TurnstileWidget";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
  const {
    form,
    errors,
    isSubmitting,
    isSuccess,
    serverError,
    setToken,
    resetToken,
    setField,
    submit,
  } = useContactForm();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void submit();
  }

  if (isSuccess) return <SuccessState />;

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-5"
    >
      {/* Honeypot — visually hidden, off-screen, never tab-focusable. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website ?? ""}
          onChange={(e) => setField("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingInput
          id="contact-name"
          label="Your name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(v) => setField("name", v)}
          error={errors.name}
        />
        <FloatingInput
          id="contact-email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(v) => setField("email", v)}
          error={errors.email}
        />
      </div>

      <FloatingInput
        id="contact-company"
        label="Company name"
        type="text"
        autoComplete="organization"
        value={form.company}
        onChange={(v) => setField("company", v)}
        error={errors.company}
      />

      <FloatingSelect
        id="contact-project"
        label="Service interested"
        value={form.projectType}
        onChange={(v) => setField("projectType", v as ProjectType)}
        error={errors.projectType}
        options={PROJECT_TYPES}
      />

      <FloatingTextarea
        id="contact-message"
        label="Tell us about your project"
        value={form.message}
        onChange={(v) => setField("message", v)}
        error={errors.message}
      />

      <TurnstileWidget
        className="pt-1"
        onVerify={setToken}
        onExpire={resetToken}
      />

      {serverError ? <FormError message={serverError} /> : null}

      <div className="pt-2">
        <FillButton type="submit" loading={isSubmitting}>
          {isSubmitting ? "Sending…" : CONTACT_COPY.ctaLabel}
        </FillButton>
      </div>
    </motion.form>
  );
}

/* ── Success state ── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
      </span>
      <h3 className="mt-6 text-2xl font-semibold text-foreground">
        Thank you for contacting Axenity
      </h3>
      <p className="mt-3 max-w-sm text-base leading-7 text-[#6B7280]">
        Your inquiry has been successfully received. Our team will review your
        request and get back to you shortly.
      </p>
    </motion.div>
  );
}

/* ── Form-level error banner ── */
function FormError({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </motion.div>
  );
}

/* ── Field primitives ── */
const fieldShell =
  "peer w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 pb-2 pt-6 text-[15px] text-foreground placeholder-transparent outline-none transition-all duration-200 hover:border-[#D1D5DB] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(90,187,74,0.12)]";

const labelBase =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-[#6B7280] transition-all duration-200 peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[#9CA3AF] peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500">{message}</p>;
}

function FloatingInput({
  id, label, type = "text", value, onChange, error, autoComplete,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; autoComplete?: string;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id} type={type} placeholder={label} autoComplete={autoComplete}
          aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
          value={value} onChange={(e) => onChange(e.target.value)}
          className={`${fieldShell} ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        />
        <label htmlFor={id} className={labelBase}>{label}</label>
      </div>
      <div id={`${id}-error`}><FieldError message={error} /></div>
    </div>
  );
}

function FloatingTextarea({
  id, label, value, onChange, error,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id} rows={4} placeholder={label}
          aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
          value={value} onChange={(e) => onChange(e.target.value)}
          className={`${fieldShell} resize-none ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        />
        <label htmlFor={id} className={labelBase}>{label}</label>
      </div>
      <div id={`${id}-error`}><FieldError message={error} /></div>
    </div>
  );
}

function FloatingSelect({
  id, label, value, onChange, options, error,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; options: readonly string[]; error?: string;
}) {
  const isEmpty = value === "";
  return (
    <div>
      <div className="relative">
        <select
          id={id} value={value}
          aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 pb-2 pt-6 text-[15px] text-foreground outline-none transition-all duration-200 hover:border-[#D1D5DB] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(90,187,74,0.12)] ${isEmpty ? "[&:not(:focus)]:text-transparent" : ""} ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        >
          <option value="" disabled hidden />
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-foreground">{opt}</option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${isEmpty ? "top-[1.1rem] text-[15px] text-[#9CA3AF]" : "top-2 text-xs font-medium text-[#6B7280]"}`}
        >
          {label}
        </label>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
      </div>
      <div id={`${id}-error`}><FieldError message={error} /></div>
    </div>
  );
}

function FillButton({
  type = "button",
  children,
  loading = false,
}: {
  type?: "button" | "submit";
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={loading}
      aria-busy={loading}
      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-primary bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-300 ease-out hover:text-white disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:text-primary sm:text-base"
    >
      <span aria-hidden className="absolute inset-0 -z-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-disabled:scale-x-0" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
      </span>
    </button>
  );
}
