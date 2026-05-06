"use client";

import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: "easeInOut", delay: 0.3 },
  },
};

export default function HeroSection() {
  return (
    <section className="bg-[#F9F9F9] pt-32 pb-24 px-6 overflow-hidden relative">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #5ABB4A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-white border border-[#5ABB4A]/30 text-sm font-semibold text-primary px-4 py-2 rounded-full w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#5ABB4A] animate-pulse" />
              Search Engine Optimization
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Rank Higher.{" "}
              <span className="text-[#5ABB4A]">Get Found.</span>{" "}
              Grow Faster.
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg max-w-lg">
              We engineer data-driven SEO strategies that put your business at
              the top of search results — and keep it there. No shortcuts, no
              black-hat tricks. Just results.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-[#5ABB4A] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#4aa83b] transition-all duration-300 hover:shadow-lg hover:scale-105">
                Get Free SEO Audit
              </button>
              <button className="border-2 border-black text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300">
                View Case Studies
              </button>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { value: "312%", label: "Avg. Traffic Growth" },
                { value: "1,400+", label: "Keywords Ranked" },
                { value: "94%", label: "Client Retention" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-semibold text-[#5ABB4A]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Animated SVG ranking graph */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Keyword Rankings
                  </p>
                  <p className="text-lg font-semibold tracking-tight text-foreground mt-0.5">
                    Your Growth Chart
                  </p>
                </div>
                <span className="bg-[#f0faf0] text-[#5ABB4A] text-sm font-bold px-3 py-1 rounded-full">
                  ↑ Live
                </span>
              </div>

              {/* Ranking bars visual */}
              <div className="flex items-end gap-3 h-40 mb-4">
                {[
                  { month: "Jan", height: 30, pos: 18 },
                  { month: "Feb", height: 45, pos: 14 },
                  { month: "Mar", height: 55, pos: 11 },
                  { month: "Apr", height: 70, pos: 8 },
                  { month: "May", height: 85, pos: 5 },
                  { month: "Jun", height: 95, pos: 3 },
                  { month: "Jul", height: 100, pos: 1 },
                ].map((bar, i) => (
                  <div
                    key={bar.month}
                    className="flex flex-col items-center gap-1 flex-1"
                  >
                    <span className="text-xs font-bold text-[#5ABB4A]">
                      #{bar.pos}
                    </span>
                    <motion.div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#5ABB4A] to-[#7dd96f]"
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.height}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5 + i * 0.1,
                        ease: "easeOut",
                      }}
                      style={{ height: `${bar.height}%` }}
                    />
                    <span className="text-xs text-gray-400 font-medium">{bar.month}</span>
                  </div>
                ))}
              </div>

              {/* SVG trend line */}
              <svg
                viewBox="0 0 300 60"
                className="w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,55 C40,50 60,40 90,32 C120,24 140,18 170,12 C200,6 230,3 300,1"
                  fill="none"
                  stroke="#5ABB4A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  variants={drawLine}
                  initial="hidden"
                  animate="visible"
                />
                <motion.circle
                  cx="300"
                  cy="1"
                  r="4"
                  fill="#5ABB4A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.3 }}
                />
              </svg>

              {/* Bottom tag */}
              <div className="mt-4 bg-[#f0faf0] rounded-xl px-4 py-3 flex items-center justify-between">
                 <span className="text-sm text-gray-600 font-semibold">Avg. position improvement</span>
                 <span className="text-lg font-semibold text-[#5ABB4A]">#18 → #1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
