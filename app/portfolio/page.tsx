import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PhilosophyStrip } from "@/components/portfolio/PhilosophyStrip";
import { FeaturedShowcase } from "@/components/portfolio/FeaturedShowcase";
import { HorizontalExplorer } from "@/components/portfolio/HorizontalExplorer";
import { ImpactMetrics } from "@/components/portfolio/ImpactMetrics";
import { TechCapabilities } from "@/components/portfolio/TechCapabilities";
import { ClientQuotes } from "@/components/portfolio/ClientQuotes";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { PORTFOLIO_ITEMS } from "@/constants/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A cinematic showcase of the products, agents and platforms Axenity has shipped for ambitious teams across commerce, fintech, healthcare and AI.",
};

export default function PortfolioPage() {
  const featured = PORTFOLIO_ITEMS.filter((i) => i.featured);

  return (
    <main className="bg-background">
      <PortfolioHero />
      <PhilosophyStrip />
      <FeaturedShowcase items={featured} />
      <HorizontalExplorer items={PORTFOLIO_ITEMS} />
      <ImpactMetrics />
      <TechCapabilities />
      <ClientQuotes />
      <FinalCTA />
      <Footer />
    </main>
  );
}
