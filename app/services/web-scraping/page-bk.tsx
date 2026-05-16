import { HeroSection } from "@/components/services/web-scraping/HeroSection";
import { WhyItMattersSection } from "@/components/services/web-scraping/WhyItMattersSection";
import { WhatWeExtractSection } from "@/components/services/web-scraping/WhatWeExtractSection";
import { HowItWorksSection } from "@/components/services/web-scraping/HowItWorksSection";
import { ScalablePipelinesSection } from "@/components/services/web-scraping/ScalablePipelinesSection";
import { OutputsSection } from "@/components/services/web-scraping/OutputsSection";
import { FinalCtaSection } from "@/components/services/web-scraping/FinalCtaSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Scraping Services | Data Extraction",
  description: "Turn the web into structured data. We build scalable web scraping systems that extract, clean, and deliver structured data from complex web sources in real time.",
};

export default function WebScrapingServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <WhyItMattersSection />
      <WhatWeExtractSection />
      <HowItWorksSection />
      <ScalablePipelinesSection />
      <OutputsSection />
      <FinalCtaSection />
    </main>
  );
}
