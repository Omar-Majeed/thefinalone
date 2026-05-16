"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart, Users, DollarSign,
  Briefcase, Search, BarChart2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  {
    icon: ShoppingCart,
    title: "E-commerce Products",
    desc: "Full product catalogues, variants, pricing history, and reviews from any store.",
    sample: '{ "price": "$49", "stock": 12, "rating": 4.8 }',
  },
  {
    icon: Users,
    title: "Lead Databases",
    desc: "Targeted lists of emails, phones, job titles, and company info at scale.",
    sample: '{ "email": "ceo@acme.co", "title": "CEO" }',
  },
  {
    icon: DollarSign,
    title: "Competitor Pricing",
    desc: "Real-time price monitoring and promotional offer tracking across rivals.",
    sample: '{ "competitor": "X", "diff": "-5%", "ts": "now" }',
  },
  {
    icon: Briefcase,
    title: "Job Listings",
    desc: "Roles, salaries, requirements, and hiring trends aggregated across job boards.",
    sample: '{ "role": "Engineer", "salary": "$140k" }',
  },
  {
    icon: Search,
    title: "SEO Metadata",
    desc: "Bulk audits of rankings, titles, meta descriptions, and structured data.",
    sample: '{ "rank": 1, "kw": "data scraping" }',
  },
  {
    icon: BarChart2,
    title: "Market Intelligence",
    desc: "Sentiment signals, trend data, and unstructured insights from across the web.",
    sample: '{ "sentiment": "positive", "score": 0.84 }',
  },
];

export function WhatWeExtractSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only mouse/pen left button — let touch use native scrolling.
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    dragRef.current.isDown = true;
    dragRef.current.moved = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScroll = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el || !dragRef.current.isDown) return;
    const dx = e.clientX - dragRef.current.startX;
    // Capture only once we've crossed the drag threshold so plain clicks
    // still reach the button targets.
    if (!dragRef.current.moved && Math.abs(dx) > 5) {
      dragRef.current.moved = true;
      el.classList.add("is-dragging");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    if (dragRef.current.moved) {
      el.scrollLeft = dragRef.current.startScroll - dx;
      e.preventDefault();
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    dragRef.current.isDown = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.classList.remove("is-dragging");
  };

  return (
    <section className="bg-[#F4F3F0] py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl"
        >
          <span className="text-sm font-semibold text-primary">What We Extract</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Any data. Any structure. Delivered clean.
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            Our systems parse and normalise data from virtually any markup,
            turning chaotic sources into pristine, schema-valid datasets.
          </p>
        </motion.div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-sm text-[#9CA3AF]"
        >
          ← Drag to explore →
        </motion.p>

        {/* Horizontal drag rail */}
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="extract-rail -mx-6 mt-4 flex items-stretch gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0"
          style={{ userSelect: "none", touchAction: "pan-x" } as React.CSSProperties}
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                className="flex snap-start shrink-0 flex-col"
                style={{ width: "clamp(280px, 30vw, 340px)", scrollSnapAlign: "start" }}
              >
                <div className="flex h-full flex-col rounded-[28px] border border-[#E5E5E0] bg-white p-6 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-12px_rgba(90,187,74,0.15)] sm:p-7">

                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#374151] transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[#6B7280]">
                    {card.desc}
                  </p>

                  {/* Sample output */}
                  <div className="mt-5 overflow-hidden rounded-xl border border-[#E5E5E0] bg-[#0d1117]">
                    <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[10px] text-white/25 tracking-wider">output.json</span>
                    </div>
                    <p className="p-4 font-mono text-[11px] leading-5 text-primary/70">{card.sample}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <style>{`
          .extract-rail {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            touch-action: pan-x;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
          .extract-rail::-webkit-scrollbar { display: none; }
          .extract-rail.is-dragging { cursor: grabbing; }
          .extract-rail.is-dragging * { pointer-events: none; user-select: none; }
        `}</style>
      </div>
    </section>
  );
}
