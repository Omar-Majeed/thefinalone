"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, MousePointer2, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const LIVE_STATS = [
  { icon: TrendingUp,    label: "Avg. ROAS",         value: "4.8x"  },
  { icon: MousePointer2, label: "Leads Generated",   value: "120k+" },
  { icon: Megaphone,     label: "Campaigns Launched",value: "340+"  },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground py-24 sm:py-28 lg:py-32">
      {/* Radial green glow — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-10 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container px-6">
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Digital Marketing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]"
        >
          Marketing that moves the{" "}
          <span className="text-primary">needle</span>,<br className="hidden sm:block" />
          not just the metrics
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg"
        >
          We build full-funnel digital marketing systems — paid, organic, social,
          and email — engineered to generate qualified demand and compound
          returns over time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/#contact"
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
              "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
              "hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
            )}
          >
            Start a Campaign
          </Link>
          <Link
            href="#dm-channels"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 backdrop-blur transition-all duration-300 hover:border-white/30 hover:text-white"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Live stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
          className="mt-16 flex flex-wrap gap-px overflow-hidden rounded-[20px] border border-white/10"
        >
          {LIVE_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-1 min-w-[140px] items-center gap-4 bg-white/[0.04] px-6 py-5 backdrop-blur",
                  i < LIVE_STATS.length - 1 && "border-r border-white/10",
                )}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
