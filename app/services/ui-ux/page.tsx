"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";

// =====================================================================
// Types & Data
// =====================================================================

type Service = {
  key: string;
  title: string;
  description: string;
  deliverables: [string, string, string];
  icon: React.ReactNode;
};

type Phase = {
  name: string;
  duration: string;
  description: string;
  tools: string[];
  deliverables: { title: string; sub: string }[];
};

type BeforeAfterCase = {
  key: string;
  label: string;
  before: { metric: string; sub: string };
  after: { metric: string; sub: string };
  metrics: { value: string; label: string }[];
  beforeMock: React.ReactNode;
  afterMock: React.ReactNode;
};

type Tool = {
  name: string;
  category: "Design" | "Research" | "Handoff" | "Prototyping";
  bg: string;
};

type PricingFeature = string;
type PricingPlan = {
  name: string;
  description: string;
  prices: { project: string; retainer: string };
  subs: { project: string; retainer: string };
  features: { project: PricingFeature[]; retainer: PricingFeature[] };
  cta: string;
  featured?: boolean;
};

type FAQ = { q: string; a: string };

// ---- Inline SVG icon paths (rendered inside one <svg/>) ----
const Icon = {
  cursor: (
    <path d="M5 3 L5 16 L9 13 L12 19 L14 18 L11 12 L17 12 Z" />
  ),
  wireframe: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9 H21" />
      <path d="M8 13 H14" />
      <path d="M8 17 H18" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3 a9 9 0 1 0 0 18 c1 0 2 -1 2 -2 a2 2 0 0 1 2 -2 h2 a3 3 0 0 0 3 -3 a8 8 0 0 0 -9 -11 Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="9.5" cy="6.5" r="1" />
      <circle cx="14.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
    </>
  ),
  component: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18 H13" />
    </>
  ),
  chart: (
    <>
      <path d="M3 20 H21" />
      <rect x="6" y="12" width="3" height="8" />
      <rect x="11" y="7" width="3" height="13" />
      <rect x="16" y="14" width="3" height="6" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M4 9 H20" />
      <path d="M12 9 V14" />
      <path d="M12 14 L8 21" />
      <path d="M12 14 L16 21" />
    </>
  ),
  handoff: (
    <>
      <path d="M9 7 L4 12 L9 17" />
      <path d="M15 7 L20 12 L15 17" />
    </>
  ),
};

const SERVICES: Service[] = [
  {
    key: "research",
    title: "UX Research & Strategy",
    description:
      "User interviews, heuristic analysis, and competitive audits that ground every design decision in evidence.",
    deliverables: [
      "User Interview Reports",
      "Journey Maps",
      "Competitive Analysis",
    ],
    icon: Icon.cursor,
  },
  {
    key: "wireframing",
    title: "Wireframing & Prototyping",
    description:
      "Low and high-fidelity prototypes that validate concepts before a single line of code is written.",
    deliverables: [
      "Lo-Fi Wireframes",
      "Interactive Prototypes",
      "User Flow Diagrams",
    ],
    icon: Icon.wireframe,
  },
  {
    key: "visual",
    title: "Visual & Brand Design",
    description:
      "Pixel-perfect interfaces with cohesive visual language — color, typography, spacing, and motion unified.",
    deliverables: ["UI Style Guide", "Brand Identity Kit", "Motion Principles"],
    icon: Icon.palette,
  },
  {
    key: "system",
    title: "Design System Creation",
    description:
      "Scalable component libraries in Figma with documented tokens, variants, and usage guidelines.",
    deliverables: [
      "Component Library",
      "Token Documentation",
      "Figma Variables",
    ],
    icon: Icon.component,
  },
  {
    key: "mobile",
    title: "Mobile App Design",
    description:
      "iOS and Android experiences that follow platform conventions while expressing your brand's unique character.",
    deliverables: [
      "iOS & Android Screens",
      "Gesture Flows",
      "App Store Assets",
    ],
    icon: Icon.mobile,
  },
  {
    key: "data",
    title: "Dashboard & Data UI",
    description:
      "Complex data made scannable — financial dashboards, analytics platforms, and admin panels that reduce cognitive load.",
    deliverables: [
      "Data Visualization",
      "Filter Systems",
      "Responsive Tables",
    ],
    icon: Icon.chart,
  },
  {
    key: "a11y",
    title: "Accessibility Auditing",
    description:
      "WCAG 2.1 AA compliance audits with remediation plans so your product works for every user.",
    deliverables: [
      "WCAG Audit Report",
      "Contrast Analysis",
      "Screen Reader Testing",
    ],
    icon: Icon.accessibility,
  },
  {
    key: "handoff",
    title: "Developer Handoff",
    description:
      "Annotated Figma files, exported assets, and interactive specs that eliminate developer guesswork.",
    deliverables: [
      "Annotated Specs",
      "Asset Export Kit",
      "Figma Dev Mode Setup",
    ],
    icon: Icon.handoff,
  },
];

