import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/ServiceSchema";
import { canonical } from "@/lib/seo";
import { Accordion } from "@/components/services/mobile-app-development/Accordion";
import { AppShowcase } from "@/components/services/mobile-app-development/AppShowcase";
import { CTASection } from "@/components/services/mobile-app-development/CTASection";
import { HeroSection } from "@/components/services/mobile-app-development/HeroSection";
import { PlatformCards } from "@/components/services/mobile-app-development/PlatformCards";
import { ProblemSolution } from "@/components/services/mobile-app-development/ProblemSolution";
import { FlexibleTechStack } from "@/components/services/mobile-app-development/TechStack";
import { Timeline } from "@/components/services/mobile-app-development/Timeline";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Build high-performance mobile apps for iOS and Android with a delivery process focused on speed, consistency, and long-term scale.",
  alternates: canonical("/services/mobile-app-development"),
};

export default function MobileAppDevelopmentPage() {
  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/services/mobile-app-development" />
      <ServiceSchema
        name="Mobile App Development"
        serviceType="Mobile App Development"
        description="Build high-performance mobile apps for iOS and Android with a delivery process focused on speed, consistency, and long-term scale."
        path="/services/mobile-app-development"
      />
      <HeroSection />
      <PlatformCards />
      <ProblemSolution />
      <Accordion />
      <Timeline />
      <AppShowcase />
      <FlexibleTechStack />
      <CTASection />
      <Footer />
    </main>
  );
}