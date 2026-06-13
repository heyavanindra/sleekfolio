"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import type { BlogPostPreview } from "@/types/blog";

type BlogPreviewListProps = {
  posts: BlogPostPreview[];
};

export function BlogPreviewList({ posts }: BlogPreviewListProps) {
  const visiblePosts = posts.slice(0, 3);
  return (
    <div className="divide-y divide-border">
      {visiblePosts.map((post) => (
        <motion.article
          key={post.slug}
          initial="rest"
          whileHover="hover"
          className="overflow-hidden py-7 first:pt-0"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group block transition-all duration-200 hover:text-foreground"
          >
            <motion.div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <motion.h3
                variants={{
                  rest: { x: 0, color: "var(--color-foreground)" },
                  hover: { x: 10, color: "var(--color-foreground)" },
                }}
                transition={{
                  duration: 0.22,
                  ease: "easeInOut",
                }}
                className="max-w-xl break-words text-xl font-medium tracking-[-0.03em]"
              >
                {post.frontmatter.title}
              </motion.h3>
              <time
                dateTime={post.frontmatter.date}
                className="shrink-0 text-sm text-secondary"
              >
                {formatPostDate(post.frontmatter.date)}
              </time>
            </motion.div>

            <p className="mt-4 max-w-xl break-words text-base leading-7 text-foreground/80">
              {post.frontmatter.description}
            </p>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
