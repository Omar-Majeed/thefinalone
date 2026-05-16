"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#161B33] py-24 sm:py-28 lg:py-32">
      {/* ── Background effects ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Mesh gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(90,187,74,0.08), transparent 60%), radial-gradient(ellipse 40% 40% at 75% 30%, rgba(90,187,74,0.06), transparent 50%)",
          }}
        />
        {/* Blurred glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[140px]" />
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 15, -10],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[20%] top-[20%] h-[200px] w-[200px] rounded-full bg-primary/[0.04] blur-[80px]"
        />
        <motion.div
          animate={{
            x: [15, -15, 15],
            y: [10, -20, 10],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[15%] bottom-[25%] h-[180px] w-[180px] rounded-full bg-primary/[0.03] blur-[80px]"
        />
      </div>

      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Design Something
              <br />
              <span className="text-primary">Exceptional.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              We create modern digital experiences that balance aesthetics,
              usability, and performance — turning complex problems into
              interfaces people love.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white",
                  "shadow-[0_16px_40px_-18px_rgba(90,187,74,0.8)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-[#65C755] hover:shadow-[0_20px_50px_-18px_rgba(90,187,74,0.7)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#161B33]",
                )}
              >
                Book A Design Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/25">
              Free consultation · No commitment required
            </p>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-14 flex flex-wrap justify-center gap-8 border-t border-white/8 pt-8"
          >
            {[
              "Pixel-perfect delivery",
              "WCAG 2.1 AA compliant",
              "Dev-ready Figma files",
              "Unlimited revisions",
            ].map((item) => (
              <span key={item} className="text-xs font-medium text-white/20">
                ✦ {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
