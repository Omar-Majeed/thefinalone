"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MessageSquare, FileSearch, BarChart2, Workflow, Eye, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const USE_CASES = [
  {
    id: "chatbot",
    icon: MessageSquare,
    title: "AI Support Chatbot",
    summary: "Handle 60–70% of support tickets autonomously.",
    detail: "We build and deploy fine-tuned chatbots trained on your documentation, ticket history, and product knowledge base. The bot handles FAQs, troubleshooting, and escalation routing — so your human team only sees the edge cases.",
    metrics: [
      { label: "Ticket deflection", value: "68%" },
      { label: "Avg. response time", value: "1.2s" },
      { label: "CSAT score", value: "4.7/5" },
    ],
    preview: "chatbot",
  },
  {
    id: "docai",
    icon: FileSearch,
    title: "Document Intelligence",
    summary: "Extract structured data from any document at scale.",
    detail: "Invoices, contracts, forms, medical records — we build extraction pipelines that parse, validate, and route structured data from unstructured documents with 97%+ accuracy, cutting manual processing time by 90%.",
    metrics: [
      { label: "Extraction accuracy", value: "97.4%" },
      { label: "Processing time", value: "< 8s" },
      { label: "Manual effort saved", value: "90%" },
    ],
    preview: "docai",
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Predictive Analytics",
    summary: "Forecast demand, churn, and revenue before it happens.",
    detail: "We train ML models on your historical data to surface predictions that drive real decisions — demand forecasting, churn prediction, inventory optimisation, and fraud detection — all integrated into your existing dashboards.",
    metrics: [
      { label: "Churn prediction accuracy", value: "89%" },
      { label: "Forecast horizon", value: "90 days" },
      { label: "Revenue impact", value: "+23%" },
    ],
    preview: "analytics",
  },
  {
    id: "automation",
    icon: Workflow,
    title: "AI Workflow Automation",
    summary: "Replace repetitive decisions with intelligent agents.",
    detail: "We design agentic AI systems that can reason over tasks, call external APIs, make conditional decisions, and complete multi-step workflows — without human intervention at every step.",
    metrics: [
      { label: "Automation rate", value: "78%" },
      { label: "Error reduction", value: "−64%" },
      { label: "FTE hours saved", value: "40h/wk" },
    ],
    preview: "automation",
  },
  {
    id: "vision",
    icon: Eye,
    title: "Computer Vision",
    summary: "See, classify, and act on visual data automatically.",
    detail: "Quality inspection, product tagging, ID verification, or real-time video analysis — we deploy vision models that process images and video at scale, integrated directly into your production pipeline.",
    metrics: [
      { label: "Detection accuracy", value: "99.1%" },
      { label: "Processing speed", value: "30 FPS" },
      { label: "Defect catch rate", value: "98.6%" },
    ],
    preview: "vision",
  },
  {
    id: "search",
    icon: Search,
    title: "Semantic Search",
    summary: "Search by meaning, not just keywords.",
    detail: "We replace keyword search with embedding-based semantic search — users describe what they need in plain language and the system finds the most relevant results, even when exact words don't match.",
    metrics: [
      { label: "Search relevance", value: "+44%" },
      { label: "Zero-result rate", value: "−71%" },
      { label: "User engagement", value: "+38%" },
    ],
    preview: "search",
  },
];

