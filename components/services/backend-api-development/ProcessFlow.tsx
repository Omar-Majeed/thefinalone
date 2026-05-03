"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  PenTool,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS: { label: string; icon: LucideIcon }[] = [
  { label: "Design", icon: PenTool },
  { label: "Develop", icon: Code2 },
  { label: "Test", icon: ShieldCheck },
  { label: "Deploy", icon: Cloud },
  { label: "Scale", icon: TrendingUp },
];

export function ProcessFlow() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Development Process</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A clear backend delivery flow from design to scale
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden border-t border-dashed border-[#D1D5DB] lg:block"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, ease: EASE, delay: index * 0.1 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-foreground shadow-[0_18px_30px_-22px_rgba(15,23,42,0.3)] transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280] transition-colors duration-300 group-hover:text-primary">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {step.label}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
