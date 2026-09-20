"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Six real questions we get before every backend engagement. Answers are
 * intentionally opinionated — buyers get more from a clear stance than from
 * "it depends" hedging.
 *
 * These live in initial DOM (not deferred) so Google and LLM crawlers can
 * index them without executing JavaScript. Interaction only toggles the
 * visible expand animation.
 */
const FAQS = [
  {
    q: "Who owns the code we build?",
    a: "You do. Every line ships into your Git organisation from day one, licensed to you outright — no royalty, no rug-pull. Any third-party dependencies are permissively licensed (MIT / Apache-2.0 / BSD); we call out anything else before we introduce it.",
  },
  {
    q: "Do you work with our existing team, or do you take over?",
    a: "Both patterns work. We can drop in as an embedded team that pairs with your engineers (recommended when internal capacity is the bottleneck) or ship a self-contained service that your team runs after handoff. We're explicit about the model in the discovery brief.",
  },
  {
    q: "What does a typical backend project cost?",
    a: "Discovery sprints are AUD $4k–$8k depending on scope. Fixed-scope builds usually land between AUD $18k and $60k for a well-defined API or service. Retainers start at a 20-hour-per-month floor. Every quote is bounded by the discovery-phase output, so you never sign a blank cheque.",
  },
  {
    q: "How do you handle security and data protection?",
    a: "Every backend we ship starts with parameterised queries, secrets in a managed store (never in Git), HTTPS-only ingress, rate limits on public endpoints, and structured audit logs. For regulated workloads we add role-based access controls, encryption at rest, PII redaction in logs, and a documented threat model.",
  },
  {
    q: "What's your on-call and incident response commitment?",
    a: "Under retainer we offer a business-hours SLA (2h response, 8h resolution target) by default, and a 24/7 SLA on request. Post-incident, you get a written retrospective with the root cause, timeline, and prevention plan — usually within 3 business days.",
  },
  {
    q: "Can you migrate us off a legacy backend without downtime?",
    a: "Yes. The pattern is a strangler proxy: new endpoints ship behind a routing layer that gradually shifts traffic from the legacy service to the new one, feature by feature. We do a dual-write phase for stateful cutovers so rollback stays possible until you're confident. Zero-downtime cutovers are the default, not the exception.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold text-primary">FAQ</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Answers before you ask
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6B7280] sm:text-base">
            The six questions we hear most often. If yours isn&apos;t here,{" "}
            <a
              href="/contact"
              className="text-primary underline-offset-4 hover:underline"
            >
              send it over
            </a>
            .
          </p>
        </div>

        <ul className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
          {FAQS.map((f, i) => {
            const open = openIndex === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className="flex-1 text-base font-semibold text-foreground sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition-colors group-hover:border-primary/60 group-hover:text-primary"
                  >
                    {open ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="pb-6 pr-12 text-sm leading-7 text-[#6B7280]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
