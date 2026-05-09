"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Target, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const METRICS = [
  { icon: TrendingUp, label: "Organic Traffic Increase", value: 312, suffix: "%", caption: "average across all clients" },
  { icon: Target,     label: "Keywords in Top 10",        value: 1400, suffix: "+", caption: "across active campaigns" },
  { icon: ShieldCheck,label: "Domain Authority Gained",   value: 33,   suffix: " pts", caption: "avg. gain over 12 months" },
];

const BARS = [
  { label: "Q1", pct: 28 },
  { label: "Q2", pct: 47 },
  { label: "Q3", pct: 62 },
  { label: "Q4", pct: 81 },
  { label: "Now", pct: 100 },
];

export function GrowthDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const v0 = useCountUp(312,  inView);
  const v1 = useCountUp(1400, inView);
  const v2 = useCountUp(33,   inView);
  const counts = [v0, v1, v2];

  return (
    <section ref={ref} className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Real Results. Real Data.</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Numbers that speak for themselves
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Average results across our SEO clients measured over a 12-month
            engagement period.
          </p>
        </div>

        {/* Metric cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
                  {counts[i].toLocaleString()}
                  <span className="text-primary">{m.suffix}</span>
                </p>
                <p className="mt-2 text-base font-semibold tracking-tight text-foreground">
                  {m.label}
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">{m.caption}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bar chart card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
          className="mt-6 rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-12">
            <div className="lg:max-w-xs">
              <p className="text-sm font-semibold text-primary">Growth Timeline</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Organic traffic growth over a 12-month period
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                Consistent quarter-over-quarter gains driven by compounding
                content, authority, and technical improvements.
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              {/* DA progress bar */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#6B7280]">Domain Authority</span>
                  <span className="font-semibold text-foreground">28 → 61</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#F3F4F6]">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "81%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-3 h-36 pt-4">
                {BARS.map((bar, i) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-t-xl bg-primary/85"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-xs text-[#9CA3AF]">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
