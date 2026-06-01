export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Engineering",
    title: "Custom Software Development for Scalable Systems",
    description:
      "We design and build resilient platforms that grow with your business — from architecture to launch.",
    image: "/hero/slide-1.jpg",
    imageAlt: "Engineers collaborating on scalable software architecture",
  },
  {
    eyebrow: "Artificial Intelligence",
    title: "AI Integration & Automation Solutions",
    description:
      "Embed intelligent workflows into your product with production-ready AI pipelines and automation.",
    image: "/hero/slide-2.jpg",
    imageAlt: "Abstract neural network visualization",
  },
  {
    eyebrow: "Web & Mobile",
    title: "High-Performance Web & Mobile Applications",
    description:
      "Lightning-fast, accessible, and beautifully crafted experiences across every device and platform.",
    image: "/hero/slide-3.jpg",
    imageAlt: "Modern responsive interface on multiple devices",
  },
  {
    eyebrow: "Growth",
    title: "Expand Your Reach with SEO & Digital Marketing Solutions",
    description:
      "Data-driven strategies that turn visibility into measurable revenue across organic and paid channels.",
    image: "/portfolio/greenleaf-cover.jpg",
    imageAlt: "Analytics dashboard showing growth metrics",
  },
];
