import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/services/seo/HeroSection";
import { GrowthDashboard } from "@/components/services/seo/GrowthDashboard";
import { WhatWeDo } from "@/components/services/seo/WhatWeDo";
import { ProcessSection } from "@/components/services/seo/ProcessSection";
import { ResultsSection } from "@/components/services/seo/ResultsSection";
import { WhyChooseUs } from "@/components/services/seo/WhyChooseUs";
import { ToolsTech } from "@/components/services/seo/ToolsTech";
import { FinalCTA } from "@/components/services/seo/FinalCTA";

export const metadata: Metadata = {
  title: "SEO Services",
  description:
    "Data-driven SEO strategies that put your business at the top of search results and keep it there. Technical SEO, content strategy, link building, and more.",
};

export default function SEOPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <GrowthDashboard />
      <WhatWeDo />
      <ProcessSection />
      <ResultsSection />
      <WhyChooseUs />
      <ToolsTech />
      <FinalCTA />
      <Footer />
    </main>
  );
}
