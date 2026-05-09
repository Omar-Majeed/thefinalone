"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, RefreshCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BentoChannels() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Full-Funnel Approach</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built to capture, convert, and retain
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            We map every channel to a stage of the funnel — so no budget is
            wasted and every touchpoint has a clear purpose.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto]">

          {/* Cell 1 — wide, dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="md:col-span-7 rounded-[28px] bg-foreground p-7 sm:p-9 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <TrendingUp className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                Awareness & Demand Generation
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/50">
                Paid social, display, and content marketing working together to
                put your brand in front of the right audience — before they are
                even searching.
              </p>
            </div>
            {/* Mini funnel visual */}
            <div className="mt-8 flex items-end gap-2 h-14">
              {[100, 82, 64, 48, 36].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-3 rounded-full bg-primary/60"
                  style={{ width: `${w}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: "easeOut" }}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/25">
              Funnel visualisation — awareness → conversion
            </p>
          </motion.div>

          {/* Cell 2 — narrow, light */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            className="md:col-span-5 rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                Lead Capture & Conversion
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                Landing pages, lead magnets, and retargeting sequences built
                to turn interest into qualified pipeline.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Google Ads", "Meta Ads", "LinkedIn", "Landing Pages"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-[#E5E7EB] bg-background-alt px-3 py-1.5 text-xs font-medium text-[#4B5563]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cell 3 — narrow, green tint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
            className="md:col-span-5 rounded-[28px] border border-primary/20 bg-primary/5 p-7 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Users className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                Audience Nurture
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                Email automations and social sequences that keep your brand
                top of mind through every stage of the buying journey.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-[#6B7280] mb-1.5">
                <span>Nurture efficiency</span>
                <span className="font-semibold text-foreground">74%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary/15">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "74%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Cell 4 — wide, light */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            className="md:col-span-7 rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] sm:p-9 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <RefreshCw className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                Retention & Lifetime Value
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                Win-back flows, loyalty campaigns, upsell sequences, and
                community strategies that maximise revenue from the customers
                you already have.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Repeat purchase rate", value: "+38%" },
                { label: "Email-driven revenue", value: "22%" },
                { label: "Churn reduction",       value: "−29%" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl bg-[#F3F4F6] px-3 py-4 text-center"
                >
                  <p className="text-xl font-semibold tracking-tight text-foreground">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#6B7280]">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
