"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  "REST & GraphQL APIs",
  "Microservices Architecture",
  "Authentication & Authorization",
  "Payment & Third-party Integrations",
  "Database Design & Optimization",
  "Cloud Deployment",
];

export function FeaturesList() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Capabilities</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Engineering capabilities that cover the full backend lifecycle
          </h2>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          {FEATURES.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
              className="flex items-center gap-4 border-b border-[#EEF2F7] py-3 text-base text-[#374151] sm:text-lg"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
