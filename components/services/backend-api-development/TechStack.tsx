"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TECH_GROUPS = [
  { title: "Languages", items: ["Java", "Node.js"] },
  { title: "Frameworks", items: ["Spring Boot", "Express"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { title: "Infrastructure", items: ["Docker", "AWS"] },
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-20 text-white sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Technology</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Technologies &amp; Infrastructure
          </h2>
          <p className="mt-4 text-base leading-8 text-white/65 sm:text-lg">
            We choose the languages, frameworks, and infrastructure that fit
            your product&apos;s scale, team, and operational needs.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_GROUPS.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-[#0B1220]/80 px-4 py-3 text-base font-medium text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
