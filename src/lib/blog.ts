import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost, BlogPostPreview } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/data/blog");

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogFrontmatter;

    if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`);
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPostPreview[] {
  return getBlogPostSlugs()
    .map((slug) => {
      const post = getBlogPostBySlug(slug);

      if (!post) {
        return null;
      }

      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
      };
    })
    .filter((post): post is BlogPostPreview => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getPublishedBlogPosts(): BlogPostPreview[] {
  return getAllBlogPosts().filter((post) => post.frontmatter.isPublished);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();

  for (const post of getPublishedBlogPosts()) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag.toLowerCase());
    }
  }

  return Array.from(tags).sort();
}
