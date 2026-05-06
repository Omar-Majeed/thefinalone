"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your current site, competitors, and target keywords to build a clear picture of opportunities. No assumptions — only data.",
    icon: "🔎",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    description:
      "A custom 90-day SEO roadmap tailored to your business goals and industry. You'll know exactly what we're doing and when.",
    icon: "🗺️",
  },
  {
    number: "03",
    title: "On-Page Optimization",
    description:
      "We optimize every page — titles, meta, content, internal links, schema markup. The technical foundation that search engines reward.",
    icon: "⚙️",
  },
  {
    number: "04",
    title: "Authority Building",
    description:
      "Targeted outreach and content marketing to earn high-quality backlinks. We build your domain's trust, one quality link at a time.",
    icon: "🔗",
  },
  {
    number: "05",
    title: "Monitor & Scale",
    description:
      "Monthly reporting, algorithm updates tracking, and continuous iteration. SEO is a long game — we stay in it with you.",
    icon: "📊",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-[#F9F9F9] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#5ABB4A] text-sm font-semibold uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-3">
            Our SEO Process
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            A proven 5-step framework that turns struggling websites into
            ranking machines.
          </p>
        </motion.div>

        {/* Zig-zag steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-12 bg-gradient-to-b from-[#5ABB4A]/40 to-transparent z-10 hidden lg:block" />
                )}

                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10 ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Content block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className={`${!isEven ? "lg:order-2" : ""}`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{step.icon}</div>
                        <div>
                          <h3 className="text-xl font-black text-black">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mt-2 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Number badge */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    className={`flex items-center justify-center ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      {/* Outer ring */}
                      <div className="w-32 h-32 rounded-full border-2 border-[#5ABB4A]/20 flex items-center justify-center">
                        {/* Inner circle */}
                        <div className="w-24 h-24 rounded-full bg-[#5ABB4A] flex items-center justify-center shadow-lg shadow-[#5ABB4A]/30">
                          <span className="text-white text-3xl font-black">
                            {step.number}
                          </span>
                        </div>
                      </div>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border border-[#5ABB4A]/20 animate-ping opacity-30" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
