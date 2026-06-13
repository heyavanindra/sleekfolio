import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost, BlogPostPreview } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/data/blog");

export function getBlogPostSlugs() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;

  if (
    !frontmatter.title ||
    !frontmatter.description ||
    !frontmatter.date ||
    !frontmatter.readingTime ||
    !Array.isArray(frontmatter.tags)
  ) {
    throw new Error(`Invalid frontmatter in ${slug}.mdx`);
  }

  return {
    slug,
    frontmatter,
    content,
  };
}

export function getAllBlogPosts(): BlogPostPreview[] {
  return getBlogPostSlugs()
    .map((slug) => {
      const post = getBlogPostBySlug(slug);

      if (!post) {
        return undefined;
      }

      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
      };
    })
    .filter((post): post is BlogPostPreview => post !== undefined)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getPublishedBlogPosts() {
  return getAllBlogPosts().filter((post) => post.frontmatter.isPublished);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
