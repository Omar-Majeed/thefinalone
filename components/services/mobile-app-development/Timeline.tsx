"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Product Discovery",
    description:
      "We define the product scope, target users, technical constraints, and delivery priorities before design and engineering start.",
  },
  {
    number: "02",
    title: "UX/UI Design",
    description:
      "We shape user flows, interface states, and mobile interactions that support both activation and long-term retention.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build the application in focused iterations with visibility into milestones, integrations, and quality checkpoints.",
  },
  {
    number: "04",
    title: "Testing & Optimization",
    description:
      "We validate performance, fix device-specific issues, and harden the app before it reaches production users.",
  },
  {
    number: "05",
    title: "App Store Launch",
    description:
      "We prepare the release, handle submission requirements, and support a cleaner handoff into post-launch growth.",
  },
];

export function Timeline() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Delivery Process</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A mobile delivery workflow built for quality before launch day
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-[#D1D5DB] sm:left-8" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-primary sm:left-8"
          />

          <ol className="space-y-8 sm:space-y-10">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.1 }}
                className="relative pl-16 sm:pl-24"
              >
                <span className="absolute left-0 top-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-primary shadow-[0_12px_24px_-18px_rgba(90,187,74,0.8)] sm:left-[13px]">
                  {step.number}
                </span>

                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] sm:p-7">
                  <p className="text-sm font-semibold text-primary">{step.title}</p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {step.title}
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