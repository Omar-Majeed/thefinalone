"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { PROCESS_STEPS } from "@/constants/process";
import { cn } from "@/lib/utils";

const EASE = [0.65, 0, 0.35, 1] as const;

export function ProcessSection() {
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active];
  const progress = ((active + 1) / PROCESS_STEPS.length) * 100;

  return (
    <section
      aria-label="Our process"
      className="relative w-full overflow-hidden bg-background-alt py-20 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — heading + description only */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Our Process
            </h2>

            <p className="mt-5 max-w-md text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
              A focused, transparent process that turns your idea into a production-grade
              product.
            </p>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#6B7280] sm:text-lg">
              Four deliberate stages — from discovery to long-term support — built around
              measurable outcomes.
            </p>
          </motion.div>

          {/* RIGHT — step rail + progress + content card */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:col-span-7"
          >
            <StepRail active={active} onChange={setActive} />

            {/* Progress bar */}
            <div
              className="relative mt-5 h-[3px] w-full overflow-hidden rounded-full bg-[#E5E7EB]"
              aria-hidden
            >
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>

            {/* Content card */}
            <div className="relative mt-6 min-h-[340px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(17,24,39,0.18)] sm:min-h-[380px] sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  role="tabpanel"
                  id={`process-panel-${step.id}`}
                  aria-labelledby={`process-tab-${step.id}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                      Phase {active + 1} of {PROCESS_STEPS.length}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
                    {step.summary}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {step.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 rounded-lg border border-[#E5E7EB] bg-background-alt px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-sm font-medium text-foreground sm:text-[15px]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                  Horizontal step rail with drag-to-scroll                  */
/* -------------------------------------------------------------------------- */

function StepRail({
  active,
  onChange,
}: {
  active: number;
  onChange: (i: number) => void;
}) {
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

  // Keep the active button in view when it actually changes — but skip the
  // very first run so the page does not auto-scroll on mount.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const el = railRef.current;
    if (!el) return;
    const btn = el.querySelector<HTMLButtonElement>(`[data-index="${active}"]`);
    if (!btn) return;
    // Manual horizontal-only scroll so the page never moves vertically.
    const elRect = el.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (btnRect.left < elRect.left) {
      el.scrollBy({ left: btnRect.left - elRect.left - 12, behavior: "smooth" });
    } else if (btnRect.right > elRect.right) {
      el.scrollBy({ left: btnRect.right - elRect.right + 12, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      ref={railRef}
      role="tablist"
      aria-orientation="horizontal"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      className="process-rail flex gap-3 overflow-x-auto pb-1"
    >
      {PROCESS_STEPS.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.id}
            data-index={i}
            role="tab"
            aria-selected={isActive}
            aria-controls={`process-panel-${s.id}`}
            id={`process-tab-${s.id}`}
            onClick={() => {
              // Suppress click that follows a drag
              if (dragRef.current.moved) return;
              onChange(i);
            }}
            className={cn(
              "group relative flex shrink-0 select-none items-center gap-3 rounded-xl border px-4 py-3 text-left",
              "transition-all duration-300 ease-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isActive
                ? "border-primary bg-primary text-white shadow-[0_10px_24px_-12px_rgba(90,187,74,0.55)]"
                : "border-[#E5E7EB] bg-white text-foreground hover:-translate-y-0.5 hover:border-primary/40",
            )}
          >
            <span
              className={cn(
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                "transition-colors duration-300",
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-background-alt text-[#6B7280] group-hover:text-foreground",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="whitespace-nowrap text-sm font-semibold">{s.title}</span>
          </button>
        );
      })}

      <style>{`
        .process-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          touch-action: pan-x pan-y;
          overscroll-behavior-x: contain;
        }
        .process-rail::-webkit-scrollbar { display: none; }
        .process-rail.is-dragging { cursor: grabbing; }
        .process-rail.is-dragging * { pointer-events: none; user-select: none; }
      `}</style>
    </div>
  );
}
