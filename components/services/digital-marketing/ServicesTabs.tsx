"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2, Mail, Share2, Search, BarChart2, Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const TABS = [
  {
    id: "paid",
    label: "Paid Ads",
    icon: MousePointer2,
    headline: "Performance advertising built for return, not reach",
    description:
      "We design, launch, and optimise paid campaigns across Google, Meta, and LinkedIn. Every budget allocation is tied to measurable business outcomes — leads, revenue, or qualified pipeline.",
    points: [
      "Google Search & Performance Max",
      "Meta & Instagram campaigns",
      "LinkedIn B2B lead generation",
      "Retargeting & lookalike audiences",
      "Landing page conversion optimisation",
    ],
    stat: { value: "4.8x", label: "Average ROAS across paid campaigns" },
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    headline: "Brand presence that builds trust before the first click",
    description:
      "We manage your social media presence with a content calendar, community engagement, and platform-specific strategies that grow your audience and keep it warm.",
    points: [
      "Content strategy & calendar management",
      "Short-form video production briefs",
      "Community management & DM flows",
      "Influencer identification & coordination",
      "Platform analytics & monthly reporting",
    ],
    stat: { value: "3.1x", label: "Average engagement rate vs industry" },
  },
  {
    id: "email",
    label: "Email Marketing",
    icon: Mail,
    headline: "Automated email flows that convert while you sleep",
    description:
      "From welcome sequences to win-back campaigns, we build behavioural email automations that nurture leads through your funnel and recover revenue you would otherwise leave behind.",
    points: [
      "Welcome & onboarding sequences",
      "Abandoned cart & browse recovery",
      "Re-engagement & win-back flows",
      "Newsletter strategy & copywriting",
      "A/B testing & deliverability audits",
    ],
    stat: { value: "42%", label: "Average open rate across email campaigns" },
  },
  {
    id: "content",
    label: "Content Marketing",
    icon: Search,
    headline: "Content that ranks, converts, and compounds over time",
    description:
      "We produce long-form content mapped to buyer intent — blog posts, landing pages, and pillar content that generate organic traffic and establish authority in your category.",
    points: [
      "Topical authority mapping",
      "SEO-led blog & article production",
      "Pillar pages & content clusters",
      "Thought leadership ghostwriting",
      "Content distribution strategy",
    ],
    stat: { value: "2.4x", label: "Average organic traffic increase in 6 months" },
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    headline: "One source of truth for every marketing decision",
    description:
      "We set up tracking infrastructure and reporting dashboards so your team always knows which channels are working, where budget is being wasted, and what to do next.",
    points: [
      "GA4 & GTM implementation",
      "Custom Looker Studio dashboards",
      "Multi-touch attribution modelling",
      "Weekly & monthly performance reports",
      "Marketing audit & budget reallocation",
    ],
    stat: { value: "30%", label: "Average budget saved through reallocation" },
  },
  {
    id: "brand",
    label: "Brand Strategy",
    icon: Megaphone,
    headline: "Positioning that makes your marketing work harder",
    description:
      "Before we run a single campaign, we make sure your brand message, value proposition, and audience targeting are sharp. Great positioning multiplies the ROI of everything downstream.",
    points: [
      "Audience & competitor research",
      "Messaging framework & tone of voice",
      "Value proposition development",
      "Campaign concept & creative direction",
      "Brand consistency across all channels",
    ],
    stat: { value: "68%", label: "Of clients see improved CPL within 90 days" },
  },
];

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="dm-channels" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">What We Do</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Every channel, working as one system
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Select a service to explore how we approach it — and what results
            you can expect.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {TABS.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "bg-foreground text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.5)]"
                    : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-primary/40 hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {t.label}
                {isActive && (
                  <motion.span
                    layoutId="tab-active-bg"
                    className="absolute inset-0 rounded-full bg-foreground"
                    style={{ zIndex: -1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-6 lg:grid-cols-[1fr_320px]"
            >
              {/* Main panel */}
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.28)] sm:p-9">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {(() => { const Icon = tab.icon; return <Icon className="h-5 w-5" strokeWidth={2} />; })()}
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {tab.headline}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#6B7280]">
                  {tab.description}
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {tab.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-[#374151] sm:text-base">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stat sidebar */}
              <div className="flex flex-col gap-6">
                <div className="rounded-[28px] bg-foreground p-7 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.5)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                    Key Result
                  </p>
                  <p className="mt-4 text-5xl font-semibold tracking-tight text-white">
                    {tab.stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/50">
                    {tab.stat.label}
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)]">
                  <p className="text-sm font-semibold text-foreground">
                    Ready to get started?
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#6B7280]">
                    Book a free strategy call and we will audit your current
                    marketing in 48 hours.
                  </p>
                  <a
                    href="/#contact"
                    className={cn(
                      "group relative mt-5 inline-flex w-full items-center justify-center overflow-hidden rounded-full",
                      "border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-foreground",
                      "transition-colors duration-300 hover:text-white",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    )}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                    <span className="relative z-10">Get a Free Audit</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
