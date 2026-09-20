import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/ServiceSchema";
import { canonical } from "@/lib/seo";
import { HeroSection }             from "@/components/services/web-scraping/HeroSection";
import { WhyItMattersSection }     from "@/components/services/web-scraping/WhyItMattersSection";
import { WhatWeExtractSection }    from "@/components/services/web-scraping/WhatWeExtractSection";
import { HowItWorksSection }       from "@/components/services/web-scraping/HowItWorksSection";
import { ScalablePipelinesSection } from "@/components/services/web-scraping/ScalablePipelinesSection";
import { OutputsSection }          from "@/components/services/web-scraping/OutputsSection";
import { FinalCtaSection }         from "@/components/services/web-scraping/FinalCtaSection";

export const metadata: Metadata = {
  title: "Web Scraping & Data Extraction Services",
  description:
    "Turn the web into structured data. We build scalable web scraping pipelines that extract, clean, and deliver structured data from complex sources in real time.",
  alternates: canonical("/services/web-scraping"),
};

export default function WebScrapingPage() {
  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/services/web-scraping" />
      <ServiceSchema
        name="Web Scraping & Data Extraction Services"
        serviceType="Web Scraping"
        description="Turn the web into structured data. We build scalable web scraping pipelines that extract, clean, and deliver structured data from complex sources in real time."
        path="/services/web-scraping"
      />
      <HeroSection />
      <WhyItMattersSection />
      <WhatWeExtractSection />
      <HowItWorksSection />
      <ScalablePipelinesSection />
      <OutputsSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
