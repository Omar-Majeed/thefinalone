import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, type Service } from "@/constants/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section
      aria-label="Services"
      className="relative w-full bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="container mx-auto">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Services designed to build and scale your business
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            From backend systems to AI-driven solutions, we deliver scalable and
            high-performance products.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:gap-7">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>

        <div className="mt-14 flex justify-center sm:mt-16">
          <SlideButton href="/services">Explore All Services</SlideButton>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <li>
      <Link
        href={service.href}
        className={cn(
          "group/card relative flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-7 sm:p-8",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-20px_rgba(17,24,39,0.18)]",
        )}
      >
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-lg",
            "bg-primary/10 text-primary transition-colors duration-300",
            "group-hover/card:bg-primary group-hover/card:text-white",
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {service.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6B7280] sm:text-base">
          {service.description}
        </p>

        <span
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
            "transition-all duration-300",
          )}
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </Link>
    </li>
  );
}

function SlideButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border border-primary bg-white px-7 py-3 text-sm font-semibold text-foreground",
        "transition-colors duration-300 hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 bg-primary",
          "transition-transform duration-300 ease-out",
          "group-hover/btn:scale-x-100",
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </Link>
  );
}
