import { siteConfig } from "./site";

export const heroConfig = {
  name: siteConfig.name,
  headline:
    "Software engineer building real-time products and full-stack systems.",
  description:
    "Build fast interfaces, real-time systems, and products that feel simple to use.",
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
