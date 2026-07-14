import { PORTFOLIO_ITEMS } from "@/constants/portfolio";

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

export const CASE_STUDIES: CaseStudy[] = [...PORTFOLIO_ITEMS]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 4)
  .map((item) => ({
    company: item.title,
    description: item.tagline,
    href: "/portfolio",
    image: item.cover,
    imageAlt: `${item.title} project cover image`,
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