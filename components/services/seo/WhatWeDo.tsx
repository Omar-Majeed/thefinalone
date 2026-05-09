"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Search, FileText, Link2, MapPin, ShoppingCart, BarChart2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    icon: Search,
    title: "Technical SEO Audit",
    description:
      "Deep crawl of your site's structure, speed, and indexability. We find what's hurting your rankings and resolve it systematically.",
  },
  {
    icon: FileText,
    title: "Content Strategy",
    description:
      "Keyword-mapped content plans that attract and convert the right audience. Every piece of content has a clear ranking purpose.",
  },
  {
    icon: Link2,
    title: "Link Building",
    description:
      "High-authority backlinks that boost your domain credibility. We build relationships and earn links that actually move the needle.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    description:
      "Dominate local search results and Google Maps rankings. Capture customers searching in your area right now.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce SEO",
    description:
      "Product and category page optimization for maximum organic sales. Turn search traffic into measurable revenue.",
  },
  {
    icon: BarChart2,
    title: "SEO Analytics",
    description:
      "Monthly reporting with clear KPIs and actionable insights. You always know exactly what is working and why.",
  },
];

export function WhatWeDo() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    dragRef.current = { isDown: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
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
    if (dragRef.current.moved) { el.scrollLeft = dragRef.current.startScroll - dx; e.preventDefault(); }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    dragRef.current.isDown = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.classList.remove("is-dragging");
  };

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Services</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Full-spectrum SEO across every growth channel
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Drag across the services to explore how we approach each layer of
            your organic search presence.
          </p>
        </div>

        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="seo-services-rail -mx-6 mt-12 flex items-stretch gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: EASE, delay: index * 0.08 }}
                className="flex snap-start self-stretch"
              >
                <div className="flex h-full w-[82vw] max-w-[320px] shrink-0 flex-col rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_26px_54px_-38px_rgba(15,23,42,0.32)] sm:w-[320px]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[#6B7280] sm:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <style>{`
          .seo-services-rail {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            touch-action: pan-x pan-y;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
          .seo-services-rail::-webkit-scrollbar { display: none; }
          .seo-services-rail.is-dragging { cursor: grabbing; }
          .seo-services-rail.is-dragging * { pointer-events: none; user-select: none; }
        `}</style>
      </div>
    </section>
  );
}
