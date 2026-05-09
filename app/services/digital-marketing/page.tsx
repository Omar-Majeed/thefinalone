import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroSection }     from "@/components/services/digital-marketing/HeroSection";
import { ServicesTabs }    from "@/components/services/digital-marketing/ServicesTabs";
import { BentoChannels }   from "@/components/services/digital-marketing/BentoChannels";
import { ProcessStepper }  from "@/components/services/digital-marketing/ProcessStepper";
import { ResultsSection }  from "@/components/services/digital-marketing/ResultsSection";
import { WhyChooseUs }     from "@/components/services/digital-marketing/WhyChooseUs";
import { FinalCTA }        from "@/components/services/digital-marketing/FinalCTA";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "Full-funnel digital marketing — paid ads, social media, email, content strategy, and analytics — engineered to generate qualified demand and compound returns.",
};

export default function DigitalMarketingPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <ServicesTabs />
      <BentoChannels />
      <ProcessStepper />
      <ResultsSection />
      <WhyChooseUs />
      <FinalCTA />
      <Footer />
    </main>
  );
}
