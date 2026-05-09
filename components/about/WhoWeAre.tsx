"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      {/* Oversized faded background word */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 select-none text-[clamp(80px,14vw,180px)] font-semibold uppercase leading-none tracking-tighter text-foreground/[0.03]"
      >
        Agency
      </div>

      <div className="container px-6">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">

          {/* LEFT — label + animated vertical line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-row items-start gap-6 lg:flex-col"
          >
            <div className="relative flex flex-col items-center">
              {/* Animated vertical line */}
              <div className="h-12 w-px bg-[#E5E7EB] lg:h-20" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                className="absolute top-0 h-12 w-px origin-top bg-primary lg:h-20"
              />
              <span className="mt-3 h-2 w-2 rounded-full bg-primary" />
            </div>
            <span className="pt-1 text-sm font-semibold text-primary lg:pt-0">
              Who We Are
            </span>
          </motion.div>

          {/* RIGHT — content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
            >
              We engineer modern digital experiences built for{" "}
              <span className="text-primary">scale</span>,{" "}
              performance, and long-term growth.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="mt-8 grid gap-8 sm:grid-cols-2"
            >
              <div>
                <p className="text-base leading-8 text-[#6B7280]">
                  We are a focused digital agency that works at the intersection
                  of engineering precision and creative strategy. Every project
                  we take on is treated as a long-term system — not a one-time
                  deliverable.
                </p>
              </div>
              <div>
                <p className="text-base leading-8 text-[#6B7280]">
                  Our team brings together product engineers, designers, and
                  growth strategists who care deeply about the craft. We build
                  things that work reliably, look exceptional, and grow with
                  your business.
                </p>
              </div>
            </motion.div>

            {/* Value pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                "Engineering-led",
                "Design-conscious",
                "Performance-obsessed",
                "Systems thinkers",
                "Client-focused",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-[#E5E7EB] bg-background-alt px-4 py-2 text-sm font-medium text-[#4B5563] transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
