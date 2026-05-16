"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    quote:
      "They didn't just redesign our dashboard — they reimagined how our users think about data. Task completion went from 31% to 84% in three months.",
    name: "Sarah Chen",
    role: "VP Product",
    company: "NexaRetail",
    rating: 5,
  },
  {
    quote:
      "The level of craft in every interaction is something I've only seen at companies like Apple. Our app store rating jumped to 4.9 after the redesign.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "FinStack",
    rating: 5,
  },
  {
    quote:
      "Their design system saved us hundreds of engineering hours. Components are pixel-perfect, accessible, and the documentation is better than most open-source libraries.",
    name: "Amara Johnson",
    role: "Head of Engineering",
    company: "BuildTrack",
    rating: 5,
  },
];

export function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const prev = () => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-[#0F172A] py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Subtle lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" />
            Client Testimonials
            <span className="h-px w-6 bg-primary" />
          </span>
        </motion.div>

        {/* Testimonial card */}
        <div className="mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-[28px] border border-white/8 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-12"
            >
              {/* Star rating */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl sm:leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-8">
                {/* Avatar placeholder */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="mt-3 text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-white/20 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
