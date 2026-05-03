"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const SHOWCASE_APPS = [
  {
    title: "Finance Companion",
    description:
      "Track balances, spending patterns, and savings goals in one mobile-first dashboard.",
    variant: "finance" as const,
  },
  {
    title: "Delivery Tracker",
    description:
      "A logistics experience with live route updates, status states, and customer alerts.",
    variant: "delivery" as const,
  },
  {
    title: "Wellness Onboarding",
    description:
      "Guided onboarding journeys designed to increase activation and reduce early drop-off.",
    variant: "wellness" as const,
  },
  {
    title: "Merchant Analytics",
    description:
      "Mobile reporting screens that keep business performance visible on the move.",
    variant: "analytics" as const,
  },
];

export function AppShowcase() {
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
    <section id="app-showcase" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">App Showcase</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore the kinds of mobile experiences we design and build
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Drag across the showcase to preview product directions designed for
            activation, engagement, and operational clarity.
          </p>
        </div>

        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="app-showcase-rail -mx-6 mt-12 flex items-stretch gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          {SHOWCASE_APPS.map((app, index) => (
            <motion.article
              key={app.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex snap-start self-stretch"
            >
              <div className="flex h-full w-[82vw] max-w-[340px] shrink-0 flex-col rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_26px_54px_-38px_rgba(15,23,42,0.32)] sm:w-[340px]">
                <AppCardMockup variant={app.variant} />
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {app.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#6B7280] sm:text-base">
                  {app.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <style>{`
          .app-showcase-rail {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            touch-action: pan-x pan-y;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
          .app-showcase-rail::-webkit-scrollbar { display: none; }
          .app-showcase-rail.is-dragging { cursor: grabbing; }
          .app-showcase-rail.is-dragging * { pointer-events: none; user-select: none; }
        `}</style>
      </div>
    </section>
  );
}

function AppCardMockup({
  variant,
}: {
  variant: "finance" | "delivery" | "wellness" | "analytics";
}) {
  return (
    <div className="flex min-h-[264px] flex-col rounded-[26px] border border-[#EEF2F7] bg-background-alt p-3 sm:min-h-[280px]">
      <div className="mx-auto h-1.5 w-14 rounded-full bg-[#D1D5DB]" />
      <div className="mt-3 flex flex-1 flex-col overflow-hidden rounded-[22px] bg-white p-4 shadow-sm">
        {variant === "finance" ? <FinanceMockup /> : null}
        {variant === "delivery" ? <DeliveryMockup /> : null}
        {variant === "wellness" ? <WellnessMockup /> : null}
        {variant === "analytics" ? <AnalyticsMockup /> : null}
      </div>
    </div>
  );
}

function FinanceMockup() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-foreground px-4 py-4 text-white">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Balance</p>
        <p className="mt-2 text-2xl font-semibold">$42,800</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Income", "$6.4k", "Expenses", "$2.1k"].map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-2xl bg-background-alt px-3 py-3 text-sm text-[#4B5563]">
            <span className={cn(index % 2 === 1 && "text-lg font-semibold text-foreground")}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliveryMockup() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-primary/12 p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-primary">Current route</p>
        <div className="mt-4 h-24 rounded-[20px] bg-white p-3">
          <div className="h-full w-full rounded-[16px] bg-[linear-gradient(135deg,#DCF2D7_0%,#FFFFFF_45%,#E5E7EB_100%)]" />
        </div>
      </div>
      <div className="space-y-2">
        {["Warehouse", "In transit", "Delivered"].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-background-alt px-3 py-3 text-sm text-[#4B5563]">
            <span className={cn("h-2.5 w-2.5 rounded-full", index < 2 ? "bg-primary" : "bg-[#D1D5DB]")} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WellnessMockup() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary/12">
        <div className="h-10 w-10 rounded-[14px] bg-primary/70" />
      </div>
      <p className="mt-4 text-base font-semibold text-foreground">Welcome back</p>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Personalized setup flows designed for stronger first-week retention.
      </p>
      <div className="mt-5 flex gap-2">
        <span className="h-2 w-8 rounded-full bg-primary" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 rounded-2xl bg-background-alt p-4">
        {[34, 48, 66, 58, 82, 74].map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="flex-1 rounded-t-full bg-primary/85"
            style={{ height: `${value}px` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["18k", "Users"],
          ["4.9", "Rating"],
          ["31%", "Growth"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-background-alt px-3 py-3">
            <p className="text-lg font-semibold text-foreground">{value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}