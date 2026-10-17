"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "next-view-transitions";
import { useState } from "react";
import type { BlogPostPreview } from "@/types/blog";
import { cn } from "@/utils/cn";

type BlogPreviewListProps = {
  posts: BlogPostPreview[];
};

export function BlogPreviewList({ posts }: BlogPreviewListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  if (posts.length === 0) {
    return (
      <p className="py-4 text-[15px] text-muted-foreground">
        No posts published yet.
      </p>
    );
  }

  const isAnyHovered = hoveredIndex !== null;

  return (
    <ul
      className="relative flex flex-col -space-y-0.5 list-none p-0 m-0"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {posts.map((post, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <li key={post.slug} className="relative">
            <Link
              href={`/blog/${post.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className={cn(
                "group relative -mx-4 flex items-center justify-between gap-4 rounded-xl px-4 py-3.5",
                "outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                "transition-transform duration-160 ease-out active:scale-[0.985]",
              )}
            >
              {/* Animated Hover Pill Backdrop (Emil Kowalski micro-interaction) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    layoutId={
                      shouldReduceMotion ? undefined : "blog-hover-pill"
                    }
                    className="absolute inset-0 rounded-xl bg-white/6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      duration: 0.26,
                      bounce: 0,
                    }}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              {/* Post Title */}
              <span
                className={cn(
                  "min-w-0 text-[15px] sm:text-base font-semibold tracking-[-0.01em] text-foreground text-pretty",
                  "transition-opacity duration-200 ease-out",
                  isAnyHovered && !isHovered ? "opacity-50" : "opacity-100",
                )}
              >
                {post.frontmatter.title}
              </span>

              {/* Post Date */}
              <time
                dateTime={post.frontmatter.date}
                className={cn(
                  "shrink-0 text-sm sm:text-[15px] font-normal tabular-nums text-muted-foreground",
                  "transition-all duration-200 ease-out",
                  isHovered
                    ? "text-zinc-400 opacity-100"
                    : isAnyHovered
                      ? "opacity-50"
                      : "opacity-100",
                )}
              >
                {formatPostDate(post.frontmatter.date)}
              </time>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(date));
}
