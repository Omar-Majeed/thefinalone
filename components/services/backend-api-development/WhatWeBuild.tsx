"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  "REST APIs",
  "Microservices",
  "Authentication Systems",
  "Payment Integrations",
  "Data Pipelines",
];

export function WhatWeBuild() {
  return (
    <section className="bg-background-alt py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-primary">What we build</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Backend systems built around the way your product runs
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#6B7280] sm:text-base">
            From single-purpose APIs to distributed services, we shape the
            backend around your product, not a template.
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-14">
          {ITEMS.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
              className="group relative cursor-default"
            >
              <span className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
                {item}
              </span>
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
