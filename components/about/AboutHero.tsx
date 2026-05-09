"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORDS = ["We Build", "Digital Systems", "That Move Businesses", "Forward."];

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground py-24 sm:py-28 lg:py-32">
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Green glow — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[130px]"
      />
      {/* Green glow — bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"
      />

      <div className="container px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">

          {/* LEFT */}
          <div className="relative z-10 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              About Us
            </motion.span>

            {/* Staggered headline */}
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.07]">
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  className="block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {i === 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.52 }}
              className="mt-6 text-base leading-8 text-white/50 sm:text-lg"
            >
              We combine engineering, strategy, and modern design to create
              scalable digital experiences that help brands grow — sustainably
              and without compromise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.64 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
                  "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
                )}
              >
                Let&apos;s Work Together
              </Link>
              <Link
                href="#about-mindset"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                How we think
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.76 }}
              className="mt-14 flex flex-wrap gap-8 border-t border-white/8 pt-8"
            >
              {[
                { value: "120+", label: "Projects delivered" },
                { value: "8+",   label: "Years of craft" },
                { value: "94%",  label: "Client retention" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-semibold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/30">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — floating UI card stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="relative mx-auto hidden h-[480px] w-full max-w-[440px] lg:block"
          >
            {/* Analytics card — top */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 z-20 w-[220px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)]"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Organic Traffic</p>
              <p className="mt-1 text-2xl font-semibold text-white">+312%</p>
              <div className="mt-3 flex items-end gap-1 h-10">
                {[30, 45, 38, 60, 72, 88, 100].map((h, i) => (
                  <span key={i} className="flex-1 rounded-t-sm bg-primary/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

            {/* Code snippet card — middle */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute left-1/2 top-[80px] z-30 w-[240px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1117] p-4 shadow-[0_32px_60px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <p><span className="text-[#7C3AED]">const</span> <span className="text-[#38BDF8]">result</span> <span className="text-white/40">=</span> <span className="text-primary">await</span></p>
                <p className="pl-4 text-white/60">buildProduct(</p>
                <p className="pl-8 text-[#F59E0B]">&#123; quality: <span className="text-primary">&quot;max&quot;</span> &#125;</p>
                <p className="pl-4 text-white/60">);</p>
                <p className="mt-2 text-primary/60">{`// ✓ shipped`}</p>
              </div>
            </motion.div>

            {/* Dashboard card — bottom right */}
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [2, 4, 2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 right-0 z-20 w-[200px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)]"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Performance</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[["99", "Score"], ["4.8x", "ROAS"], ["Top 3", "Rank"], ["94%", "Retention"]].map(([v, l]) => (
                  <div key={l} className="rounded-xl bg-white/5 p-2 text-center">
                    <p className="text-sm font-semibold text-white">{v}</p>
                    <p className="text-[9px] text-white/30">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating green orb */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
