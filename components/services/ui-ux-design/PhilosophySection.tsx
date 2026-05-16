"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      {/* Oversized faded background typography */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap text-[12rem] font-bold leading-none tracking-tight text-gray-100/60 sm:text-[16rem] lg:text-[20rem]">
          Design
        </span>
      </div>

      {/* Subtle gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(90,187,74,0.04), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated vertical accent line */}
          <motion.div
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto mb-8 h-16 w-px bg-primary"
          />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="h-px w-6 bg-primary" />
            Our Philosophy
            <span className="h-px w-6 bg-primary" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Great Design Is Invisible
            <br />
            Until It Matters.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-gray-600"
          >
            The best interfaces don&apos;t demand attention — they earn trust
            through clarity, consistency, and thoughtful restraint. We design
            products where every detail serves the user, and nothing competes
            for attention that hasn&apos;t earned it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="mx-auto mt-10 flex items-center justify-center gap-8"
          >
            {[
              { value: "Clarity", desc: "over complexity" },
              { value: "Purpose", desc: "over decoration" },
              { value: "Craft", desc: "over speed" },
            ].map((p) => (
              <div key={p.value} className="text-center">
                <p className="text-sm font-bold text-[#111827]">{p.value}</p>
                <p className="mt-0.5 text-xs text-gray-400">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
