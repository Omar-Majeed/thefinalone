"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Users, DollarSign, Briefcase, Search, BarChart } from "lucide-react";
import { useRef } from "react";

const cards = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Products",
    description: "Extract full product catalogs, variants, and reviews.",
    code: '{"price": "$49", "stock": 12}',
  },
  {
    icon: Users,
    title: "Lead Databases",
    description: "Build targeted lists of emails, phones, and company info.",
    code: '{"email": "ceo@acme.co"}',
  },
  {
    icon: DollarSign,
    title: "Competitor Pricing",
    description: "Monitor real-time price changes and promotional offers.",
    code: '{"competitor": "X", "diff": "-5%"}',
  },
  {
    icon: Briefcase,
    title: "Job Listings",
    description: "Aggregate roles, salaries, and requirements across boards.",
    code: '{"role": "Engineer"}',
  },
  {
    icon: Search,
    title: "SEO Metadata",
    description: "Audit millions of pages for rankings, keywords, and tags.",
    code: '{"rank": 1, "kw": "data"}',
  },
  {
    icon: BarChart,
    title: "Market Intelligence",
    description: "Extract unstructured sentiment and trends for analysis.",
    code: '{"sentiment": "positive"}',
  },
];

export function WhatWeExtractSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white py-24 px-6 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">What We Extract</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Our systems parse and normalize data from virtually any structure, turning chaotic markup into pristine datasets.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="min-w-[300px] md:min-w-[350px] bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(90,187,74,0.15)] hover:border-[#5ABB4A]/30 transition-all duration-300 snap-center flex flex-col group relative overflow-hidden"
            >
              {/* Extraction animation on hover */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-1 bg-[#5ABB4A]/20 rounded-full overflow-hidden"
                >
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-1/2 h-full bg-[#5ABB4A]"
                  />
                </motion.div>
              </div>

              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-gray-800 group-hover:text-[#5ABB4A] group-hover:bg-green-50 transition-colors">
                <card.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{card.description}</p>
              
              <div className="mt-auto bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 group-hover:bg-[#0B1120] transition-colors">
                {card.code}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CSS to hide scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
