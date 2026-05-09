"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Clock, Users, Hash, DollarSign } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const RESULTS = [
  { icon: TrendingUp, value: "+312%",   label: "Average organic traffic increase" },
  { icon: Award,      value: "Top 3",   label: "Avg. ranking for target keywords" },
  { icon: Clock,      value: "8 Months",label: "Avg. time to significant ranking gains" },
  { icon: Users,      value: "94%",     label: "Client retention rate" },
  { icon: Hash,       value: "1,400+",  label: "Keywords ranked in top 10 across clients" },
  { icon: DollarSign, value: "3.2x",    label: "Average ROI on SEO investment" },
];

export function ResultsSection() {
  return (
    <section id="seo-results" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Proven Track Record</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Results we consistently deliver for our clients
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            We measure success in rankings, traffic, and revenue — not vanity
            metrics or hollow impressions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
                className="group rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_50px_-34px_rgba(15,23,42,0.28)] sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
                  {result.value}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#6B7280] sm:text-base">
                  {result.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#9CA3AF]">
          * Average results across active SEO clients over a 12-month period
        </p>
      </div>
    </section>
  );
}
