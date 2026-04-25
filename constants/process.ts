export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    summary:
      "We start by deeply understanding your business, users, and goals before writing a single line of code.",
    bullets: ["Understand requirements", "Define project scope"],
  },
  {
    id: "architecture",
    title: "Architecture & Planning",
    summary:
      "We translate your needs into a robust technical blueprint optimized for scale and longevity.",
    bullets: ["System design", "Tech stack selection", "Database & API planning"],
  },
  {
    id: "development",
    title: "Development",
    summary:
      "We build in tight, focused iterations with continuous review so you always see real progress.",
    bullets: ["Agile implementation", "Iterative feature delivery"],
  },
  {
    id: "deployment",
    title: "Deployment & Support",
    summary:
      "We launch with confidence and stay engaged to keep your platform fast, secure, and reliable.",
    bullets: ["Production deployment", "Monitoring & optimization"],
  },
];
