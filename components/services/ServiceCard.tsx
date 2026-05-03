import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/constants/services-page";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <li>
      <Link
        href={service.href}
        className={cn(
          "group flex h-full flex-col rounded-lg border border-[#E5E7EB] bg-white p-7",
          "shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 ease-out",
          "hover:-translate-y-[5px] hover:border-primary hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.28)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-base">
          {service.description}
        </p>

        <span className="mt-6 inline-flex translate-x-0 items-center gap-2 text-sm font-semibold text-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
          Learn More
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </Link>
    </li>
  );
}