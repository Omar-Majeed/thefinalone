"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Database, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── scrolling data rows that act as the page texture ── */
const ROWS = [
  ["product_name","price","in_stock","rating","sku","last_updated"],
  ["MacBook Pro M4","$2,499","true","4.8","MBP-M4-16","2024-11-14"],
  ["Dell XPS 15","$1,799","true","4.6","XPS-9530","2024-11-14"],
  ["company","revenue","employees","founded","hq","funding"],
  ["Stripe","$14.4B","8,000+","2010","San Francisco","$2.3B"],
  ["NovaTech Inc","$4.2M","38","2018","Austin","Series A"],
  ["title","source","published","sentiment","category","url"],
  ["Fed holds rates","Reuters","2024-11-14","neutral","finance","reuters.com/..."],
  ["AI spending up 40%","FT","2024-11-13","positive","tech","ft.com/..."],
  ["ticker","price","pe_ratio","volume","52w_high","analyst"],
  ["NVDA","$138.42","64.2","42.1M","$140.76","Buy"],
  ["AAPL","$229.00","34.8","51.3M","$237.23","Hold"],
];

function DataTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fade masks */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/0 via-white/55 to-white" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-transparent to-white" />

      {ROWS.map((row, ri) => (
        <motion.div
          key={ri}
          className="absolute flex items-center gap-2 whitespace-nowrap"
          style={{ top: `${(ri / ROWS.length) * 100}%` }}
          animate={{ x: ri % 2 === 0 ? ["0%", "-25%"] : ["-20%", "5%"] }}
          transition={{
            duration: 35 + ri * 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        >
          {row.map((cell, ci) => (
            <span
              key={ci}
              className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] leading-none",
                ci === 0
                  ? "border-primary/25 bg-primary/6 text-primary/50 font-semibold"
                  : "border-slate-200 bg-white/80 text-slate-400"
              )}
            >
              {cell}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    /*
      Background: warm white — never used as a hero bg across the site.
      No dark overlay. No grid texture. No green glow blur.
      The data rows ARE the visual atmosphere.
    */
    <section className="relative min-h-[94vh] overflow-hidden bg-white pt-32 pb-20 flex items-center sm:pt-36">
      <DataTexture />

      <div className="container relative z-20 px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-primary shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Web Scraping &amp; Data Extraction
            </span>
          </motion.div>

          {/* Headline — no centering, strong left-anchored editorial feel */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="mt-7 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem] lg:leading-[1.04]"
          >
            Turn any website
            <br />
            into{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">structured data</span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/25"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            className="mt-6 max-w-lg text-base leading-8 text-[#4B5563] sm:text-lg"
          >
            Production-grade scraping pipelines that extract, clean, and
            deliver web data at scale — reliably, legally, and without
            maintenance overhead on your team.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {[
              { icon: Zap,         label: "Real-time extraction"  },
              { icon: Database,    label: "Structured JSON / CSV" },
              { icon: ShieldCheck, label: "Anti-block & proxy"    },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white",
                "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              Start Extracting Data
            </Link>
            <Link
              href="#scraping-pipeline"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              See how it works
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.56 }}
            className="mt-12 flex flex-wrap gap-10 border-t border-slate-100 pt-8"
          >
            {[
              { value: "50M+",  label: "Records extracted monthly" },
              { value: "99.7%", label: "Pipeline uptime SLA"       },
              { value: "<2s",   label: "Avg. page extraction time"  },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="relative mx-auto hidden h-[400px] w-full max-w-[500px] lg:block"
          >
            <ScrapingVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScrapingVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-4 top-10 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.15)] backdrop-blur"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86EFAC]" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Extraction Task
          </span>
        </div>
        
        <div className="mt-4 font-mono text-[11px] leading-relaxed text-slate-600">
          <p className="text-primary">{`>`} Connecting to target_url...</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {`>`} Bypass successful (200 OK)
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            {`>`} Locating product nodes...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="text-amber-500"
          >
            {`>`} Found 1,248 matching records.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute -right-4 bottom-12 w-[280px] rounded-2xl border border-slate-200 bg-[#0F172A] p-4 shadow-[0_26px_50px_-32px_rgba(15,23,42,0.36)] backdrop-blur sm:-right-8"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Structured Output
          </p>
          <span className="rounded-full bg-primary/20 px-2 py-1 text-[10px] font-semibold text-primary">
            JSON
          </span>
        </div>
        <div className="mt-4 font-mono text-[11px] text-[#86EFAC]">
          <p>{"{"}</p>
          <p className="mt-1 ml-4 text-white">"items": [</p>
          <p className="mt-1 ml-8 text-white">{"{"}</p>
          <p className="mt-1 ml-12">"id": <span className="text-amber-300">"PRD-892"</span>,</p>
          <p className="mt-1 ml-12">"title": <span className="text-amber-300">"MacBook Pro M4"</span>,</p>
          <p className="mt-1 ml-12">"price": <span className="text-amber-300">2499.00</span>,</p>
          <p className="mt-1 ml-12">"in_stock": <span className="text-amber-300">true</span></p>
          <p className="mt-1 ml-8 text-white">{"}"}</p>
          <p className="mt-1 ml-4 text-white">]</p>
          <p className="mt-1">{"}"}</p>
        </div>
      </motion.div>
    </div>
  );
}
