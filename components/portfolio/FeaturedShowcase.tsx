"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { PortfolioProject } from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Featured project — the largest card on the portfolio page.
 *
 * Accepts a single project and renders it as a wide bento tile with
 * hero image (framed by device chrome), name/industry/location, short
 * description, capability tag chips, and a link into the detail route.
 *
 * The featured slot is set on one `PortfolioProject` via `featured: true`
 * in constants/portfolio.ts; the parent page picks that one.
 */
export function FeaturedShowcase({ project }: { project: PortfolioProject }) {
  const isMobile = project.screenshot.orientation === "mobile";

  return (
    <section id="featured-work" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Featured Project</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Work we&apos;re proud of
          </h2>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto grid max-w-6xl gap-8 rounded-[32px] border border-foreground/10 bg-background-alt p-8 shadow-[0_28px_60px_-40px_rgba(15,23,42,0.28)] sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center"
        >
          {/* Image column */}
          <div
            className={
              "relative " +
              (isMobile
                ? "mx-auto w-full max-w-[320px]"
                : "w-full")
            }
          >
            <DeviceFrame variant={isMobile ? "mobile" : "desktop"}>
              <Image
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                width={isMobile ? 750 : 1440}
                height={isMobile ? 1624 : 900}
                priority
                className="h-full w-full object-cover object-top"
              />
            </DeviceFrame>
          </div>

          {/* Copy column */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/60">
              <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                {project.categories[0]}
              </span>
              <span aria-hidden>·</span>
              <span>{project.industry}</span>
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.productName}
            </h3>

            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/50">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {project.location} · {project.year}
            </p>

            <p className="mt-6 text-base leading-8 text-foreground/70 sm:text-lg">
              {project.shortDescription}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.categories.slice(0, 4).map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs font-medium text-foreground/70"
                >
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href={`/portfolio/${project.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Read the full case study
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

/**
 * Subtle device chrome around a screenshot — desktop = browser bar with
 * traffic-light dots, mobile = phone bezel. Keeps portfolio cards visually
 * anchored so the raw screenshot doesn't feel like a floating rectangle.
 */
function DeviceFrame({
  variant,
  children,
}: {
  variant: "desktop" | "mobile";
  children: React.ReactNode;
}) {
  if (variant === "mobile") {
    return (
      <div className="relative rounded-[42px] border border-foreground/15 bg-foreground p-2 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)]">
        <div className="overflow-hidden rounded-[34px] bg-foreground">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden />
      </div>
      {children}
    </div>
  );
}
