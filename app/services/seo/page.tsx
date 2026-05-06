import HeroSection from "@/components/seo/HeroSection";
import GrowthDashboard from "@/components/seo/GrowthDashboard";
import WhatWeDo from "@/components/seo/WhatWeDo";
import ProcessSection from "@/components/seo/ProcessSection";
import ResultsSection from "@/components/seo/ResultsSection";
import WhyChooseUs from "@/components/seo/WhyChooseUs";
import ToolsTech from "@/components/seo/ToolsTech";
import FinalCTA from "@/components/seo/FinalCTA";

export const metadata = {
  title: "SEO Services | Rank Higher & Grow Faster",
  description:
    "Data-driven SEO strategies that put your business at the top of search results. Technical SEO, content strategy, link building, and more.",
};

export default function SEOPage() {
  return (
    <main>
      <HeroSection />
      <GrowthDashboard />
      <WhatWeDo />
      <ProcessSection />
      <ResultsSection />
      <WhyChooseUs />
      <ToolsTech />
      <FinalCTA />
    </main>
  );
}
