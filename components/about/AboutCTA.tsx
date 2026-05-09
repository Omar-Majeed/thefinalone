import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutCTA() {
  return (
    <section id="about-cta" className="relative isolate overflow-hidden bg-foreground py-20 sm:py-24 lg:py-28">
      {/* Green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
      />
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-primary">
            Start a Conversation
          </span>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Let&apos;s build something that actually stands out
          </h2>

          <p className="mt-5 text-base leading-8 text-white/50 sm:text-lg">
            We build modern digital experiences designed to scale, convert, and
            perform. Tell us about your project — we&apos;ll be in touch within
            one business day.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-[#D1D5DB] bg-white px-8 py-3.5 text-sm font-semibold text-foreground",
                "transition-colors duration-300 hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/25">
            No commitment required &middot; Reply within one business day
          </p>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-white/8 pt-10">
            {[
              "120+ projects delivered",
              "94% client retention",
              "Full-stack capability",
              "No lock-in contracts",
            ].map((item) => (
              <span key={item} className="text-xs font-medium text-white/25">
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
