"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TECH = [
  { name: "Next.js",        abbr: "NEXT", category: "Framework"   },
  { name: "TypeScript",     abbr: "TS",   category: "Language"    },
  { name: "Tailwind CSS",   abbr: "TWD",  category: "Styling"     },
  { name: "Node.js",        abbr: "NODE", category: "Runtime"     },
  { name: "Python",         abbr: "PY",   category: "Backend"     },
  { name: "PostgreSQL",     abbr: "PG",   category: "Database"    },
  { name: "Docker",         abbr: "DCK",  category: "DevOps"      },
  { name: "AWS",            abbr: "AWS",  category: "Cloud"       },
  { name: "React Native",   abbr: "RN",   category: "Mobile"      },
  { name: "Framer Motion",  abbr: "FM",   category: "Animation"   },
  { name: "Prisma",         abbr: "ORM",  category: "ORM"         },
  { name: "Redis",          abbr: "RDS",  category: "Cache"       },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Arsenal</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Technologies we work with
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            We are technology-agnostic — we choose the right tool for the job,
            not the most fashionable one.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TECH.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-3 rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_40px_-30px_rgba(90,187,74,0.2)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6] transition-colors duration-300 group-hover:bg-primary/10">
                <span className="text-xs font-black tracking-wider text-[#9CA3AF] transition-colors duration-300 group-hover:text-primary">
                  {tech.abbr}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary leading-tight">
                  {tech.name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                  {tech.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
