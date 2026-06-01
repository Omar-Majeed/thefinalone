"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { PortfolioItem } from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = { items: PortfolioItem[] };

export function HorizontalExplorer({ items }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="project-gallery"
      className="relative isolate bg-[#0B1120] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {mounted && isDesktop ? (
        <DesktopExplorer items={items} />
      ) : (
        <MobileExplorer items={items} />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop: pinned horizontal scroll                                 */
/*  - Wrapper height: count * viewport height (pixels, measured live) */
/*  - Inner: position: sticky; height: 100vh                          */
/*  - Progress: -wrapperRect.top / (wrapperHeight - viewportHeight)   */
/*  - Transform: vanilla CSS translateX(percentage of track width)    */
/* ------------------------------------------------------------------ */

function DesktopExplorer({ items }: { items: PortfolioItem[] }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  const count = items.length;
  const [vh, setVh] = useState(0);
  const [active, setActive] = useState(0);

  /* Measure viewport height once mounted (and on resize). */
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Drive transform / progress bar / counter directly from a scroll
     handler — no React re-renders per frame, no MotionValue indirection. */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!wrapper || !track || !fill) return;

    let raf = 0;
    let lastIdx = -1;

    const apply = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = rect.height - viewport;
      if (distance <= 0) return;

      let p = -rect.top / distance;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;

      // 9 panels, each w-screen (100vw). Track width = count * 100vw.
      // We need to shift by (count - 1) panels = (count - 1) * 100vw.
      // Expressed as a % of the track's own width: ((count-1)/count)*100%.
      const shiftPct = -p * ((count - 1) / count) * 100;
      track.style.transform = `translate3d(${shiftPct}%, 0, 0)`;
      fill.style.transform = `scaleX(${p})`;

      const idx = Math.min(count - 1, Math.round(p * (count - 1)));
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count, vh]);

  /* Explicit pixel height once we know the viewport.
     Fallback to a vh string for SSR / first paint. */
  const wrapperHeight: string | number =
    vh > 0 ? vh * count : `${count * 100}vh`;

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight }}
      className="relative w-full"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <motion.div
          aria-hidden
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(60% 50% at ${20 + active * 8}% 30%, rgba(90,187,74,0.12) 0%, rgba(11,17,32,0) 60%), linear-gradient(180deg, #0B1120 0%, #0B0F19 100%)`,
          }}
        />

        <div className="container px-6 pt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
                The Gallery
              </span>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Browse the full collection.
              </h2>
            </div>
            <div className="text-right text-xs uppercase tracking-[0.24em] text-white/40">
              <div className="tabular-nums">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </div>
              <div className="mt-1 text-white/30">Scroll to navigate</div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${count * 100}%`, transform: "translate3d(0,0,0)" }}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className="flex h-full shrink-0 items-center px-10 lg:px-16"
                style={{ width: `${100 / count}%` }}
              >
                <ExplorerPanel item={item} isActive={i === active} />
              </div>
            ))}
          </div>
        </div>

        <div className="container px-6 pb-10">
          <div className="relative h-px w-full overflow-hidden bg-white/10">
            <div
              ref={fillRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-primary to-emerald-300"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="mt-4 flex gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i <= active ? "bg-primary/80" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExplorerPanel({
  item,
  isActive,
}: {
  item: PortfolioItem;
  isActive: boolean;
}) {
  return (
    <div className="mx-auto grid h-[68vh] w-full max-w-6xl grid-cols-5 gap-12">
      <motion.div
        animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.55 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative col-span-3 h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]"
      >
        <Image
          src={item.cover}
          alt={`${item.title} preview`}
          fill
          sizes="60vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F19]/70 via-[#0B0F19]/10 to-primary/10" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {item.category}
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 8 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="col-span-2 flex flex-col justify-center"
      >
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
          {item.year}
        </div>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-white/55">{item.subtitle}</p>
        <p className="mt-5 text-sm leading-relaxed text-white/70 lg:text-base">
          {item.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-lg font-semibold text-primary lg:text-xl">
                {m.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: native swipeable carousel with scroll-snap                */
/* ------------------------------------------------------------------ */

function MobileExplorer({ items }: { items: PortfolioItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const count = items.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cardWidth = el.clientWidth;
        if (cardWidth === 0) return;
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActive(Math.min(count - 1, Math.max(0, idx)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <div className="py-20 sm:py-24">
      <div className="container px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
              The Gallery
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Browse the full collection.
            </h2>
          </div>
          <div className="text-right text-[11px] uppercase tracking-[0.24em] text-white/40 tabular-nums">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="w-[88%] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:w-[75%]"
          >
            <div className="relative aspect-[16/11] w-full">
              <Image
                src={item.cover}
                alt={`${item.title} preview`}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F19]/70 via-[#0B0F19]/10 to-primary/10" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item.category}
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                {item.year}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-white/55">{item.subtitle}</p>
              <p className="text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {item.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-base font-semibold text-primary">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="container px-6">
        <div className="mt-2 flex gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                i === active ? "bg-primary" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
