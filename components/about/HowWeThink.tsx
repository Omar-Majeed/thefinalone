"use client";

import { motion } from "framer-motion";
import { Layers, Zap, Pen, TrendingUp, BarChart2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  {
    icon: Layers,
    title: "Systems First",
    description:
      "We design with the full system in mind — not just the current feature. Every decision considers what comes next.",
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    description:
      "Speed is not an afterthought. We optimise at every layer — code, assets, infrastructure, and interaction.",
  },
  {
    icon: Pen,
    title: "Design With Purpose",
    description:
      "Every visual decision serves a function. We do not add complexity for its own sake — clarity always wins.",
  },
  {
    icon: TrendingUp,
    title: "Built To Scale",
    description:
      "Architecture decisions made at the start determine how far you can grow. We make them count.",
  },
  {
    icon: BarChart2,
    title: "Results Over Noise",
    description:
      "We measure success by outcomes, not output. Traffic, conversions, retention — not just deliverables.",
  },
];

export function HowWeThink() {
  return (
    <section id="about-mindset" className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Mindset</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built around systems, performance, and growth
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            The principles we hold to on every project — regardless of size,
            budget, or industry.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_24px_50px_-30px_rgba(90,187,74,0.2)] sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
