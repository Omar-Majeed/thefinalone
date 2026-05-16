import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="bg-[#1A1A2E] py-20 sm:py-24 lg:py-28">
      {/* Static glows — SSR-safe, no Math.random */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/8 bg-white/[0.04] px-6 py-12 text-center sm:px-10 sm:py-14">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary">
            Free Pipeline Scoping
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to build your data pipeline?
          </h2>

          <p className="mt-4 text-base leading-8 text-white/40 sm:text-lg">
            Tell us the sources and the output format you have in mind. We will
            scope the pipeline, estimate the cost, and deliver a working proof
            of concept — within 48 hours, no commitment required.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white",
                "transition-all duration-300 hover:border-primary/60",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E]",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/20">
            No commitment required &middot; POC delivered in 48 hours
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-white/8 pt-8">
            {[
              "Any public data source",
              "JSON, CSV, or direct DB",
              "Fully managed pipeline",
              "No maintenance on your team",
            ].map((item) => (
              <span key={item} className="text-xs font-medium text-white/20">
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
