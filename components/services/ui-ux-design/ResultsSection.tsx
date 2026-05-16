"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const METRICS = [
  { target: 45, suffix: "%", label: "Better Engagement", prefix: "+" },
  { target: 3.2, suffix: "×", label: "Higher Conversions", prefix: "" },
  { target: 92, suffix: "%", label: "Improved Retention", prefix: "" },
  { target: 60, suffix: "%", label: "Faster User Flows", prefix: "" },
];

function AnimatedCounter({
  target,
  suffix,
  prefix,
  inView,
}: {
  target: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const isDecimal = target % 1 !== 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span>
      {prefix}
      {target % 1 !== 0 ? value.toFixed(1) : value}
      {suffix}
    </span>
  );
}

export function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" />
            Measurable Impact
            <span className="h-px w-6 bg-primary" />
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Design that moves metrics
          </h2>
          <p className="mt-4 text-base leading-8 text-gray-600">
            Our design work consistently delivers measurable business outcomes —
            not just beautiful pixels.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-5xl font-bold tracking-tight text-[#111827] sm:text-6xl lg:text-7xl">
                <AnimatedCounter
                  target={m.target}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  inView={inView}
                />
              </p>
              <p className="mt-3 text-sm font-medium text-gray-500">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
