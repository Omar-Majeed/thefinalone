import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
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
};

export default function WebScrapingPage() {
  return (
    <main className="bg-background text-foreground">
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
