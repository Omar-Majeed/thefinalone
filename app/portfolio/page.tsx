"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/constants/portfolio";

// =====================================================================
// Shared primitives & constants
// =====================================================================

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const HERO_TICKER_TAGS = [
  "Next.js",
  "React Native",
  "LangGraph",
  "Figma",
  "Stripe",
  "GPT-4",
  "FastAPI",
  "Flutter",
  "AWS",
  "PostgreSQL",
  "Shopify",
  "D3.js",
  "Claude API",
  "CrewAI",
  "Node.js",
  "GA4",
  "Firebase",
  "MongoDB",
];

const HERO_ACTIVITY = [
  { dot: "bg-primary", text: "NexaCommerce — conversion up 340% post-launch" },
  { dot: "bg-indigo-400", text: "LexAI processing 500+ contracts daily" },
  { dot: "bg-orange-400", text: "UrbanNest hit 25K users in week one" },
  { dot: "bg-green-400", text: "GreenLeaf reached #1 for 40 keywords" },
  { dot: "bg-purple-400", text: "FinVault task completion improved 45%" },
  { dot: "bg-yellow-400", text: "BuildTrack onboarded 300th enterprise client" },
];

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

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7 V5 a2 2 0 0 1 2 -2 h4 a2 2 0 0 1 2 2 v2" />
      <path d="M3 13 h18" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 L14.9 9 L21 9.8 L16.5 14.4 L17.8 21 L12 17.7 L6.2 21 L7.5 14.4 L3 9.8 L9.1 9 Z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12 h18" />
      <path d="M12 3 a14 14 0 0 1 0 18 a14 14 0 0 1 0 -18 Z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20 c0 -3.5 2.7 -6 6 -6 s6 2.5 6 6" />
      <circle cx="17" cy="9" r="3" />
      <path d="M15 14 c3 0 6 2 6 6" />
    </svg>
  );
}

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

function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        "text-primary",
      )}
    >
      <span className={cn("h-px w-8 bg-current", onDark && "bg-primary")} />
      {children}
    </span>
  );
}

// =====================================================================
// Hooks
// =====================================================================

function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.2 },
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

