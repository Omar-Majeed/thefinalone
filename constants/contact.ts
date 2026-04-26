export const PROJECT_TYPES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "SEO / Marketing",
  "AI Integration",
  "Other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CONTACT_COPY = {
  eyebrow: "Let's Talk",
  heading: "Have an idea? Let's build it together.",
  subheading:
    "Tell us about your project — we'll help you turn it into a scalable, high-performing product.",
  bullets: ["Free consultation", "Fast response", "Clear roadmap"],
  reply: "We reply within 24 hours",
  ctaLabel: "Start Your Project",
  successMessage: "Thanks! We'll get back to you shortly.",
} as const;
