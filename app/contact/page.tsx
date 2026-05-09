import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { TrustPanel } from "@/components/contact/TrustPanel";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Let's Build Together",
  description:
    "Start a conversation about your next project. We review every message personally and respond within one business day.",
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <ContactSplit />
      <Footer />
    </main>
  );
}

function ContactSplit() {
  return (
    <>
      {/*
        ── PAGE STRUCTURE ──────────────────────────────────────────────────
        Mobile:  stacked — dark hero banner → white form section
        Desktop: true side-by-side split occupying the full viewport height
                 Left  = dark panel (bg-foreground) — trust + stats
                 Right = white panel — form
        ────────────────────────────────────────────────────────────────── */}

      {/* ── MOBILE top bar (hidden on lg) ── */}
      <div className="bg-foreground px-6 py-14 lg:hidden">
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(55% 40% at 20% 50%, rgba(90,187,74,0.18) 0%, transparent 70%)",
          }}
        />
        <TrustPanel />
      </div>

      {/* ── Desktop split (lg+) ── */}
      <div className="hidden lg:flex lg:min-h-[calc(100vh-64px)]">

        {/* LEFT — dark trust panel */}
        <div className="relative flex w-[45%] shrink-0 flex-col bg-foreground px-12 py-16 xl:px-16 xl:py-20">
          {/* Radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              background:
                "radial-gradient(60% 50% at 15% 50%, rgba(90,187,74,0.16) 0%, transparent 65%)",
            }}
          />
          {/* Subtle grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 flex h-full flex-col">
            <TrustPanel />
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="relative flex flex-1 flex-col items-center justify-center bg-[#F9F9F9] px-10 py-16 xl:px-16 xl:py-20">
          {/* Subtle radial from left edge — bleeds warmth from the dark panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 60% at 0% 50%, rgba(90,187,74,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 w-full max-w-lg">
            {/* Form card */}
            <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)] xl:p-10">
              {/* Card header */}
              <div className="mb-8 border-b border-[#F3F4F6] pb-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  New Project Enquiry
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  Tell us about your project
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-[#6B7280]">
                  All fields marked with a dot are required. We&apos;ll be in touch shortly.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Below-card reassurance row */}
            <div className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-[#9CA3AF]">
              {[
                "No spam, ever",
                "Reply within 24h",
                "Free initial consultation",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE form section (hidden on lg) ── */}
      <div className="bg-[#F9F9F9] px-6 py-14 lg:hidden">
        <div className="mx-auto max-w-lg">
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="mb-7 border-b border-[#F3F4F6] pb-5">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                New Project Enquiry
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Tell us about your project
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-[#6B7280]">
                We review every submission personally and respond within one business day.
              </p>
            </div>
            <ContactForm />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-[#9CA3AF]">
            {["No spam, ever", "Reply within 24h", "Free consultation"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
