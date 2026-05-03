import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section
      id="service-inquiry"
      aria-label="Services call to action"
      className="bg-background-alt py-20 sm:py-24 lg:py-28"
    >
      <div className="container px-6">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E5E7EB] bg-white px-6 py-12 text-center shadow-[0_24px_55px_-40px_rgba(15,23,42,0.45)] sm:px-10 sm:py-14 lg:px-14">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            Let's Talk
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Need a custom solution for your business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6B7280] sm:text-lg">
            Tell us your requirements - we'll help you choose the right service
            and build it right.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/#contact"
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-[#D1D5DB] bg-white px-7 py-3 text-sm font-semibold text-foreground",
                "transition-colors duration-300 hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                Let's Talk
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}