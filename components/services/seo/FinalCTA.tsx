"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-[#111111] py-24 px-6 relative overflow-hidden">
      {/* Decorative green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5ABB4A] opacity-10 blur-3xl pointer-events-none" />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #5ABB4A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#5ABB4A]/10 border border-[#5ABB4A]/30 text-[#5ABB4A] text-sm font-semibold px-5 py-2 rounded-full">
            <span className="w-2 h-2 bg-[#5ABB4A] rounded-full animate-pulse" />
            Free SEO Audit — No Commitment Required
          </span>

          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight max-w-3xl">
            Ready to Dominate{" "}
            <span className="text-[#5ABB4A]">Search Results?</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Let's audit your current SEO and build a strategy that drives real,
            measurable growth. No fluff, no jargon — just a clear path forward.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white text-[#5ABB4A] px-10 py-4 rounded-full font-black text-lg hover:bg-[#f0faf0] transition-colors duration-300 mt-2"
          >
            Get Your Free SEO Audit
          </motion.button>

          {/* Reassurance */}
          <p className="text-gray-500 text-sm">
            No commitment required ·{" "}
            <span className="text-[#5ABB4A] font-semibold">
              Results in 90 days or we work for free
            </span>
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 mt-6 pt-6 border-t border-white/10 w-full">
            {[
              { icon: "✅", text: "Free audit — no strings" },
              { icon: "📊", text: "Data-backed strategy" },
              { icon: "🔒", text: "No black-hat methods" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-gray-400 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
