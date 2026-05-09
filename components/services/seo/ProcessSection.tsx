"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your current site, competitors, and target keywords to build a clear picture of opportunities. No assumptions — only data and verified findings.",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    description:
      "A custom 90-day SEO roadmap tailored to your business goals and industry. You will know exactly what we are doing, when, and why.",
  },
  {
    number: "03",
    title: "On-Page Optimization",
    description:
      "We optimize every page — titles, meta descriptions, content, internal links, and schema markup. The technical foundation that search engines reward.",
  },
  {
    number: "04",
    title: "Authority Building",
    description:
      "Targeted outreach and content marketing to earn high-quality backlinks. We build domain trust one quality link at a time.",
  },
  {
    number: "05",
    title: "Monitor & Scale",
    description:
      "Monthly reporting, algorithm update tracking, and continuous iteration. SEO is a long game and we stay in it with you for the long run.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Process</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A proven SEO workflow built for measurable, lasting results
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Static track line */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#D1D5DB] sm:left-8" />
          {/* Animated fill line */}
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
                {/* Step number badge */}
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
