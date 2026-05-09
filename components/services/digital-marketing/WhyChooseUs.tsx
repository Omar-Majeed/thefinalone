"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROWS = [
  { label: "Full-funnel strategy (not just ads)", us: true,  them: false },
  { label: "Dedicated account strategist",        us: true,  them: false },
  { label: "Custom analytics & attribution",      us: true,  them: false },
  { label: "Monthly strategy reviews",            us: true,  them: true  },
  { label: "Transparent budget reporting",        us: true,  them: false },
  { label: "Creative production included",        us: true,  them: false },
  { label: "No long-term lock-in contracts",      us: true,  them: false },
  { label: "ROI guarantee within 90 days",        us: true,  them: false },
];

export function WhyChooseUs() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Why Choose Us</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The honest difference
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Most agencies run your budget. We build a system that compounds —
            here is what that actually looks like side by side.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_24px_55px_-40px_rgba(15,23,42,0.3)]"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_100px_100px] border-b border-[#E5E7EB] bg-[#F9F9F9] px-6 py-4 sm:grid-cols-[1fr_120px_120px] sm:px-8">
            <div />
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Us
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#9CA3AF]">
                Typical Agency
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
              className={cn(
                "grid grid-cols-[1fr_100px_100px] items-center px-6 py-4 sm:grid-cols-[1fr_120px_120px] sm:px-8",
                i < ROWS.length - 1 && "border-b border-[#F3F4F6]",
                i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]",
              )}
            >
              <p className="text-sm font-medium text-[#374151] sm:text-base">
                {row.label}
              </p>
              <div className="flex justify-center">
                {row.us ? (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                {row.them ? (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6] text-[#D1D5DB]">
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
