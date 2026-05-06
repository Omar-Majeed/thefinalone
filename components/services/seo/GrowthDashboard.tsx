"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const metrics = [
  { label: "Organic Traffic Increase", value: 312, suffix: "%", icon: "📈" },
  { label: "Keywords in Top 10", value: 1400, suffix: "+", icon: "🔑" },
  { label: "Domain Authority Gained", value: 33, suffix: " pts", icon: "🏆" },
];

const bars = [
  { label: "Q1", value: 28 },
  { label: "Q2", value: 47 },
  { label: "Q3", value: 68 },
  { label: "Q4", value: 91 },
  { label: "Now", value: 100 },
];

export default function GrowthDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const v1 = useCountUp(312, 2000, inView);
  const v2 = useCountUp(1400, 2000, inView);
  const v3 = useCountUp(33, 2000, inView);
  const counts = [v1, v2, v3];

  return (
    <section ref={ref} className="bg-[#0c0c0c] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#5ABB4A] text-xs font-semibold uppercase tracking-[0.22em]">
            Real Results. Real Data.
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-3 tracking-tight">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mt-4 max-w-xl mx-auto">
            Average results across our SEO clients over 12 months of engagement.
          </p>
        </motion.div>

        {/* Dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#161616] border border-white/10 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Metric cards */}
            <div className="flex flex-col gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-5 bg-white/5 rounded-2xl px-6 py-5 border border-white/5 hover:border-[#5ABB4A]/30 transition-all duration-300"
                >
                  <span className="text-3xl">{m.icon}</span>
                  <div>
                    <div className="text-4xl font-black text-white">
                      {counts[i].toLocaleString()}
                      <span className="text-[#5ABB4A]">{m.suffix}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-[0.18em]">{m.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right — Animated bar graph */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-[0.18em] mb-6">
                Organic Traffic Growth Timeline
              </p>
              <div className="flex items-end gap-4 h-48">
                {bars.map((bar, i) => (
                  <div
                    key={bar.label}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <motion.div
                      className="w-full rounded-t-xl relative overflow-hidden"
                      style={{
                        background:
                          bar.label === "Now"
                            ? "#5ABB4A"
                            : "rgba(90,187,74,0.25)",
                        height: `${bar.value}%`,
                      }}
                      initial={{ scaleY: 0, originY: 1 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + i * 0.12,
                        ease: "easeOut",
                      }}
                    >
                      {bar.label === "Now" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5ABB4A] to-[#7dd96f]" />
                      )}
                    </motion.div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-[0.18em]">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Domain Authority progress */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Domain Authority</span>
                  <span className="text-white font-bold">28 → 61</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#5ABB4A] to-[#7dd96f] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "81%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2 uppercase tracking-[0.18em]">
                  Scale: 0–75 (industry competitive range)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
