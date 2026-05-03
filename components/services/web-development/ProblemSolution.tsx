import { ArrowRight, CheckCircle2 } from "lucide-react";

const PAIN_POINTS = [
  "Slow sites that lose users before the experience starts",
  "Disconnected systems that make product changes harder than they should be",
  "Fragile codebases that break momentum every time the roadmap expands",
  "Poor performance and technical debt that limit marketing and product growth",
];

export function ProblemSolution() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Problem to Solution</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We remove delivery friction before it slows your product down
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-[#F3F4F6] p-7 sm:p-9">
            <span className="text-sm font-semibold text-[#6B7280]">The Problem</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Product teams need speed without sacrificing stability
            </h3>
            <ul className="mt-7 space-y-4">
              {PAIN_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-[#4B5563] sm:text-base">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.3)] sm:p-9">
            <span className="text-sm font-semibold text-primary">Our Solution</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              An approach that balances user experience, engineering quality, and growth
            </h3>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              We plan the product around clear user flows, build on reliable web
              architecture, and keep performance and maintainability inside the
              delivery process from the start. The result is a platform that is
              easier to ship, easier to scale, and easier to trust.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Clear technical direction",
                "Measured performance targets",
                "Stable release workflows",
                "Future-ready integrations",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-background-alt px-4 py-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-medium text-[#374151]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Delivery that supports launch and long-term growth
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}