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

export const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Northbridge",
    description:
      "A streamlined digital platform that modernized complex internal operations for a fast-scaling enterprise team.",
    href: "/case-studies/northbridge",
    image: "/case-studies/project1.svg",
    imageAlt: "Abstract dashboard composition for Northbridge case study",
  },
  {
    company: "Helix Health",
    description:
      "A premium patient-facing experience designed to improve performance, trust, and operational clarity.",
    href: "/case-studies/helix-health",
    image: "/case-studies/project2.svg",
    imageAlt: "Abstract healthcare interface for Helix Health case study",
  },
  {
    company: "Atlas Commerce",
    description:
      "A cleaner commerce journey built to support higher conversion, better speed, and long-term maintainability.",
    href: "/case-studies/atlas-commerce",
    image: "/case-studies/project3.svg",
    imageAlt: "Abstract commerce interface for Atlas Commerce case study",
  },
  {
    company: "Vantage Logistics",
    description:
      "A robust logistics platform that brought visibility, control, and consistency to distributed workflows.",
    href: "/case-studies/vantage-logistics",
    image: "/case-studies/project4.svg",
    imageAlt: "Abstract logistics control surface for Vantage Logistics case study",
  },
];

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