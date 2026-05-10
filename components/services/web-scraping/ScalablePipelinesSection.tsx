"use client";

import { motion } from "framer-motion";
import { Clock, ShieldAlert, Cpu, Network } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Clock, title: "Automated Scheduling", desc: "Run daily, hourly, or minute-by-minute." },
  { icon: ShieldAlert, title: "Anti-Block Systems", desc: "IP rotation and headless browser evasion." },
  { icon: Cpu, title: "Infinite Scalability", desc: "From 1,000 to 10M+ records seamlessly." },
  { icon: Network, title: "Proxy Management", desc: "Residential and datacenter proxy routing." },
];

export function ScalablePipelinesSection() {
  const [count, setCount] = useState(1450392);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-24 px-6 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Visual: Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-2xl relative overflow-hidden h-[500px] flex flex-col"
          >
            {/* Mock Header */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
              <div className="font-bold text-gray-800">Pipeline Status</div>
              <div className="flex space-x-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
            </div>

            {/* Live Counter */}
            <div className="mb-8">
              <div className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wider">Records Extracted (24h)</div>
              <div className="text-5xl font-mono font-bold text-gray-900 tracking-tight">
                {count.toLocaleString()}
              </div>
            </div>

            {/* Simulated Chart/Bars */}
            <div className="flex items-end space-x-2 h-40 mb-6 w-full">
              {[40, 65, 45, 80, 50, 95, 60, 85, 70, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-[#5ABB4A] to-green-300 rounded-t-sm opacity-80"
                />
              ))}
            </div>

            {/* Flowing Records */}
            <div className="mt-auto border-t border-gray-200 pt-4 overflow-hidden relative h-16">
               <motion.div
                 animate={{ y: [0, -40] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="flex flex-col space-y-2 text-xs font-mono text-gray-600"
               >
                 <div>{`[INF] Node_3: Extracted { id: "a1", price: "$49" }`}</div>
                 <div>{`[INF] Node_1: Bypassing captcha...`}</div>
                 <div>{`[INF] Node_2: Saved 50 rows to Postgres`}</div>
                 <div>{`[INF] Node_3: Extracted { id: "a2", price: "$59" }`}</div>
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Built For Scale, Speed & Reliability.
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We design enterprise-grade scraping infrastructure. Whether you need thousands of pages a day or millions an hour, our distributed systems handle JavaScript-heavy sites, captchas, and dynamic layouts with zero downtime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#5ABB4A]">
                      <feature.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
