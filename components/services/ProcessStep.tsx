"use client";

import { motion } from "framer-motion";
import type { ProcessItem } from "@/constants/services-page";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProcessStep({
  step,
  index,
}: {
  step: ProcessItem;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.12 }}
      className="relative list-none"
    >
      <div className="relative z-10 flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)] sm:p-7">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(90,187,74,0.95)]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-base">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}