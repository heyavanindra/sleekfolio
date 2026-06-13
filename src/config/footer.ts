import { heroConfig } from "./hero";
import { siteConfig } from "./site";

export const footerConfig = {
  section: {
    label: "Connect",
  },
  description:
    "Building products, writing about engineering, and learning in public.",
  links: heroConfig.links,
  copyright: `© Copyright 2026 ${siteConfig.name}. Built with Next.js and Tailwind CSS.`,
};