const PHASES: Phase[] = [
  {
    name: "Discover",
    duration: "1–2 Weeks",
    description:
      "We immerse in your business, users, and competitive landscape. No assumptions — only evidence.",
    tools: ["Maze", "Hotjar", "Notion", "Loom"],
    deliverables: [
      {
        title: "Stakeholder Interview Report",
        sub: "Goals, constraints, success metrics",
      },
      { title: "User Persona Deck", sub: "3–5 research-backed personas" },
      { title: "Competitive Audit", sub: "10-point UX benchmark" },
    ],
  },
  {
    name: "Define",
    duration: "1 Week",
    description:
      "We synthesize research into a clear problem statement, information architecture, and user flows.",
    tools: ["FigJam", "Miro", "Notion"],
    deliverables: [
      {
        title: "Problem Statement Document",
        sub: "Agreed definition of success",
      },
      { title: "Information Architecture", sub: "Sitemap + content hierarchy" },
      { title: "User Flow Diagrams", sub: "Critical path mapping" },
    ],
  },
  {
    name: "Design",
    duration: "2–4 Weeks",
    description:
      "From rough wireframes to polished high-fidelity screens, with weekly check-ins and iterations.",
    tools: ["Figma", "Unsplash", "Google Fonts", "Iconify"],
    deliverables: [
      { title: "Lo-Fi Wireframes", sub: "Structure before style" },
      { title: "Hi-Fi UI Screens", sub: "Pixel-perfect designs" },
      { title: "Interactive Prototype", sub: "Clickable Figma prototype" },
    ],
  },
  {
    name: "Validate",
    duration: "1 Week",
    description:
      "Usability testing with real users catches friction before development — saving time and money.",
    tools: ["Maze", "UserTesting", "Loom", "Notion"],
    deliverables: [
      { title: "Usability Test Report", sub: "5-user test synthesis" },
      { title: "Iteration Log", sub: "Before/after change rationale" },
      { title: "Accessibility Audit", sub: "WCAG 2.1 AA compliance check" },
    ],
  },
  {
    name: "Handoff",
    duration: "3–5 Days",
    description:
      "Developer-ready files, annotated specs, and a walkthrough session so nothing gets lost in translation.",
    tools: ["Figma Dev Mode", "Zeplin", "Notion", "Loom"],
    deliverables: [
      {
        title: "Annotated Figma File",
        sub: "Spacing, states, and interactions",
      },
      { title: "Asset Export Kit", sub: "SVG, PNG, WebP at all scales" },
      {
        title: "Handoff Walkthrough",
        sub: "Recorded Loom session with dev team",
      },
    ],
  },
];

const TOOLS: Tool[] = [
  { name: "Figma", category: "Design", bg: "#1E1E1E" },
  { name: "FigJam", category: "Design", bg: "#1E1E1E" },
  { name: "Maze", category: "Research", bg: "#6C47FF" },
  { name: "Hotjar", category: "Research", bg: "#FD3A5C" },
  { name: "Miro", category: "Research", bg: "#FFD02F" },
  { name: "Notion", category: "Handoff", bg: "#000000" },
  { name: "Zeplin", category: "Handoff", bg: "#FDBD39" },
  { name: "UserTesting", category: "Research", bg: "#1F6FEB" },
  { name: "Principle", category: "Prototyping", bg: "#7B2FBE" },
  { name: "Loom", category: "Handoff", bg: "#625DF5" },
  { name: "Storybook", category: "Handoff", bg: "#FF4785" },
  { name: "Abstract", category: "Design", bg: "#191A1B" },
];

const PRICING: PricingPlan[] = [
  {
    name: "Standard",
    description: "Perfect for startups validating their product idea.",
    prices: { project: "$2,499", retainer: "$1,499/mo" },
    subs: { project: "one-time project", retainer: "per month" },
    features: {
      project: [
        "Up to 15 screens designed",
        "UX audit of existing product",
        "1 round of user testing",
        "Figma source files included",
        "2 weeks delivery",
        "1 revision round",
      ],
      retainer: [
        "8 hours design per month",
        "UI updates and iterations",
        "Monthly UX review call",
        "Figma file maintenance",
        "Email support",
        "48hr response time",
      ],
    },
    cta: "Get Started",
  },
  {
    name: "Pro",
    description: "For growing products that need design at scale.",
    prices: { project: "$5,999", retainer: "$3,499/mo" },
    subs: { project: "one-time project", retainer: "per month" },
    features: {
      project: [
        "Up to 40 screens designed",
        "Full UX research phase",
        "Clickable prototype",
        "Usability testing (5 users)",
        "Design system creation",
        "Developer handoff package",
        "3 revision rounds",
        "4 weeks delivery",
      ],
      retainer: [
        "20 hours design per month",
        "Priority Slack access",
        "Weekly video check-in",
        "Design system ownership",
        "Usability test per quarter",
        "24hr response time",
        "Rollover unused hours",
        "Dedicated designer",
      ],
    },
    cta: "Start Your Project",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "End-to-end design partnership for complex products.",
    prices: { project: "Custom", retainer: "Custom" },
    subs: { project: "one-time project", retainer: "per month" },
    features: {
      project: [
        "Unlimited screens",
        "Full discovery & strategy",
        "Multi-platform design",
        "Full design system",
        "Accessibility audit (WCAG)",
        "Ongoing post-launch support",
        "Unlimited revisions",
        "Dedicated design team",
      ],
      retainer: [
        "40+ hours per month",
        "Embedded design team",
        "White-label deliverables",
        "NDA & legal protection",
        "Custom SLA",
        "1hr response time",
        "Quarterly strategy sessions",
        "Priority roadmap access",
      ],
    },
    cta: "Contact Us",
  },
];

