"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { PORTFOLIO_QUOTES } from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClientQuotes() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % PORTFOLIO_QUOTES.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const q = PORTFOLIO_QUOTES[idx];

  return (
    <section className="relative isolate overflow-hidden bg-[#FAFAF8] py-32 text-foreground sm:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(90,187,74,0.04) 0%, rgba(250,250,248,0) 70%)",
        }}
      />

      <div className="container px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
              Client Experience
            </span>
            <div className="flex gap-2">
              {PORTFOLIO_QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Show quote ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === idx ? "w-8 bg-primary" : "w-4 bg-[#D1D5DB]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="space-y-10"
              >
                <p className="text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08]">
                  <span className="text-primary/70">&ldquo;</span>
                  {q.quote}
                  <span className="text-primary/70">&rdquo;</span>
                </p>
                <footer className="flex items-center gap-4">
                  <span aria-hidden className="h-px w-12 bg-primary/60" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {q.author}
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-[#9CA3AF]">
                      {q.role}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
