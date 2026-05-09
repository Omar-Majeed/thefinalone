"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ShieldCheck, Star, Users } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, inView: boolean, duration = 1600) {
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

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 94,  suffix: "%", label: "Client retention rate" },
  { value: 48,  suffix: "h", label: "Avg. first response" },
];

const SERVICES_LIST = [
  "Web Development",
  "Mobile App Development",
  "Backend & API Development",
  "SEO",
  "Digital Marketing",
  "UI/UX Design",
  "AI Integration",
  "Web Scraping",
];

const TESTIMONIAL = {
  quote:
    "They didn't just build what we asked for — they challenged our assumptions and delivered something far better. The whole process felt like working with a senior internal team.",
  author: "Sarah K.",
  role: "Co-founder, Fintech startup",
};

export function TrustPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const c0 = useCountUp(120, inView);
  const c1 = useCountUp(94, inView);
  const c2 = useCountUp(48, inView);
  const counts = [c0, c1, c2];

  return (
    <div ref={ref} className="flex h-full flex-col justify-between gap-10 py-2">

      {/* Eyebrow + heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Get In Touch
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
          Let&apos;s build something that actually performs
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/50">
          Tell us about your project. We review every message personally and
          reply within one business day — no automated responses.
        </p>
      </motion.div>

      {/* Animated stat row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
        className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center bg-white/[0.03] px-3 py-5 text-center">
            <p className="text-3xl font-semibold text-white">
              {counts[i]}
              <span className="text-primary">{s.suffix}</span>
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/30">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Services we cover */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
          Services we cover
        </p>
        <div className="flex flex-wrap gap-2">
          {SERVICES_LIST.map((s) => (
            <span
              key={s}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Testimonial */}
      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
        className="rounded-2xl border border-white/8 bg-white/[0.04] p-6"
      >
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-sm leading-7 text-white/60 italic">
          &ldquo;{TESTIMONIAL.quote}&rdquo;
        </p>
        <footer className="mt-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{TESTIMONIAL.author}</p>
            <p className="text-xs text-white/30">{TESTIMONIAL.role}</p>
          </div>
        </footer>
      </motion.blockquote>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2.5 text-sm text-white/40">
          <Clock className="h-4 w-4 shrink-0 text-primary/60" strokeWidth={2} />
          Typical reply within 4–8 business hours
        </div>
        <div className="flex items-center gap-2.5 text-sm text-white/40">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary/60" strokeWidth={2} />
          Your information is never shared or sold
        </div>
      </motion.div>
    </div>
  );
}
