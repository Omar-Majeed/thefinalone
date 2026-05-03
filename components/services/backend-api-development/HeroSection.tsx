"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLETS = [
  "High-performance APIs",
  "Scalable architecture",
  "Secure integrations",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F172A] py-24 text-white sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
        <div className="absolute inset-x-0 top-0 overflow-hidden">
          <ArchitectureVisual className="ml-auto h-[360px] w-[480px] max-w-none translate-x-[24%] translate-y-6 opacity-[0.18] sm:h-[400px] sm:w-[520px] sm:translate-x-[12%] sm:opacity-[0.22]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,rgba(15,23,42,0.78)_46%,#0F172A_100%)]" />
      </div>

      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 max-w-xl"
          >
            <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
              Backend &amp; API Development
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Robust, scalable systems that power modern applications
            </h1>

            <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
              We design backend systems and APIs that stay fast under real
              traffic, integrate cleanly with the tools your product depends on,
              and remain easy to evolve as your platform grows.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85 sm:text-base">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
                  "shadow-[0_18px_36px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_24px_44px_-18px_rgba(90,187,74,0.9)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]",
                )}
              >
                Build Your Backend
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="relative mx-auto hidden w-full max-w-[560px] lg:block"
          >
            <ArchitectureVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const FLOW = [
  { label: "Client", hint: "Web · Mobile" },
  { label: "API Gateway", hint: "Routing · Auth" },
  { label: "Services", hint: "Business logic" },
  { label: "Database", hint: "PostgreSQL · Mongo" },
];

function ArchitectureVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-white/55">
        <span>System flow</span>
        <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">
          Live
        </span>
      </div>

      <ol className="mt-6 space-y-3">
        {FLOW.map((node, index) => (
          <motion.li
            key={node.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1220]/80 px-4 py-3.5 sm:px-5">
              <div>
                <p className="text-base font-semibold text-white">{node.label}</p>
                <p className="mt-0.5 text-xs text-white/55">{node.hint}</p>
              </div>
              <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {index < FLOW.length - 1 ? (
              <div className="relative flex h-5 items-center justify-center">
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-primary/40 to-transparent" />
                <motion.span
                  aria-hidden
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 6, opacity: 1 }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  className="relative h-2 w-2 rounded-full bg-primary"
                />
              </div>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
