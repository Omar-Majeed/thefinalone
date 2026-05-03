"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLETS = [
  "Conversion-focused frontends and product experiences",
  "Flexible architecture built for growth and iteration",
  "Performance, security, and maintainability from day one",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(90,187,74,0.16), transparent 34%), linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-6rem] top-16 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
        <div className="absolute inset-x-0 top-0 overflow-hidden">
          <FloatingUIVisual className="ml-auto h-[360px] w-[520px] max-w-none translate-x-[34%] translate-y-6 opacity-[0.28] sm:h-[400px] sm:w-[560px] sm:translate-x-[20%] sm:opacity-[0.34]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.76)_44%,#FFFFFF_100%)]" />
      </div>

      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 max-w-xl"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Web Development
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.45rem] lg:leading-[1.08]">
              Build fast, scalable, and modern web applications
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              We design and engineer web products that feel polished on the
              surface and stay dependable as your users, features, and traffic
              grow.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#374151] sm:text-base">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white",
                  "shadow-[0_16px_30px_-18px_rgba(90,187,74,0.95)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_20px_38px_-18px_rgba(90,187,74,0.9)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                Let&apos;s Build Your Product
              </Link>

              <Link
                href="/#case-studies"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View Portfolio
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="relative mx-auto hidden h-[390px] w-full max-w-[560px] sm:h-[440px] lg:block"
          >
            <FloatingUIVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingUIVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-10 top-10 rounded-[30px] border border-white/70 bg-white/95 p-5 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.34)] backdrop-blur"
      >
        <div className="flex items-center gap-2 border-b border-[#EEF2F7] pb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86EFAC]" />
          <span className="ml-3 text-xs font-medium text-[#6B7280]">
            Product dashboard
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Traffic
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
                +18%
              </span>
            </div>
            <div className="mt-4 flex h-32 items-end gap-2">
              {[38, 54, 47, 72, 64, 88, 79].map((value, index) => (
                <span
                  key={`${value}-${index}`}
                  className="flex-1 rounded-t-full bg-primary/80"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#EEF2F7] p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Release health
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ["Build success", "99.9%"],
                  ["Page load", "1.3s"],
                  ["API uptime", "99.98%"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">{label}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-foreground px-4 py-5 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                Active sprint
              </p>
              <p className="mt-2 text-lg font-semibold">Checkout revamp</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-0 top-0 w-[210px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_26px_50px_-32px_rgba(15,23,42,0.36)] backdrop-blur"
      >
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
          Analytics
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          24.8k
        </p>
        <p className="mt-1 text-sm text-primary">Weekly active users</p>
        <div className="mt-4 flex gap-2">
          {[52, 68, 64, 82, 74].map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="flex-1 rounded-t-full bg-[#D1FAE5]"
              style={{ height: `${value}px` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-4 left-0 w-[250px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_26px_50px_-32px_rgba(15,23,42,0.36)] backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
            API response
          </p>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
            200 OK
          </span>
        </div>
        <div className="mt-4 rounded-xl bg-[#0F172A] p-4 font-mono text-xs text-[#CFFFE0]">
          <p>{"{"}</p>
          <p className="mt-1">&nbsp;&nbsp;"status": "healthy",</p>
          <p className="mt-1">&nbsp;&nbsp;"latency": "118ms",</p>
          <p className="mt-1">&nbsp;&nbsp;"region": "global"</p>
          <p className="mt-1">{"}"}</p>
        </div>
      </motion.div>
    </div>
  );
}