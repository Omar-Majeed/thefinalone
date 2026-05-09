export const PROJECT_TYPES = [
  "Web Development",
  "Mobile App Development",
  "Backend & API Development",
  "Search Engine Optimization",
  "Digital Marketing",
  "UI/UX Design",
  "AI Services Integration",
  "Web Scraping",
  "Other / Not sure yet",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CONTACT_COPY = {
  eyebrow: "Get In Touch",
  heading: "Let's build something that performs",
  subheading:
    "Tell us about your project. We review every submission personally and respond within one business day.",
  bullets: [
    "No sales scripts — just a real conversation",
    "Free audit included with every first call",
    "Flexible engagement models, no lock-in",
  ],
  reply: "Typical reply within 4–8 business hours",
  ctaLabel: "Send Message",
  successMessage:
    "We've received your message and will get back to you within one business day.",
};
