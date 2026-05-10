"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROMPTS = [
  {
    user: "How can AI reduce our customer support load?",
    ai: "We can deploy a fine-tuned support agent trained on your docs and ticket history. Based on similar deployments, expect 60–70% of tier-1 tickets handled autonomously within the first 30 days.",
  },
  {
    user: "Can you automate our invoice processing pipeline?",
    ai: "Yes — using document AI with OCR and an extraction model, we can parse, validate, and route invoices with 97%+ accuracy. Average processing time drops from 4 minutes to under 8 seconds.",
  },
  {
    user: "We want to add AI search to our platform.",
    ai: "We'd build semantic search using embeddings over your content. Users describe what they need in plain language — the system understands intent, not just keywords. Integration takes 2–3 weeks.",
  },
];

function TypewriterText({ text, speed = 18, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [text]);

  useEffect(() => {
    if (idx >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => {
      setDisplayed((p) => p + text[idx]);
      setIdx((p) => p + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [idx, text, speed, onDone]);

  return (
    <span>
      {displayed}
      {idx < text.length && (
        <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-primary" />
      )}
    </span>
  );
}

export function HeroSection() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [phase, setPhase] = useState<"user" | "ai" | "pause">("user");
  const [showAi, setShowAi] = useState(false);

  const current = PROMPTS[promptIdx];

  useEffect(() => {
    if (phase === "pause") {
      const t = setTimeout(() => {
        setShowAi(false);
        setPhase("user");
        setPromptIdx((p) => (p + 1) % PROMPTS.length);
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <section className="relative isolate overflow-hidden bg-foreground py-24 sm:py-28 lg:py-32">
      {/* Grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      {/* Glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="container px-6">
        {/* Top label */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            AI Services Integration
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
        >
          Embed intelligence into{" "}
          <span className="text-primary">every layer</span>{" "}
          of your product
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-8 text-white/50 sm:text-lg"
        >
          We integrate large language models, computer vision, and ML pipelines
          directly into your existing systems — so AI becomes a capability, not
          a side project.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
              "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
              "hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
            )}
          >
            Start an AI Project
          </Link>
          <Link href="#ai-usecases"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
          >
            See use cases
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
          className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1117] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
        >
          {/* Terminal bar */}
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/20">
              <Terminal className="h-3.5 w-3.5" />
              ai-assistant
            </div>
            <span className="flex items-center gap-1.5 text-[10px] text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              connected
            </span>
          </div>

          {/* Chat area */}
          <div className="min-h-[200px] space-y-4 p-5 sm:p-6">
            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-white/8 px-4 py-3 text-sm text-white/70">
                {phase === "user" ? (
                  <TypewriterText
                    key={`user-${promptIdx}`}
                    text={current.user}
                    speed={22}
                    onDone={() => { setShowAi(true); setPhase("ai"); }}
                  />
                ) : (
                  current.user
                )}
              </div>
            </div>

            {/* AI response */}
            {showAi && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-white/60">
                  {phase === "ai" ? (
                    <TypewriterText
                      key={`ai-${promptIdx}`}
                      text={current.ai}
                      speed={14}
                      onDone={() => setPhase("pause")}
                    />
                  ) : (
                    current.ai
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-3 border-t border-white/8 px-5 py-4">
            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/20">
              Ask about your use case...
            </div>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary/90">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
