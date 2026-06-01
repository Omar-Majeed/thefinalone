import Image from "next/image";
import { TECH_LOGOS, TRUST_STATS } from "@/constants/trust";
import { CountUp } from "@/components/ui/CountUp";

export function TrustSection() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <section
      aria-label="Trusted technologies and stats"
      className="relative w-full bg-background-alt py-20 sm:py-24 lg:py-28"
    >
      <div className="container mx-auto">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Built with precision. Trusted for reliability.
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            We use modern technologies to build scalable and high-performance systems.
          </p>
        </header>

        <Marquee>
          {loop.map((tech, i) => (
            <li
              key={`${tech.slug}-${i}`}
              className="flex shrink-0 items-center justify-center px-8"
              aria-hidden={i >= TECH_LOGOS.length ? true : undefined}
            >
              <Image
                src={`/tech-logos/${tech.slug}.svg`}
                alt={i < TECH_LOGOS.length ? tech.name : ""}
                width={48}
                height={48}
                className="h-9 w-auto opacity-60 grayscale transition duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            </li>
          ))}
        </Marquee>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-20 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <li key={stat.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-[#6B7280] sm:text-base">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="trust-marquee group relative mt-14 overflow-hidden sm:mt-16"
      aria-label="Technology stack"
    >
      {/* Edge fade for premium feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background-alt to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background-alt to-transparent sm:w-32"
      />

      <ul className="trust-marquee-track flex w-max items-center">{children}</ul>

      <style>{`
        @keyframes trust-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .trust-marquee-track {
          animation: trust-marquee 40s linear infinite;
          will-change: transform;
        }
        .trust-marquee:hover .trust-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
