"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUGGESTED = [
  "Can AI reduce our support costs?",
  "We want to automate document processing",
  "Add AI search to our platform",
  "Build a custom chatbot for our product",
];

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-[#0a1a0f] py-20 sm:py-24 lg:py-28">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl"
        >
          {/* Conversation framing */}
          <div className="mb-8 space-y-3">
            {/* Their question */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="flex justify-end"
            >
              <div className="max-w-xs rounded-2xl rounded-tr-sm bg-white/8 px-5 py-3 text-sm text-white/60">
                What could AI actually do for our business?
              </div>
            </motion.div>

            {/* Our answer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="text-[10px] font-bold">AI</span>
              </div>
              <div className="max-w-md rounded-2xl rounded-tl-sm border border-primary/20 bg-primary/8 px-5 py-3 text-sm text-white/60">
                That depends on your workflows — but we&apos;ve consistently found
                three areas where the ROI is immediate: support automation,
                document processing, and predictive analytics. Let&apos;s talk
                about which fits you best.
              </div>
            </motion.div>
          </div>

          {/* Main CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:p-10"
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary">
              Free AI Readiness Audit
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start the conversation
            </h2>

            <p className="mt-4 text-base leading-8 text-white/40">
              Tell us one thing you want AI to handle in your product. We&apos;ll
              show you exactly how we&apos;d build it — free, within 48 hours, no
              obligation.
            </p>

            {/* Suggested prompts */}
            <div className="mt-6 flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <Link
                  key={s}
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-white/80"
                >
                  {s}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                  "border border-[#D1D5DB] bg-white px-8 py-3.5 text-sm font-semibold text-foreground",
                  "transition-colors duration-300 hover:text-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1a0f]",
                )}
              >
                <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Book a Free AI Audit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/20">
              No commitment &middot; Audit delivered in 48 hours &middot; No sales pitch
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
