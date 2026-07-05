"use client";

import { Link } from "next-view-transitions";
import type { BlogPostPreview } from "@/types/blog";

type BlogPreviewListProps = {
  posts: BlogPostPreview[];
};

export function BlogPreviewList({ posts }: BlogPreviewListProps) {
  const visiblePosts = posts.slice(0, 3);

  if (visiblePosts.length === 0) {
    return (
      <p className="type-body border-t border-border pt-7">
        No posts published yet.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border">
      {visiblePosts.map((post) => (
        <article key={post.slug} className="overflow-hidden py-7 first:pt-0">
          <Link
            href={`/blog/${post.slug}`}
            className="group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <h3 className="fine-hover-shift type-item-title max-w-xl break-words text-pretty">
              {post.frontmatter.title}
            </h3>
          </Link>

          <time
            dateTime={post.frontmatter.date}
            className="type-meta mt-3 block"
          >
            {formatPostDate(post.frontmatter.date)}
          </time>

          <p className="type-body mt-3 max-w-xl break-words">
            {post.frontmatter.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(date));
}
