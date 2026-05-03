import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CaseStudy() {
  return (
    <section id="case-study-preview" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-background-alt shadow-[0_24px_55px_-40px_rgba(15,23,42,0.36)]">
            <Image
              src="/case-studies/web-platform-placeholder.svg"
              alt="Placeholder preview of a web platform case study"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-xl">
            <span className="text-sm font-semibold text-primary">Case Study Preview</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A booking platform rebuilt for speed, scale, and easier conversion
            </h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
              We restructured the frontend experience, reduced bottlenecks in the
              booking flow, and connected internal tools to a cleaner backend
              workflow. The result was a faster customer journey and a platform
              the team could keep improving without rework.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["42%", "faster page interactions"],
                ["31%", "lift in checkout completion"],
                ["99.9%", "release stability"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/#case-studies"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}