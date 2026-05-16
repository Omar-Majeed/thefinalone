"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  {
    title: "Typography Systems",
    desc: "Hierarchical type scales with consistent sizing, weight, and leading across every breakpoint.",
    span: "col-span-1 sm:col-span-2 lg:col-span-1",
    preview: TypographyPreview,
  },
  {
    title: "Color Systems",
    desc: "Semantic palettes with accessibility-checked contrast ratios for every surface and state.",
    span: "col-span-1",
    preview: ColorPreview,
  },
  {
    title: "Accessibility",
    desc: "WCAG 2.1 AA compliance with screen reader optimization, focus management, and ARIA patterns.",
    span: "col-span-1",
    preview: AccessibilityPreview,
  },
  {
    title: "Responsive Design",
    desc: "Fluid layouts that adapt naturally from 320px to ultrawide, without breakpoint artifacts.",
    span: "col-span-1 lg:col-span-2",
    preview: ResponsivePreview,
  },
  {
    title: "Motion Systems",
    desc: "Documented easing curves, duration tokens, and choreography rules for consistent animation.",
    span: "col-span-1",
    preview: MotionPreview,
  },
  {
    title: "Component Libraries",
    desc: "Figma component libraries with documented variants, states, slots, and usage guidelines.",
    span: "col-span-1 sm:col-span-2 lg:col-span-1",
    preview: ComponentPreview,
  },
];

export function DesignSystemsSection() {
  return (
    <section className="bg-[#FAFAF7] py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" />
            Design Systems
            <span className="h-px w-6 bg-primary" />
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            Systems that scale with your product
          </h2>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            Every design decision is codified into a living system — tokens,
            components, and patterns that keep your product consistent as it
            grows.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const Preview = card.preview;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                className={`group rounded-[24px] border border-[#E5E5E0] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_-12px_rgba(90,187,74,0.1)] ${card.span}`}
              >
                {/* Preview */}
                <div className="mb-5 overflow-hidden rounded-xl bg-[#F8FAFC] p-4">
                  <Preview />
                </div>

                <h3 className="text-base font-bold tracking-tight text-[#111827]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Preview components ── */

function TypographyPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold text-[#111827]">Display</span>
        <span className="text-[10px] text-gray-400">48 / Bold</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-[#111827]">Heading</span>
        <span className="text-[10px] text-gray-400">24 / Semi</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-600">Body</span>
        <span className="text-[10px] text-gray-400">16 / Regular</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-400">Caption</span>
        <span className="text-[10px] text-gray-400">12 / Medium</span>
      </div>
    </div>
  );
}

function ColorPreview() {
  const swatches = [
    { color: "#5ABB4A", label: "Primary" },
    { color: "#111827", label: "Foreground" },
    { color: "#6B7280", label: "Muted" },
    { color: "#F4F1EC", label: "Surface" },
    { color: "#FAFAF7", label: "Background" },
  ];
  return (
    <div className="flex gap-2">
      {swatches.map((s) => (
        <div key={s.color} className="flex-1 text-center">
          <div
            className="mx-auto h-8 w-full rounded-lg border border-gray-100"
            style={{ backgroundColor: s.color }}
          />
          <p className="mt-1.5 text-[9px] font-medium text-gray-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function AccessibilityPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 rounded-lg bg-white p-2.5 shadow-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
          AA
        </span>
        <div>
          <span className="text-[11px] font-semibold text-[#111827]">Contrast: 7.2:1</span>
          <span className="ml-2 text-[9px] text-green-500">Pass</span>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-white p-2.5 shadow-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
          ⌨
        </span>
        <span className="text-[11px] font-semibold text-[#111827]">Focus indicators</span>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-white p-2.5 shadow-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-600">
          SR
        </span>
        <span className="text-[11px] font-semibold text-[#111827]">Screen reader tested</span>
      </div>
    </div>
  );
}

function ResponsivePreview() {
  return (
    <div className="flex items-end justify-center gap-3">
      {/* Mobile */}
      <div className="w-10 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <div className="h-14 rounded bg-gray-100 flex flex-col items-center justify-center gap-1 p-1">
          <span className="h-0.5 w-3/4 rounded-full bg-gray-300" />
          <span className="h-0.5 w-1/2 rounded-full bg-gray-200" />
          <span className="mt-1 h-2 w-3/4 rounded bg-primary/30" />
        </div>
      </div>
      {/* Tablet */}
      <div className="w-20 rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm">
        <div className="h-16 rounded bg-gray-100 flex flex-col items-center justify-center gap-1 p-1.5">
          <span className="h-0.5 w-3/4 rounded-full bg-gray-300" />
          <span className="h-0.5 w-1/2 rounded-full bg-gray-200" />
          <div className="mt-1 flex w-full gap-1">
            <span className="h-4 flex-1 rounded bg-gray-200" />
            <span className="h-4 flex-1 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="w-36 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
        <div className="h-20 rounded bg-gray-100 flex flex-col gap-1 p-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="h-0.5 w-8 rounded-full bg-gray-300" />
            <span className="ml-auto h-0.5 w-3 rounded-full bg-gray-200" />
            <span className="h-0.5 w-3 rounded-full bg-gray-200" />
          </div>
          <span className="h-1 w-3/4 rounded-full bg-gray-300" />
          <span className="h-0.5 w-1/2 rounded-full bg-gray-200" />
          <div className="mt-auto flex gap-1">
            <span className="h-3 flex-1 rounded bg-gray-200" />
            <span className="h-3 flex-1 rounded bg-gray-200" />
            <span className="h-3 flex-1 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MotionPreview() {
  return (
    <div className="space-y-3">
      {[
        { label: "ease-out", curve: "cubic-bezier(0.22, 1, 0.36, 1)", dur: "600ms" },
        { label: "spring", curve: "cubic-bezier(0.34, 1.56, 0.64, 1)", dur: "400ms" },
        { label: "linear", curve: "linear", dur: "300ms" },
      ].map((e) => (
        <div key={e.label} className="flex items-center gap-3">
          <span className="w-14 text-[10px] font-medium text-gray-500">{e.label}</span>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              animate={{ x: ["-100%", "0%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 1,
              }}
              className="absolute inset-y-0 left-0 right-0 rounded-full bg-primary/60"
            />
          </div>
          <span className="text-[9px] text-gray-400">{e.dur}</span>
        </div>
      ))}
    </div>
  );
}

function ComponentPreview() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg bg-white p-2 shadow-sm text-center">
        <div className="mx-auto h-6 w-full rounded-md bg-primary text-[8px] text-white flex items-center justify-center font-semibold">
          Button
        </div>
      </div>
      <div className="rounded-lg bg-white p-2 shadow-sm">
        <div className="h-3 rounded bg-gray-100 mb-1" />
        <div className="h-6 rounded-md border border-gray-200" />
      </div>
      <div className="rounded-lg bg-white p-2 shadow-sm">
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-primary/30" />
          <span className="h-1 w-8 mt-1 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="rounded-lg bg-white p-2 shadow-sm">
        <div className="flex gap-1">
          {["bg-primary", "bg-gray-200", "bg-gray-200"].map((c, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${c}`} />
          ))}
        </div>
        <p className="mt-1 text-[7px] text-gray-400 text-center">Step 1/3</p>
      </div>
    </div>
  );
}
