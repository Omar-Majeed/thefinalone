"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOATING_PANELS = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    alt: "Analytics dashboard preview",
    className:
      "left-[4%] top-[18%] h-40 w-64 sm:h-52 sm:w-80 lg:h-60 lg:w-96",
    depth: 30,
    rotate: -6,
    delay: 0.1,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    alt: "Mobile commerce preview",
    className:
      "right-[6%] top-[12%] h-44 w-32 sm:h-56 sm:w-40 lg:h-72 lg:w-52",
    depth: -45,
    rotate: 8,
    delay: 0.2,
  },
  {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    alt: "Fintech UI surface",
    className:
      "right-[10%] bottom-[14%] h-36 w-56 sm:h-44 sm:w-72 lg:h-52 lg:w-80",
    depth: 55,
    rotate: -4,
    delay: 0.35,
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80",
    alt: "AI interface preview",
    className:
      "left-[8%] bottom-[10%] h-36 w-48 sm:h-44 sm:w-64 lg:h-52 lg:w-72",
    depth: -30,
    rotate: 6,
    delay: 0.25,
  },
];

export function PortfolioHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.8 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0B0F19] py-28 text-white sm:py-32 lg:py-36"
    >
      {/* Deep gradient floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(90,187,74,0.10) 0%, rgba(11,15,25,0) 55%), radial-gradient(80% 60% at 80% 100%, rgba(26,26,46,0.9) 0%, rgba(11,15,25,0) 60%), linear-gradient(180deg, #0B0F19 0%, #0B1120 100%)",
        }}
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        }}
      />
      {/* Drifting light blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[140px]"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[160px]"
        animate={{ x: [0, -50, 30, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating project panels */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {FLOATING_PANELS.map((p, i) => (
          <FloatingPanel key={i} panel={p} smoothX={smoothX} smoothY={smoothY} />
        ))}
      </div>

      <div className="container relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-5xl text-center text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[5.25rem]"
        >
          Digital experiences{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
              built to perform
            </span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              className="absolute -bottom-2 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base text-white/60 sm:text-lg"
        >
          A cinematic showcase of the products, agents and platforms we&apos;ve
          shipped for ambitious teams across commerce, fintech, healthcare and AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="#featured-work"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(90,187,74,0.4),0_20px_60px_-20px_rgba(90,187,74,0.7)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06]"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-20 flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40"
        >
          <span>Scroll to explore</span>
          <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 block h-1/2 bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

type FloatingPanelProps = {
  panel: (typeof FLOATING_PANELS)[number];
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
};

function FloatingPanel({ panel, smoothX, smoothY }: FloatingPanelProps) {
  const tx = useTransform(smoothX, (v) => v * panel.depth);
  const ty = useTransform(smoothY, (v) => v * panel.depth);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: panel.delay }}
      style={{ x: tx, y: ty, rotate: panel.rotate }}
      className={`absolute ${panel.className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 8 + panel.delay * 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm"
      >
        <Image
          src={panel.src}
          alt={panel.alt}
          fill
          sizes="(max-width:768px) 40vw, 25vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19]/40 via-[#0B0F19]/20 to-primary/10" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </motion.div>
    </motion.div>
  );
}
