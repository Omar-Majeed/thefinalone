"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Clock } from "lucide-react";
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

export function ContactSection() {
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

  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="relative w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      {/* Subtle gradient + radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(90,187,74,0.05) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, rgba(90,187,74,0.10) 0%, rgba(90,187,74,0) 70%)",
        }}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {CONTACT_COPY.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              {CONTACT_COPY.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#6B7280] sm:text-lg">
              {CONTACT_COPY.subheading}
            </p>

            <ul className="mt-8 space-y-3">
              {CONTACT_COPY.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[#374151]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-base sm:text-[1.05rem]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-[#4B5563] backdrop-blur">
              <Clock className="h-4 w-4 text-primary" aria-hidden />
              <span>{CONTACT_COPY.reply}</span>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(17,24,39,0.18)] sm:p-8 lg:p-10"
          >
            {submitted ? (
              <SuccessState />
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
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

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
                  className="pt-2"
                >
                  <FillButton type="submit">{CONTACT_COPY.ctaLabel}</FillButton>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Success state ---------------- */

function SuccessState() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-10 text-center sm:py-14"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-foreground sm:text-2xl">
        Message sent
      </h3>
      <p className="mt-2 max-w-sm text-base text-[#6B7280]">
        {CONTACT_COPY.successMessage}
      </p>
    </div>
  );
}

/* ---------------- Floating-label primitives ---------------- */

const fieldShell =
  "peer w-full rounded-lg border border-[#E5E7EB] bg-white px-4 pb-2 pt-5 text-[15px] text-foreground placeholder-transparent outline-none transition-all duration-200 ease-out hover:border-[#D1D5DB] focus:border-primary focus:shadow-[0_0_0_4px_rgba(90,187,74,0.15)]";

const labelBase =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-[#6B7280] transition-all duration-200 ease-out peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[#9CA3AF] peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500">{message}</p>;
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={label}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldShell} ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        />
        <label htmlFor={id} className={labelBase}>
          {label}
        </label>
      </div>
      <div id={`${id}-error`}>
        <FieldError message={error} />
      </div>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          rows={4}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldShell} resize-none ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        />
        <label htmlFor={id} className={labelBase}>
          {label}
        </label>
      </div>
      <div id={`${id}-error`}>
        <FieldError message={error} />
      </div>
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
}) {
  const isEmpty = value === "";
  return (
    <div>
      <div className="relative">
        <select
          id={id}
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-lg border border-[#E5E7EB] bg-white px-4 pb-2 pt-5 text-[15px] text-foreground outline-none transition-all duration-200 ease-out hover:border-[#D1D5DB] focus:border-primary focus:shadow-[0_0_0_4px_rgba(90,187,74,0.15)] ${
            isEmpty ? "[&:not(:focus)]:text-transparent" : ""
          } ${error ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""}`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out ${
            isEmpty
              ? "top-4 text-[15px] text-[#9CA3AF]"
              : "top-2 text-xs font-medium text-[#6B7280]"
          }`}
        >
          {label}
        </label>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
        />
      </div>
      <div id={`${id}-error`}>
        <FieldError message={error} />
      </div>
    </div>
  );
}

/* ---------------- CTA button (left-to-right fill) ---------------- */

function FillButton({
  type = "button",
  children,
}: {
  type?: "button" | "submit";
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-primary bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-colors duration-300 ease-out hover:text-white sm:w-auto sm:text-base"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
