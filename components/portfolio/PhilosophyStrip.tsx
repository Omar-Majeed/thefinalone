"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PhilosophyStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F9F9F9] py-28 text-foreground sm:py-36 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(90,187,74,0.06) 0%, rgba(249,249,249,0) 70%)",
        }}
      />
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
            Our Philosophy
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            We don&apos;t ship features.{" "}
            <span className="text-[#9CA3AF]">
              We ship outcomes — built with the patience of craftsmen and the
              precision of engineers.
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="mx-auto mt-12 h-px w-32 origin-left bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
