import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/ServiceSchema";
import { canonical } from "@/lib/seo";
import { Accordion } from "@/components/services/web-development/Accordion";
import { CaseStudy } from "@/components/services/web-development/CaseStudy";
import { CTASection } from "@/components/services/web-development/CTASection";
import { FlexibleTechStack } from "@/components/services/web-development/TechStack";
import { HeroSection } from "@/components/services/web-development/HeroSection";
import { ProblemSolution } from "@/components/services/web-development/ProblemSolution";
import { Timeline } from "@/components/services/web-development/Timeline";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Build fast, scalable, and modern web applications with a delivery process focused on performance, security, and long-term growth.",
  alternates: canonical("/services/web-development"),
};

export default function WebDevelopmentPage() {
  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/services/web-development" />
      <ServiceSchema
        name="Web Development"
        serviceType="Web Development"
        description="Build fast, scalable, and modern web applications with a delivery process focused on performance, security, and long-term growth."
        path="/services/web-development"
      />
      <HeroSection />
      <ProblemSolution />
      <Accordion />
      <Timeline />
      <CaseStudy />
      <FlexibleTechStack />
      <CTASection />
      <Footer />
    </main>
  );
}