"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TOOL_GROUPS = [
  {
    title: "Research & Analysis",
    items: ["SEMrush", "Ahrefs", "Moz Pro"],
  },
  {
    title: "Google Tools",
    items: ["Google Search Console", "Google Analytics 4", "PageSpeed Insights"],
  },
  {
    title: "Technical Auditing",
    items: ["Screaming Frog", "Sitebulb"],
  },
  {
    title: "Content Optimization",
    items: ["Surfer SEO", "Clearscope"],
  },
  {
    title: "Reporting",
    items: ["Looker Studio", "Custom Dashboards"],
  },
];

export function ToolsTech() {
  return (
    <section id="tech-stack" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Our Arsenal</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tools &amp; Technologies
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Industry-leading tools combined with proprietary workflows built to
            give your site a genuine competitive edge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TOOL_GROUPS.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
              className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] sm:p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>

              <ul className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-flex rounded-full border border-[#E5E7EB] bg-background-alt px-4 py-2 text-sm font-medium text-[#4B5563] transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
