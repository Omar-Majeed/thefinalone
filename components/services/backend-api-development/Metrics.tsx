"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const METRICS = [
  { value: "< 200ms", label: "API response" },
  { value: "99.9%", label: "Uptime ready" },
  { value: "End-to-end", label: "Secure auth flows" },
  { value: "Millions", label: "Of requests scale" },
];

export function Metrics() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Performance</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built to perform under real production conditions
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE, delay: index * 0.08 }}
              className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_45px_-30px_rgba(15,23,42,0.25)] sm:p-7"
            >
              <p className="text-3xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-medium text-[#6B7280] sm:text-base">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
