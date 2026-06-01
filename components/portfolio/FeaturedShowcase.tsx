"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioItem } from "@/constants/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = { items: PortfolioItem[] };

export function FeaturedShowcase({ items }: Props) {
  return (
    <section
      id="featured-work"
      className="relative isolate overflow-hidden bg-white py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 0% 0%, rgba(90,187,74,0.05) 0%, rgba(255,255,255,0) 70%), radial-gradient(50% 40% at 100% 100%, rgba(99,102,241,0.04) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-20 max-w-3xl text-center sm:mb-28"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
            Featured Work
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Three stories.{" "}
            <span className="text-[#9CA3AF]">Three measurable outcomes.</span>
          </h2>
        </motion.div>

        <div className="space-y-28 sm:space-y-36">
          {items.map((item, i) => (
            <FeaturedBlock key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedBlock({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reverse = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Visual */}
      <motion.div style={{ y }} className="relative lg:col-span-7">
        <div className="group relative aspect-[16/11] overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F9F9F9] shadow-[0_40px_90px_-40px_rgba(15,23,42,0.35)]">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={item.cover}
              alt={`${item.title} preview`}
              fill
              sizes="(max-width:1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              priority={index === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(90,187,74,0.18) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          {item.gallery[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
              className="absolute -bottom-8 -right-6 hidden h-40 w-64 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] sm:block lg:h-48 lg:w-80"
            >
              <Image
                src={item.gallery[0]}
                alt={`${item.title} secondary view`}
                fill
                sizes="(max-width:1024px) 40vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="space-y-7"
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#9CA3AF]">
            <span className="text-primary">{item.category}</span>
            <span aria-hidden className="h-px w-6 bg-[#E5E7EB]" />
            <span>{item.year}</span>
          </div>
          <h3 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
            {item.title}
          </h3>
          <p className="text-base text-[#6B7280]">{item.tagline}</p>

          <div className="space-y-5 border-l border-[#E5E7EB] pl-5">
            <StoryRow label="Challenge" body={item.challenge} />
            <StoryRow label="Solution" body={item.solution} />
            <StoryRow label="Outcome" body={item.outcome} />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {item.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.18)]"
              >
                <div className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                  {m.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {item.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#E5E7EB] bg-[#F9F9F9] px-3 py-1 text-xs text-[#4B5563]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="pt-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Discuss a similar build
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StoryRow({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.24em] text-[#9CA3AF]">
        {label}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">{body}</p>
    </div>
  );
}
