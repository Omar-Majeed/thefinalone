"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, PackageCheck, Repeat } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const MODELS = [
  {
    id: "discovery",
    icon: Compass,
    name: "Discovery sprint",
    duration: "2–3 weeks",
    fit: "Best when the requirements are still fluid.",
    deliverables: [
      "Data model + API surface written up in one place",
      "Non-functional targets: throughput, latency, RPO/RTO",
      "Fixed-scope quote for the build phase",
      "Runnable proof-of-concept for the highest-risk path",
    ],
    cta: "Start with discovery",
  },
  {
    id: "fixed",
    icon: PackageCheck,
    name: "Fixed-scope build",
    duration: "4–12 weeks",
    fit: "Best when the scope is defined and you want a fixed price.",
    featured: true,
    deliverables: [
      "Production-grade codebase in your Git org, with tests + CI",
      "Deployed to a staging environment on day one",
      "Weekly stakeholder demos; feature-flagged rollouts",
      "30 days of post-launch bug-fix support included",
    ],
    cta: "Scope a build",
  },
  {
    id: "retainer",
    icon: Repeat,
    name: "Retainer",
    duration: "Ongoing, monthly",
    fit: "Best when the backend is live and you want a partner on-hand.",
    deliverables: [
      "Reserved engineering hours per month, roll-over up to 25%",
      "Incident response SLA, on-call rotation available",
      "Quarterly architecture review + roadmap alignment",
      "Direct Slack Connect / Discord / Teams channel",
    ],
    cta: "Start a retainer",
  },
];

export function EngagementModels() {
  return (
    <section id="engagement-models" className="bg-background-alt py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Engagement models</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Three ways to work with us
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
            Every project needs a different envelope. We&apos;ll recommend the
            one that fits after a short call — the important thing is that the
            envelope is clear before we start.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MODELS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className={
                  "relative flex flex-col rounded-2xl border p-8 " +
                  (m.featured
                    ? "border-primary/40 bg-primary/[0.04] shadow-[0_20px_60px_-30px_rgba(90,187,74,0.35)]"
                    : "border-foreground/10 bg-background")
                }
              >
                {m.featured && (
                  <span className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Most common
                  </span>
                )}
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  {m.duration}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">{m.fit}</p>

                <ul className="mt-6 space-y-2.5 text-sm leading-6 text-foreground/80">
                  {m.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {m.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
