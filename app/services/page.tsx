import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/services/CTASection";
import { ProcessStep } from "@/components/services/ProcessStep";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesHero } from "@/components/services/ServicesHero";
import { SERVICES_PAGE_ITEMS, SERVICES_PROCESS } from "@/constants/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the digital services we offer, from product design and engineering to marketing, SEO, and AI integration.",
};

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <ServicesHero />

      <section id="services-grid" className="bg-background py-20 sm:py-24 lg:py-28">
        <div className="container px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary">
              Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Services tailored to the stage your business is in
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
              Whether you need a focused build, a design refresh, or a smarter
              growth engine, we assemble the right service mix around your goals.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES_PAGE_ITEMS.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="relative overflow-hidden bg-background-alt py-20 sm:py-24 lg:py-28">
        <div className="container px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A clear delivery rhythm from idea to launch
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
              We keep the process visible, collaborative, and structured so you
              always know what is happening and what comes next.
            </p>
          </div>

          <div className="relative mt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden border-t border-dashed border-[#D1D5DB] lg:block"
            />

            <ol className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {SERVICES_PROCESS.map((step, index) => (
                <ProcessStep key={step.title} step={step} index={index} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}