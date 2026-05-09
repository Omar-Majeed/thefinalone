"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return count;
}

const METRICS = [
  { value: 120, suffix: "+",    label: "Projects delivered",      sub: "Across web, mobile, and marketing" },
  { value: 99,  suffix: ".9%",  label: "Performance focus",       sub: "Target Lighthouse score on every build" },
  { value: 8,   suffix: "+",     label: "Years of craft",          sub: "Building digital products since 2016" },
  { value: 94,  suffix: "%",    label: "Client retention rate",   sub: "Clients who return for the next project" },
];

export function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const c0 = useCountUp(120, inView);
  const c1 = useCountUp(99,  inView);
  const c2 = useCountUp(8,   inView);
  const c3 = useCountUp(94,  inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-foreground py-20 sm:py-24 lg:py-28">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold text-primary">The Proof</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Numbers we stand behind
          </h2>
        </motion.div>

        {/* Metrics grid — editorial mosaic */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/8 overflow-hidden rounded-[28px] border border-white/8 sm:grid-cols-2">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="relative flex flex-col justify-between bg-white/[0.03] px-8 py-10 sm:px-10 sm:py-12"
            >
              {/* Subtle glow per cell */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/25">
                {m.label}
              </p>
              <div className="mt-6">
                <p className="text-7xl font-semibold tracking-tight text-white leading-none sm:text-8xl">
                  {counts[i]}
                  <span className="text-primary">{m.suffix}</span>
                </p>
                <p className="mt-4 text-sm leading-6 text-white/35">{m.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
