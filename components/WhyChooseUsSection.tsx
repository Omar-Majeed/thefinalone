"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WHY_CHOOSE_US_COPY, WHY_CHOOSE_US_PILLARS } from "@/constants/why-choose-us";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhyChooseUsSection() {
  return (
    <section
      aria-label="Why choose us"
      className="relative w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      {/* Subtle radial brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(90,187,74,0.08) 0%, rgba(90,187,74,0) 70%)",
        }}
      />
      {/* Floating blurred shapes */}
      <FloatingShapes />

      <div className="container mx-auto">
        {/* TOP INTRO — centered */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {WHY_CHOOSE_US_COPY.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {WHY_CHOOSE_US_COPY.heading}
          </h2>
          <p className="mt-5 text-base text-[#6B7280] sm:text-lg">
            {WHY_CHOOSE_US_COPY.subheading}
          </p>
        </motion.header>

        {/* MAIN CONTENT — split layout */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <div className="space-y-5">
              {WHY_CHOOSE_US_COPY.paragraphs.map((p) => (
                <p key={p} className="text-base leading-relaxed text-[#4B5563] sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <FillButton href={WHY_CHOOSE_US_COPY.ctaHref}>
                {WHY_CHOOSE_US_COPY.ctaLabel}
              </FillButton>
            </div>
          </motion.div>

          {/* RIGHT — pillars */}
          <div className="relative">
            {/* Mobile: horizontal scroll. Desktop: stacked column */}
            <ul className="why-pillars-scroll flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:flex-col lg:gap-5 lg:overflow-visible lg:pb-0">
              {WHY_CHOOSE_US_PILLARS.map((pillar, i) => (
                <motion.li
                  key={pillar.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: i * 0.15,
                  }}
                  className="snap-start shrink-0 basis-[85%] sm:basis-[60%] lg:basis-auto lg:shrink"
                >
                  <PillarCard pillar={pillar} />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Component-scoped CSS */}
      <style>{`
        .why-pillars-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        .why-pillars-scroll::-webkit-scrollbar {
          display: none;
        }

        @keyframes why-float-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -22px, 0); }
        }
        @keyframes why-float-b {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, 18px, 0); }
        }
        .why-float-a { animation: why-float-a 12s ease-in-out infinite; }
        .why-float-b { animation: why-float-b 14s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .why-float-a, .why-float-b { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Pillar card ---------------- */

function PillarCard({
  pillar,
}: {
  pillar: (typeof WHY_CHOOSE_US_PILLARS)[number];
}) {
  const Icon = pillar.icon;
  return (
    <div
      className="group relative h-full overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(17,24,39,0.18)] transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_25px_50px_-25px_rgba(17,24,39,0.28)] sm:p-7"
    >
      {/* Soft gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent"
      />
      {/* Left accent */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      <div className="relative flex items-start gap-4">
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {pillar.title}
          </h3>

          <ul className="mt-3 space-y-2">
            {pillar.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-[#4B5563] sm:text-[0.95rem]"
              >
                <Check
                  className="h-4 w-4 shrink-0 text-primary"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CTA button (left-to-right fill) ---------------- */

function FillButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-primary bg-white px-7 py-3 text-sm font-semibold text-primary transition-colors duration-300 ease-out hover:text-white sm:text-base"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

/* ---------------- Background floating shapes ---------------- */

function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="why-float-a absolute -right-20 top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl sm:h-96 sm:w-96" />
      <div className="why-float-b absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="why-float-a absolute right-1/3 bottom-1/4 h-40 w-40 rounded-full bg-primary/[0.08] blur-2xl" />
    </div>
  );
}
