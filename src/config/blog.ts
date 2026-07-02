import { siteConfig } from "./site";

export const blogSectionConfig = {
  label: "Writing",
  href: "/blog",
  allPostsLabel: "All Posts",
  viewMoreLabel: "View More",
  limit: 3,
  viewMoreThreshold: 2,
};

export const blogPageConfig = {
  metadata: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Writing by Avanindra Tiwari on full-stack engineering, real-time systems and product development.",
  },
  backHref: "/",
  backLabel: "Back Home",
  heading: "Writing",
  description:
    "Notes on engineering, product systems and the details that make software feel thoughtful.",
};

export const blogPostConfig = {
  notFoundTitle: `Post not found | ${siteConfig.name}`,
  titleSuffix: siteConfig.name,
  backHref: "/blog",
  backLabel: "Back to Writing",
};