function PreviewPanel({ id }: { id: string }) {
  const previews: Record<string, React.ReactNode> = {
    chatbot: (
      <div className="space-y-3 p-1">
        {[
          { role: "user", text: "My order hasn't arrived yet" },
          { role: "ai", text: "I can see order #4821 is in transit — estimated delivery is tomorrow by 6 PM. Want me to send a tracking link?" },
          { role: "user", text: "Yes please" },
          { role: "ai", text: "Sent to your email. Is there anything else I can help with?" },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-5",
              msg.role === "user"
                ? "rounded-tr-sm bg-white/10 text-white/70"
                : "rounded-tl-sm border border-primary/20 bg-primary/8 text-white/60"
            )}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    ),
    docai: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Invoice parsed</p>
          {[["Vendor", "Acme Corp"], ["Amount", "$12,480.00"], ["Due date", "Dec 15, 2024"], ["Status", "✓ Validated"]].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-white/5 py-1.5 text-xs">
              <span className="text-white/35">{k}</span>
              <span className={cn("font-medium", v.includes("✓") ? "text-primary" : "text-white/60")}>{v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs text-primary/80">Auto-routed to Accounts Payable</span>
        </div>
      </div>
    ),
    analytics: (
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-widest text-white/25">Churn risk — next 30 days</p>
        <div className="flex items-end gap-1.5 h-24">
          {[12, 18, 14, 28, 22, 35, 42, 38, 51, 48, 62, 58].map((v, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm bg-primary/50"
              initial={{ height: 0 }} animate={{ height: `${v}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }} style={{ minHeight: 2 }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["89%", "Accuracy"], ["312", "At-risk"], ["$48k", "Saved"]].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-white/5 p-2.5 text-center">
              <p className="text-sm font-semibold text-white">{v}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    automation: (
      <div className="space-y-2.5">
        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Agent pipeline</p>
        {[
          { step: "Receive request", status: "done" },
          { step: "Classify intent", status: "done" },
          { step: "Query database", status: "done" },
          { step: "Generate response", status: "active" },
          { step: "Send & log", status: "pending" },
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-3">
            <span className={cn("h-2 w-2 shrink-0 rounded-full",
              s.status === "done" ? "bg-primary" :
                s.status === "active" ? "bg-primary animate-pulse" :
                  "bg-white/15"
            )} />
            <span className={cn("text-xs", s.status === "pending" ? "text-white/25" : "text-white/55")}>
              {s.step}
            </span>
            {s.status === "done" && <span className="ml-auto text-[10px] text-primary/60">✓</span>}
          </div>
        ))}
      </div>
    ),
    vision: (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl bg-white/5 aspect-video flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(90,187,74,0.4) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <div className="relative border-2 border-primary/60 rounded-lg px-6 py-4">
            <p className="text-xs text-primary/80 font-mono">DEFECT DETECTED</p>
            <p className="text-[10px] text-white/40 mt-1">Confidence: 99.1%</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[["Scanned", "1,240"], ["Defects", "8"], ["Rate", "0.6%"]].map(([l, v]) => (
            <div key={l} className="flex-1 rounded-xl bg-white/5 p-2.5 text-center">
              <p className="text-sm font-semibold text-white">{v}</p>
              <p className="text-[9px] text-white/30">{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    search: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
          <Search className="h-3.5 w-3.5 text-white/30" />
          <span className="text-xs text-white/30 italic">contracts with termination clause after 2022...</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-white/25">Semantic matches</p>
        {["Service Agreement — Acme (Mar 2023)", "Vendor Contract — NovaTech (Jul 2022)", "SaaS Terms — CloudPay (Jan 2024)"].map((r, i) => (
          <motion.div key={r} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
          >
            <span className="text-[10px] font-bold text-primary/60">{97 - i * 4}%</span>
            <span className="text-xs text-white/50">{r}</span>
          </motion.div>
        ))}
      </div>
    ),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        {previews[id]}
      </motion.div>
    </AnimatePresence>
  );
}

export function UseCases() {
  const [active, setActive] = useState(0);

  return (
    <section id="ai-usecases" className="relative bg-foreground py-20 sm:py-24 lg:py-28">

      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Use Cases</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What can AI do for your business?
          </h2>
          <p className="mt-4 text-base leading-8 text-white/40 sm:text-lg">
            Select a use case to see a live preview of how we&apos;d build it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Accordion */}
          <div className="space-y-2 min-w-0">
            {USE_CASES.map((uc, i) => {
              const Icon = uc.icon;
              const isOpen = active === i;
              return (
                <motion.div
                  key={uc.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer",
                    isOpen
                      ? "border-primary/30 bg-white/[0.06]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  )}
                  onClick={() => setActive(i)}
                >
                  <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
                    <span className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                      isOpen ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40"
                    )}>
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-base font-semibold transition-colors duration-300", isOpen ? "text-white" : "text-white/60")}>
                        {uc.title}
                      </p>
                      {!isOpen && <p className="mt-0.5 text-sm text-white/30 truncate">{uc.summary}</p>}
                    </div>
                    <ChevronRight className={cn(
                      "h-4 w-4 shrink-0 text-white/30 transition-transform duration-300",
                      isOpen && "rotate-90 text-primary"
                    )} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/8 px-5 pb-5 pt-4 sm:px-6">
                          <p className="text-sm leading-7 text-white/50">{uc.detail}</p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {uc.metrics.map((m) => (
                              <div key={m.label} className="rounded-xl bg-white/5 px-4 py-2.5">
                                <p className="text-lg font-semibold text-white">{m.value}</p>
                                <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Live preview panel */}
          <div className="hidden lg:block">
            <div className="sticky top-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1117] shadow-[0_32px_60px_-20px_rgba(0,0,0,0.7)]">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                  {USE_CASES[active].title}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  live
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <PreviewPanel id={USE_CASES[active].id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
