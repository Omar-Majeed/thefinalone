"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLETS = [
  "Technical SEO & Site Architecture",
  "Content Strategy & Link Building",
  "Local, E-commerce & Enterprise SEO",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
      {/* Background gradient — mirrors mobile hero exactly */}
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

      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 max-w-xl"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Search Engine Optimization
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Rank higher, get found, and grow faster
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              We engineer data-driven SEO strategies that put your business at
              the top of search results and keep it there. No shortcuts, no
              black-hat tricks — just sustainable, compounding growth.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#374151] sm:text-base"
                >
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
                Get Free SEO Audit
              </Link>

              <Link
                href="#seo-results"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View Results
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — SEO Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="relative mx-auto hidden h-[420px] w-full max-w-[390px] sm:h-[500px] sm:max-w-[500px] lg:block"
          >
            <SEODashboardVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SEODashboardVisual() {
  const bars = [28, 42, 55, 61, 74, 88, 100];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <div className="relative h-full w-full">
      {/* Main ranking card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-4 z-20 w-[260px] -translate-x-1/2"
      >
        <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white/95 p-3 shadow-[0_34px_70px_-36px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-[#D1D5DB]" />
          <div className="mt-3 overflow-hidden rounded-[26px] bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Rankings
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                Live
              </span>
            </div>
            <div className="mt-4 flex items-end gap-1.5 h-20">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-full bg-primary/85"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                  style={{ display: "block" }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              {months.map((m) => (
                <span key={m} className="flex-1 text-center text-[9px] text-[#9CA3AF]">{m}</span>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-white px-3 py-3 shadow-sm flex items-center justify-between">
              <span className="text-[11px] text-[#6B7280]">Avg. position</span>
              <span className="text-lg font-semibold text-foreground">#18 → <span className="text-primary">#1</span></span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Traffic card — bottom left */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-4, -2, -4] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute bottom-10 left-0 z-10 w-[185px]"
      >
        <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-3 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.34)] backdrop-blur">
          <div className="overflow-hidden rounded-[22px] bg-[#F8FAFC] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Organic Traffic</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">+312%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Keywords card — bottom right */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [4, 6, 4] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-6 right-0 z-10 w-[175px]"
      >
        <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-3 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.34)] backdrop-blur">
          <div className="overflow-hidden rounded-[22px] bg-foreground p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Keywords</p>
            <p className="mt-2 text-2xl font-semibold text-white">1,400+</p>
            <p className="mt-1 text-[10px] text-white/50">in top 10 results</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
