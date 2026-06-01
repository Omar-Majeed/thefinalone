"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  Cloud,
  Code2,
  Smartphone,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

const CAPABILITIES: Capability[] = [
  {
    title: "Frontend Engineering",
    description:
      "Production-grade interfaces tuned for clarity, motion and speed.",
    icon: Code2,
    items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    title: "Backend Systems",
    description:
      "Resilient services and APIs built to scale with the business.",
    icon: Boxes,
    items: ["Node.js", "Python", "Java", "Spring Boot", "GraphQL"],
  },
  {
    title: "Mobile Development",
    description:
      "Native-feeling apps shipped across iOS, Android and web.",
    icon: Smartphone,
    items: ["React Native", "Flutter", "iOS", "Android", "Expo"],
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Edge-first delivery, observability and zero-downtime deploys.",
    icon: Cloud,
    items: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    title: "AI & Agents",
    description:
      "LLM systems, retrieval pipelines and multi-step autonomous workflows.",
    icon: Brain,
    items: ["OpenAI", "Anthropic", "LangGraph", "CrewAI", "Vector DBs"],
  },
  {
    title: "Automation & Integrations",
    description:
      "Event-driven plumbing that quietly removes manual work.",
    icon: Workflow,
    items: ["Webhooks", "Zapier", "n8n", "Temporal", "Custom ETL"],
  },
];

export function TechCapabilities() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-28 text-foreground sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(90,187,74,0.05) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
            Technology Capabilities
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The stack behind{" "}
            <span className="text-[#9CA3AF]">every project we ship.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#6B7280]">
            We&apos;re technology-agnostic. We pick the tools that match the
            problem — and we go deep on the ones we choose.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <motion.article
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(90,187,74,0.35)] sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(70% 60% at 50% 0%, rgba(90,187,74,0.12) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary shadow-[0_10px_24px_-14px_rgba(90,187,74,0.6)]">
                  <cap.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {cap.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex rounded-full border border-[#E5E7EB] bg-[#F9F9F9] px-3 py-1 text-xs font-medium text-[#4B5563] transition-all duration-300 group-hover:border-primary/30 hover:bg-primary/5 hover:text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
