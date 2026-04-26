"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IMPACT_COPY, IMPACT_METRICS, type Metric } from "@/constants/impact";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ImpactSection() {
  return (
    <section
      aria-label="Our impact in numbers"
      className="relative w-full overflow-hidden bg-[#0F172A] py-20 sm:py-24 lg:py-32"
    >
      {/* Radial brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(90,187,74,0.18) 0%, rgba(90,187,74,0) 70%)",
        }}
      />
      {/* Faint dot pattern */}
      <div
        aria-hidden
        className="impact-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
      />
      {/* Slow ambient gradient drift */}
      <div
        aria-hidden
        className="impact-drift pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2"
      />

      <div className="container mx-auto">
        {/* Top intro */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {IMPACT_COPY.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {IMPACT_COPY.heading}
          </h2>
          <p className="mt-5 text-base text-white/60 sm:text-lg">
            {IMPACT_COPY.subheading}
          </p>
        </motion.header>

        {/* Metrics grid */}
        <ul className="mt-16 grid grid-cols-2 gap-y-12 sm:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.li
              key={metric.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: i * 0.15,
              }}
              className={
                "group relative px-4 text-center transition-transform duration-300 ease-out hover:scale-[1.04] sm:px-6 " +
                // Vertical dividers between items (desktop only)
                (i > 0 ? "lg:border-l lg:border-white/10" : "")
              }
            >
              <MetricValue metric={metric} />
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[0.95rem]">
                {metric.label}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <style>{`
        .impact-grid {
          background-image: radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }

        @keyframes impact-drift {
          0%, 100% {
            transform: translate(-10%, -50%);
            opacity: 0.55;
          }
          50% {
            transform: translate(10%, -50%);
            opacity: 0.8;
          }
        }
        .impact-drift {
          background:
            radial-gradient(40% 60% at 30% 50%, rgba(90,187,74,0.10) 0%, transparent 70%),
            radial-gradient(40% 60% at 70% 50%, rgba(90,187,74,0.06) 0%, transparent 70%);
          animation: impact-drift 18s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .impact-drift { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Metric value (count-up + glow) ---------------- */

function MetricValue({ metric }: { metric: Metric }) {
  return (
    <div className="relative">
      {/* Soft glow behind the number; intensifies on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mx-auto block h-full w-3/4 rounded-full bg-primary/20 opacity-40 blur-3xl transition-opacity duration-300 ease-out group-hover:opacity-80"
      />
      <span
        className="block bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent transition-colors duration-300 ease-out group-hover:from-primary group-hover:to-primary/80 sm:text-6xl lg:text-[4.5rem]"
      >
        {metric.static ? (
          metric.static
        ) : (
          <CountNumber
            to={metric.value ?? 0}
            decimals={metric.decimals ?? 0}
            suffix={metric.suffix ?? ""}
          />
        )}
      </span>
    </div>
  );
}

/* ---------------- Count-up primitive ---------------- */

function CountNumber({
  to,
  decimals,
  suffix,
  durationMs = 1800,
}: {
  to: number;
  decimals: number;
  suffix: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReduced) {
        setValue(to);
        return;
      }

      const startTime = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / durationMs);
        setValue(ease(t) * to);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
