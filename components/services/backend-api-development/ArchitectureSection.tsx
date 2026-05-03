"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  { label: "Client", description: "Web app · Mobile app" },
  { label: "API", description: "Gateway · Routing · Auth" },
  { label: "Services", description: "Business logic · Workers" },
  { label: "DB", description: "PostgreSQL · MongoDB" },
];

export function ArchitectureSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-xl"
          >
            <span className="text-sm font-semibold text-primary">Architecture</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Designed for scale. Built for reliability.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              We design backend architectures around clear service boundaries,
              predictable data flow, and operational stability. The result is a
              platform that handles growth in traffic and complexity without
              forcing the team to rebuild every few quarters.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-[#374151] sm:text-base">
              {[
                "Service boundaries that fit the product, not the framework",
                "Cleaner data flow and observability from day one",
                "Operational decisions made with growth in mind",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="rounded-[28px] border border-[#E5E7EB] bg-[#0F172A] p-6 text-white shadow-[0_30px_60px_-40px_rgba(15,23,42,0.4)] sm:p-8"
          >
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-white/55">
              <span>Request flow</span>
              <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">
                200 OK
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {NODES.map((node, index) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: EASE, delay: index * 0.1 }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-lg font-semibold text-white">{node.label}</p>
                  <p className="mt-2 text-sm text-white/60">{node.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0B1220]/80 p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/50">
                <span>Throughput</span>
                <span className="text-primary">+24%</span>
              </div>
              <div className="mt-4 flex h-16 items-end gap-2">
                {[34, 50, 46, 64, 58, 78, 70, 84].map((value, index) => (
                  <motion.span
                    key={`${value}-${index}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.3 + index * 0.05 }}
                    style={{ height: `${value}%` }}
                    className="flex-1 origin-bottom rounded-t-full bg-primary/85"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
