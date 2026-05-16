"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldAlert, Cpu, Network } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TERMINAL_LINES = [
  { text: "> Initializing pipeline...",              type: "info"    },
  { text: "> Target: 145 sources identified.",       type: "info"    },
  { text: "> Rotating proxy pool... [OK]",           type: "success" },
  { text: "> Bypassing rate limits... [OK]",         type: "success" },
  { text: "> Extracting 12,421 records...",          type: "info"    },
  { text: "> Deduplicating (342 removed)...",        type: "info"    },
  { text: "> Normalizing schemas... [OK]",           type: "success" },
  { text: "> Exporting to PostgreSQL... [OK]",       type: "success" },
  { text: "> Pipeline complete. Next run: 01:00 UTC",type: "done"    },
];

const FEATURES = [
  { icon: Clock,      title: "Automated Scheduling", desc: "Run on any cadence — minute-level to weekly — without manual intervention." },
  { icon: ShieldAlert,title: "Anti-Block Systems",   desc: "IP rotation, fingerprint spoofing, and headless browser evasion built in."  },
  { icon: Cpu,        title: "Infinite Scalability",  desc: "From 1,000 to 10M+ records per day with the same pipeline architecture."   },
  { icon: Network,    title: "Proxy Management",      desc: "Residential and datacenter pools managed and rotated transparently."        },
];

function Terminal() {
  const [lines, setLines] = useState<typeof TERMINAL_LINES>([]);

  useEffect(() => {
    let idx = 0;
    function addLine() {
      if (idx < TERMINAL_LINES.length) {
        setLines((prev) => [...prev, TERMINAL_LINES[idx]]);
        idx++;
        setTimeout(addLine, 820);
      } else {
        setTimeout(() => { setLines([]); idx = 0; setTimeout(addLine, 400); }, 3200);
      }
    }
    const t = setTimeout(addLine, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/70 shadow-[0_32px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-[11px] text-white/25 tracking-wider">
          extraction-node-01
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-white/25">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          LIVE
        </span>
      </div>

      {/* Body */}
      <div className="h-[280px] overflow-hidden p-5 sm:h-[300px]">
        <div className="flex flex-col gap-2">
          {lines.map((line, i) =>
            line ? (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={`font-mono text-xs leading-5 sm:text-sm ${
                  line.type === "done"    ? "text-primary font-semibold" :
                  line.type === "success" ? "text-primary/70"            :
                  "text-white/50"
                }`}
              >
                {line.text}
              </motion.p>
            ) : null
          )}
          {/* blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block h-4 w-2 bg-primary"
          />
        </div>
      </div>
    </div>
  );
}

export function WhyItMattersSection() {
  return (
    /* Navy — not site foreground black, not repeated anywhere */
    <section className="bg-[#0B1120] py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — copy + feature grid */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <span className="text-sm font-semibold text-primary">
              Why It Matters
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Automate data collection
              <br />
              at any scale
            </h2>
            <p className="mt-5 text-base leading-8 text-white/45 sm:text-lg">
              Manual data entry is obsolete. We engineer extraction pipelines
              that run continuously — bypassing blocks, parsing complex
              architectures, and delivering normalised data to your systems
              without human intervention.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/40">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — animated terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
