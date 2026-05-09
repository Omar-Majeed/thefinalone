"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    duration: "Week 1",
    description:
      "We audit your current marketing stack, analytics setup, and channel performance to find gaps and untapped leverage.",
  },
  {
    number: "02",
    title: "Strategy Build",
    duration: "Week 2",
    description:
      "We deliver a full-funnel marketing plan — budget allocation, channel mix, messaging framework, and 90-day milestones.",
  },
  {
    number: "03",
    title: "Creative & Setup",
    duration: "Week 3",
    description:
      "Ad creatives, email flows, landing pages, and tracking infrastructure go live before the first campaign launches.",
  },
  {
    number: "04",
    title: "Campaign Launch",
    duration: "Week 4",
    description:
      "All channels launch in a coordinated sequence. We monitor performance daily and optimise in real time.",
  },
  {
    number: "05",
    title: "Optimise & Scale",
    duration: "Month 2–3",
    description:
      "We double down on what is working, cut what is not, and systematically scale the highest-performing channels.",
  },
  {
    number: "06",
    title: "Report & Iterate",
    duration: "Ongoing",
    description:
      "Monthly performance reviews with clear attribution data, budget recommendations, and the next quarter's roadmap.",
  },
];

export function ProcessStepper() {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    const el = railRef.current; if (!el) return;
    dragRef.current = { isDown: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el || !dragRef.current.isDown) return;
    const dx = e.clientX - dragRef.current.startX;
    if (!dragRef.current.moved && Math.abs(dx) > 5) {
      dragRef.current.moved = true; el.classList.add("is-dragging");
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }
    if (dragRef.current.moved) { el.scrollLeft = dragRef.current.startScroll - dx; e.preventDefault(); }
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current; if (!el) return;
    dragRef.current.isDown = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.classList.remove("is-dragging");
  };

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">How We Work</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From strategy to scale in six structured steps
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Drag to explore the timeline — each step is designed to reduce risk
            and build momentum toward compounding returns.
          </p>
        </div>

        {/* Horizontal stepper rail */}
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="dm-stepper-rail -mx-6 mt-14 flex items-stretch gap-0 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
              className="relative flex shrink-0 snap-start"
              style={{ width: "clamp(240px, 28vw, 300px)" }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-[28px] h-px w-6 bg-[#D1D5DB] z-10" />
              )}

              <div
                className={cn(
                  "mr-6 flex w-full flex-col rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)]",
                  "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_50px_-34px_rgba(15,23,42,0.28)]",
                )}
              >
                {/* Step badge */}
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-primary shadow-[0_8px_20px_-12px_rgba(90,187,74,0.7)]">
                  {step.number}
                </span>

                {/* Duration chip */}
                <span className="mt-4 inline-flex w-fit rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#6B7280]">
                  {step.duration}
                </span>

                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#6B7280]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          .dm-stepper-rail {
            scrollbar-width: none; -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch; cursor: grab;
            touch-action: pan-x pan-y; overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
          .dm-stepper-rail::-webkit-scrollbar { display: none; }
          .dm-stepper-rail.is-dragging { cursor: grabbing; }
          .dm-stepper-rail.is-dragging * { pointer-events: none; user-select: none; }
        `}</style>
      </div>
    </section>
  );
}
