import { siteConfig } from "./site";

export const heroConfig = {
  name: siteConfig.name,
  headline:
    "Software engineer at heart, curious about systems, product, and taste.",
  description:
    "I spend most of my time around code: building full-stack products, improving backend systems, trying new AI tools, and studying what makes interfaces feel considered. I like the backend stuff that keeps software reliable, but I also care a lot about the tiny frontend details that make it feel easy to use.",
  links: [
    {
      icon: "github",
      label: "GitHub",
      href: siteConfig.author.github,
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      href: siteConfig.author.linkedin,
    },
    {
      icon: "resume",
      label: siteConfig.resume.label,
      href: siteConfig.resume.href,
    },
    {
      icon: "email",
      label: "Email",
      href: `mailto:${siteConfig.author.email}`,
    },
  ] as const,
};
