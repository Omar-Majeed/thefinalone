"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, MousePointer2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const TICKER_ITEMS = [
  { icon: TrendingUp,     text: "New campaign launched — ROAS 5.2x" },
  { icon: MousePointer2,  text: "248 leads generated this week" },
  { icon: Mail,           text: "Email sequence live — 44% open rate" },
  { icon: TrendingUp,     text: "Organic traffic up 18% month on month" },
  { icon: MousePointer2,  text: "CPL reduced by 31% after optimisation" },
  { icon: Mail,           text: "Win-back flow recovered $14k revenue" },
];

export function FinalCTA() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section id="final-cta" className="bg-foreground py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-primary/15 blur-[100px]"
      />

      {/* Live activity ticker */}
      <div className="mb-14 overflow-hidden border-y border-white/8 py-3">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => {
            const Icon = item.icon;
            return (
              <span key={i} className="inline-flex items-center gap-2.5 text-xs font-medium text-white/30">
                <Icon className="h-3.5 w-3.5 text-primary/60 shrink-0" strokeWidth={2} />
                {item.text}
                <span className="mx-2 h-px w-8 bg-white/10" />
              </span>
            );
          })}
        </motion.div>
      </div>

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary">
            Free Strategy Session
          </span>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Let&apos;s build a marketing system that compounds
          </h2>

          <p className="mt-5 text-base leading-8 text-white/50 sm:text-lg">
            Book a free strategy call. We will audit your current marketing,
            identify the highest-leverage opportunities, and show you exactly
            what we would do differently.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-[#D1D5DB] bg-white px-8 py-3.5 text-sm font-semibold text-foreground",
                "transition-colors duration-300 hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a Free Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/25">
            No commitment required &middot; Audit delivered within 48 hours
          </p>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 border-t border-white/8 pt-10">
            {[
              "Full-funnel strategy",
              "No lock-in contracts",
              "Results in 90 days",
              "Dedicated strategist",
            ].map((item) => (
              <span key={item} className="text-xs font-medium text-white/30">
                ✦ {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
