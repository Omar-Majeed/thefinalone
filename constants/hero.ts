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
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineers collaborating on scalable software architecture",
  },
  {
    eyebrow: "Artificial Intelligence",
    title: "AI Integration & Automation Solutions",
    description:
      "Embed intelligent workflows into your product with production-ready AI pipelines and automation.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Abstract neural network visualization",
  },
  {
    eyebrow: "Web & Mobile",
    title: "High-Performance Web & Mobile Applications",
    description:
      "Lightning-fast, accessible, and beautifully crafted experiences across every device and platform.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern responsive interface on multiple devices",
  },
  {
    eyebrow: "Growth",
    title: "Expand Your Reach with SEO & Digital Marketing Solutions",
    description:
      "Data-driven strategies that turn visibility into measurable revenue across organic and paid channels.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Analytics dashboard showing growth metrics",
  },
];
