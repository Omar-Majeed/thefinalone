"use client";

import { motion } from "framer-motion";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#1A1A2E] py-32 px-6">
      {/* Network Glow & Atmospheric Blur Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#5ABB4A] rounded-full blur-[200px] opacity-10 transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[200px] opacity-10 transform -translate-y-1/2" />
        
        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0,200 Q400,300 800,100 T1600,250" 
            fill="none" 
            stroke="#5ABB4A" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M0,400 Q500,100 1000,400 T2000,300" 
            fill="none" 
            stroke="#4A90E2" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </svg>

        {/* Pulse Nodes */}
        {[...Array(5)].map((_, i) => (
           <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#5ABB4A]"
              animate={{
                 scale: [1, 2, 1],
                 opacity: [0.2, 1, 0.2],
              }}
              transition={{
                 duration: 2 + i,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i * 0.5
              }}
              style={{
                 top: `${Math.random() * 80 + 10}%`,
                 left: `${Math.random() * 80 + 10}%`,
                 boxShadow: "0 0 10px 2px rgba(90, 187, 74, 0.5)"
              }}
           />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white mb-8"
        >
          Ready To Build Your Data Pipeline?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          We create scalable extraction systems designed for automation, accuracy, and growth.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(90, 187, 74, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#5ABB4A] hover:bg-[#4ea83f] text-white rounded-full px-10 py-5 text-lg font-medium transition-all duration-300"
        >
          Book A Consultation
        </motion.button>
      </div>
    </section>
  );
}
