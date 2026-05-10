"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Database, FileJson, Server } from "lucide-react";

const codeSnippets = [
  `{\n  "company": "Acme Inc",\n  "email": "contact@acme.com"\n}`,
  `<div class="product-card">\n  <span class="price">$99.99</span>\n</div>`,
  `SELECT * FROM products\nWHERE category = 'tech';`,
  `["data", "extraction", "pipeline"]`,
];

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-24 px-6 lg:py-32">
      {/* Background Visualization */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute text-xs md:text-sm font-mono text-gray-500 whitespace-pre"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: [0, 100],
              y: [0, i % 2 === 0 ? 50 : -50],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 15}%`,
              filter: "blur(1px)",
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start space-y-8"
          >
            <motion.span
              variants={itemVariants}
              className="uppercase tracking-widest text-[#5ABB4A] font-semibold text-sm"
            >
              Web Scraping Services
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
            >
              Turn The Web <br />
              Into Structured <br />
              Data.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              We build scalable web scraping systems that extract, clean, and deliver structured data from complex web sources in real time.
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(90, 187, 74, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5ABB4A] text-white rounded-full px-8 py-4 font-medium transition-colors duration-300 hover:bg-[#4ea83f]"
            >
              Start Data Extraction
            </motion.button>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden md:block h-[500px]"
          >
            {/* Pipeline Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
              {[
                { icon: Server, label: "Website Source", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Code, label: "Extraction Engine", color: "text-[#5ABB4A]", bg: "bg-green-50" },
                { icon: Database, label: "Data Cleaning", color: "text-purple-500", bg: "bg-purple-50" },
                { icon: FileJson, label: "Structured Output", color: "text-orange-500", bg: "bg-orange-50" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                    className={`flex items-center space-x-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-10 w-64`}
                  >
                    <div className={`p-3 rounded-lg ${step.bg}`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className="font-semibold text-gray-800">{step.label}</span>
                  </motion.div>
                  
                  {i < 3 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 30 }}
                      transition={{ duration: 0.5, delay: i * 0.5 + 0.5 }}
                      className="w-0.5 bg-gradient-to-b from-gray-300 to-[#5ABB4A] my-2 relative"
                    >
                       <motion.div 
                          className="absolute w-2 h-2 rounded-full bg-[#5ABB4A] -left-[3px]"
                          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Floating code elements */}
            <motion.div
               animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 left-0 bg-white p-3 rounded-lg shadow-xl border border-gray-100 text-xs font-mono text-gray-600"
            >
              {"<div>Product</div>"}
            </motion.div>
            
            <motion.div
               animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-20 right-0 bg-gray-900 text-green-400 p-3 rounded-lg shadow-xl border border-gray-800 text-xs font-mono"
            >
              {`{ "status": 200 }`}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
