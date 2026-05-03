const PAIN_POINTS = [
  "Apps lag or crash",
  "Poor user retention",
  "Platform inconsistencies",
  "Hard to scale",
];

export function ProblemSolution() {
  return (
    <section className="bg-background-alt py-20 sm:py-24 lg:py-28">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Problem to Solution</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mobile products succeed when speed, consistency, and reliability work together
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-[#F3F4F6] p-7 sm:p-9">
            <span className="text-sm font-semibold text-[#6B7280]">The Problem</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Many mobile apps break trust before they have a chance to grow
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
              We engineer mobile experiences that stay fast, stable, and consistent across releases
            </h3>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              Our approach combines thoughtful UX, reliable mobile architecture,
              and disciplined testing so the product feels consistent across
              devices, integrates cleanly with backend systems, and scales as
              your user base and release cadence grow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Faster interactions",
                "Consistent cross-device behavior",
                "Stable integrations",
                "Release-ready quality",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-background-alt px-4 py-4 text-sm font-medium text-[#374151]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}