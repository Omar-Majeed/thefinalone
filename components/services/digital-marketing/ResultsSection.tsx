"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;


export function ResultsSection() {
  const counts = [48, 42, 120, 68, 340];

  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
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
