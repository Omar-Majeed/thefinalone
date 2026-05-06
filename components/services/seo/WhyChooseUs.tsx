"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "📈",
    title: "Data-Driven Only",
    description: "Every decision is backed by analytics, not guesses. We show you the data behind every move we make.",
  },
  {
    icon: "🚫",
    title: "No Black-Hat Tricks",
    description: "We build sustainable rankings that survive algorithm updates. Your growth is safe and long-lasting.",
  },
  {
    icon: "🎯",
    title: "Industry-Specific",
    description: "SEO strategies customized for your niche and competitors. What works for one industry won't work for another.",
  },
  {
    icon: "💬",
    title: "Full Transparency",
    description: "You see exactly what we're doing and why, every month. No smoke, no mirrors — just honest reporting.",
  },
  {
    icon: "⚡",
    title: "Fast Execution",
    description: "Strategies go live within 2 weeks of onboarding. We don't waste months on planning when you need results.",
  },
  {
    icon: "🤝",
    title: "Long-Term Partner",
    description: "We grow with you — not a one-time service. Your success is our success, and we're in it for the long run.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F9F9F9] py-24 px-6">
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
            Why Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-3">
            Why Choose Our SEO?
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            There are hundreds of SEO agencies. Here's what makes us different.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-[#f0faf0] rounded-2xl p-7 border border-[#5ABB4A]/10 hover:border-[#5ABB4A]/40 hover:shadow-lg hover:shadow-[#5ABB4A]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="text-lg font-black text-black mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