const FAQS: FAQ[] = [
  {
    q: "How long does a typical UI/UX project take?",
    a: "Most projects range from 3–8 weeks depending on scope. A focused MVP redesign (10–15 screens) typically takes 3 weeks. A full product with design system takes 6–8 weeks. We'll give you a precise timeline after a discovery call.",
  },
  {
    q: "Do you work with existing products or only new ones?",
    a: "Both. We frequently redesign existing products — starting with a UX audit to identify friction points — as well as design new products from scratch. Redesigns often have faster turnaround since the domain is already defined.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "A brief describing your product, target users, and goals. If redesigning, access to your existing product or designs. We take care of everything else — research, strategy, design, and handoff.",
  },
  {
    q: "Will I own the Figma files and source assets?",
    a: "Yes, always. Every deliverable — Figma files, exported assets, documentation — is yours upon final payment. We don't hold files hostage.",
  },
  {
    q: "How do revisions work?",
    a: "Each package includes a defined number of revision rounds. A revision round means you consolidate all feedback in one go and we implement it. The Pro and Enterprise plans include unlimited revisions within scope.",
  },
  {
    q: "Do you do development as well, or only design?",
    a: "We specialize in design but work hand-in-hand with development teams — including Axenity's own dev teams. If you need full-stack delivery, we can scope a combined design+development engagement.",
  },
  {
    q: "What's your design tool stack?",
    a: "Figma is our primary tool for all design and prototyping. We use FigJam for workshops, Maze for usability testing, Notion for documentation, and Loom for async walkthroughs.",
  },
  {
    q: "Can we start with a small project to test the fit?",
    a: "Absolutely — and we encourage it. Many clients start with a UX audit or a single user flow redesign. It's a low-risk way to see how we work before committing to a larger engagement.",
  },
];

// =====================================================================
// Shared primitives
// =====================================================================

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

function ChevronRight({ className }: { className?: string }) {
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
      <path d="M7 5 L13 10 L7 15" />
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
      <path d="M4 10.5 L8 14.5 L16 5.5" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M10 4 V16" />
      <path d="M4 10 H16" />
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
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "white";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "primary" ? "text-primary" : "text-primary",
      )}
    >
      <span className={cn("h-px w-8", tone === "primary" ? "bg-primary" : "bg-primary")} />
      {children}
    </span>
  );
}

// =====================================================================
// SECTION 1: HERO
// =====================================================================

