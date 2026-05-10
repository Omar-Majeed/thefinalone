"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const COMPARISONS = [
  {
    area: "Customer Support",
    before: { stat: "14 min",  label: "avg. response time",    note: "Human agent queue" },
    after:  { stat: "1.2s",    label: "avg. response time",    note: "AI-first resolution" },
  },
  {
    area: "Document Processing",
    before: { stat: "4 min",   label: "per invoice",           note: "Manual data entry" },
    after:  { stat: "8s",      label: "per invoice",           note: "Automated extraction" },
  },
  {
    area: "Churn Prevention",
    before: { stat: "Reactive", label: "intervention timing",  note: "Noticed after churn" },
    after:  { stat: "30 days",  label: "early warning",        note: "Predicted in advance" },
  },
  {
    area: "Search Relevance",
    before: { stat: "38%",     label: "query success rate",    note: "Keyword matching" },
    after:  { stat: "82%",     label: "query success rate",    note: "Semantic understanding" },
  },
];

export function ResultsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Half-and-half background */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="bg-[#F3F4F6]" />
        <div className="bg-foreground" />
      </div>

      <div className="container relative z-10 px-6">
        {/* Header — sits centered over the split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="inline-flex overflow-hidden rounded-full border border-[#E5E7EB]">
            <span className="bg-[#F3F4F6] px-6 py-2 text-sm font-semibold text-[#6B7280]">Without AI</span>
            <span className="bg-foreground px-6 py-2 text-sm font-semibold text-white">With AI</span>
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The difference is measurable
          </h2>
        </motion.div>

        {/* Comparison rows */}
        <div className="space-y-4">
          {COMPARISONS.map((row, i) => (
            <motion.div
              key={row.area}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-px overflow-hidden rounded-[20px]"
            >
              {/* Before */}
              <div className="flex flex-col items-end gap-1 rounded-l-[20px] bg-[#F3F4F6] px-6 py-5 sm:px-8">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FEE2E2]">
                    <X className="h-3 w-3 text-[#EF4444]" strokeWidth={2.5} />
                  </span>
                  <span className="text-2xl font-semibold text-[#6B7280] sm:text-3xl">{row.before.stat}</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">{row.before.label}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#D1D5DB]">{row.before.note}</p>
              </div>

              {/* Center label */}
              <div className="bg-white px-3 py-5 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF] [writing-mode:vertical-rl]">
                  {row.area}
                </p>
              </div>

              {/* After */}
              <div className="flex flex-col items-start gap-1 rounded-r-[20px] bg-white/[0.05] px-6 py-5 sm:px-8">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                  </span>
                  <span className="text-2xl font-semibold text-white sm:text-3xl">{row.after.stat}</span>
                </div>
                <p className="text-xs text-white/40">{row.after.label}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/20">{row.after.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
