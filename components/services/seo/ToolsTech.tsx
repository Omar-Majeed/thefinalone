"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Google Search Console", abbr: "GSC", category: "Analytics" },
  { name: "SEMrush", abbr: "SEM", category: "Research" },
  { name: "Ahrefs", abbr: "AHR", category: "Backlinks" },
  { name: "Google Analytics 4", abbr: "GA4", category: "Analytics" },
  { name: "Screaming Frog", abbr: "SCF", category: "Technical" },
  { name: "Surfer SEO", abbr: "SRF", category: "Content" },
  { name: "Moz Pro", abbr: "MOZ", category: "Authority" },
  { name: "PageSpeed Insights", abbr: "PSI", category: "Performance" },
];

export default function ToolsTech() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#5ABB4A] text-sm font-semibold uppercase tracking-widest">
            Our Arsenal
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-3">
            Tools & Technologies
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Industry-leading tools that give us — and your site — a competitive
            edge in search.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ borderColor: "#5ABB4A", y: -4 }}
              className="group flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm cursor-default transition-all duration-300"
            >
              {/* Abbr badge */}
              <div className="w-14 h-14 rounded-xl bg-gray-50 group-hover:bg-[#f0faf0] flex items-center justify-center transition-colors duration-300">
                <span className="text-sm font-black text-gray-400 group-hover:text-[#5ABB4A] transition-colors duration-300 tracking-wider">
                  {tool.abbr}
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-black group-hover:text-[#5ABB4A] transition-colors duration-300 leading-tight">
                  {tool.name}
                </p>
                <span className="text-xs text-gray-400 mt-0.5 inline-block">
                  {tool.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-10"
        >
          Combined with proprietary tracking workflows built for maximum results
        </motion.p>
      </div>
    </section>
  );
}
