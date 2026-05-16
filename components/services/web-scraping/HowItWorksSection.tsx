"use client";

import { motion } from "framer-motion";
import { Search, BrainCircuit, Filter, AlignLeft, Send } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { number: "01", icon: Search,       title: "Source Analysis",  desc: "We map the target site's architecture, APIs, and anti-scraping defences before writing a single line."           },
  { number: "02", icon: BrainCircuit, title: "Extraction Logic",  desc: "Custom scrapers navigate pagination, JS rendering, logins, and dynamic content — reliably, at any depth."        },
  { number: "03", icon: Filter,        title: "Data Cleaning",    desc: "Duplicates removed, missing fields flagged, encodings normalised, and outliers caught before delivery."           },
  { number: "04", icon: AlignLeft,     title: "Structuring",      desc: "Every record is cast to your agreed schema — typed, validated with Pydantic or Zod, and ready to query."         },
  { number: "05", icon: Send,          title: "Delivery",         desc: "Pushed to your API endpoint, database, S3 bucket, or file destination on your schedule, with delivery receipts." },
];

export function HowItWorksSection() {
  return (
    <section id="scraping-pipeline" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">The Extraction Pipeline</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Five stages from URL to clean data
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            A precise, battle-tested process that transforms chaotic web
            sources into schema-valid, ready-to-use datasets.
          </p>
        </div>

        {/* ── Desktop: zigzag node layout ── */}
        <div className="relative mx-auto mt-16 hidden max-w-5xl lg:block">
          {/* Animated connector rail */}
          <div className="absolute left-0 right-0 top-10 h-px bg-slate-200" />
          <motion.div
            className="absolute left-0 top-10 h-px origin-left bg-primary/50"
            style={{ right: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          <div className="flex justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isUp = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: isUp ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.12 }}
                  className={`flex w-[18%] flex-col items-center text-center ${isUp ? "-mt-0" : "mt-20"}`}
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#E5E7EB] bg-white shadow-[0_12px_32px_-12px_rgba(15,23,42,0.18)] transition-colors duration-300 hover:border-primary/50"
                  >
                    <Icon className="h-7 w-7 text-[#6B7280] transition-colors duration-300 group-hover:text-primary" strokeWidth={1.8} />
                    {/* Step badge */}
                    <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-white shadow-md">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <div className={`mt-5 ${isUp ? "" : ""}`}>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#6B7280] px-1">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: vertical card list ── */}
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
                className="flex items-start gap-4 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)]"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
                  <Icon className="h-5 w-5 text-[#6B7280]" strokeWidth={2} />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold text-white">
                    {step.number}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
