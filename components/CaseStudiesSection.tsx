"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/constants/portfolio";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Homepage case-studies section.
 *
 * Shows the featured project prominently + three more as compact cards. Every
 * card links into /portfolio/<slug>. Uses device chrome around every
 * screenshot (browser bar for desktop shots, phone bezel for mobile shots)
 * so the row of thumbnails feels intentional rather than a strip of
 * raw rectangles.
 */
export function CaseStudiesSection() {
  const featured = PORTFOLIO_PROJECTS.find((p) => p.featured) ?? PORTFOLIO_PROJECTS[0];
  const rest = PORTFOLIO_PROJECTS.filter((p) => p.slug !== featured.slug).slice(0, 3);

  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Case Studies
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Real products, live in production
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            Every card below is a live build we shipped for a paying client —
            from restaurants and trade services to autonomous AI agents. No
            mockups, no stock demos.
          </p>
        </div>

        {/* Featured card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-14 grid gap-8 rounded-[28px] border border-foreground/10 bg-background-alt p-6 shadow-[0_28px_60px_-40px_rgba(15,23,42,0.28)] sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center"
        >
          <CardImage project={featured} priority />
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                Featured · {featured.categories[0]}
              </span>
              <span aria-hidden className="text-foreground/25">·</span>
              <span className="text-foreground/60">{featured.industry}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              <Link
                href={`/portfolio/${featured.slug}`}
                className="hover:text-primary"
              >
                {featured.productName}
              </Link>
            </h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/50">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {featured.location} · {featured.year}
            </p>
            <p className="mt-5 text-base leading-7 text-foreground/75">
              {featured.shortDescription}
            </p>
            <Link
              href={`/portfolio/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Read case study
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.article>

        {/* Three supporting cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-shadow duration-300 hover:shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)]"
            >
              <Link
                href={`/portfolio/${p.slug}`}
                className="relative block aspect-[16/10] w-full overflow-hidden bg-background-alt"
              >
                <CardImage project={p} compact />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                    {p.categories[0]}
                  </span>
                  <span aria-hidden className="text-foreground/25">·</span>
                  <span className="text-foreground/60">{p.year}</span>
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="hover:text-primary"
                  >
                    {p.productName}
                  </Link>
                </h3>
                <p className="inline-flex items-center gap-1.5 text-xs text-foreground/50">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {p.location}
                </p>
                <p className="text-sm leading-6 text-foreground/70">
                  {p.shortDescription}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <SlideButton href="/portfolio">All case studies</SlideButton>
        </div>
      </div>
    </section>
  );
}

/**
 * Screenshot with device chrome. Compact variant is used inside the small
 * supporting cards; the default (non-compact) fills the featured card.
 */
function CardImage({
  project,
  priority = false,
  compact = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
  compact?: boolean;
}) {
  const isMobile = project.screenshot.orientation === "mobile";

  if (compact && isMobile) {
    return (
      <div className="absolute inset-0 flex items-center justify-center py-4">
        <div className="relative aspect-[9/19] h-full max-h-full rounded-[22px] border border-foreground/15 bg-foreground p-1 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)]">
          <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-foreground">
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              fill
              sizes="(min-width: 1024px) 120px, 80px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }
  if (compact) {
    return (
      <Image
        src={project.screenshot.src}
        alt={project.screenshot.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  if (isMobile) {
    return (
      <div className="mx-auto w-full max-w-[280px]">
        <div className="relative rounded-[38px] border border-foreground/15 bg-foreground p-2 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)]">
          <div className="overflow-hidden rounded-[30px] bg-foreground">
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              width={750}
              height={1624}
              priority={priority}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden />
      </div>
      <Image
        src={project.screenshot.src}
        alt={project.screenshot.alt}
        width={1440}
        height={900}
        priority={priority}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

function SlideButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/case relative inline-block pb-[6px] pr-[6px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-[4px] border border-primary",
          "transition-transform duration-300 ease-out group-hover/case:translate-x-[3px] group-hover/case:translate-y-[3px]",
        )}
      />
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-[4px]",
          "border border-foreground bg-white px-5 py-2.5 text-sm font-semibold text-foreground",
          "transition-colors duration-300 group-hover/case:text-white",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 origin-left scale-x-0 bg-primary",
            "transition-transform duration-300 ease-out group-hover/case:scale-x-100",
          )}
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}
