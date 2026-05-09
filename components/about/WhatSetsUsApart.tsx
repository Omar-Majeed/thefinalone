"use client";

import { motion } from "framer-motion";
import { Zap, Code2, Search, GitBranch, Layers, MousePointer2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhatSetsUsApart() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">

        {/* Header — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl"
        >
          <span className="text-sm font-semibold text-primary">Why Us</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What sets us apart
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            Six things that show up in every project we deliver — not just the
            ones we pitch.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">

          {/* 1 — wide dark, Fast Execution */}
          <BentoCell
            delay={0}
            className="lg:col-span-5 lg:row-span-1"
            dark
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Zap className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Fast Execution</h3>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Strategies go live within days, not months. We move quickly
              without cutting corners — because speed is a feature.
            </p>
            {/* Mini timeline visual */}
            <div className="mt-6 flex items-center gap-0">
              {["Brief", "Design", "Build", "Ship"].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="mt-1.5 text-[9px] uppercase tracking-wider text-white/25">{s}</span>
                  </div>
                  {i < 3 && <div className="mx-1.5 h-px w-8 bg-primary/30" />}
                </div>
              ))}
            </div>
          </BentoCell>

          {/* 2 — narrow, Modern Stack */}
          <BentoCell delay={0.06} className="lg:col-span-4 lg:row-span-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Code2 className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">Modern Stack</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Next.js, TypeScript, Tailwind, Node — tools chosen for
              longevity and developer velocity, not hype.
            </p>
          </BentoCell>

          {/* 3 — narrow, SEO-Aware */}
          <BentoCell delay={0.12} className="lg:col-span-3 lg:row-span-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">SEO-Aware</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Every site we build is structured to rank. Performance, semantics,
              and metadata — handled from day one.
            </p>
          </BentoCell>

          {/* 4 — narrow, API-First */}
          <BentoCell delay={0.18} className="lg:col-span-3 lg:row-span-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GitBranch className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">API-First</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              We architect backends as clean, documented APIs from the start —
              so integrations are never an afterthought.
            </p>
          </BentoCell>

          {/* 5 — wide green tint, Scalable Systems */}
          <BentoCell delay={0.24} className="lg:col-span-5 lg:row-span-1" tinted>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Layers className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">Scalable Systems</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Architecture built to grow. What works for 1,000 users should
              work for 100,000 — with only configuration changes.
            </p>
            <div className="mt-6 flex items-end gap-1.5 h-12">
              {[20, 35, 28, 50, 65, 80, 100].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-sm bg-primary/50"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                  style={{ display: "block" }}
                />
              ))}
            </div>
          </BentoCell>

          {/* 6 — narrow, Conversion-Focused */}
          <BentoCell delay={0.3} className="lg:col-span-4 lg:row-span-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MousePointer2 className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">Conversion-Focused UI</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Design decisions are informed by UX research and conversion data —
              not just aesthetics.
            </p>
          </BentoCell>

        </div>
      </div>
    </section>
  );
}

function BentoCell({
  children,
  delay,
  className,
  dark,
  tinted,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  dark?: boolean;
  tinted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={`group rounded-[28px] border p-6 transition-all duration-300 sm:p-7 ${
        dark
          ? "border-white/8 bg-foreground hover:border-primary/30"
          : tinted
          ? "border-primary/15 bg-primary/5 hover:border-primary/40"
          : "border-[#E5E7EB] bg-white shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_50px_-34px_rgba(15,23,42,0.28)]"
      } ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
