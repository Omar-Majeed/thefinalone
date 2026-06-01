"use client";

import { motion } from "framer-motion";

import { PORTFOLIO_IMPACT } from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

const SPANS = [
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-2",
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "sm:col-span-6 lg:col-span-4",
];

export function ImpactMetrics() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F9F9F9] py-28 text-foreground sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 20% 30%, rgba(90,187,74,0.06) 0%, rgba(249,249,249,0) 70%), radial-gradient(50% 40% at 80% 70%, rgba(99,102,241,0.04) 0%, rgba(249,249,249,0) 70%)",
        }}
      />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
            Results & Impact
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The numbers{" "}
            <span className="text-[#9CA3AF]">behind the work.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid auto-rows-[1fr] grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-6">
          {PORTFOLIO_IMPACT.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-colors duration-500 hover:border-primary/40 sm:p-9 ${SPANS[i] ?? ""}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 0%, rgba(90,187,74,0.14) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#9CA3AF]">
                  {m.label}
                </div>
                <div className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    {m.value}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  {m.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
