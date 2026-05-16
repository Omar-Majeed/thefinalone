"use client";

import { motion } from "framer-motion";
import { Sparkles, Hand, Eye, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    icon: Sparkles,
    title: "Micro-interactions",
    desc: "Subtle feedback loops that make every tap, click, and scroll feel responsive.",
  },
  {
    icon: Hand,
    title: "Gesture Design",
    desc: "Swipe, drag, and pinch patterns that feel natural and platform-native.",
  },
  {
    icon: Eye,
    title: "Visual Feedback",
    desc: "State transitions, loading indicators, and confirmations that reduce uncertainty.",
  },
  {
    icon: Zap,
    title: "Performance Feel",
    desc: "Optimistic UI, skeleton states, and perceived speed that makes apps feel instant.",
  },
];

export function InteractionDesignSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT: Interactive mockup showcase ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative mx-auto h-[380px] w-full max-w-[480px] sm:h-[420px]"
          >
            <InteractionShowcase />
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Interaction Design
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Every Interaction Should
              <br />
              Feel Intentional.
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
              We obsess over the details that separate good interfaces from
              exceptional ones — the micro-moments that create emotional
              connection and build trust through consistent, thoughtful feedback.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{f.title}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InteractionShowcase() {
  return (
    <div className="relative h-full w-full">
      {/* Main card with hover state demo */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-8 top-4 z-20 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.12)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary/50" />
          </div>
          <div>
            <span className="block h-2 w-20 rounded-full bg-gray-200" />
            <span className="mt-1 block h-1.5 w-14 rounded-full bg-gray-100" />
          </div>
        </div>

        {/* Animated button states */}
        <div className="space-y-3">
          <motion.div
            animate={{ scale: [1, 1.02, 1], boxShadow: [
              "0 0 0 0 rgba(90,187,74,0)",
              "0 8px 20px -6px rgba(90,187,74,0.4)",
              "0 0 0 0 rgba(90,187,74,0)",
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-xl bg-primary py-2.5 text-xs font-semibold text-white"
          >
            Primary Action
          </motion.div>
          <div className="flex items-center justify-center rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-500">
            Secondary Action
          </div>
        </div>

        {/* Toggle demo */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
          <span className="text-xs text-gray-500">Dark mode</span>
          <motion.div
            animate={{ backgroundColor: ["#E5E7EB", "#5ABB4A", "#E5E7EB"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-5 w-9 rounded-full"
          >
            <motion.div
              animate={{ x: [2, 16, 2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-0 bottom-4 z-30 w-[200px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.12)]"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#111827]">Toast notification</p>
            <p className="mt-0.5 text-[10px] text-gray-400">Action completed ✓</p>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </motion.div>

      {/* Floating cursor */}
      <motion.div
        animate={{
          x: [60, 120, 100, 60],
          y: [120, 80, 160, 120],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-40 pointer-events-none"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 drop-shadow-lg">
          <path
            d="M3 2 L3 15 L7 12 L9.5 17 L11.5 16 L9 11 L15 11 Z"
            fill="white"
            stroke="#111827"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
