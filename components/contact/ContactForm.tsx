"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { CONTACT_COPY, PROJECT_TYPES, type ProjectType } from "@/constants/contact";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(state: FormState): FormErrors {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = "Please enter your name.";
    if (!state.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(state.email)) next.email = "Enter a valid email address.";
    if (!state.projectType) next.projectType = "Select a service.";
    if (!state.message.trim()) next.message = "Tell us a bit about your project.";
    return next;
  }

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitted(true);
  }

  if (submitted) return <SuccessState />;

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingInput
          id="contact-name"
          label="Your name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name}
        />
        <FloatingInput
          id="contact-email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
        />
      </div>

      <FloatingInput
        id="contact-company"
        label="Company name"
        type="text"
        autoComplete="organization"
        value={form.company}
        onChange={(v) => handleChange("company", v)}
        error={errors.company}
      />

      <FloatingSelect
        id="contact-project"
        label="Service interested"
        value={form.projectType}
        onChange={(v) => handleChange("projectType", v as ProjectType)}
        error={errors.projectType}
        options={PROJECT_TYPES}
      />

      <FloatingTextarea
        id="contact-message"
        label="Tell us about your project"
        value={form.message}
        onChange={(v) => handleChange("message", v)}
        error={errors.message}
      />

      <div className="pt-2">
        <FillButton type="submit">{CONTACT_COPY.ctaLabel}</FillButton>
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
        Message sent
      </h3>
      <p className="mt-3 max-w-sm text-base leading-7 text-[#6B7280]">
        {CONTACT_COPY.successMessage}
      </p>
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

function FillButton({ type = "button", children }: { type?: "button" | "submit"; children: React.ReactNode }) {
  return (
    <button
      type={type}
      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-primary bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-300 ease-out hover:text-white sm:text-base"
    >
      <span aria-hidden className="absolute inset-0 -z-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
