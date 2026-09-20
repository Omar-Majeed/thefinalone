import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { ArchitectureSection } from "@/components/services/backend-api-development/ArchitectureSection";
import { CTASection } from "@/components/services/backend-api-development/CTASection";
import { EngagementModels } from "@/components/services/backend-api-development/EngagementModels";
import { FaqSection } from "@/components/services/backend-api-development/FaqSection";
import { FeaturesList } from "@/components/services/backend-api-development/FeaturesList";
import { HeroSection } from "@/components/services/backend-api-development/HeroSection";
import { IntegrationsSection } from "@/components/services/backend-api-development/IntegrationsSection";
import { Metrics } from "@/components/services/backend-api-development/Metrics";
import { ProcessFlow } from "@/components/services/backend-api-development/ProcessFlow";
import { TechStack } from "@/components/services/backend-api-development/TechStack";
import { WhatWeBuild } from "@/components/services/backend-api-development/WhatWeBuild";

export const metadata: Metadata = {
  title: "Backend & API Development",
  description:
    "Robust, scalable backend systems and APIs engineered for performance, security, and long-term reliability.",
  alternates: canonical("/services/backend-api-development"),
};

export default function BackendApiDevelopmentPage() {
  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/services/backend-api-development" />
      <HeroSection />
      <WhatWeBuild />
      <ArchitectureSection />
      <IntegrationsSection />
      <Metrics />
      <FeaturesList />
      <ProcessFlow />
      <EngagementModels />
      <TechStack />
      <FaqSection />
      <CTASection />
      <Footer />
    </main>
  );
}
