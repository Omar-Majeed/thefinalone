"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const MANIFESTO = [
  { line: "Clean architecture.",  accent: false },
  { line: "Fast interfaces.",     accent: true  },
  { line: "Scalable systems.",    accent: false },
  { line: "Real results.",        accent: false },
];

export function Philosophy() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground py-20 sm:py-24 lg:py-28">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[100px]"
      />
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — manifesto */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-primary"
            >
              Our Philosophy
            </motion.span>

            <div className="mt-6 space-y-2">
              {MANIFESTO.map((item, i) => (
                <motion.p
                  key={item.line}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                  className={`text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.2rem] ${
                    item.accent ? "text-primary" : "text-white"
                  }`}
                >
                  {item.line}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
              className="mt-8 max-w-md text-base leading-8 text-white/50"
            >
              These are not aspirations. They are the standards we hold every
              piece of work to — from the first line of code to the final
              deployment.
            </motion.p>
          </div>

          {/* RIGHT — layered UI stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            className="relative mx-auto h-[400px] w-full max-w-[420px]"
          >
            {/* Terminal — back */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="absolute left-0 top-6 w-[220px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0d1117] p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="mb-3 flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
                <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
                <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <p className="text-primary">$ npm run build</p>
                <p className="text-white/40">✓ Compiled in 2.1s</p>
                <p className="text-white/40">✓ Linted 0 errors</p>
                <p className="text-white/40">✓ Types valid</p>
                <p className="text-primary">✓ Ready to ship</p>
              </div>
            </motion.div>

            {/* Architecture diagram — middle */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-0 z-20 w-[200px] -translate-x-1/3 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Architecture</p>
              <div className="mt-4 space-y-2">
                {["API Layer", "Service Layer", "Data Layer"].map((layer, i) => (
                  <div key={layer} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary/60" style={{ opacity: 1 - i * 0.2 }} />
                    <span className="text-xs text-white/50">{layer}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-px bg-white/10" />
              <p className="mt-3 text-xs text-primary/70">99.9% uptime target</p>
            </motion.div>

            {/* Dashboard card — bottom right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute bottom-0 right-0 z-10 w-[210px] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Performance</p>
              <p className="mt-1 text-3xl font-semibold text-white">99<span className="text-primary text-xl">/100</span></p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "99%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-white/30">Lighthouse score</p>
            </motion.div>

            {/* Central glow */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
