"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PANELS = [
  {
    title: "Dashboard Experience",
    description: "Data-dense interfaces that reduce cognitive load and surface insights instantly.",
    metrics: ["48% faster task completion", "92% user satisfaction"],
    accent: "from-primary/20 to-primary/5",
    mockup: DashboardMockup,
  },
  {
    title: "Mobile App UI",
    description: "Native-feeling experiences with gesture-first navigation and fluid transitions.",
    metrics: ["4.9★ avg. app store rating", "38% higher engagement"],
    accent: "from-blue-500/15 to-blue-500/5",
    mockup: MobileMockup,
  },
  {
    title: "SaaS Interface",
    description: "Complex workflows simplified into intuitive, learnable product experiences.",
    metrics: ["67% reduction in support tickets", "2.1x faster onboarding"],
    accent: "from-violet-500/15 to-violet-500/5",
    mockup: SaaSMockup,
  },
  {
    title: "E-commerce Experience",
    description: "Conversion-optimized shopping flows with frictionless checkout paths.",
    metrics: ["+224% conversion rate", "70% fewer cart abandonments"],
    accent: "from-amber-500/15 to-amber-500/5",
    mockup: EcommerceMockup,
  },
  {
    title: "Analytics Platform",
    description: "Real-time visualization systems that make complex data immediately actionable.",
    metrics: ["3x faster data discovery", "84% task completion rate"],
    accent: "from-rose-500/15 to-rose-500/5",
    mockup: AnalyticsMockup,
  },
];

export function ExperienceShowcaseSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
    if (!dragRef.current.moved && Math.abs(dx) > 5) {
      dragRef.current.moved = true;
      el.classList.add("is-dragging");
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
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
    <section className="bg-[#0F172A] py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" />
            Experience Showcase
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            Interfaces designed for
            <br />
            real products, real users
          </h2>
          <p className="mt-4 text-base leading-8 text-white/40 sm:text-lg">
            From data-heavy dashboards to consumer mobile apps — every
            experience we design is built around user needs and business goals.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-sm text-white/20"
        >
          ← Drag to explore →
        </motion.p>

        {/* Horizontal scroll rail */}
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="showcase-rail -mx-6 mt-4 flex items-stretch gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0"
          style={{ userSelect: "none", touchAction: "pan-x" }}
        >
          {PANELS.map((panel, i) => {
            const Mockup = panel.mockup;
            return (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="group flex snap-start shrink-0 flex-col"
                style={{ width: "clamp(320px, 36vw, 420px)" }}
              >
                <div className="flex h-full flex-col rounded-[24px] border border-white/8 bg-white/[0.04] p-6 transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.06] sm:p-7">
                  {/* Mockup area */}
                  <div className={`rounded-2xl bg-gradient-to-br ${panel.accent} p-4 mb-5 overflow-hidden`}>
                    <div className="rounded-xl bg-white/90 backdrop-blur shadow-sm overflow-hidden">
                      <Mockup />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {panel.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-white/40">
                    {panel.description}
                  </p>

                  {/* Metrics */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {panel.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/50"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <style>{`
          .showcase-rail {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            touch-action: pan-x;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
          .showcase-rail::-webkit-scrollbar { display: none; }
          .showcase-rail.is-dragging { cursor: grabbing; }
          .showcase-rail.is-dragging * { pointer-events: none; user-select: none; }
        `}</style>
      </div>
    </section>
  );
}

/* ── Miniature mockup components ── */

function DashboardMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <span className="h-1.5 w-12 rounded-full bg-gray-200" />
        <span className="rounded bg-primary/10 px-2 py-0.5 text-[7px] font-bold text-primary">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { v: "$48K", c: "+18%" },
          { v: "12.4K", c: "+6%" },
          { v: "72", c: "+12" },
        ].map((d) => (
          <div key={d.v} className="rounded-lg bg-gray-50 p-2">
            <p className="text-[8px] text-gray-400">Metric</p>
            <p className="text-xs font-bold text-[#111827]">{d.v}</p>
            <p className="text-[8px] font-semibold text-primary">{d.c}</p>
          </div>
        ))}
      </div>
      <div className="flex h-10 items-end gap-1">
        {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto max-w-[140px] p-2">
      <div className="mx-auto h-1 w-8 rounded-full bg-gray-200 mb-2" />
      <div className="flex flex-col items-center gap-2 p-2">
        <div className="h-8 w-8 rounded-xl bg-primary/15 flex items-center justify-center">
          <div className="h-4 w-4 rounded-lg bg-primary/50" />
        </div>
        <span className="h-1 w-3/4 rounded-full bg-gray-200" />
        <span className="h-1 w-1/2 rounded-full bg-gray-100" />
        <div className="w-full rounded-lg bg-primary py-1.5 text-center text-[7px] font-bold text-white">
          Continue
        </div>
      </div>
    </div>
  );
}

function SaaSMockup() {
  return (
    <div className="p-3">
      <div className="flex gap-2 mb-3">
        <div className="w-12 space-y-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 rounded-full ${i === 1 ? "bg-primary/40" : "bg-gray-100"}`} />
          ))}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="h-1.5 w-16 rounded-full bg-gray-200" />
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[6px] font-bold text-primary">PRO</span>
          </div>
          <div className="space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-md bg-gray-50 p-1.5">
                <span className="h-3 w-3 rounded bg-gray-200" />
                <span className="h-1 flex-1 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EcommerceMockup() {
  return (
    <div className="p-3">
      <div className="flex gap-2 mb-3">
        <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="h-8 w-8 rounded-md bg-gray-200" />
        </div>
        <div className="flex-1 py-1">
          <span className="block h-1.5 w-3/4 rounded-full bg-gray-200" />
          <span className="mt-1.5 block h-1 w-1/2 rounded-full bg-gray-100" />
          <p className="mt-2 text-xs font-bold text-[#111827]">$49.99</p>
        </div>
      </div>
      <div className="rounded-lg bg-primary py-1.5 text-center text-[8px] font-bold text-white">
        Add to Cart
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] font-semibold text-gray-400">Analytics</span>
        <span className="text-[7px] text-gray-300">Last 7d</span>
      </div>
      <div className="flex h-12 items-end gap-0.5">
        {[30, 55, 40, 75, 60, 90, 70, 95, 80, 85].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, rgba(90,187,74,0.3), rgba(90,187,74,0.8))`,
            }}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <div className="rounded bg-gray-50 p-1.5">
          <p className="text-[7px] text-gray-400">Sessions</p>
          <p className="text-[10px] font-bold text-[#111827]">24.8K</p>
        </div>
        <div className="rounded bg-gray-50 p-1.5">
          <p className="text-[7px] text-gray-400">Bounce</p>
          <p className="text-[10px] font-bold text-[#111827]">18.2%</p>
        </div>
      </div>
    </div>
  );
}