function PortfolioHero() {
  // Live activity feed cycling — show 3 items, rotate every 3s
  const [feedOffset, setFeedOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFeedOffset((o) => (o + 1) % HERO_ACTIVITY.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const visibleFeed = useMemo(() => {
    return [0, 1, 2].map(
      (i) => HERO_ACTIVITY[(feedOffset + i) % HERO_ACTIVITY.length],
    );
  }, [feedOffset]);

  return (
    <section
      aria-label="Portfolio hero"
      className="relative isolate w-full bg-foreground min-h-[100svh] [overflow:clip] lg:min-h-screen"
    >
      {/* Mesh gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary-300 opacity-20 blur-[120px]"
        style={{ animation: "meshFloat1 14s ease-in-out infinite alternate" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-200px] top-32 h-[600px] w-[600px] rounded-full bg-primary-500 opacity-20 blur-[120px]"
        style={{ animation: "meshFloat2 16s ease-in-out infinite alternate" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-20 h-[600px] w-[600px] rounded-full bg-primary-700 opacity-20 blur-[120px]"
        style={{ animation: "meshFloat3 18s ease-in-out infinite alternate" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-32 h-[600px] w-[600px] rounded-full bg-primary-200 opacity-20 blur-[120px]"
        style={{ animation: "meshFloat4 12s ease-in-out infinite alternate" }}
      />

      {/* Dot grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="hero-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(90,187,74,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Bottom fade to body */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:px-16 lg:py-40 xl:px-24">
        {/* LEFT */}
        <div className="hero-children max-w-xl">
          <Eyebrow onDark>Our Portfolio</Eyebrow>

          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-white">Work That </span>
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Speaks</span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-1 origin-left rounded-full bg-primary"
                style={{
                  animation: "underlineGrow 800ms ease-out 500ms forwards",
                  transform: "scaleX(0)",
                }}
              />
            </span>
            <span className="text-white"> for Itself</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            150+ projects shipped. 12 industries transformed. Every pixel
            intentional, every deadline met.
          </p>

          {/* Marquee */}
          <div className="relative mt-8 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-foreground to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-foreground to-transparent"
            />
            <div className="marquee-track flex w-max gap-3 whitespace-nowrap">
              {[...HERO_TICKER_TAGS, ...HERO_TICKER_TAGS].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
                "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
              )}
            >
              Start a Project
              <ArrowIcon className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
            >
              See Our Services
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* RIGHT — orbit composition */}
        <div className="relative hidden h-[480px] w-full lg:block">
          <HeroOrbit />

          {/* Activity feed */}
          <div className="absolute bottom-0 right-0 z-10 w-64 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-primary"
                  style={{ animation: "heroPing 1.5s ease-out infinite" }}
                />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Live Updates
              </p>
            </div>
            <div className="space-y-0">
              {visibleFeed.map((item, i) => (
                <div
                  key={`${item.text}-${feedOffset}-${i}`}
                  className="flex items-start gap-2 border-b border-white/5 py-2 last:border-0"
                  style={{
                    animation: "feedFadeIn 500ms ease-out both",
                  }}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                      item.dot,
                    )}
                  />
                  <p className="text-xs leading-relaxed text-white/50">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroOrbit() {
  const orbits = [
    {
      value: "150+",
      label: "Projects",
      duration: "18s",
      direction: "normal" as const,
      angle: 0,
      radius: 170,
      delay: "0s",
    },
    {
      value: "98%",
      label: "Satisfied",
      duration: "22s",
      direction: "reverse" as const,
      angle: 120,
      radius: 170,
      delay: "-7s",
    },
    {
      value: "12+",
      label: "Industries",
      duration: "20s",
      direction: "normal" as const,
      angle: 240,
      radius: 170,
      delay: "-14s",
    },
  ];

  return (
    <div className="relative h-full w-full">
      {/* Dashed connectors */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 m-auto h-[400px] w-[400px]"
      >
        {[0, 120, 240].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 200 + Math.cos(rad - Math.PI / 2) * 170;
          const y = 200 + Math.sin(rad - Math.PI / 2) * 170;
          return (
            <line
              key={deg}
              x1={200}
              y1={200}
              x2={x}
              y2={y}
              stroke="rgba(90,187,74,0.25)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ animation: "dashMove 1s linear infinite" }}
            />
          );
        })}
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="rgba(90,187,74,0.08)"
          strokeWidth="1"
        />
      </svg>

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 backdrop-blur-sm">
        <span className="text-2xl font-bold tracking-tight text-primary">CV</span>
      </div>

      {/* Orbiting nodes */}
      {orbits.map((o) => (
        <div
          key={o.label}
          className="absolute left-1/2 top-1/2"
          style={{
            width: o.radius * 2,
            height: o.radius * 2,
            transform: `translate(-50%, -50%) rotate(${o.angle}deg)`,
          }}
          aria-hidden
        >
          <div
            className="relative h-full w-full"
            style={{
              animation: `orbitSpin ${o.duration} linear infinite`,
              animationDirection: o.direction,
              animationDelay: o.delay,
              transformOrigin: "center center",
            }}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div
                style={{
                  animation: `orbitSpin ${o.duration} linear infinite`,
                  animationDirection:
                    o.direction === "reverse" ? "normal" : "reverse",
                  animationDelay: o.delay,
                }}
              >
                <div className="w-24 rounded-2xl border border-white/20 bg-white/10 p-3 text-center shadow-lg backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">{o.value}</p>
                  <p className="mt-0.5 text-[10px] text-white/60">{o.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =====================================================================
// SECTION 2: FILTER BAR — premium horizontal pill carousel
// =====================================================================

type IconProps = { className?: string };

function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function CodeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 6 L3 10 L7 14" />
      <path d="M13 6 L17 10 L13 14" />
      <path d="M11.5 4 L8.5 16" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6" y="2" width="8" height="16" rx="2" />
      <path d="M9 15.5 H11" />
    </svg>
  );
}

function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 2 L11.6 7.4 L17 9 L11.6 10.6 L10 16 L8.4 10.6 L3 9 L8.4 7.4 Z" />
      <path d="M16 14 L16.6 15.4 L18 16 L16.6 16.6 L16 18 L15.4 16.6 L14 16 L15.4 15.4 Z" />
    </svg>
  );
}

function ChartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 16 H17" />
      <path d="M6 16 V11" />
      <path d="M10 16 V6" />
      <path d="M14 16 V9" />
    </svg>
  );
}

function PaletteIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 17.5 A7.5 7.5 0 1 1 17.5 10 c0 1.4 -1.2 2.5 -2.5 2.5 H13 a1.5 1.5 0 0 0 -1.2 2.4 l0.1 0.2 A1.5 1.5 0 0 1 10 17.5 Z" />
      <circle cx="6.5" cy="9" r="0.9" />
      <circle cx="10" cy="6" r="0.9" />
      <circle cx="13.5" cy="9" r="0.9" />
    </svg>
  );
}

function BagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7 H16 L15 17 H5 Z" />
      <path d="M7 7 V5 a3 3 0 0 1 6 0 V7" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<PortfolioCategory, (p: IconProps) => React.JSX.Element> = {
  All: GridIcon,
  "Web Development": CodeIcon,
  "Mobile Apps": PhoneIcon,
  "Agentic AI": SparkleIcon,
  "SEO & Marketing": ChartIcon,
  "UI/UX Design": PaletteIcon,
  "E-Commerce": BagIcon,
};

function PortfolioFilter({
  active,
  onChange,
  counts,
  totalVisible,
}: {
  active: PortfolioCategory;
  onChange: (cat: PortfolioCategory) => void;
  counts: Record<PortfolioCategory, number>;
  totalVisible: number;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [edge, setEdge] = useState<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  });

  // Edge-fade visibility based on scroll position
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdge({
        left: scrollLeft > 4,
        right: scrollLeft + clientWidth < scrollWidth - 4,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  // Auto-center active pill
  useEffect(() => {
    const pill = pillRefs.current[active];
    const scroller = scrollerRef.current;
    if (!pill || !scroller) return;
    const pillLeft = pill.offsetLeft;
    const target =
      pillLeft - scroller.clientWidth / 2 + pill.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = PORTFOLIO_CATEGORIES.indexOf(active);
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % PORTFOLIO_CATEGORIES.length
        : (i - 1 + PORTFOLIO_CATEGORIES.length) % PORTFOLIO_CATEGORIES.length;
    const nextCat = PORTFOLIO_CATEGORIES[next];
    onChange(nextCat);
    pillRefs.current[nextCat]?.focus();
  };

  return (
    <div
      aria-label="Portfolio category filter"
      className="sticky top-16 z-30 border-b border-gray-100 bg-white/85 shadow-[0_1px_0_0_rgba(17,24,39,0.04)] backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="relative">
          {/* Edge fade — left */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/85 to-transparent transition-opacity duration-300 sm:w-16",
              edge.left ? "opacity-100" : "opacity-0",
            )}
          />
          {/* Edge fade — right */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/85 to-transparent transition-opacity duration-300 sm:w-16",
              edge.right ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Scroller */}
          <div
            ref={scrollerRef}
            role="tablist"
            aria-label="Portfolio categories"
            onKeyDown={handleKeyDown}
            className={cn(
              "no-scrollbar flex max-w-full snap-x snap-proximity items-center gap-2.5 overflow-x-auto py-5 [overscroll-behavior-x:contain] sm:gap-3",
              // bleed beyond container on mobile so pills can scroll edge-to-edge
              "-mx-6 px-6 sm:mx-0 sm:px-0",
              // momentum scroll on iOS
              "[-webkit-overflow-scrolling:touch]",
            )}
          >
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = cat === active;
              const Icon = CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  ref={(el) => {
                    pillRefs.current[cat] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="portfolio-grid"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onChange(cat)}
                  className={cn(
                    "group/pill relative inline-flex flex-shrink-0 snap-center cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-all duration-300 ease-out sm:px-5",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "[transform:translateZ(0)] will-change-transform",
                    isActive
                      ? cn(
                          "border border-transparent bg-gradient-to-b from-primary to-primary-600 font-semibold text-white",
                          "shadow-[0_10px_24px_-10px_rgba(90,187,74,0.65),0_2px_4px_-1px_rgba(90,187,74,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18)]",
                          "scale-[1.02]",
                        )
                      : cn(
                          "border border-gray-200/80 bg-white font-medium text-foreground/65",
                          "shadow-[0_1px_0_0_rgba(17,24,39,0.02)]",
                          "hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:bg-primary-50/60 hover:text-primary hover:shadow-[0_8px_20px_-10px_rgba(90,187,74,0.35)]",
                        ),
                  )}
                >
                  {/* Active glow ring */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25"
                    />
                  )}

                  <Icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0 transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-foreground/35 group-hover/pill:text-primary",
                    )}
                  />

                  <span>{cat}</span>

                  <span
                    className={cn(
                      "ml-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums transition-colors duration-300",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-foreground/45 group-hover/pill:bg-primary-100 group-hover/pill:text-primary",
                    )}
                  >
                    {counts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary row */}
        <div className="flex items-center justify-center gap-2 border-t border-gray-50 py-2.5 text-[11px] text-foreground/40 sm:text-xs">
          <span
            key={active}
            className="inline-flex items-center gap-2"
            style={{ animation: "filterFade 350ms ease-out both" }}
          >
            <span>
              Showing{" "}
              <span className="font-semibold text-foreground/70">
                {totalVisible}
              </span>{" "}
              {totalVisible === 1 ? "project" : "projects"}
            </span>
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-foreground/20"
            />
            <span>
              Every result{" "}
              <span className="font-semibold text-primary">measured</span> and
              verified
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// SECTION 3: GRID
// =====================================================================

function PortfolioGrid({ activeFilter }: { activeFilter: PortfolioCategory }) {
  const filtered = useMemo<PortfolioItem[]>(() => {
    if (activeFilter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section
      id="portfolio-grid"
      aria-label="Portfolio projects"
      className="bg-background py-16"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div key={activeFilter} className="portfolio-grid-enter">
            {featured && <FeaturedCard item={featured} />}
            {rest.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <PortfolioCard
                    key={`${activeFilter}-${item.id}`}
                    item={item}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href="/contact"
      aria-label={`${item.title} — view case study`}
      className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-gray-100 shadow-[0_4px_24px_-8px_rgba(17,24,39,0.08)] transition-all duration-700 hover:shadow-[0_24px_64px_-16px_rgba(90,187,74,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="grid lg:grid-cols-5">
        {/* Image side */}
        <div className="relative h-80 overflow-hidden lg:col-span-3 lg:h-full lg:min-h-[400px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/30"
          />

          <span className="absolute left-5 top-5 inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_12px_-4px_rgba(90,187,74,0.6)]">
            {item.category}
          </span>

          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-black/40 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-between bg-white p-8 lg:col-span-2 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              Featured Project
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/60">
              {item.description}
            </p>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/60">
                Key Result
              </p>
              <p className="text-4xl font-bold text-primary">
                {item.resultValue}
              </p>
              <p className="mt-1 text-sm text-foreground/50">
                {item.resultLabel}
              </p>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-4 select-none text-6xl font-black leading-none text-primary/5"
              >
                {item.resultValue}
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
            <span
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 group-hover:gap-3"
            >
              View Case Study
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>

            <div className="flex items-center">
              <div className="flex">
                {[
                  { i: "JM", c: "linear-gradient(135deg,#94D887,#5ABB4A)" },
                  { i: "SP", c: "linear-gradient(135deg,#77CB67,#48953B)" },
                  { i: "AK", c: "linear-gradient(135deg,#B8E5AF,#77CB67)" },
                ].map((a, i) => (
                  <span
                    key={a.i}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white",
                      i > 0 && "-ml-2",
                    )}
                    style={{ background: a.c }}
                    aria-hidden
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-xs text-foreground/40">
                Team project
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
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
    <Link
      href="/contact"
      aria-label={`${item.title} — start a similar project`}
      className={cn(
        "portfolio-card-enter group relative block cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm",
        "transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_24px_64px_-16px_rgba(90,187,74,0.22)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Result badge — visible by default; on hover-capable devices it hover-reveals */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-foreground/75 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary"
              style={{ animation: "heroPing 1.5s ease-out infinite" }}
            />
            <span className="relative h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-semibold text-white">
            {item.result}
          </span>
        </span>

        {/* Category badge (always visible) */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/70 backdrop-blur-sm">
          {item.category}
        </span>

        {/* Hover overlay — desktop only */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent opacity-0 transition-opacity duration-[400ms] [@media(hover:hover)]:group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 ease-out [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100"
          style={{ transitionDelay: "50ms" }}
        >
          Start Similar Project
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold leading-snug text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/55">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-background-alt px-2 py-1 text-[11px] font-medium text-foreground/50 transition-colors duration-150 hover:bg-primary-50 hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
          <div>
            <span className="text-lg font-bold text-primary">
              {item.resultValue}
            </span>
            <span className="ml-1 text-[11px] text-foreground/40">
              {item.resultLabel}
            </span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
            <ArrowIcon className="h-3.5 w-3.5 text-foreground/30 transition-colors duration-300 group-hover:text-white" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-5 py-24 text-center">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#5ABB4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 opacity-30"
        style={{ animation: "emptyBounce 2s ease-in-out infinite" }}
        aria-hidden
      >
        <path d="M8 18 L8 50 A4 4 0 0 0 12 54 L52 54 A4 4 0 0 0 56 50 L56 22 A4 4 0 0 0 52 18 L26 18 L22 12 L12 12 A4 4 0 0 0 8 16 Z" />
        <path d="M32 30 V40 M32 44 V44.5" />
      </svg>
      <div>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          No projects in this category yet
        </h3>
        <p className="mt-1 text-sm text-foreground/50">
          We&apos;re always adding new work.
        </p>
      </div>
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

type ImpactStat = {
  end: number;
  suffix: string;
  label: string;
  sub: string;
  decimals?: number;
  Icon: (p: { className?: string }) => React.JSX.Element;
};

const IMPACT_STATS: ImpactStat[] = [
  {
    end: 150,
    suffix: "+",
    label: "Projects Delivered",
    sub: "across 12 industries",
    Icon: BriefcaseIcon,
  },
  {
    end: 98,
    suffix: "%",
    label: "Client Satisfaction",
    sub: "NPS score avg.",
    Icon: StarIcon,
  },
  {
    end: 12,
    suffix: "+",
    label: "Industries Served",
    sub: "from fintech to healthcare",
    Icon: GlobeIcon,
  },
  {
    end: 3.2,
    suffix: "M+",
    label: "End Users Impacted",
    sub: "reached through our work",
    decimals: 1,
    Icon: UsersIcon,
  },
];

function ImpactStrip() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      aria-label="Impact metrics"
      className="relative bg-primary py-20 [overflow:clip]"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-2xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-32 w-full -translate-y-1/2 opacity-30"
      >
        <path
          d="M0 100 Q 360 20 720 100 T 1440 100"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
        <path
          d="M0 140 Q 360 60 720 140 T 1440 140"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />
      </svg>

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24"
      >
        <div className="mb-14 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            By The Numbers
          </p>
          <span aria-hidden className="mx-auto mt-2 block h-px w-8 bg-white/20" />
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-0">
          {IMPACT_STATS.map((stat, i) => (
            <ImpactStatItem
              key={stat.label}
              stat={stat}
              start={inView}
              showDivider={i < IMPACT_STATS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStatItem({
  stat,
  start,
  showDivider,
}: {
  stat: ImpactStat;
  start: boolean;
  showDivider: boolean;
}) {
  const { Icon } = stat;
  return (
    <>
      <div className="group flex flex-col items-center text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
          <Icon className="h-6 w-6 text-white" />
        </span>
        <span className="text-5xl font-black tracking-tight text-white lg:text-6xl">
          <CountUp
            end={stat.end}
            suffix={stat.suffix}
            decimals={stat.decimals ?? 0}
            start={start}
          />
        </span>
        <span className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">
          {stat.label}
        </span>
        <span className="mt-1 text-xs text-white/35">{stat.sub}</span>
      </div>
      {showDivider && (
        <span
          aria-hidden
          className="mx-auto hidden h-16 w-px self-center bg-white/15 lg:block"
        />
      )}
    </>
  );
}

// =====================================================================
// SECTION 5: TESTIMONIALS
// =====================================================================

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  project: string;
  result: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "CodeVox delivered our platform 2 weeks early. Conversion rates jumped the day we launched — the attention to performance was exceptional.",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "NexaRetail",
    project: "NexaCommerce Platform",
    result: "+340% conversion",
    initials: "SM",
    gradientFrom: "from-primary-400",
    gradientTo: "to-primary-600",
  },
  {
    quote:
      "Their AI legal agent is transformative. The team understood our domain from day one and delivered something our senior partners genuinely trust.",
    name: "James Okafor",
    role: "Managing Partner",
    company: "LexGroup",
    project: "LexAI Legal Agent",
    result: "94% accuracy",
    initials: "JO",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-indigo-600",
  },
  {
    quote:
      "From invisible to #1 in 4 months. The SEO strategy was data-driven and the execution was flawless. ROI has been extraordinary.",
    name: "Priya Sharma",
    role: "Head of Growth",
    company: "GreenLeaf SaaS",
    project: "GreenLeaf SEO Overhaul",
    result: "#1 on 40+ keywords",
    initials: "PS",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
  },
  {
    quote:
      "The FinVault redesign cut our support tickets by 30% in the first month. Users actually understand the dashboard now. That's what great UX does.",
    name: "Daniel Wu",
    role: "Product Lead",
    company: "FinVault",
    project: "FinVault Dashboard",
    result: "45% task lift",
    initials: "DW",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  {
    quote:
      "25,000 users in week one. The app CodeVox built is something our team is genuinely proud of — it feels premium from the first tap.",
    name: "Ama Asante",
    role: "Founder",
    company: "UrbanNest",
    project: "UrbanNest Real Estate App",
    result: "25K+ users",
    initials: "AA",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
];

function ClientTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      aria-label="Client testimonials"
      className="relative bg-background-alt py-24 [overflow:clip]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-xl">
          <Eyebrow>Client Stories</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main card */}
          <div className="lg:col-span-2">
            <article
              key={active}
              className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_4px_32px_-8px_rgba(17,24,39,0.08)] lg:p-10"
              style={{ animation: "filterFade 500ms ease-out both" }}
            >
              <span
                aria-hidden
                className="-mb-8 block select-none font-serif text-[120px] font-black leading-none text-primary/10"
              >
                ❝
              </span>

              <blockquote className="text-xl font-medium leading-relaxed text-foreground lg:text-2xl">
                {current.quote}
              </blockquote>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ animation: "heroPing 1.5s ease-out infinite" }}
                  />
                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-sm font-bold text-primary">
                  {current.result}
                </span>
              </span>

              <div className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white shadow-lg",
                    current.gradientFrom,
                    current.gradientTo,
                  )}
                >
                  {current.initials}
                </span>
                <div>
                  <p className="text-base font-bold text-foreground">
                    {current.name}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground/50">
                    {current.role} · {current.company}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs text-primary/70">
                    <BriefcaseIcon className="h-3 w-3" />
                    {current.project}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  key={`${active}-${paused}`}
                  className="h-full rounded-full bg-primary"
                  style={{
                    animation: paused
                      ? "none"
                      : "progressBar 5s linear forwards",
                    width: paused ? "0%" : undefined,
                  }}
                />
              </div>
            </article>
          </div>

          {/* Selector */}
          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "border-primary/20 bg-white shadow-sm"
                      : "border-transparent hover:bg-white/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 h-full w-0.5 rounded-full transition-colors",
                      isActive ? "bg-primary" : "bg-transparent",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white",
                      t.gradientFrom,
                      t.gradientTo,
                    )}
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="truncate text-xs text-foreground/40">
                      {t.company}
                    </p>
                  </div>
                  {isActive && (
                    <span className="ml-auto rounded-full bg-primary-50 px-2 py-1 text-xs font-bold text-primary">
                      {t.result}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 6: CTA BANNER
// =====================================================================

function PortfolioCTA() {
  return (
    <section
      aria-label="Get in touch"
      className="relative isolate bg-foreground py-28 [overflow:clip]"
    >
      {/* Mesh blobs (subtler than hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-300 opacity-10 blur-[100px]"
        style={{ animation: "meshFloat1 14s ease-in-out infinite alternate" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary-500 opacity-10 blur-[100px]"
        style={{ animation: "meshFloat2 16s ease-in-out infinite alternate" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-primary-700 opacity-10 blur-[100px]"
        style={{ animation: "meshFloat3 18s ease-in-out infinite alternate" }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="cta-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(90,187,74,0.10)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-10">
        {/* Social proof */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="flex">
            {[
              { i: "JM", c: "linear-gradient(135deg,#94D887,#5ABB4A)" },
              { i: "SP", c: "linear-gradient(135deg,#77CB67,#48953B)" },
              { i: "AK", c: "linear-gradient(135deg,#B8E5AF,#77CB67)" },
              { i: "DW", c: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
              { i: "AA", c: "linear-gradient(135deg,#fdba74,#f97316)" },
            ].map((a, i) => (
              <span
                key={a.i}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground text-[10px] font-bold text-white",
                  i > 0 && "-ml-3",
                )}
                style={{ background: a.c }}
                aria-hidden
              >
                {a.i}
              </span>
            ))}
          </div>
          <span aria-hidden className="h-8 w-px bg-white/15" />
          <div className="flex flex-col items-start">
            <span className="text-base text-primary">★★★★★</span>
            <span className="mt-0.5 text-sm font-semibold text-white">
              4.9 / 5.0
            </span>
            <span className="text-xs text-white/40">from 50+ clients</span>
          </div>
        </div>

        <Eyebrow onDark>Let&apos;s Build Together</Eyebrow>

        <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
          Your Next Project Deserves
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">Exceptional</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-1 origin-left rounded-full bg-primary"
              style={{
                animation: "underlineGrow 800ms ease-out 300ms forwards",
                transform: "scaleX(0)",
              }}
            />
          </span>{" "}
          Execution
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-white/55">
          Tell us about your project. We&apos;ll respond within 24 hours with a
          clear scope and honest timeline.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
              "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
            )}
          >
            Start a Project
            <ArrowIcon className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
          >
            See Our Services
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            { Icon: ShieldIcon, label: "NDA Protected" },
            { Icon: ClockIcon, label: "24hr Response" },
            { Icon: AwardIcon, label: "Satisfaction Guaranteed" },
          ].map(({ Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </span>
              <span className="text-xs font-medium text-white/45">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// GLOBAL STYLES
// =====================================================================

function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes underlineGrow {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes meshFloat1 {
        0%, 100% { transform: translate(0px, 0px); }
        50%      { transform: translate(40px, -30px); }
      }
      @keyframes meshFloat2 {
        0%, 100% { transform: translate(0px, 0px); }
        50%      { transform: translate(-30px, 40px); }
      }
      @keyframes meshFloat3 {
        0%, 100% { transform: translate(0px, 0px); }
        50%      { transform: translate(20px, 30px); }
      }
      @keyframes meshFloat4 {
        0%, 100% { transform: translate(0px, 0px); }
        50%      { transform: translate(-40px, -20px); }
      }
      @keyframes heroPing {
        0%   { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      @keyframes dashMove {
        to { stroke-dashoffset: -24; }
      }
      @keyframes gridEnter {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes portfolioCardEnter {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes progressBar {
        from { width: 0%; }
        to   { width: 100%; }
      }
      @keyframes filterFade {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes checkPop {
        0%   { transform: scale(0); }
        70%  { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      @keyframes feedFadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes emptyBounce {
        0%, 100% { transform: translateY(-4px); }
        50%      { transform: translateY(4px); }
      }
      @keyframes orbitSpin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      .hero-children > * {
        opacity: 0;
        animation: heroFadeUp 700ms ease-out forwards;
      }
      .hero-children > *:nth-child(1) { animation-delay: 100ms; }
      .hero-children > *:nth-child(2) { animation-delay: 200ms; }
      .hero-children > *:nth-child(3) { animation-delay: 300ms; }
      .hero-children > *:nth-child(4) { animation-delay: 400ms; }
      .hero-children > *:nth-child(5) { animation-delay: 500ms; }

      .portfolio-grid-enter {
        animation: gridEnter 350ms ease-out both;
      }
      .portfolio-card-enter {
        animation: portfolioCardEnter 500ms ease-out both;
      }
      .marquee-track {
        animation: marquee 30s linear infinite;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }

      .no-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
}

// =====================================================================
// PAGE
// =====================================================================

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");

  // Fix: `overflow-x-hidden` on a sticky ancestor breaks `position: sticky` on iOS
  // (sticky filter would scroll away instead of pinning) and combined with the
  // hero's transformed mesh blobs can also "trap" momentum scroll. Using
  // `overflow-x-clip` clips horizontal overflow without breaking sticky.
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

  const totalVisible = counts[activeFilter];

  return (
    <main className="bg-background [overflow-x:clip]">
      <PortfolioHero />
      <PortfolioFilter
        active={activeFilter}
        onChange={setActiveFilter}
        counts={counts}
        totalVisible={totalVisible}
      />
      <PortfolioGrid activeFilter={activeFilter} />
      <ImpactStrip />
      <ClientTestimonials />
      <PortfolioCTA />
      <Footer />
      <GlobalStyles />
    </main>
  );
}
