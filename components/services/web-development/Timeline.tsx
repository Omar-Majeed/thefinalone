"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We define goals, users, requirements, and the delivery shape before engineering starts.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We align flows, interface direction, and technical decisions so design and engineering move together.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "We build the product in focused iterations with visibility into progress, tradeoffs, and milestones.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "We launch on stable infrastructure, monitor real usage, and prepare the platform for the next stage of growth.",
  },
];

export function Timeline() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Delivery Process</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A vertical workflow that keeps delivery visible from start to finish
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-[#D1D5DB] sm:left-8" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-primary sm:left-8"
          />

          <ol className="space-y-8 sm:space-y-10">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.12 }}
                className="relative pl-16 sm:pl-24"
              >
                <span className="absolute left-0 top-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-primary shadow-[0_12px_24px_-18px_rgba(90,187,74,0.8)] sm:left-[13px]">
                  {step.number}
                </span>

                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] sm:p-7">
                  <p className="text-sm font-semibold text-primary">{step.title}</p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {step.title} with a clear next step
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#6B7280] sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}