"use client";

import { motion } from "framer-motion";
import {
  Search, PenTool, GitBranch,
  Palette, MousePointer, FlaskConical,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Research",
    desc: "User interviews, competitive audits, and analytics review to build an evidence-backed foundation.",
    scale: 1,
  },
  {
    icon: PenTool,
    number: "02",
    title: "Wireframing",
    desc: "Low-fidelity structures that validate layout, hierarchy, and content strategy before visual design begins.",
    scale: 0.95,
  },
  {
    icon: GitBranch,
    number: "03",
    title: "User Flows",
    desc: "Mapping every decision point and pathway to eliminate friction and create intuitive navigation.",
    scale: 1.02,
  },
  {
    icon: Palette,
    number: "04",
    title: "Visual Design",
    desc: "Pixel-perfect interfaces with cohesive color, typography, and spacing systems that feel premium.",
    scale: 0.97,
  },
  {
    icon: MousePointer,
    number: "05",
    title: "Interaction Design",
    desc: "Micro-interactions, transitions, and motion design that make every action feel intentional and responsive.",
    scale: 1,
  },
  {
    icon: FlaskConical,
    number: "06",
    title: "Testing & Refinement",
    desc: "Usability testing with real users, accessibility audits, and iterative refinement until every detail is right.",
    scale: 0.96,
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-[#F4F1EC] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" />
            Our Process
            <span className="h-px w-6 bg-primary" />
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            Six stages from insight to impact
          </h2>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            A cinematic design process that transforms research into experiences
            users remember.
          </p>
        </motion.div>

        {/* ── Desktop: flowing islands with connectors ── */}
        <div className="relative mx-auto mt-16 hidden max-w-6xl lg:block">
          {/* SVG connector lines */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 16.6% 50%, Q 25% 30%, 33.3% 50%, Q 41.6% 70%, 50% 50%, Q 58.3% 30%, 66.6% 50%, Q 75% 70%, 83.3% 50%"
              fill="none"
              stroke="rgba(90,187,74,0.15)"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE }}
            />
          </svg>

          <div className="grid grid-cols-3 gap-x-8 gap-y-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isOffset = i % 2 !== 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                  className={`relative ${isOffset ? "mt-12" : ""}`}
                  style={{ transform: `scale(${step.scale})` }}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group rounded-[24px] border border-[#E5E5E0] bg-white p-6 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] transition-colors duration-300 hover:border-primary/30 hover:shadow-[0_20px_48px_-16px_rgba(90,187,74,0.12)]"
                  >
                    {/* Step number badge */}
                    <span className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-[11px] font-bold text-white shadow-md">
                      {step.number}
                    </span>

                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6] text-gray-500 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-[#111827]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                className="flex items-start gap-4 rounded-[20px] border border-[#E5E5E0] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5E5E0] bg-white shadow-sm">
                  <Icon className="h-5 w-5 text-gray-500" strokeWidth={2} />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[9px] font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#111827]">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