function ServiceHero() {
  const handleScrollToProcess = () => {
    const el = document.getElementById("process");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label="UI/UX Design hero"
      className="relative isolate min-h-[90vh] w-full overflow-hidden bg-foreground"
    >
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      >
        <defs>
          <pattern id="uiux-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#5ABB4A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#uiux-grid)" />
      </svg>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-28 xl:px-24">
        {/* LEFT */}
        <div className="uiux-hero-content max-w-xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-white/40">
            <Link
              href="/services"
              className="transition-colors duration-200 hover:text-white/70"
            >
              Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">UI/UX Design</span>
          </div>

          <Eyebrow>UI/UX Design</Eyebrow>

          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Interfaces That Feel{" "}
            <span className="relative inline-block">
              Inevitable
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-primary opacity-80"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            We design digital experiences that users don&apos;t just use — they
            remember. Every pixel intentional. Every interaction earned.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8">
            {[
              { v: "45%", l: "Avg. Task Completion Lift" },
              { v: "3.2s", l: "Avg. Time-to-Delight" },
              { v: "4.9★", l: "App Store Rating Avg." },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-3xl font-bold text-white">{s.v}</span>
                <span className="mt-1 text-xs uppercase tracking-wider text-white/40">
                  {s.l}
                </span>
              </div>
            ))}
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
              Start Your Project
              <ArrowIcon className="ml-2 h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={handleScrollToProcess}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
            >
              See Our Process
              <ArrowIcon className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* RIGHT — Interactive mockup */}
        <div className="uiux-hero-visual relative hidden h-[560px] w-full lg:block">
          <DesignToolMockup />

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 z-10 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50">
              <CheckIcon className="h-5 w-5 text-primary" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">
                Design Handoff Ready
              </p>
              <p className="text-xs text-foreground/50">Dev-ready Figma files</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <style jsx global>{`
        .uiux-hero-content > * {
          opacity: 0;
          transform: translateY(20px);
          animation: uiuxFadeUp 700ms ease-out forwards;
        }
        .uiux-hero-content > *:nth-child(1) { animation-delay: 100ms; }
        .uiux-hero-content > *:nth-child(2) { animation-delay: 200ms; }
        .uiux-hero-content > *:nth-child(3) { animation-delay: 300ms; }
        .uiux-hero-content > *:nth-child(4) { animation-delay: 400ms; }
        .uiux-hero-content > *:nth-child(5) { animation-delay: 500ms; }
        .uiux-hero-content > *:nth-child(6) { animation-delay: 600ms; }

        .uiux-hero-visual {
          opacity: 0;
          transform: scale(0.96);
          animation: uiuxFadeScale 800ms ease-out 300ms forwards;
        }

        @keyframes uiuxFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes uiuxFadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes uiuxCursorMove {
          0%   { transform: translate(80px, 60px); }
          25%  { transform: translate(110px, 95px); }
          35%  { transform: translate(110px, 95px); }
          60%  { transform: translate(60px, 130px); }
          75%  { transform: translate(60px, 130px); }
          100% { transform: translate(80px, 60px); }
        }
        .uiux-cursor { animation: uiuxCursorMove 4s ease-in-out infinite; }

        @keyframes uiuxRipple {
          0%, 20%   { transform: scale(0); opacity: 0; }
          25%       { transform: scale(0); opacity: 0.6; }
          35%       { transform: scale(3); opacity: 0; }
          100%      { transform: scale(3); opacity: 0; }
        }
        .uiux-ripple { animation: uiuxRipple 4s ease-out infinite; }

        @keyframes uiuxSwatch {
          0%   { background-color: #5ABB4A; }
          50%  { background-color: #94D887; }
          100% { background-color: #36702C; }
        }
        .uiux-swatch { animation: uiuxSwatch 4s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
}

function DesignToolMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-[#1C1C1E] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
      {/* Toolbar */}
      <div className="flex h-11 items-center gap-3 border-b border-white/10 bg-[#252528] px-4">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="mx-2 h-4 w-px bg-white/10" />
        {[Icon.cursor, Icon.wireframe, Icon.handoff, Icon.component].map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white/40 transition-colors hover:text-white"
            aria-hidden
          >
            {p}
          </svg>
        ))}
      </div>

      {/* Left layers panel */}
      <div className="absolute bottom-0 left-0 top-11 w-44 border-r border-white/10 bg-[#1C1C1E] p-3">
        <p className="mb-2 px-2 text-[10px] uppercase tracking-wider text-white/30">
          Layers
        </p>
        {[
          { name: "Hero Section", icon: Icon.wireframe, active: true },
          { name: "Headline Copy", icon: Icon.cursor, active: false },
          { name: "CTA Button", icon: Icon.wireframe, active: false },
          { name: "Card Grid", icon: Icon.component, active: false },
          { name: "Footer Bar", icon: Icon.wireframe, active: false },
        ].map((l) => (
          <div
            key={l.name}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors",
              l.active
                ? "bg-primary/20 text-primary"
                : "text-white/50 hover:bg-white/5",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 flex-shrink-0"
              aria-hidden
            >
              {l.icon}
            </svg>
            <span className="truncate">{l.name}</span>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="absolute bottom-0 left-44 right-52 top-11 flex items-center justify-center overflow-hidden bg-[#2C2C2E]">
        <div className="relative w-full max-w-[260px] overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Mock nav */}
          <div className="flex h-8 items-center gap-2 border-b border-gray-100 bg-gray-50 px-3">
            <span className="h-2 w-10 rounded-full bg-gray-300" />
            <span className="ml-auto h-1.5 w-6 rounded-full bg-gray-200" />
            <span className="h-1.5 w-6 rounded-full bg-gray-200" />
          </div>
          {/* Mock hero */}
          <div className="flex h-28 flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-500 to-primary-700 px-4">
            <span className="h-2.5 w-3/4 rounded-full bg-white/80" />
            <span className="h-1.5 w-1/2 rounded-full bg-white/50" />
            <span className="mt-1 flex h-6 w-20 items-center justify-center rounded-full bg-white text-[8px] font-bold text-primary">
              Get Started
            </span>
          </div>
          {/* Mock content */}
          <div className="space-y-2 p-3">
            <span className="block h-2 w-5/6 rounded-full bg-gray-100" />
            <span className="block h-2 w-3/4 rounded-full bg-gray-100" />
            <span className="block h-2 w-2/3 rounded-full bg-gray-100" />
          </div>

          {/* Animated cursor */}
          <div className="uiux-cursor pointer-events-none absolute left-0 top-0 z-20 h-4 w-4">
            <svg viewBox="0 0 20 20" className="h-4 w-4 drop-shadow-md" aria-hidden>
              <path
                d="M3 2 L3 15 L7 12 L9.5 17 L11.5 16 L9 11 L15 11 Z"
                fill="white"
                stroke="#111827"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
            {/* Click ripple */}
            <span
              aria-hidden
              className="uiux-ripple absolute left-1 top-1 h-3 w-3 rounded-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Right properties panel */}
      <div className="absolute bottom-0 right-0 top-11 w-52 overflow-hidden border-l border-white/10 bg-[#1C1C1E] p-4">
        <p className="mb-3 text-[10px] uppercase tracking-wider text-white/30">
          Properties
        </p>

        <p className="mb-2 text-[10px] uppercase tracking-wider text-white/30">Fill</p>
        <div className="flex items-center gap-2">
          <span className="uiux-swatch h-6 w-6 rounded-md border border-white/20" />
          <span className="flex h-6 flex-1 items-center rounded border border-white/10 bg-white/5 px-2 text-xs text-white/60">
            #5ABB4A
          </span>
        </div>

        <p className="mb-2 mt-4 text-[10px] uppercase tracking-wider text-white/30">
          Typography
        </p>
        <div className="rounded bg-white/5 px-2 py-1.5 text-xs text-white/60">Inter</div>
        <div className="mt-2 flex gap-2">
          <span className="flex-1 rounded bg-white/5 px-2 py-1 text-xs text-white/60">
            32
          </span>
          <span className="flex-1 rounded bg-white/5 px-2 py-1 text-xs text-white/60">
            400
          </span>
        </div>

        <p className="mb-2 mt-4 text-[10px] uppercase tracking-wider text-white/30">
          Spacing
        </p>
        <div className="rounded border border-white/10 p-2 text-center">
          <p className="text-[9px] text-white/30">24</p>
          <div className="mt-1 rounded border border-primary/40 bg-primary/5 p-2">
            <p className="text-[9px] text-primary">16</p>
            <div className="mt-1 rounded bg-white/5 py-1">
              <p className="text-[9px] text-white/60">Content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// SECTION 2: TRUST BAR
// =====================================================================

const TRUST_LOGOS = [
  "Fintech Pro",
  "LexGroup",
  "MediTrack",
  "NexaRetail",
  "BuildTrack",
  "GreenLeaf",
];

function TrustBar() {
  return (
    <section
      aria-label="Trusted by"
      className="border-y border-gray-100 bg-background py-6"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="flex-shrink-0 text-xs font-medium uppercase tracking-wider text-foreground/30">
          Trusted process used by teams at
        </p>
        <span aria-hidden className="hidden h-8 w-px flex-shrink-0 bg-gray-200 lg:block" />
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {TRUST_LOGOS.map((name) => (
            <span
              key={name}
              className="cursor-default text-sm font-bold tracking-tight text-foreground/20 transition-colors duration-300 hover:text-foreground/40"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 3: SERVICES OFFERED
// =====================================================================

function ServicesOffered() {
  return (
    <section aria-label="Design services" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-block">
            <Eyebrow>What We Design</Eyebrow>
          </div>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            End-to-End Design, From Research to Launch
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">
            Every deliverable we produce is research-backed, user-tested, and
            developer-ready.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.key} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm",
        "transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(90,187,74,0.2)]",
      )}
      tabIndex={0}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-colors duration-300 group-hover:bg-primary">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white"
          aria-hidden
        >
          {service.icon}
        </svg>
      </div>

      <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/60">
        {service.description}
      </p>

      <div className="h-10" />

      {/* Hover reveal */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-primary-50 via-primary-50 to-transparent p-6 pt-12 transition-transform duration-[400ms] ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          Key Deliverables
        </p>
        <ul>
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-center gap-2 py-0.5 text-xs text-foreground/70"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
        <ArrowIcon className="h-3.5 w-3.5 text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
      </span>
    </article>
  );
}

// =====================================================================
// SECTION 4: PROCESS TIMELINE
// =====================================================================

function ProcessTimeline() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = PHASES[activePhase];
  const lastIndex = PHASES.length - 1;

  return (
    <section
      id="process"
      aria-label="Our design process"
      className="scroll-mt-24 bg-background-alt py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <Eyebrow>How We Work</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            A Process Built Around Outcomes, Not Output
          </h2>
        </div>

        {/* DESKTOP timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative flex items-start">
            <div className="absolute left-0 right-0 top-6 z-0 h-0.5 bg-gray-200" />
            <div
              className="absolute left-0 top-6 z-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${(activePhase / lastIndex) * 100}%` }}
            />
            {PHASES.map((p, i) => {
              const isActive = i === activePhase;
              const isCompleted = i < activePhase;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActivePhase(i)}
                  className="relative z-10 flex flex-1 cursor-pointer flex-col items-center focus:outline-none"
                  aria-label={`Phase ${i + 1}: ${p.name}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                      isActive && "border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(90,187,74,0.15)]",
                      isCompleted && "border-primary bg-primary-50 text-primary",
                      !isActive && !isCompleted && "border-gray-200 bg-white text-foreground/30",
                    )}
                  >
                    {isCompleted ? <CheckIcon className="h-5 w-5" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "mt-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                      isActive ? "text-primary" : "text-foreground/40",
                    )}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>

          <PhaseDetailCard
            key={activePhase}
            phase={phase}
            activePhase={activePhase}
            lastIndex={lastIndex}
            onPrev={() => setActivePhase((i) => Math.max(0, i - 1))}
            onNext={() => setActivePhase((i) => Math.min(lastIndex, i + 1))}
          />
        </div>

        {/* MOBILE accordion */}
        <div className="mt-12 space-y-3 lg:hidden">
          {PHASES.map((p, i) => {
            const isOpen = i === activePhase;
            return (
              <div
                key={p.name}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setActivePhase(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 p-5 text-left focus:outline-none focus-visible:bg-primary-50"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                      isOpen
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 bg-white text-foreground/40",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <p className="text-base font-bold text-foreground">{p.name}</p>
                    <p className="text-xs text-foreground/50">{p.duration}</p>
                  </span>
                  <PlusIcon
                    className={cn(
                      "h-4 w-4 flex-shrink-0 text-foreground/40 transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 p-5">
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {p.description}
                      </p>
                      <div className="mt-5">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/30">
                          Tools
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.tools.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-gray-200 bg-background-alt px-3 py-1 text-xs font-medium text-foreground/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/30">
                          Deliverables
                        </p>
                        <ul className="space-y-2">
                          {p.deliverables.map((d) => (
                            <li
                              key={d.title}
                              className="flex items-start gap-3 rounded-xl bg-background-alt p-3"
                            >
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                                <CheckIcon className="h-3 w-3 text-primary" />
                              </span>
                              <span>
                                <p className="text-sm font-semibold text-foreground">
                                  {d.title}
                                </p>
                                <p className="mt-0.5 text-xs text-foreground/50">
                                  {d.sub}
                                </p>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhaseDetailCard({
  phase,
  activePhase,
  lastIndex,
  onPrev,
  onNext,
}: {
  phase: Phase;
  activePhase: number;
  lastIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="phase-detail-enter mt-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10"
      style={
        {
          animation: "fadeSlideUp 400ms ease-out both",
        } as CSSProperties
      }
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-7xl font-bold leading-none text-primary/10">
            {String(activePhase + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-2xl font-bold text-foreground">{phase.name}</h3>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">
            <ClockIcon className="h-3.5 w-3.5" />
            {phase.duration}
          </span>
          <p className="mt-4 text-base leading-relaxed text-foreground/60">
            {phase.description}
          </p>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-wider text-foreground/30">
              Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {phase.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-gray-200 bg-background-alt px-3 py-1 text-xs font-medium text-foreground/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-4 text-xs uppercase tracking-wider text-foreground/30">
            Deliverables
          </p>
          <div className="space-y-3">
            {phase.deliverables.map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-3 rounded-xl bg-background-alt p-3 transition-colors duration-200 hover:bg-primary-50"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <CheckIcon className="h-3 w-3 text-primary" />
                </span>
                <span>
                  <p className="text-sm font-semibold text-foreground">
                    {d.title}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/50">{d.sub}</p>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onPrev}
              disabled={activePhase === 0}
              aria-label="Previous phase"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all duration-200",
                "hover:border-primary hover:bg-primary hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-foreground",
              )}
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={activePhase === lastIndex}
              aria-label="Next phase"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border bg-primary text-white transition-all duration-200",
                "border-primary hover:bg-primary-600",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-30",
              )}
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// SECTION 5: BEFORE / AFTER SHOWCASE
// =====================================================================

function CheckoutBeforeMock() {
  return (
    <div className="flex h-full flex-col bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-base font-bold uppercase text-gray-400">CHECKOUT</span>
        <span className="text-[10px] text-gray-300">Step 1</span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {["First Name", "Last Name", "Email", "Phone", "Street", "Apt #", "City"].map(
          (l) => (
            <div key={l} className="flex flex-col">
              <span className="text-[9px] uppercase text-gray-400">{l}</span>
              <span className="h-5 rounded-sm border border-gray-300 bg-gray-50" />
            </div>
          ),
        )}
      </div>
      <button
        type="button"
        className="mt-3 self-end rounded-sm bg-gray-300 px-3 py-1.5 text-xs text-gray-600"
      >
        Checkout
      </button>
    </div>
  );
}

function CheckoutAfterMock() {
  return (
    <div className="flex h-full flex-col bg-white p-6">
      {/* Progress */}
      <div className="mb-5 flex items-center gap-2">
        <span className="flex-1 rounded-full bg-primary h-1" />
        <span className="flex-1 rounded-full bg-primary h-1" />
        <span className="flex-1 rounded-full bg-gray-200 h-1" />
      </div>
      <p className="text-lg font-bold text-foreground">Shipping details</p>
      <p className="mb-4 text-xs text-foreground/50">Where should we send it?</p>
      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase text-foreground/40">
            Full Name
          </p>
          <div className="mt-1 h-9 rounded-lg border border-gray-200" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase text-foreground/40">
            Address
          </p>
          <div className="mt-1 h-9 rounded-lg border border-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase text-foreground/40">
              City
            </p>
            <div className="mt-1 h-9 rounded-lg border border-gray-200" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase text-foreground/40">
              ZIP
            </p>
            <div className="mt-1 h-9 rounded-lg border border-gray-200" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mt-auto rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]"
      >
        Complete Order →
      </button>
    </div>
  );
}

function DashboardBeforeMock() {
  return (
    <div className="flex h-full flex-col bg-white p-4">
      <p className="text-sm font-bold text-gray-500">Dashboard</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-sm border border-gray-300 p-2">
            <span className="text-[9px] text-gray-400">Metric {i + 1}</span>
            <p className="mt-1 text-base font-bold text-gray-600">12,453</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex-1 rounded-sm border border-gray-300 bg-gray-50 p-2">
        <span className="text-[9px] text-gray-400">Chart placeholder</span>
        <div className="mt-2 flex h-20 items-end gap-1">
          {[40, 30, 60, 25, 70, 45, 55].map((h, i) => (
            <span
              key={i}
              className="flex-1 bg-gray-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardAfterMock() {
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-foreground">Overview</p>
          <p className="text-xs text-foreground/50">Last 30 days</p>
        </div>
        <span className="rounded-lg bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">
          Live
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { l: "Revenue", v: "$48.2K", d: "+18%" },
          { l: "Active", v: "12,453", d: "+6%" },
          { l: "Churn", v: "2.1%", d: "-0.4%" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl bg-background-alt p-3">
            <span className="text-[10px] uppercase text-foreground/40">{m.l}</span>
            <p className="mt-1 text-base font-bold text-foreground">{m.v}</p>
            <span className="text-[10px] font-semibold text-primary">{m.d}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex-1 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
        <div className="flex items-end gap-1.5 pt-2 h-full">
          {[40, 55, 35, 70, 50, 80, 65, 90, 75, 95].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-primary-400 to-primary"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingBeforeMock() {
  return (
    <div className="flex h-full flex-col bg-white p-6">
      <p className="text-base font-bold text-gray-600">Sign up</p>
      <p className="mt-1 text-xs text-gray-400">
        Please fill in all the fields below to create your account.
      </p>
      <div className="mt-3 space-y-1.5">
        {["Email", "Username", "Password", "Confirm Password", "Phone", "DOB"].map(
          (f) => (
            <div key={f}>
              <span className="text-[9px] text-gray-400">{f}</span>
              <div className="h-5 rounded-sm border border-gray-300" />
            </div>
          ),
        )}
      </div>
      <div className="mt-3 flex items-start gap-2">
        <span className="mt-0.5 h-3 w-3 border border-gray-300" />
        <span className="text-[9px] text-gray-400">
          I agree to the terms and conditions and the privacy policy
        </span>
      </div>
      <button
        type="button"
        className="mt-3 rounded-sm bg-gray-400 py-1.5 text-xs text-white"
      >
        Submit
      </button>
    </div>
  );
}

function OnboardingAfterMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
        <CheckIcon className="h-7 w-7 text-primary" />
      </span>
      <p className="mt-4 text-xl font-bold text-foreground">Welcome aboard</p>
      <p className="mt-1 text-sm text-foreground/50">
        Let&apos;s set you up in 30 seconds.
      </p>
      <div className="mt-6 w-full">
        <span className="text-[10px] font-semibold uppercase text-foreground/40">
          Email
        </span>
        <div className="mt-1 h-10 rounded-lg border border-gray-200" />
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]"
      >
        Continue with Email
      </button>
      <p className="mt-3 text-[10px] text-foreground/40">
        Step 1 of 3 — under 30 seconds
      </p>
    </div>
  );
}

const CASES: BeforeAfterCase[] = [
  {
    key: "checkout",
    label: "E-Commerce Checkout",
    before: { metric: "2.1% Conversion Rate", sub: "Avg. 8min completion" },
    after: { metric: "6.8% Conversion Rate", sub: "Avg. 2.4min completion" },
    metrics: [
      { value: "+224%", label: "Conversion" },
      { value: "-70%", label: "Drop-off" },
      { value: "4.7★", label: "User Rating" },
    ],
    beforeMock: <CheckoutBeforeMock />,
    afterMock: <CheckoutAfterMock />,
  },
  {
    key: "dashboard",
    label: "SaaS Dashboard",
    before: { metric: "31% Task Completion", sub: "Avg. 4.2min per task" },
    after: { metric: "84% Task Completion", sub: "Avg. 1.1min per task" },
    metrics: [
      { value: "+171%", label: "Completion" },
      { value: "-74%", label: "Time on Task" },
      { value: "4.8★", label: "User Rating" },
    ],
    beforeMock: <DashboardBeforeMock />,
    afterMock: <DashboardAfterMock />,
  },
  {
    key: "onboarding",
    label: "Mobile Onboarding",
    before: { metric: "38% Drop-off", sub: "Avg. 3.5min to finish" },
    after: { metric: "8% Drop-off", sub: "Avg. 28s to finish" },
    metrics: [
      { value: "+92%", label: "Activation" },
      { value: "-87%", label: "Time to Activate" },
      { value: "4.9★", label: "User Rating" },
    ],
    beforeMock: <OnboardingBeforeMock />,
    afterMock: <OnboardingAfterMock />,
  },
];

function BeforeAfterShowcase() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientX = (clientX: number) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const startDrag = (clientX?: number) => {
    draggingRef.current = true;
    if (clientX !== undefined) updateFromClientX(clientX);
  };

  const c = CASES[caseIndex];

  return (
    <section
      aria-label="Before and after showcase"
      className="bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <Eyebrow>The Transformation</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            See What Great Design Actually Does
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">
            Real results from real redesigns. Drag the slider to compare before
            and after.
          </p>
        </div>

        {/* Case tabs */}
        <div className="mb-10 mt-8 flex flex-wrap gap-3">
          {CASES.map((cc, i) => {
            const isActive = i === caseIndex;
            return (
              <button
                key={cc.key}
                type="button"
                onClick={() => {
                  setCaseIndex(i);
                  setSliderPos(50);
                }}
                className={cn(
                  "rounded-full px-5 py-2 text-sm transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary font-semibold text-white shadow-[0_4px_12px_-4px_rgba(90,187,74,0.5)]"
                    : "border border-gray-200 bg-background-alt font-medium text-foreground/60 hover:border-primary hover:text-primary",
                )}
              >
                {cc.label}
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          onMouseDown={(e) => startDrag(e.clientX)}
          onTouchStart={(e) => startDrag(e.touches[0]?.clientX)}
          className="relative h-[400px] cursor-col-resize select-none overflow-hidden rounded-2xl border border-gray-200 lg:h-[500px]"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft")
              setSliderPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight")
              setSliderPos((p) => Math.min(100, p + 5));
          }}
        >
          {/* Before (full layer underneath) */}
          <div className="absolute inset-0 bg-gray-100">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
              Before
            </span>
            <div className="h-full pb-12">{c.beforeMock}</div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 border-t border-red-100 bg-red-50 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-600">
                {c.before.metric}
              </span>
              <span className="ml-auto text-xs text-red-400">{c.before.sub}</span>
            </div>
          </div>

          {/* After (clipped from left edge based on slider) */}
          <div
            className="absolute inset-y-0 right-0 overflow-hidden bg-white"
            style={{ left: `${sliderPos}%` }}
          >
            <div
              className="relative h-full"
              style={{
                width: `${(100 / Math.max(0.0001, 100 - sliderPos)) * 100}%`,
                marginLeft: `-${(sliderPos / Math.max(0.0001, 100 - sliderPos)) * 100}%`,
              }}
            >
              <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase text-white">
                After
              </span>
              <div className="h-full pb-12">{c.afterMock}</div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 border-t border-primary-100 bg-primary-50 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary">
                  {c.after.metric}
                </span>
                <span className="ml-auto text-xs text-primary/70">
                  {c.after.sub}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute inset-y-0 z-20"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-foreground/60"
                aria-hidden
              >
                <path d="M8 6 L4 10 L8 14" />
                <path d="M12 6 L16 10 L12 14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {c.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-background-alt p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{m.value}</p>
              <p className="mt-1 text-xs text-foreground/50">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 6: TOOLS
// =====================================================================

function ToolsGrid() {
  return (
    <section aria-label="Our toolkit" className="bg-background-alt py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-block">
            <Eyebrow>Our Toolkit</Eyebrow>
          </div>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground">
            Industry-Standard Tools, Expert Hands
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="group flex cursor-default flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_24px_-8px_rgba(90,187,74,0.2)]"
            >
              <span
                className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: t.bg }}
              >
                {t.name[0]}
              </span>
              <span className="text-xs font-semibold text-foreground">
                {t.name}
              </span>
              <span className="text-[10px] text-foreground/40">{t.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 7: PRICING
// =====================================================================

function PricingPackages() {
  const [billing, setBilling] = useState<"project" | "retainer">("project");

  return (
    <section aria-label="Pricing" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-block">
            <Eyebrow>Transparent Pricing</Eyebrow>
          </div>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Simple Packages, No Surprises
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">
            Every package includes source files, unlimited revisions within
            scope, and a dedicated designer.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex rounded-full border border-gray-200 bg-background-alt p-1">
            {(["project", "retainer"] as const).map((b) => {
              const isActive = b === billing;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-white font-semibold text-foreground shadow-sm"
                      : "text-foreground/50",
                  )}
                  aria-pressed={isActive}
                >
                  {b === "project" ? "Project-based" : "Retainer"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((plan) => {
            const featured = plan.featured;
            const features = plan.features[billing];
            const price = plan.prices[billing];
            const sub = plan.subs[billing];
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-8 transition-all duration-300",
                  featured
                    ? "border-primary bg-foreground text-white shadow-[0_24px_60px_-20px_rgba(17,24,39,0.4)] lg:-translate-y-2"
                    : "border-gray-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md",
                )}
              >
                {featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white">
                    Most Popular
                  </span>
                )}

                <p
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider",
                    featured ? "text-primary" : "text-foreground/50",
                  )}
                >
                  {plan.name}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      featured ? "text-white" : "text-foreground",
                    )}
                  >
                    {price}
                  </span>
                  {price !== "Custom" && (
                    <span
                      className={cn(
                        "text-sm",
                        featured ? "text-white/50" : "text-foreground/40",
                      )}
                    >
                      {sub}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    featured ? "text-white/60" : "text-foreground/60",
                  )}
                >
                  {plan.description}
                </p>

                <span
                  className={cn(
                    "my-6 block h-px",
                    featured ? "bg-white/10" : "bg-gray-100",
                  )}
                />

                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                          featured ? "bg-white/10 text-primary" : "bg-primary-50 text-primary",
                        )}
                      >
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          featured ? "text-white/80" : "text-foreground/70",
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "mt-8 flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    featured
                      ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)] hover:bg-primary-600"
                      : "border border-gray-200 text-foreground hover:border-primary hover:bg-primary hover:text-white",
                    featured && "focus-visible:ring-offset-foreground",
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-foreground/40">
          All packages include NDA protection and a free 30-minute discovery
          call.{" "}
          <Link
            href="/contact?subject=plan-help"
            className="font-semibold text-primary hover:underline"
          >
            Not sure which plan?
          </Link>
        </p>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 8: FAQ
// =====================================================================

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="Frequently asked questions" className="bg-background-alt py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Questions We Actually Get Asked
          </h2>
        </div>

        <div className="mt-12 max-w-3xl">
          {FAQS.map((f, i) => {
            const isOpen = i === openIndex;
            return (
              <div
                key={f.q}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                      isOpen
                        ? "border-primary bg-primary"
                        : "border-gray-200 group-hover:border-primary group-hover:bg-primary",
                    )}
                  >
                    <PlusIcon
                      className={cn(
                        "h-3 w-3 transition-all duration-300",
                        isOpen
                          ? "rotate-45 text-white"
                          : "text-foreground/40 group-hover:text-white",
                      )}
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-foreground/60">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION 9: FINAL CTA
// =====================================================================

function ServiceCTA() {
  return (
    <section
      aria-label="Book a discovery call"
      className="relative isolate overflow-hidden bg-foreground py-24"
    >
      <div aria-hidden className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-10 right-1/4 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />

      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-10">
        {/* Social proof */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex">
            {[
              { i: "JM", c: "linear-gradient(135deg,#94D887,#5ABB4A)" },
              { i: "SP", c: "linear-gradient(135deg,#77CB67,#48953B)" },
              { i: "AK", c: "linear-gradient(135deg,#B8E5AF,#77CB67)" },
              { i: "TR", c: "linear-gradient(135deg,#5ABB4A,#36702C)" },
            ].map((a, i) => (
              <span
                key={a.i}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground text-xs font-bold text-white",
                  i > 0 && "-ml-3",
                )}
                style={{ background: a.c }}
                aria-hidden
              >
                {a.i}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-white">
              Loved by 50+ product teams
            </span>
            <span className="mt-0.5 flex items-center gap-1.5">
              <span className="text-sm text-primary">★★★★★</span>
              <span className="text-xs text-white/40">4.9 average rating</span>
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-8 bg-primary" />
          Ready to Design?
        </span>

        <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          Your Next Product Deserves Better Design
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-white/60">
          Book a free 30-minute discovery call. No pitch. Just a conversation
          about your product and your users.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
              "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
            )}
          >
            Book a Free Call
            <ArrowIcon className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
          >
            See All Services
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

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

export default function UIUXServicePage() {
  return (
    <main className="bg-background text-foreground">
      <ServiceHero />
      <TrustBar />
      <ServicesOffered />
      <ProcessTimeline />
      <BeforeAfterShowcase />
      <ToolsGrid />
      <PricingPackages />
      <FAQAccordion />
      <ServiceCTA />
      <Footer />

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
