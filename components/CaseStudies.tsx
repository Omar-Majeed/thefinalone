"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Minus } from "lucide-react";
import { useState } from "react";
import {
  CASE_STUDY_TESTIMONIALS,
  type CaseStudyMetric,
  type CaseStudyTestimonial,
} from "@/constants/testimonials";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = CASE_STUDY_TESTIMONIALS.length;
  const activeStudy = CASE_STUDY_TESTIMONIALS[activeIndex];

  const goToPrevious = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goToNext = () => setActiveIndex((i) => Math.min(total - 1, i + 1));

  return (
    <section
      aria-label="Client success stories"
      className="overflow-hidden bg-background-alt py-20 sm:py-24 lg:py-28"
    >
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Client Success
          </p>
          <h2 className="mt-3 text-[1.95rem] font-bold tracking-tight text-foreground sm:text-[2.35rem] lg:text-[2.75rem] lg:leading-[1.15]">
            Real results. Real impact.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            We build scalable, secure, and high-performance systems for modern businesses.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mt-12 sm:mt-14"
        >
          <article className="rounded-2xl border border-black/[0.04] bg-white p-7 shadow-[0_2px_12px_-4px_rgba(17,24,39,0.06)] sm:p-9 lg:p-10">
            {/*
              Grid-stack technique: every case occupies the same grid cell.
              The wrapper auto-sizes to the tallest case (stable height,
              no layout jump, no fixed min-h, no leftover empty space).
            */}
            <div className="relative grid">
              {CASE_STUDY_TESTIMONIALS.map((study, i) => (
                <div
                  key={study.logo}
                  aria-hidden={i !== activeIndex}
                  className="col-start-1 row-start-1"
                  style={{ visibility: i === activeIndex ? "visible" : "hidden" }}
                >
                  {/* Static structural copy: shapes the card height,
                      but is invisible & doesn't animate. */}
                  <div className="invisible">
                    <CaseStudyCard study={study} />
                  </div>
                </div>
              ))}

              {/* Visible animated layer, absolutely positioned over the
                  invisible structural copies. */}
              <div className="col-start-1 row-start-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStudy.logo}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <CaseStudyCard study={activeStudy} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </article>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
          aria-label="Case study navigation"
          className="mt-8 flex items-center justify-between gap-3 sm:mt-10"
        >
          <button
            type="button"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Previous case study"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-1 py-1 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-3">
            {CASE_STUDY_TESTIMONIALS.map((study, i) => {
              const number = `${i + 1}`.padStart(2, "0");
              const isActive = activeIndex === i;
              return (
                <button
                  key={study.logo}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  aria-label={`Show case study ${number}: ${study.logo}`}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt sm:px-3 sm:text-sm",
                    isActive
                      ? "bg-primary text-white shadow-[0_8px_18px_-10px_rgba(90,187,74,0.7)]"
                      : "text-[#9CA3AF] hover:bg-foreground/[0.04] hover:text-foreground",
                  )}
                >
                  {number}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToNext}
            disabled={activeIndex === total - 1}
            aria-label="Next case study"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-1 py-1 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.nav>
      </div>
    </section>
  );
}

function CaseStudyCard({ study }: { study: CaseStudyTestimonial }) {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-12">
        {/* LEFT */}
        <div className="flex flex-col gap-6 lg:border-r lg:border-black/5 lg:pr-10">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-sm font-bold text-primary">
              {study.logo.charAt(0)}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                Client
              </p>
              <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                {study.logo}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
              Industry
            </p>
            <p className="mt-1.5 text-sm text-[#4B5563]">{study.industry}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
              Tech stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {study.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-black/[0.06] bg-background-alt px-2 py-1 text-xs font-medium text-[#4B5563]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col">
          <span aria-hidden className="font-serif text-5xl leading-none text-primary/30">
            &ldquo;
          </span>
          <blockquote className="mt-2 max-w-3xl text-xl font-medium leading-relaxed text-foreground sm:text-2xl sm:leading-[1.45] lg:text-[1.75rem] lg:leading-[1.45]">
            {study.quote}
          </blockquote>

          <figcaption className="mt-6 flex flex-col">
            <span className="text-base font-semibold text-foreground">{study.clientName}</span>
            <span className="text-sm text-[#6B7280]">{study.clientRole}</span>
          </figcaption>
        </div>
      </div>

      {/* BOTTOM: metrics */}
      <MetricsRow metrics={study.metrics} />
    </div>
  );
}

function MetricsRow({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <div className="border-t border-black/5 pt-6 sm:pt-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
        Key Results
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
        {metrics.map((metric, i) => (
          <li key={`${metric.value}-${i}`} className="flex items-baseline gap-2.5">
            <TrendIcon trend={metric.trend} />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
                {metric.value}
              </span>
              <span className="text-sm text-[#6B7280]">{metric.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrendIcon({ trend }: { trend?: CaseStudyMetric["trend"] }) {
  const Icon = trend === "down" ? ArrowDown : trend === "up" ? ArrowUp : Minus;
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-6 w-6 shrink-0 translate-y-0.5 items-center justify-center rounded-md",
        trend === "neutral"
          ? "bg-foreground/5 text-[#6B7280]"
          : "bg-primary/10 text-primary",
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}
