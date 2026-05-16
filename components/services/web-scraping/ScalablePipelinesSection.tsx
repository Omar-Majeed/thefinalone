"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOG_LINES = [
  '[INF] Node_3: Extracted { id: "a1", price: "$49.99" }',
  '[INF] Node_1: Rotating proxy → 104.21.x.x',
  '[INF] Node_2: Saved 50 rows to PostgreSQL',
  '[SUC] Node_4: CAPTCHA solved in 1.2s',
  '[INF] Node_3: Extracted { id: "a2", price: "$59.99" }',
  '[INF] Node_1: Dedup removed 12 records',
  '[SUC] Node_2: Schema valid — pushed to queue',
  '[INF] Node_4: Next page → offset=250',
];

const BAR_HEIGHTS = [40, 65, 45, 80, 50, 95, 60, 85, 70, 100];

function LiveDashboard() {
  const [count, setCount] = useState(1_450_392);
  const [logIdx, setLogIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  // Live counter — SSR-safe: starts only on client
  useEffect(() => {
    const t = setInterval(() => {
      setCount((p) => p + Math.floor(22 + Math.random() * 38));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  // Rolling log stream
  useEffect(() => {
    const t = setInterval(() => {
      setLogIdx((prev) => {
        const next = (prev + 1) % LOG_LINES.length;
        setVisibleLogs((logs) => {
          const updated = [...logs, LOG_LINES[next]];
          return updated.slice(-4); // keep last 4 visible
        });
        return next;
      });
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]">
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-[#F3F4F6] px-6 py-4">
        <p className="text-sm font-semibold text-foreground">Pipeline Status</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold text-primary">LIVE</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Live counter */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
            Records extracted (24h)
          </p>
          <p className="mt-2 font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {count.toLocaleString()}
          </p>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-28">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-primary/50"
              initial={{ scaleY: 0, originY: 1 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Rolling log stream */}
        <div className="relative overflow-hidden rounded-xl border border-[#F3F4F6] bg-[#0d1117]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-[10px] text-white/25 tracking-wider">live-log</span>
          </div>
          <div className="relative h-[88px] overflow-hidden px-4 py-3">
            <motion.div
              key={logIdx}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              {visibleLogs.map((line, i) => (
                <p
                  key={i}
                  className={`font-mono text-[11px] leading-4 ${
                    line.startsWith("[SUC]") ? "text-primary/70" : "text-white/40"
                  }`}
                >
                  {line}
                </p>
              ))}
            </motion.div>
            {/* Fade out top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#0d1117] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { value: "10M+",  label: "Records / day capacity" },
  { value: "99.7%", label: "Pipeline uptime SLA"    },
  { value: "0",     label: "Downtime incidents YTD"  },
];

export function ScalablePipelinesSection() {
  return (
    <section className="bg-[#F4F3F0] py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — live dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="order-2 lg:order-1"
          >
            <LiveDashboard />
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold text-primary">Built for Scale</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Enterprise-grade infrastructure that never sleeps
            </h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              Whether you need thousands of pages a day or millions an hour,
              our distributed architecture handles JavaScript-heavy sites,
              CAPTCHAs, and dynamic layouts — with zero downtime and full
              observability.
            </p>

            {/* Stat strip */}
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB]">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white px-4 py-5 text-center">
                  <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {[
                "Distributed across multiple worker nodes",
                "Auto-scaling based on queue depth",
                "Alerting on extraction failures within 60s",
                "Full audit log of every record processed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#374151] sm:text-base">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
