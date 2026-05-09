import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AboutHero }        from "@/components/about/AboutHero";
import { WhoWeAre }         from "@/components/about/WhoWeAre";
import { HowWeThink }       from "@/components/about/HowWeThink";
import { Philosophy }        from "@/components/about/Philosophy";
import { WhatSetsUsApart }  from "@/components/about/WhatSetsUsApart";
import { MetricsSection }   from "@/components/about/MetricsSection";
import { TechStack }        from "@/components/about/TechStack";
import { ProcessTimeline }  from "@/components/about/ProcessTimeline";
import { AboutCTA }         from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Digital Agency",
  description:
    "We combine engineering, strategy, and modern design to create scalable digital experiences that help brands grow sustainably.",
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <AboutHero />
      <WhoWeAre />
      <HowWeThink />
      <Philosophy />
      <WhatSetsUsApart />
      <MetricsSection />
      <TechStack />
      <ProcessTimeline />
      <AboutCTA />
      <Footer />
    </main>
  );
}
