import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <CaseStudiesSection />
    </main>
  );
}
