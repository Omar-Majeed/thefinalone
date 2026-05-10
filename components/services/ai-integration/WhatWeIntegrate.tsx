"use client";

import { motion } from "framer-motion";
import { Brain, Mic, FileSearch, MessageSquare, Eye, Workflow, Cpu, BarChart2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ORBIT_ITEMS = [
  { icon: MessageSquare, label: "LLM Chatbots",       angle: 0   },
  { icon: FileSearch,    label: "Document AI",         angle: 45  },
  { icon: Eye,           label: "Computer Vision",     angle: 90  },
  { icon: BarChart2,     label: "Predictive Analytics",angle: 135 },
  { icon: Workflow,      label: "AI Automation",       angle: 180 },
  { icon: Mic,           label: "Speech & Voice",      angle: 225 },
  { icon: Cpu,           label: "Custom ML Models",    angle: 270 },
  { icon: Brain,         label: "RAG Systems",         angle: 315 },
];

const CAPABILITIES = [
  { title: "LLM Integration",        desc: "GPT-4, Claude, Gemini, and open-source models integrated into your product workflows." },
  { title: "RAG Pipelines",          desc: "Retrieval-augmented generation over your own data — accurate, cited, and hallucination-resistant." },
  { title: "Document Intelligence",  desc: "Extract, classify, and act on data from PDFs, invoices, contracts, and forms at scale." },
  { title: "Computer Vision",        desc: "Image classification, object detection, and visual inspection pipelines for your use case." },
  { title: "AI Automation",          desc: "Replace manual workflows with intelligent agents that reason, decide, and act autonomously." },
  { title: "Predictive Analytics",   desc: "ML models that forecast demand, churn, fraud, and other business-critical outcomes." },
];

export function WhatWeIntegrate() {
  const R = 130; // orbit radius in px

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">What We Build</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Every form of AI, integrated into your stack
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            From language models to computer vision — we connect the right AI
            capability to the right place in your product.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT — orbit visual (desktop) / pill grid (mobile) */}
          <div className="flex items-center justify-center">

            {/* Mobile fallback pill grid */}
            <div className="flex flex-wrap justify-center gap-3 lg:hidden">
              {ORBIT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#4B5563] shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    {item.label}
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop orbit */}
            <div className="relative hidden h-[340px] w-[340px] lg:flex items-center justify-center">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-[#E5E7EB]" />
              <div className="absolute inset-[40px] rounded-full border border-dashed border-primary/20" />

              {/* Centre node */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-foreground shadow-[0_0_40px_rgba(90,187,74,0.3)]"
              >
                <Brain className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">Your Product</span>
              </motion.div>

              {/* Orbit items */}
              {ORBIT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const rad = (item.angle * Math.PI) / 180;
                const x = R * Math.cos(rad);
                const y = R * Math.sin(rad);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                    whileHover={{ scale: 1.15 }}
                    className="absolute flex flex-col items-center gap-1.5 cursor-default"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.2)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_20px_-8px_rgba(90,187,74,0.3)]">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    <span className="w-20 text-center text-[9px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}

              {/* Animated connection lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 340">
                {ORBIT_ITEMS.map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const x2 = 170 + (R - 16) * Math.cos(rad);
                  const y2 = 170 + (R - 16) * Math.sin(rad);
                  return (
                    <motion.line
                      key={i}
                      x1="170" y1="170" x2={x2} y2={y2}
                      stroke="rgba(90,187,74,0.15)"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* RIGHT — capabilities list */}
          <div className="grid gap-4 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                className="group rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_36px_-20px_rgba(90,187,74,0.18)]"
              >
                <div className="h-1 w-8 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
                <h3 className="mt-3 text-base font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#6B7280]">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
