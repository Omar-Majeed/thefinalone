"use client";

import { motion } from "framer-motion";

const results = [
  { value: "+312%", label: "Average organic traffic increase", color: "#5ABB4A" },
  { value: "Top 3", label: "Avg. ranking for target keywords", color: "#5ABB4A" },
  { value: "8 Months", label: "Avg. time to significant ranking gains", color: "#5ABB4A" },
  { value: "94%", label: "Client retention rate", color: "#5ABB4A" },
  { value: "1,400+", label: "Keywords ranked in top 10 across clients", color: "#5ABB4A" },
  { value: "3.2x", label: "Average ROI on SEO investment", color: "#5ABB4A" },
];

export default function ResultsSection() {
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
            Proven Track Record
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-3">
            Results That Matter
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            We measure success in rankings, traffic, and revenue — not vanity
            metrics.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, i) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(90,187,74,0.12)" }}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm transition-all duration-300 overflow-hidden"
            >
              {/* Green left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5ABB4A] rounded-l-2xl" />

              {/* Subtle bg on hover */}
              <div className="absolute inset-0 bg-[#f0faf0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="text-5xl lg:text-6xl font-black text-black leading-none mb-3">
                  {result.value.includes("+") ? (
                    <>
                      <span className="text-[#5ABB4A]">+</span>
                      {result.value.replace("+", "")}
                    </>
                  ) : (
                    result.value
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-snug">{result.label}</p>
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
          * Average results across active SEO clients over a 12-month period
        </motion.p>
      </div>
    </section>
  );
}
