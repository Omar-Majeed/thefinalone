"use client";

import { motion } from "framer-motion";
import { Layers3, Package, Smartphone } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLATFORM_CARDS = [
  {
    title: "Native Development",
    icon: Smartphone,
    items: ["Kotlin / Java (Android)", "Swift (iOS)"],
  },
  {
    title: "Cross-Platform",
    icon: Layers3,
    items: ["React Native"],
  },
  {
    title: "SDK Solutions",
    icon: Package,
    items: ["Payment SDKs", "Integration SDKs", "Custom mobile libraries"],
  },
];

export function PlatformCards() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Platform Approach</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose the right mobile delivery model for the product you are building
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            We shape the platform strategy around performance needs, release
            speed, and the systems your app needs to connect with.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLATFORM_CARDS.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
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
                  {card.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#4B5563] sm:text-base">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}