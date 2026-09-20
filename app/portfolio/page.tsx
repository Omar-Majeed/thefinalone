import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PhilosophyStrip } from "@/components/portfolio/PhilosophyStrip";
import { FeaturedShowcase } from "@/components/portfolio/FeaturedShowcase";
import { HorizontalExplorer } from "@/components/portfolio/HorizontalExplorer";
import { TechCapabilities } from "@/components/portfolio/TechCapabilities";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real client work Axenity has shipped across Australia — restaurants, trades, marriage celebrancy, auto service, and an internal AI booking agent.",
  alternates: canonical("/portfolio"),
};

export default function PortfolioPage() {
  const featured = PORTFOLIO_PROJECTS.find((p) => p.featured);
  // Everything except the featured one goes into the explorer grid.
  const rest = PORTFOLIO_PROJECTS.filter((p) => !p.featured);

  return (
    <main className="bg-background">
      <Breadcrumb path="/portfolio" />
      <PortfolioHero />
      <PhilosophyStrip />
      {featured && <FeaturedShowcase project={featured} />}
      <HorizontalExplorer projects={rest} />
      <TechCapabilities />
      <FinalCTA />
      <Footer />
    </main>
  );
}
