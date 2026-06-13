export type BlogFrontmatter = {
  title: string;
  description: string;
  image?: string;
  date: string;
  readingTime: string;
  tags: string[];
  isPublished: boolean;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

export type BlogPostPreview = {
  slug: string;
  frontmatter: BlogFrontmatter;
};
