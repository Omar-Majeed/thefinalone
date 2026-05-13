"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/constants/portfolio";

// =====================================================================
// Shared primitives
// =====================================================================

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10h12" />
      <path d="M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 14l5-5 4 4 5-7" />
      <path d="M13 6h4v4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 2 L12.5 7.5 L18 8.2 L14 12.2 L15 18 L10 15 L5 18 L6 12.2 L2 8.2 L7.5 7.5 Z" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-px w-8 bg-current" />
      {children}
    </span>
  );
}

// =====================================================================
// Hook: useInView
// =====================================================================

function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.25 },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView } as const;
}

// =====================================================================
// CountUp
// =====================================================================

function CountUp({
  end,
  duration = 1800,
  suffix = "",
  prefix = "",
  decimals = 0,
  start,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  start: boolean;
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTs = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// =====================================================================
// SECTION 1: HERO
// =====================================================================

const HERO_TRUST_BADGES = [
  "No Long-Term Contracts",
  "Delivered On Time",
  "Transparent Pricing",
];

function PortfolioHero() {
  return (
    <section
      aria-label="Portfolio hero"
      className="relative isolate w-full overflow-hidden bg-background"
    >
      <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col items-center gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:px-16 lg:py-24 xl:px-24">
        {/* Left content */}
        <div className="portfolio-hero-content w-full max-w-2xl">
          <Eyebrow>Our Work</Eyebrow>

          <h1 className="mt-5 text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Crafting Digital Experiences That Drive Results
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
            From sleek web apps to intelligent AI agents — explore how CodeVox Labs
            turns ambitious ideas into high-performing digital products.
          </p>

          {/* Trust badges row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {HERO_TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/50"
              >
                <CheckIcon className="h-3.5 w-3.5 text-primary" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
                "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              Start a Project
              <ArrowIcon className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              View Services
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right composition */}
        <div className="relative hidden h-[480px] w-full max-w-xl flex-1 lg:block">
          {/* 1. Background card */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-100 shadow-inner"
          />

          {/* 2. Featured project mockup */}
          <div className="absolute left-6 right-6 top-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_24px_64px_-12px_rgba(17,24,39,0.18)]">
            <div className="flex h-9 items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="mx-3 h-5 max-w-[180px] flex-1 rounded-full bg-gray-200/70" />
            </div>
            <div className="flex h-48 flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-500 to-primary-700 px-6">
              <div className="text-center">
                <p className="text-sm font-bold text-white">
                  NexaCommerce Platform
                </p>
                <p className="mt-1 text-xs text-white/70">
                  340% increase in conversion
                </p>
              </div>
              <div className="mt-2 flex items-end gap-2">
                {[40, 65, 50, 85, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-4 rounded-sm bg-white/30"
                    style={{ height: `${h * 0.6}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3a. Floating Card A — top-right */}
          <div className="portfolio-float-1 absolute -right-4 -top-4 z-10 min-w-[140px] rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_32px_-8px_rgba(17,24,39,0.15)]">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
              <TrendingUpIcon className="h-4 w-4 text-primary" />
            </span>
            <p className="text-2xl font-bold text-foreground">150+</p>
            <p className="text-xs text-foreground/50">Projects Delivered</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary">
              ↑ Since 2019
            </span>
          </div>

          {/* 3b. Floating Card B — bottom-left */}
          <div className="portfolio-float-2 absolute -bottom-4 -left-4 z-10 min-w-[140px] rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_32px_-8px_rgba(17,24,39,0.15)]">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
              <StarIcon className="h-4 w-4 text-primary" />
            </span>
            <p className="text-2xl font-bold text-foreground">98%</p>
            <p className="text-xs text-foreground/50">Client Satisfaction</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary">
              ↑ 12pts this year
            </span>
          </div>

          {/* 3c. Floating Card C — middle-right overlapping */}
          <div className="portfolio-float-3 absolute right-4 top-1/2 z-20 min-w-[120px] -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_32px_-8px_rgba(17,24,39,0.15)]">
            <div className="flex -space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary-200 text-[8px] font-bold text-white">
                JM
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary-300 text-[8px] font-bold text-white">
                SP
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary-400 text-[8px] font-bold text-white">
                AK
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-foreground">
              50+ Happy Clients
            </p>
            <p className="text-[10px] text-foreground/50">Across 12 industries</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .portfolio-hero-content > * {
          opacity: 0;
          transform: translateY(20px);
          animation: portfolioFadeUp 700ms ease-out forwards;
        }
        .portfolio-hero-content > *:nth-child(1) { animation-delay: 120ms; }
        .portfolio-hero-content > *:nth-child(2) { animation-delay: 220ms; }
        .portfolio-hero-content > *:nth-child(3) { animation-delay: 320ms; }
        .portfolio-hero-content > *:nth-child(4) { animation-delay: 420ms; }
        .portfolio-hero-content > *:nth-child(5) { animation-delay: 520ms; }

        @keyframes portfolioFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes portfolioFloat {
          0%, 100% { transform: translateY(-6px); }
          50%      { transform: translateY(6px); }
        }
        .portfolio-float-1 { animation: portfolioFloat 4.5s ease-in-out infinite; }
        .portfolio-float-2 { animation: portfolioFloat 5s ease-in-out infinite; animation-delay: 0.6s; }
        .portfolio-float-3 { animation: portfolioFloat 4.2s ease-in-out infinite; animation-delay: 1.2s; }
      `}</style>
    </section>
  );
}

// =====================================================================
// SECTION 2: FILTER BAR
// =====================================================================

function PortfolioFilter({
  active,
  onChange,
  counts,
}: {
  active: PortfolioCategory;
  onChange: (cat: PortfolioCategory) => void;
  counts: Record<PortfolioCategory, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio category filter"
      className="sticky top-16 z-30 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-2 text-sm transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary font-semibold text-white shadow-[0_4px_12px_-4px_rgba(90,187,74,0.5)]"
                    : "border border-gray-200 bg-background-alt font-medium text-foreground/60 hover:border-primary hover:text-primary",
                )}
              >
                {cat}
                <span
                  className={cn(
                    "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-gray-100 text-foreground/40",
                  )}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated underline */}
        <div className="mx-auto mt-3 h-0.5 w-24 max-w-full overflow-hidden">
          <div
            key={active}
            className="h-full w-full rounded-full bg-primary"
            style={{
              transformOrigin: "left",
              animation: "filterUnderline 300ms ease-out",
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes filterUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

// =====================================================================
// SECTION 3: PORTFOLIO GRID
// =====================================================================

function PortfolioGrid({ activeFilter }: { activeFilter: PortfolioCategory }) {
  const filtered = useMemo<PortfolioItem[]>(() => {
    if (activeFilter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section aria-label="Portfolio projects" className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            key={activeFilter}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {featured && <FeaturedCard item={featured} index={0} />}
            {rest.map((item, i) => (
              <PortfolioCard
                key={`${activeFilter}-${item.title}`}
                item={item}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <article
      className="portfolio-card-enter group relative col-span-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-[0_24px_70px_-15px_rgba(90,187,74,0.28)] sm:col-span-2 lg:col-span-3"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="grid gap-0 lg:grid-cols-2">
        {/* Left visual */}
        <div className="relative h-64 min-h-[320px] overflow-hidden lg:h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent lg:from-transparent"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured Project
          </span>
        </div>

        {/* Right content */}
        <div className="flex flex-col justify-between bg-white p-8 lg:p-10">
          <div>
            <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {item.category}
            </span>
            <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              {item.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-background-alt px-2 py-1 text-xs text-foreground/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            {/* Result metric box */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <TrendingUpIcon className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                  Key Result
                </p>
                <p className="mt-0.5 text-lg font-bold text-foreground">
                  {item.result}
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3"
            >
              Explore Case Study
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  return (
    <article
      className={cn(
        "portfolio-card-enter group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(90,187,74,0.25)]",
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Result badge */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          {item.result}
        </span>

        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
        />

        <Link
          href="/contact"
          className={cn(
            "absolute bottom-5 left-5 right-5 flex translate-y-4 items-center justify-center gap-2 rounded-lg",
            "bg-white/95 px-4 py-3 text-sm font-semibold text-foreground opacity-0",
            "transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            "focus:outline-none focus-visible:translate-y-0 focus-visible:opacity-100",
          )}
        >
          View Case Study
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="p-5">
        <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {item.category}
        </span>
        <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/60">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-background-alt px-2 py-1 text-xs text-foreground/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#5ABB4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16"
        aria-hidden
      >
        <path d="M8 18 L8 50 A4 4 0 0 0 12 54 L42 54 A4 4 0 0 0 46 50 L46 22 A4 4 0 0 0 42 18 L26 18 L22 12 L12 12 A4 4 0 0 0 8 16 Z" />
        <circle cx="50" cy="42" r="8" />
        <path d="M56 48 L60 52" />
      </svg>
      <p className="text-lg font-semibold text-foreground">
        No projects here yet
      </p>
      <p className="mt-1 text-sm text-foreground/50">
        We&apos;re constantly adding new work — check back soon.
      </p>
      <Link
        href="/contact"
        className={cn(
          "mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
          "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
          "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
      >
        Start Your Project
        <ArrowIcon className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

// =====================================================================
// SECTION 4: IMPACT STRIP
// =====================================================================

type Stat = {
  end: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
};

const BriefcaseIconPath = (
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7 V5 a2 2 0 0 1 2 -2 h4 a2 2 0 0 1 2 2 v2" />
    <path d="M3 13 h18" />
  </>
);
const StarStrokeIconPath = (
  <path d="M12 3 L14.9 9 L21 9.8 L16.5 14.4 L17.8 21 L12 17.7 L6.2 21 L7.5 14.4 L3 9.8 L9.1 9 Z" />
);
const GlobeIconPath = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12 h18" />
    <path d="M12 3 a14 14 0 0 1 0 18 a14 14 0 0 1 0 -18 Z" />
  </>
);
const UsersIconPath = (
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20 c0 -3.5 2.7 -6 6 -6 s6 2.5 6 6" />
    <circle cx="17" cy="9" r="3" />
    <path d="M15 14 c3 0 6 2 6 6" />
  </>
);

const IMPACT_STATS: Stat[] = [
  { end: 150, suffix: "+", label: "Projects Delivered", icon: BriefcaseIconPath },
  { end: 98, suffix: "%", label: "Client Satisfaction", icon: StarStrokeIconPath },
  { end: 12, suffix: "+", label: "Industries Served", icon: GlobeIconPath },
  { end: 3.2, suffix: "M+", label: "End Users Impacted", icon: UsersIconPath },
];

function ImpactStrip() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section aria-label="Impact metrics" className="bg-primary py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          By The Numbers
        </p>
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {IMPACT_STATS.map((stat) => {
            const decimals = stat.end % 1 !== 0 ? 1 : 0;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden
                  >
                    {stat.icon}
                  </svg>
                </span>
                <span className="text-4xl font-bold text-white sm:text-5xl">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={decimals}
                    start={inView}
                  />
                </span>
                <span className="mt-1 text-sm font-medium uppercase tracking-wider text-white/75">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 5: TESTIMONIALS
// =====================================================================

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "CodeVox Labs delivered our e-commerce platform 2 weeks ahead of schedule. The attention to performance and UX was exceptional — conversion rates jumped immediately after launch.",
    name: "Sarah Mitchell",
    role: "CTO at NexaRetail",
  },
  {
    quote:
      "Their AI agent for our legal workflows is nothing short of transformative. The team understood our domain deeply and delivered a solution that our senior partners actually trust.",
    name: "James Okafor",
    role: "Managing Partner at LexGroup",
  },
  {
    quote:
      "From SEO strategy to paid campaigns, CodeVox took us from invisible to industry-leading in under 6 months. ROI has been phenomenal.",
    name: "Priya Sharma",
    role: "Head of Growth at GreenLeaf SaaS",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ClientTestimonials() {
  return (
    <section aria-label="Client testimonials" className="bg-background-alt py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <Eyebrow>Client Stories</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const isFeatured = i === 1;
            return (
              <figure
                key={t.name}
                className={cn(
                  "flex flex-col rounded-2xl p-7 shadow-sm transition-shadow duration-300 hover:shadow-md",
                  isFeatured
                    ? "scale-[1.02] border border-primary/30 border-t-2 border-t-primary bg-primary-50 shadow-md ring-1 ring-primary/20"
                    : "border border-gray-100 bg-white",
                )}
              >
                <span
                  aria-hidden
                  className="-mb-2 block select-none font-serif text-6xl leading-none text-primary/20"
                >
                  &ldquo;
                </span>

                <div aria-label="5 out of 5 stars" className="text-lg text-primary">
                  ★★★★★
                </div>
                <blockquote className="mt-4 flex-1 text-base italic leading-relaxed text-foreground/70">
                  {t.quote}
                </blockquote>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <figcaption className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #5ABB4A, #94D887)",
                      }}
                    >
                      {getInitials(t.name)}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="text-xs text-foreground/50">{t.role}</span>
                    </span>
                  </figcaption>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-semibold text-primary">
                    <CheckIcon className="h-3 w-3" />
                    Verified Client
                  </span>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 6: CTA BANNER
// =====================================================================

const CTA_TRUST_LOGOS = [
  "NexaRetail",
  "LexGroup",
  "GreenLeaf",
  "MediTrack",
  "BuildTrack",
];

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 2 L17 5 V10 C17 14 14 17 10 18 C6 17 3 14 3 10 V5 Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6 V10 L13 12" />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="10" cy="8" r="5" />
      <path d="M7 12 L5.5 18 L10 16 L14.5 18 L13 12" />
    </svg>
  );
}

function PortfolioCTA() {
  return (
    <section
      aria-label="Get in touch"
      className="relative isolate overflow-hidden bg-foreground py-24"
    >
      <div aria-hidden className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-10 right-1/4 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />

      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-8 bg-primary" />
          Ready to Build?
        </span>

        {/* Trust logos */}
        <div className="mb-8 mt-6">
          <p className="mb-4 text-xs uppercase tracking-wider text-white/30">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CTA_TRUST_LOGOS.map((name) => (
              <span
                key={name}
                className="text-sm font-bold tracking-tight text-white/25 transition-colors duration-200 hover:text-white/50"
              >
                {name}
              </span>
            ))}
          </div>
          <span aria-hidden className="mx-auto my-6 block h-px w-12 bg-white/10" />
        </div>

        <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          Let&apos;s Create Something Remarkable Together
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-white/60">
          Tell us about your project and we&apos;ll get back within 24 hours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
              "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
          >
            Start a Project
            <ArrowIcon className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
          >
            See Our Services
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Micro trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldIcon className="h-4 w-4 text-primary" />
            <span className="text-xs text-white/40">NDA Protected</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-primary" />
            <span className="text-xs text-white/40">24hr Response</span>
          </span>
          <span className="flex items-center gap-1.5">
            <AwardIcon className="h-4 w-4 text-primary" />
            <span className="text-xs text-white/40">Satisfaction Guaranteed</span>
          </span>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// PAGE
// =====================================================================

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");

  const counts = useMemo(() => {
    const base = {} as Record<PortfolioCategory, number>;
    for (const cat of PORTFOLIO_CATEGORIES) {
      base[cat] =
        cat === "All"
          ? PORTFOLIO_ITEMS.length
          : PORTFOLIO_ITEMS.filter((i) => i.category === cat).length;
    }
    return base;
  }, []);

  return (
    <main className="bg-background">
      {/* <Navbar /> */}
      <PortfolioHero />
      <PortfolioFilter
        active={activeFilter}
        onChange={setActiveFilter}
        counts={counts}
      />
      <PortfolioGrid activeFilter={activeFilter} />
      <ImpactStrip />
      <ClientTestimonials />
      <PortfolioCTA />
      <Footer />

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .portfolio-card-enter {
          animation: fadeSlideUp 500ms ease-out both;
        }
      `}</style>
    </main>
  );
}
