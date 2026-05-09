"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return count;
}

const STATS = [
  {
    value: 4.8, suffix: "x",   prefix: "",  label: "Average ROAS",
    sub: "Return on ad spend across paid campaigns",
    size: "lg",
  },
  {
    value: 42,  suffix: "%",   prefix: "",  label: "Email open rate",
    sub: "Avg. open rate — 3× industry benchmark",
    size: "sm",
  },
  {
    value: 120, suffix: "k+",  prefix: "",  label: "Leads generated",
    sub: "Qualified leads across all client accounts",
    size: "sm",
  },
  {
    value: 68,  suffix: "%",   prefix: "",  label: "CPL improvement",
    sub: "Clients see lower CPL within first 90 days",
    size: "sm",
  },
  {
    value: 340, suffix: "+",   prefix: "",  label: "Campaigns launched",
    sub: "Across paid, email, social, and content",
    size: "lg",
  },
];

export function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const c0 = useCountUp(48, inView);   // 4.8 → displayed as c0/10
  const c1 = useCountUp(42, inView);
  const c2 = useCountUp(120, inView);
  const c3 = useCountUp(68, inView);
  const c4 = useCountUp(340, inView);
  const counts = [c0, c1, c2, c3, c4];

  return (
    <section ref={ref} className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Results We Deliver</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Numbers behind the strategies
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Averaged across active client accounts over a 12-month period.
          </p>
        </div>

        {/* Editorial stat layout — asymmetric two-row grid */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-[#E5E7EB] overflow-hidden rounded-[28px] border border-[#E5E7EB] shadow-[0_22px_50px_-38px_rgba(15,23,42,0.2)] sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">

          {/* ROAS — spans 2 rows on lg */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="bg-foreground px-8 py-10 sm:row-span-2 flex flex-col justify-between"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/30">
              Average ROAS
            </p>
            <div>
              <p className="text-8xl font-semibold tracking-tight text-white leading-none">
                {(counts[0] / 10).toFixed(1)}
                <span className="text-primary text-5xl">x</span>
              </p>
              <p className="mt-4 text-sm leading-7 text-white/40">
                Return on ad spend across all paid campaigns
              </p>
            </div>
            <div className="h-px bg-white/10" />
          </motion.div>

          {/* Email open rate */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="bg-white px-7 py-8 flex flex-col justify-between"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              Email open rate
            </p>
            <div>
              <p className="text-5xl font-semibold tracking-tight text-foreground">
                {counts[1]}
                <span className="text-primary">%</span>
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">3× industry average</p>
            </div>
          </motion.div>

          {/* Leads generated */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
            className="bg-white px-7 py-8 flex flex-col justify-between"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              Leads generated
            </p>
            <div>
              <p className="text-5xl font-semibold tracking-tight text-foreground">
                {counts[2]}
                <span className="text-primary">k+</span>
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">Across all accounts</p>
            </div>
          </motion.div>

          {/* CPL improvement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
            className="bg-primary/5 border-t border-[#E5E7EB] px-7 py-8 flex flex-col justify-between"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              CPL improvement
            </p>
            <div>
              <p className="text-5xl font-semibold tracking-tight text-foreground">
                {counts[3]}
                <span className="text-primary">%</span>
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">Within first 90 days</p>
            </div>
          </motion.div>

          {/* Campaigns */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="bg-white border-t border-[#E5E7EB] px-7 py-8 flex flex-col justify-between"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              Campaigns launched
            </p>
            <div>
              <p className="text-5xl font-semibold tracking-tight text-foreground">
                {counts[4]}
                <span className="text-primary">+</span>
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">Paid, email, social & content</p>
            </div>
          </motion.div>

        </div>

        <p className="mt-6 text-center text-sm text-[#9CA3AF]">
          * Averaged across active client accounts over a 12-month engagement period
        </p>
      </div>
    </section>
  );
}
