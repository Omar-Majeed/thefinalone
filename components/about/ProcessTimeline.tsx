"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We immerse ourselves in your business, goals, and constraints. No assumptions — only listening, questioning, and mapping.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "A clear plan with defined milestones, technology choices, and success metrics before a single line of code is written.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Interfaces shaped around your users — tested, iterated, and validated before the build phase begins.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Focused engineering sprints with full visibility. You see progress weekly, not just at the end.",
  },
  {
    number: "05",
    title: "Optimisation",
    description:
      "Performance audits, accessibility checks, SEO validation, and load testing before anything goes live.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Coordinated deployment with monitoring in place from minute one. We stay close through the critical first weeks.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">How We Deliver</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A process built for clarity and quality
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Six stages that every project moves through — with no shortcuts and
            no surprises.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Track line */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#D1D5DB] sm:left-8" />
          {/* Animated fill */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-primary sm:left-8"
          />

          <ol className="space-y-8 sm:space-y-10">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
                className="relative pl-16 sm:pl-24"
              >
                <span className="absolute left-0 top-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-primary shadow-[0_12px_24px_-18px_rgba(90,187,74,0.8)] sm:left-[13px]">
                  {step.number}
                </span>

                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 sm:p-7">
                  <p className="text-sm font-semibold text-primary">{step.title}</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {step.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-base">
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
