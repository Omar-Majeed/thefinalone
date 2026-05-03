import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ArchitectureSection } from "@/components/services/backend-api-development/ArchitectureSection";
import { CTASection } from "@/components/services/backend-api-development/CTASection";
import { FeaturesList } from "@/components/services/backend-api-development/FeaturesList";
import { HeroSection } from "@/components/services/backend-api-development/HeroSection";
import { Metrics } from "@/components/services/backend-api-development/Metrics";
import { ProcessFlow } from "@/components/services/backend-api-development/ProcessFlow";
import { TechStack } from "@/components/services/backend-api-development/TechStack";
import { WhatWeBuild } from "@/components/services/backend-api-development/WhatWeBuild";

export const metadata: Metadata = {
  title: "Backend & API Development",
  description:
    "Robust, scalable backend systems and APIs engineered for performance, security, and long-term reliability.",
};

export default function BackendApiDevelopmentPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <WhatWeBuild />
      <ArchitectureSection />
      <Metrics />
      <FeaturesList />
      <ProcessFlow />
      <TechStack />
      <CTASection />
      <Footer />
    </main>
  );
}
