"use client";

import { motion } from "framer-motion";
import { BarChart2, ShieldOff, Crosshair, Eye, Zap, Handshake } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const REASONS = [
  {
    icon: BarChart2,
    title: "Data-Driven Only",
    description:
      "Every decision is backed by analytics, not guesses. We show you the data behind every move we make, every month.",
  },
  {
    icon: ShieldOff,
    title: "No Black-Hat Methods",
    description:
      "We build sustainable rankings that survive algorithm updates. Your growth is safe, clean, and built to last.",
  },
  {
    icon: Crosshair,
    title: "Industry-Specific Strategy",
    description:
      "SEO strategies customized for your niche and competitors. What works for one industry rarely works for another.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description:
      "You see exactly what we are doing and why, every single month. No smoke, no mirrors — just honest reporting.",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description:
      "Strategies go live within two weeks of onboarding. We do not waste months on planning when you need results now.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partner",
    description:
      "We grow with you, not a one-time service. Your success is our success and we are in it for the long run.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Why Us</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What separates our SEO practice from the rest
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            There are hundreds of SEO agencies. Here is what makes us
            genuinely different.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_50px_-34px_rgba(15,23,42,0.28)] sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-base">
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
