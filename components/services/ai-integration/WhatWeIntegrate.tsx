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

          {/* LEFT — capabilities list */}
          <div className="order-2 lg:order-1 grid gap-4 sm:grid-cols-2">
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

          {/* RIGHT — professional live visual */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center overflow-hidden">
              {/* Background glows */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,187,74,0.08)_0%,transparent_70%)]" />
              
              {/* Central Core */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" }
                }}
                className="relative z-10 flex h-32 w-32 items-center justify-center"
              >
                {/* Rotating Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
                <div className="absolute inset-2 rounded-full border border-primary/10" />
                
                {/* Inner Core */}
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-foreground shadow-[0_0_50px_rgba(90,187,74,0.4)]">
                  <Cpu className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Data Particles & Integration Points */}
              {ORBIT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const angle = (item.angle * Math.PI) / 180;
                const radius = 160;
                const x = Number((radius * Math.cos(angle)).toFixed(3));
                const y = Number((radius * Math.sin(angle)).toFixed(3));

                return (
                  <div 
                    key={item.label}
                    className="absolute flex flex-col items-center gap-2"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    {/* Connection Line with animated dash */}
                    <svg className="absolute top-1/2 left-1/2 -z-10 h-[200px] w-[200px]" 
                         style={{ transform: `translate(-50%, -50%) rotate(${item.angle + 180}deg)`, width: radius, left: -radius/2, overflow: 'visible' }}>
                      <motion.line
                        x1="0" y1="0" x2={radius} y2="0"
                        stroke="url(#line-grad)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [-20, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <defs>
                        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(90,187,74,0.4)" />
                          <stop offset="100%" stopColor="rgba(90,187,74,0)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(90,187,74,0.2)]">
                        <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                      </div>
                      
                      {/* Floating Particles flowing to core */}
                      <motion.div
                        animate={{ 
                          x: [-x, 0], 
                          y: [-y, 0],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: i * 0.4,
                          ease: "easeIn"
                        }}
                        className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-primary blur-[1px]"
                      />
                    </motion.div>
                    
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-[#9CA3AF] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:opacity-100">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
