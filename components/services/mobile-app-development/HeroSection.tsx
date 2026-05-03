"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLETS = [
  "Native & Cross-Platform Solutions",
  "Scalable & Secure Architecture",
  "SDK Development & Integrations",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(90,187,74,0.18), transparent 32%), linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-5rem] top-20 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
        <div className="absolute inset-x-0 top-0 overflow-hidden">
          <PhoneStackVisual className="ml-auto h-[360px] w-[440px] max-w-none translate-x-[32%] translate-y-4 opacity-[0.22] sm:h-[420px] sm:w-[500px] sm:translate-x-[18%] sm:opacity-[0.28]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.74)_42%,#FFFFFF_100%)]" />
      </div>

      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 max-w-xl"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Mobile App Development
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Build high-performance mobile apps for iOS and Android
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              We craft mobile products that feel fast, polished, and reliable,
              with the engineering depth needed to support new features, steady
              releases, and growing user demand.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#374151] sm:text-base">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
                  "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                Build Your App
              </Link>

              <Link
                href="#app-showcase"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View Apps
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="relative mx-auto hidden h-[420px] w-full max-w-[390px] overflow-hidden sm:h-[500px] sm:max-w-[500px] lg:block"
          >
            <PhoneStackVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneStackVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-9, -7, -9] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-16 z-10 w-[190px] sm:left-8 sm:w-[220px]"
      >
        <PhoneFrame title="Onboarding" variant="onboarding" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute left-1/2 top-4 z-20 w-[220px] -translate-x-1/2 sm:w-[250px]"
      >
        <PhoneFrame title="Dashboard" variant="dashboard" featured />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [8, 10, 8] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-6 right-0 z-10 w-[200px] sm:right-8 sm:w-[225px]"
      >
        <PhoneFrame title="Analytics" variant="analytics" />
      </motion.div>
    </div>
  );
}

function PhoneFrame({
  title,
  variant,
  featured = false,
}: {
  title: string;
  variant: "dashboard" | "analytics" | "onboarding";
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[34px] border border-white/70 bg-white/95 p-3 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.34)] backdrop-blur",
        featured && "shadow-[0_34px_70px_-36px_rgba(15,23,42,0.4)]",
      )}
    >
      <div className="mx-auto h-1.5 w-16 rounded-full bg-[#D1D5DB]" />
      <div className="mt-3 overflow-hidden rounded-[26px] bg-[#F8FAFC] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            {title}
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
            Live
          </span>
        </div>

        {variant === "dashboard" ? <DashboardScreen /> : null}
        {variant === "analytics" ? <AnalyticsScreen /> : null}
        {variant === "onboarding" ? <OnboardingScreen /> : null}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-[11px] text-[#6B7280]">Active users</p>
        <p className="mt-2 text-2xl font-semibold text-foreground">18.4k</p>
        <div className="mt-4 flex h-20 items-end gap-2">
          {[34, 48, 44, 62, 70].map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="flex-1 rounded-t-full bg-primary/85"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["Push opt-in", "78%", "Sessions", "6.1m"].map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-2xl bg-white px-3 py-3 shadow-sm">
            <p className={cn("text-[11px] text-[#6B7280]", index % 2 === 1 && "text-lg font-semibold text-foreground")}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-2xl bg-foreground px-4 py-4 text-white">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Retention</p>
        <p className="mt-2 text-2xl font-semibold">92%</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[92%] rounded-full bg-primary" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[72, 88, 64].map((value, index) => (
          <div key={`${value}-${index}`} className="rounded-2xl bg-white px-3 py-4 text-center shadow-sm">
            <p className="text-lg font-semibold text-foreground">{value}%</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#6B7280]">Week {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingScreen() {
  return (
    <div className="mt-4 flex flex-col items-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary/12">
        <div className="h-10 w-10 rounded-[16px] bg-primary/70" />
      </div>
      <p className="mt-4 text-base font-semibold text-foreground">Fast, guided onboarding</p>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Help new users activate quickly with clean, focused mobile flows.
      </p>
      <div className="mt-5 w-full space-y-2">
        <div className="h-2 rounded-full bg-primary" />
        <div className="h-2 rounded-full bg-[#E5E7EB]" />
        <div className="h-2 rounded-full bg-[#E5E7EB]" />
      </div>
      <div className="mt-5 w-full rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-white">
        Continue
      </div>
    </div>
  );
}