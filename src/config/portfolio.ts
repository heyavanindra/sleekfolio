export const siteConfig = {
  name: "Avanindra",
  title: "Avanindra - Full Stack Developer",
  description:
    "Portfolio of Avanindra, a full stack developer with an eye for design.",
  url: "https://avanindra.dev",
  author: "Avanindra",
  logo: {
    src: "/logo.png",
    alt: "Avanindra logo",
  },
};

export const navbarConfig = {
  logo: siteConfig.logo,
  links: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};

export const heroConfig = {
  name: "Avanindra",
  role: "Full Stack Developer",
  introPrefix: "Hi, I'm",
  description:
    "I turn ideas into products. From intuitive user experiences to scalable backend systems, I build end-to-end applications that solve real problems and are ready for production.",
  avatar: {
    src: "/assets/logo.png",
    alt: "Avatar of Avanindra",
  },
};

export const footerConfig = {
  credit: "Design and developed by Avanindra",
  copyright: "2026. All rights reserved.",
};

export const blogSectionConfig = {
  heading: "Sharing knowledge as I learn",
  limit: 3,
  emptyTitle: "No posts yet",
  emptyDescription: "Published writing will show up here.",
  descriptionMaxLength: 104,
};

export const blogPageConfig = {
  metadata: {
    title: "Blog",
    description:
      "Thoughts, tutorials, and insights on engineering and programming.",
  },
  heading: "Blogs",
  description:
    "Thoughts, tutorials, and insights on engineering, and programming.",
  tagsHeading: "Popular Tags",
  clearFilterLabel: "Clear filter",
  latestPostsLabel: "Latest Posts",
  taggedPostsLabel: "Posts tagged",
  emptyTitle: "No blog posts found",
  emptyDescription: "Check back later for new content!",
  readMoreLabel: "Read More",
  maxVisibleTags: 3,
  loading: {
    tagIds: ["tag-1", "tag-2", "tag-3", "tag-4", "tag-5"],
    postIds: ["post-1", "post-2", "post-3", "post-4"],
  },
};
