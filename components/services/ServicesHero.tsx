"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Megaphone,
  Palette,
  Search,
  Server,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesHero() {
  return (
    <section
      aria-label="Services hero"
      className="relative isolate overflow-hidden bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative z-10 text-center lg:text-left"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-[#5ABB4A]">
              Services
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-[#0F172A] sm:text-4xl md:text-5xl lg:text-6xl">
              Building digital solutions that scale with your business
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg leading-8 text-[#475569] lg:mx-0">
              From web platforms and mobile apps to backend systems, AI, and
              growth — we partner with ambitious teams to design, build, and
              ship products that perform from day one and keep scaling.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="#services-grid"
                className={cn(
                  "inline-flex items-center justify-center rounded-md bg-[#5ABB4A] px-6 py-3 text-sm font-semibold text-white",
                  "transition-colors duration-300 hover:bg-[#4DA63E]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ABB4A] focus-visible:ring-offset-2",
                )}
              >
                Explore Services
              </Link>

              <Link
                href="/#contact"
                className={cn(
                  "group/cta relative inline-flex items-center justify-center overflow-hidden rounded-md",
                  "border border-[#5ABB4A] bg-white px-6 py-3 text-sm font-semibold text-[#5ABB4A]",
                  "transition-colors duration-300 hover:text-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ABB4A] focus-visible:ring-offset-2",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 origin-left scale-x-0 bg-[#5ABB4A]",
                    "transition-transform duration-300 ease-out",
                    "group-hover/cta:scale-x-100",
                  )}
                />
                <span className="relative z-10">Let&apos;s Talk</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            aria-hidden
            className="relative hidden h-[420px] w-full lg:block"
          >
            <ServicesHeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Mobile background visual — subtle, behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5ABB4A] opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#5ABB4A] opacity-10 blur-3xl" />
      </div>
    </section>
  );
}

/* ---------- Right-side abstract visual (Tailwind + CSS only) ------------- */

type OrbitIcon = { icon: LucideIcon; angle: number };

// Inner orbit (smaller radius)
const INNER_ORBIT: OrbitIcon[] = [
  { icon: Globe, angle: 0 },
  { icon: Smartphone, angle: 120 },
  { icon: Server, angle: 240 },
];

// Outer orbit (larger radius)
const OUTER_ORBIT: OrbitIcon[] = [
  { icon: Bot, angle: 30 },
  { icon: Palette, angle: 110 },
  { icon: Search, angle: 200 },
  { icon: Megaphone, angle: 290 },
];

function ServicesHeroVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Subtle dotted grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at center, black 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 55%, transparent 80%)",
        }}
      />

      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-6 top-6 h-72 w-72 rounded-full bg-[#5ABB4A] blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 left-4 h-44 w-44 rounded-full bg-[#5ABB4A] blur-3xl"
      />

      {/* Pulsing concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.2,
          }}
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#5ABB4A]/40"
        />
      ))}

      {/* Static guide rings */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#5ABB4A]/30" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#5ABB4A]/20" />

      {/* Inner orbit (rotates clockwise) */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="relative h-full w-full"
        >
          {INNER_ORBIT.map(({ icon: Icon, angle }, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(8rem) rotate(-${angle}deg)`,
              }}
            >
              {/* Counter-rotate so icon stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="-translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#5ABB4A] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.25)]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Outer orbit (rotates counter-clockwise) */}
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="relative h-full w-full"
        >
          {OUTER_ORBIT.map(({ icon: Icon, angle }, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(11rem) rotate(-${angle}deg)`,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="-translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white/95 text-[#0F172A] shadow-[0_10px_24px_-14px_rgba(15,23,42,0.3)] backdrop-blur">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5ABB4A] text-white shadow-[0_0_40px_8px_rgba(90,187,74,0.45)]">
            <Sparkles className="h-7 w-7" strokeWidth={2} />
            <span className="absolute inset-0 rounded-2xl border border-white/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
