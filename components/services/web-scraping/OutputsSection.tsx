"use client";

import { motion } from "framer-motion";
import { Database, FileJson, FileSpreadsheet, Server, Cloud, TableProperties, Sheet } from "lucide-react";

const integrations = [
  { name: "JSON / XML", icon: FileJson },
  { name: "CSV / Excel", icon: FileSpreadsheet },
  { name: "PostgreSQL", icon: Database },
  { name: "Google Sheets", icon: Sheet },
  { name: "Airtable", icon: TableProperties },
  { name: "REST APIs", icon: Server },
  { name: "BigQuery", icon: Cloud },
];

export function OutputsSection() {
  return (
    <section className="bg-white py-24 px-6 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Outputs & Integrations
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver pristine, structured data exactly where your team needs it. Seamlessly push to your databases, CRMs, or raw files.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              className="bg-gray-50 border border-gray-100 hover:border-[#5ABB4A]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer"
            >
              <item.icon className="w-10 h-10 text-gray-400 group-hover:text-[#5ABB4A] mb-4 transition-colors" />
              <span className="font-semibold text-gray-800">{item.name}</span>
            </motion.div>
          ))}
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.4, delay: integrations.length * 0.1 }}
             className="bg-[#0B1120] rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white col-span-2 md:col-span-1 lg:col-span-1"
          >
             <span className="text-sm font-medium text-gray-400 mb-1">Need something else?</span>
             <span className="font-bold text-[#5ABB4A]">Custom Webhooks</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
