import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
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
};

export default function WebDevelopmentPage() {
  return (
    <main className="bg-background text-foreground">
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