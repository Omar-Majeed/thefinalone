"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
  type PortfolioProject,
} from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * All-projects grid with a category filter. Every project's `categories`
 * array participates in filtering, so a single project can appear under
 * multiple tabs (e.g. Tyre Express under Agentic AI, Web Development, and
 * E-Commerce).
 *
 * The `featured` project is excluded here — it's already highlighted by
 * FeaturedShowcase above.
 */
export function HorizontalExplorer({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [active, setActive] = useState<PortfolioCategory>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active, projects],
  );

  // Only show categories that actually match something.
  const availableCategories = useMemo(() => {
    const present = new Set<PortfolioCategory>(["All"]);
    for (const p of projects) for (const c of p.categories) present.add(c);
    return PORTFOLIO_CATEGORIES.filter((c) => present.has(c));
  }, [projects]);

  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Selected Work</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Every project we&apos;ve shipped
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground/60">
            Filter by capability to see how a single build often touches
            multiple disciplines.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Filter portfolio by capability"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {availableCategories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActive(c)}
                className={
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (isActive
                    ? "bg-foreground text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.4)]"
                    : "border border-foreground/10 bg-background text-foreground/70 hover:border-primary/40 hover:text-primary")
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Project cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full py-10 text-center text-sm text-foreground/50">
              No projects under this category yet.
            </p>
          ) : (
            filtered.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const isMobile = project.screenshot.orientation === "mobile";
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % 3) * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-shadow duration-300 hover:shadow-[0_28px_60px_-40px_rgba(15,23,42,0.35)]"
    >
      {/* Cover */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-background-alt"
      >
        {isMobile ? (
          <div className="absolute inset-0 flex items-center justify-center py-4">
            {/*
              Explicit aspect-ratio on the phone frame so `h-full` computes a
              proportional width. Without it the frame collapses to zero width
              (Next.js <Image fill> doesn't feed the parent an intrinsic size).
            */}
            <div className="relative aspect-[9/19] h-full max-h-full rounded-[22px] border border-foreground/15 bg-foreground p-1 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)] transition-transform duration-500 group-hover:scale-[1.03]">
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
        ) : (
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-[0.14em] text-primary">
            {project.categories[0]}
          </span>
          <span aria-hidden className="text-foreground/25">·</span>
          <span className="text-foreground/60">{project.year}</span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          <Link href={`/portfolio/${project.slug}`} className="hover:text-primary">
            {project.productName}
          </Link>
        </h3>

        <p className="inline-flex items-center gap-1.5 text-xs text-foreground/50">
          <MapPin className="h-3 w-3" aria-hidden />
          {project.location}
        </p>

        <p className="text-sm leading-6 text-foreground/70">
          {project.shortDescription}
        </p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          {project.categories.slice(1, 4).map((c) => (
            <li
              key={c}
              className="inline-flex items-center rounded-full border border-foreground/10 bg-background-alt px-2.5 py-0.5 text-[11px] font-medium text-foreground/60"
            >
              {c}
            </li>
          ))}
        </ul>

        <Link
          href={`/portfolio/${project.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View project
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}
