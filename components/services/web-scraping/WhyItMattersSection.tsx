"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const terminalLines = [
  "> Initializing extraction sequence...",
  "> Target: 145 sources identified.",
  "> Bypassing rate limits... [OK]",
  "> Extracting 12,421 records...",
  "> Cleaning duplicates (found 342)...",
  "> Normalizing schemas...",
  "> Exporting JSON...",
  "> Completed successfully. Pipeline ready."
];

export function WhyItMattersSection() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setDisplayedLines((prev) => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        // Reset loop
        setTimeout(() => {
          setDisplayedLines([]);
          currentLine = 0;
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24 px-6 lg:py-32">
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#5ABB4A 1px, transparent 1px), linear-gradient(90deg, #5ABB4A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Glowing accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5ABB4A] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Automate Data Collection At Scale.
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Manual data entry is obsolete. We engineer robust extraction pipelines that run continuously, bypassing blocks and parsing complex architectures to feed your systems with high-quality, normalized data.
            </p>
          </motion.div>

          {/* Right Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 px-4 py-3 border-b border-gray-800 bg-gray-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-4 text-xs font-mono text-gray-500">extraction-node-01</div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 h-[300px] overflow-y-auto font-mono text-sm">
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-2 ${line.includes('Completed') ? 'text-[#5ABB4A]' : line.includes('Error') ? 'text-red-400' : 'text-gray-300'}`}
                >
                  {line}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-[#5ABB4A] mt-2 inline-block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
