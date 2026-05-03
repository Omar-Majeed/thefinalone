"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    title: "Native App Development (iOS & Android)",
    description:
      "We build native mobile experiences when your product needs tighter hardware access, platform-specific polish, or highly optimized performance.",
  },
  {
    title: "Cross-Platform Apps (React Native)",
    description:
      "When speed and shared product velocity matter, we use React Native to deliver a strong experience across iOS and Android with a streamlined codebase.",
  },
  {
    title: "SDK Development & Integration",
    description:
      "We build and integrate SDKs for payments, messaging, analytics, and custom workflows while keeping mobile performance and maintainability intact.",
  },
  {
    title: "Performance Optimization",
    description:
      "From startup time to animation smoothness and network efficiency, we remove the friction that makes mobile products feel slow or unstable.",
  },
  {
    title: "App Store Deployment & Support",
    description:
      "We prepare your releases, manage deployment requirements, and help your team maintain quality across updates after launch.",
  },
];

export function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Core Features</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What we deliver across the mobile product lifecycle
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Each mobile engagement is scoped around the parts of the product
            that matter most now, without losing sight of what comes next.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.title}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] transition-colors duration-300",
                  isOpen ? "border-primary/40" : "border-[#E5E7EB]",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                >
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </p>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background-alt text-foreground">
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        isOpen && "rotate-180 text-primary",
                      )}
                      strokeWidth={2.2}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#EEF2F7] px-6 py-5 sm:px-7">
                        <p className="max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}