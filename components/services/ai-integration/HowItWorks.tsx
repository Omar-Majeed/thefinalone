"use client";

import { motion } from "framer-motion";
import { Search, Compass, Wrench, FlaskConical, Rocket, RefreshCw } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    description: "We map your existing systems, data sources, and workflows to identify exactly where AI delivers the highest ROI.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Architecture",
    duration: "Week 2",
    description: "Model selection, integration design, data pipeline planning, and security review — all documented before a line of code.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Integration",
    duration: "Weeks 3–5",
    description: "We build the connectors, fine-tune the models, and wire everything into your stack with full test coverage.",
  },
  {
    icon: FlaskConical,
    number: "04",
    title: "Evaluation",
    duration: "Week 6",
    description: "Accuracy benchmarking, latency testing, edge case handling, and human-in-the-loop review before going live.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Deployment",
    duration: "Week 7",
    description: "Staged rollout with monitoring, fallback handling, and cost controls in place from day one.",
  },
  {
    icon: RefreshCw,
    number: "06",
    title: "Iteration",
    duration: "Ongoing",
    description: "We monitor model drift, retrain on new data, and expand capabilities as your product grows.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Process</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From zero to production AI in seven weeks
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            A structured pipeline that moves fast without cutting corners on
            accuracy, safety, or maintainability.
          </p>
        </div>

        {/* Desktop horizontal pipeline */}
        <div className="mt-14 hidden lg:block">
          {/* Connector line */}
          <div className="relative mx-auto mb-8 flex items-center justify-between px-8">
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-[#E5E7EB]" />
            <motion.div
              className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 origin-left bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-white shadow-[0_8px_24px_-12px_rgba(90,187,74,0.7)]"
                >
                  <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                </motion.div>
              );
            })}
          </div>

          {/* Cards below nodes */}
          <div className="grid grid-cols-6 gap-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.3 + i * 0.08 }}
                className="group rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {step.duration}
                </span>
                <p className="mt-3 text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-2 text-xs leading-5 text-[#6B7280]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical list */}
        <div className="mt-10 space-y-4 lg:hidden">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                className="flex gap-4 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.2)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-foreground">{step.title}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{step.duration}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[#6B7280]">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
