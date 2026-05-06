"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: "🔍",
    title: "Technical SEO Audit",
    description:
      "Deep crawl of your site's structure, speed, and indexability issues. We find what's hurting your rankings and fix it fast.",
  },
  {
    icon: "📝",
    title: "Content Strategy",
    description:
      "Keyword-mapped content plans that attract and convert the right audience. Every piece of content has a ranking purpose.",
  },
  {
    icon: "🔗",
    title: "Link Building",
    description:
      "High-authority backlinks that boost your domain credibility. We build relationships, not just links.",
  },
  {
    icon: "📍",
    title: "Local SEO",
    description:
      "Dominate local search results and Google Maps rankings. Capture customers searching in your area right now.",
  },
  {
    icon: "🛒",
    title: "E-commerce SEO",
    description:
      "Product and category optimization for maximum organic sales. Turn search traffic into revenue.",
  },
  {
    icon: "📊",
    title: "SEO Analytics",
    description:
      "Monthly reporting with clear KPIs and actionable insights. You always know exactly what's working and why.",
  },
];

export default function WhatWeDo() {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[#5ABB4A] text-sm font-semibold uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-3">
            What We Do
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl">
            Full-spectrum SEO services engineered to grow your organic presence
            from every angle.
          </p>
        </motion.div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-400 mb-4 flex items-center gap-2"
        >
          <span>←</span> Drag to explore <span>→</span>
        </motion.p>

        {/* Horizontal scroll container */}
        <motion.div
          ref={dragRef}
          className="flex gap-5 overflow-x-scroll pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          drag="x"
          dragConstraints={dragRef}
          whileTap={{ cursor: "grabbing" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="min-w-[280px] max-w-[280px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4 select-none"
            >
              <div className="w-12 h-12 bg-[#f0faf0] rounded-xl flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">{service.title}</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-auto pt-2">
                <span className="text-[#5ABB4A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
