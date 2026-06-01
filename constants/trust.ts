export type TechLogo = {
  name: string;
  /** Filename (without extension) under /public/tech-logos/ */
  slug: string;
};

export const TECH_LOGOS: TechLogo[] = [
  { name: "Java", slug: "openjdk" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "Python", slug: "python" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "AWS", slug: "amazonwebservices" },
  { name: "Docker", slug: "docker" },
  { name: "PostgreSQL", slug: "postgresql" },
];

export type TrustStat = {
  /** Numeric target to count to */
  value: number;
  /** Optional suffix like "+" or "%" */
  suffix?: string;
  label: string;
};

export const TRUST_STATS: TrustStat[] = [
  { value: 50, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Scalable Systems" },
];
