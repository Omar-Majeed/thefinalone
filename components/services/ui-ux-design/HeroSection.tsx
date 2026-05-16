"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#FAFAF7] pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28"
    >
      {/* ── Atmospheric backgrounds ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(90,187,74,0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(90,187,74,0.05), transparent 50%)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#111827" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute right-[15%] top-[10%] h-[340px] w-[340px] rounded-full bg-primary/[0.06] blur-[100px]" />
        <div className="absolute left-[5%] bottom-[20%] h-[200px] w-[200px] rounded-full bg-primary/[0.04] blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* ── LEFT CONTENT ── */}
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <span className="h-px w-8 bg-primary" />
              UI/UX Design Services
            </motion.span>

            <div className="mt-7 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="text-5xl font-bold leading-[0.95] tracking-tight text-[#111827] sm:text-6xl lg:text-7xl"
              >
                Design Experiences
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="text-5xl font-bold leading-[0.95] tracking-tight text-[#111827] sm:text-6xl lg:text-7xl"
              >
                People{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">Remember.</span>
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/30"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              We design intuitive, conversion-focused digital experiences that
              combine aesthetics, usability, and performance into products users
              genuinely enjoy using.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white",
                  "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                Start Your Design Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#process"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
              >
                View Our Process
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT VISUAL ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="relative mx-auto hidden h-[480px] w-full max-w-[540px] lg:block"
          >
            <DesignEcosystem springX={springX} springY={springY} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Floating design ecosystem visual ── */
function DesignEcosystem({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const x1 = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const y1 = useTransform(springY, [-0.5, 0.5], [-4, 4]);
  const x2 = useTransform(springX, [-0.5, 0.5], [5, -5]);
  const y2 = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const x3 = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const y3 = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  return (
    <div className="relative h-full w-full">

      {/* ── Main dashboard card ── */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute left-6 top-8 right-16 z-20"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86EFAC]" />
            <span className="ml-4 text-[10px] font-medium text-gray-400">
              Dashboard — Desktop
            </span>
          </div>

          {/* Mock UI */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#F8FAFC] p-3">
              <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400">Revenue</p>
              <p className="mt-1 text-lg font-bold text-[#111827]">$48.2K</p>
              <span className="text-[10px] font-semibold text-primary">+18%</span>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] p-3">
              <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400">Users</p>
              <p className="mt-1 text-lg font-bold text-[#111827]">12.4K</p>
              <span className="text-[10px] font-semibold text-primary">+6%</span>
            </div>
            <div className="rounded-xl bg-primary/10 p-3">
              <p className="text-[9px] font-medium uppercase tracking-wider text-primary/60">NPS</p>
              <p className="mt-1 text-lg font-bold text-primary">72</p>
              <span className="text-[10px] font-semibold text-primary">+12</span>
            </div>
          </div>

          {/* Chart bars */}
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {[38, 54, 47, 72, 64, 88, 79, 92, 68].map((v, i) => (
              <span
                key={`${v}-${i}`}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary/80"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Mobile preview card ── */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -right-4 bottom-8 z-30 w-[170px]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="rounded-[24px] border border-gray-200/80 bg-white p-3 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.15)]"
        >
          {/* Notch */}
          <div className="mx-auto h-1 w-12 rounded-full bg-gray-200" />
          <div className="mt-2 overflow-hidden rounded-[18px] bg-[#F8FAFC] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Mobile</p>
            <div className="mt-2 flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <div className="h-5 w-5 rounded-lg bg-primary/60" />
              </div>
              <span className="h-1.5 w-3/4 rounded-full bg-gray-200" />
              <span className="h-1.5 w-1/2 rounded-full bg-gray-200" />
              <div className="mt-1 w-full rounded-lg bg-primary py-2 text-center text-[8px] font-bold text-white">
                Get Started
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Typography & Color system card ── */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute -left-4 bottom-16 z-30 w-[200px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.15)]"
        >
          <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
            Design Tokens
          </p>
          {/* Color palette */}
          <div className="mt-3 flex gap-1.5">
            {["#5ABB4A", "#111827", "#F4F1EC", "#0F172A", "#FAFAF7"].map((c) => (
              <span
                key={c}
                className="h-6 flex-1 rounded-md border border-gray-100"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          {/* Typography preview */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#111827]">Display</span>
              <span className="text-[9px] text-gray-400">48/1.05</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#111827]">Heading</span>
              <span className="text-[9px] text-gray-400">24/1.2</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-gray-600">Body</span>
              <span className="text-[9px] text-gray-400">16/1.6</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Cursor indicator ── */}
      <motion.div
        animate={{
          x: [120, 180, 160, 120],
          y: [100, 140, 180, 100],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-40 pointer-events-none"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 drop-shadow-md">
          <path
            d="M3 2 L3 15 L7 12 L9.5 17 L11.5 16 L9 11 L15 11 Z"
            fill="white"
            stroke="#111827"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute left-1 top-3 h-2 w-2 animate-ping rounded-full bg-primary/50" />
      </motion.div>
    </div>
  );
}
