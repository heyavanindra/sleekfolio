export type BlogFrontmatter = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
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