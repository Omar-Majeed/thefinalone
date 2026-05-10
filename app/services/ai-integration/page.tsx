import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroSection }     from "@/components/services/ai-integration/HeroSection";
import { WhatWeIntegrate } from "@/components/services/ai-integration/WhatWeIntegrate";
import { UseCases }        from "@/components/services/ai-integration/UseCases";
import { HowItWorks }      from "@/components/services/ai-integration/HowItWorks";
import { ResultsSection }  from "@/components/services/ai-integration/ResultsSection";
import { TechAndModels }   from "@/components/services/ai-integration/TechAndModels";
import { FinalCTA }        from "@/components/services/ai-integration/FinalCTA";

export const metadata: Metadata = {
  title: "AI Services Integration",
  description:
    "We integrate large language models, computer vision, and ML pipelines directly into your existing systems — so AI becomes a capability, not a side project.",
};

export default function AIIntegrationPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <WhatWeIntegrate />
      <UseCases />
      <HowItWorks />
      <ResultsSection />
      <TechAndModels />
      <FinalCTA />
      <Footer />
    </main>
  );
}
