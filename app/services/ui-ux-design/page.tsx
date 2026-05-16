import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/services/ui-ux-design/HeroSection";
import { PhilosophySection } from "@/components/services/ui-ux-design/PhilosophySection";
import { ExperienceShowcaseSection } from "@/components/services/ui-ux-design/ExperienceShowcaseSection";
import { ProcessSection } from "@/components/services/ui-ux-design/ProcessSection";
import { InteractionDesignSection } from "@/components/services/ui-ux-design/InteractionDesignSection";
import { DesignSystemsSection } from "@/components/services/ui-ux-design/DesignSystemsSection";
import { ResultsSection } from "@/components/services/ui-ux-design/ResultsSection";
import { TestimonialSection } from "@/components/services/ui-ux-design/TestimonialSection";
import { FinalCtaSection } from "@/components/services/ui-ux-design/FinalCtaSection";

export const metadata: Metadata = {
  title: "UI/UX Design Services",
  description:
    "We design intuitive, conversion-focused digital experiences that combine aesthetics, usability, and performance into products users genuinely enjoy using.",
};

export default function UIUXDesignPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <PhilosophySection />
      <ExperienceShowcaseSection />
      <ProcessSection />
      <InteractionDesignSection />
      <DesignSystemsSection />
      <ResultsSection />
      <TestimonialSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
