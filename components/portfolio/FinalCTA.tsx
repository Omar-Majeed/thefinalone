"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1A1A2E] py-32 text-white sm:py-40 lg:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, rgba(90,187,74,0.15) 0%, rgba(26,26,46,0) 60%), linear-gradient(180deg, #1A1A2E 0%, #0F0F1F 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[160px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
            What&apos;s Next
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
              exceptional
            </span>
            .
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base text-white/55 sm:text-lg">
            Whether it&apos;s a flagship product, an internal platform or an
            ambitious AI surface — we&apos;ll help you ship it at the standard
            your customers deserve.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(90,187,74,0.4),0_25px_70px_-20px_rgba(90,187,74,0.75)] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06]"
            >
              <CalendarDays className="h-4 w-4" />
              Schedule a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
