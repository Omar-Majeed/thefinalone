"use client";

import { motion } from "framer-motion";
import {
  FileJson, FileSpreadsheet, Database,
  Sheet, TableProperties, Server, Cloud, Webhook,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const OUTPUTS = [
  { icon: FileJson,        name: "JSON / XML",      desc: "Standard structured output for any application."    },
  { icon: FileSpreadsheet, name: "CSV / Excel",      desc: "Spreadsheet-ready flat files for analysts."         },
  { icon: Database,        name: "PostgreSQL",       desc: "Direct insertion into your relational database."     },
  { icon: Sheet,           name: "Google Sheets",    desc: "Sync directly to a live spreadsheet."               },
  { icon: TableProperties, name: "Airtable",         desc: "Push records into Airtable bases and views."        },
  { icon: Server,          name: "REST API",         desc: "Query your data via a managed REST endpoint."        },
  { icon: Cloud,           name: "BigQuery / S3",    desc: "Bulk delivery to cloud data warehouses."            },
];

export function OutputsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Delivery</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Outputs &amp; integrations
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            We deliver clean, structured data exactly where your team needs it —
            no manual export steps, no format negotiation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {OUTPUTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                className="group flex flex-col items-center gap-3 rounded-[20px] border border-[#E5E7EB] bg-white p-5 text-center shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_32px_-12px_rgba(90,187,74,0.15)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#6B7280] transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Custom webhooks — dark accent card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: EASE, delay: OUTPUTS.length * 0.06 }}
            className="flex flex-col items-center justify-center gap-3 rounded-[20px] bg-foreground p-5 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Webhook className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-xs text-white/35">Need something else?</p>
              <p className="mt-0.5 text-sm font-semibold text-primary">Custom Webhooks</p>
              <p className="mt-1 text-xs text-white/30">Any endpoint you control.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
