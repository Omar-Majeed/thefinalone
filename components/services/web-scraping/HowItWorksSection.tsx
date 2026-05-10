"use client";

import { motion } from "framer-motion";
import { Search, BrainCircuit, Filter, AlignLeft, Send } from "lucide-react";

const steps = [
  { id: 1, title: "Source Analysis", icon: Search, desc: "We map the target site architecture and APIs." },
  { id: 2, title: "Extraction Logic", icon: BrainCircuit, desc: "Custom scripts navigate and bypass blocks." },
  { id: 3, title: "Data Cleaning", icon: Filter, desc: "Removing noise, duplicates, and errors." },
  { id: 4, title: "Structuring", icon: AlignLeft, desc: "Normalizing into defined schemas." },
  { id: 5, title: "Delivery", icon: Send, desc: "Pushing to API, DB, or CSV." },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#F4F3F0] py-24 px-6 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            The Extraction Pipeline
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A precise, five-step process transforming chaotic web sources into clean, structured, and ready-to-use data assets.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0">
             <motion.div
               className="h-full bg-[#5ABB4A]"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
          </div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`flex flex-col items-center text-center w-full md:w-1/5 ${i % 2 === 0 ? 'md:-mt-12' : 'md:mt-12'}`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 relative group border border-gray-100"
                >
                  <step.icon className="w-8 h-8 text-gray-700 group-hover:text-[#5ABB4A] transition-colors" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {step.id}
                  </div>
                </motion.div>
                
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
