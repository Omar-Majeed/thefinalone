import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { CaseStudies } from "@/components/CaseStudies";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ImpactSection } from "@/components/ImpactSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <CaseStudiesSection />
      <CaseStudies />
      <WhyChooseUsSection />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
