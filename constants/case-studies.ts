import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";

export type CaseStudy = {
  company: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export type CaseStudyTile = {
  type: "image" | "content";
  study: CaseStudy;
};

/**
 * Homepage case-study surface — pulls the featured project first, then
 * three more from the real portfolio. Every entry deep-links into its
 * own /portfolio/[slug] detail page.
 */
export const CASE_STUDIES: CaseStudy[] = [...PORTFOLIO_PROJECTS]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 4)
  .map((project) => ({
    company: project.productName,
    description: project.shortDescription,
    href: `/portfolio/${project.slug}`,
    image: project.screenshot.src,
    imageAlt: project.screenshot.alt,
  }));

export const CASE_STUDY_TILES: CaseStudyTile[] = [
  { type: "image", study: CASE_STUDIES[0] },
  { type: "content", study: CASE_STUDIES[0] },
  { type: "image", study: CASE_STUDIES[1] },
  { type: "content", study: CASE_STUDIES[1] },
  { type: "content", study: CASE_STUDIES[2] },
  { type: "image", study: CASE_STUDIES[2] },
  { type: "content", study: CASE_STUDIES[3] },
  { type: "image", study: CASE_STUDIES[3] },
];