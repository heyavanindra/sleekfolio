import { siteConfig } from "./site";

export const heroConfig = {
  name: siteConfig.name,
  headline:
    "Software engineer building real-time products and full-stack systems.",
  description:
    "Build fast interfaces, real-time systems, and products that feel simple to use.",
  links: [
    {
      label: "GitHub",
      href: siteConfig.author.github,
    },
    {
      label: "LinkedIn",
      href: siteConfig.author.linkedin,
    },
    {
      label: siteConfig.resume.label,
      href: siteConfig.resume.href,
    },
    {
      label: "Email",
      href: `mailto:${siteConfig.author.email}`,
    },
  ],
};
