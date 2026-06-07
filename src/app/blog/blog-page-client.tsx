"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { blogPageConfig } from "@/config/portfolio";
import type { BlogPostPreview } from "@/types/blog";

type BlogPageClientProps = {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
};

function getBlogPostsByTag(
  posts: BlogPostPreview[],
  tag: string,
): BlogPostPreview[] {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
    ),
  );
}

export function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTag(searchParams.get("tag"));
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return initialPosts;
    }

    return getBlogPostsByTag(initialPosts, selectedTag);
  }, [initialPosts, selectedTag]);

  const tagPostCounts = useMemo(() => {
    return initialTags.reduce<Record<string, number>>((accumulator, tag) => {
      accumulator[tag] = getBlogPostsByTag(initialPosts, tag).length;
      return accumulator;
    }, {});
  }, [initialPosts, initialTags]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      router.replace("/blog");
      return;
    }

    setSelectedTag(tag);
    router.replace(`/blog?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="space-y-8  pt-8no ">
      <div className="space-y-8 ">
        <header className="space-y-4 text-center ">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {blogPageConfig.heading}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
            {blogPageConfig.description}
          </p>
        </header>

        {/* <Separator /> */}

        {initialTags.length > 0 && (
          <section className="space-y-4 px-6 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">
                {blogPageConfig.tagsHeading}
              </h2>
              {selectedTag && (
                <button
                  type="button"
                  onClick={() => handleTagClick(selectedTag)}
                  className="text-sm text-neutral-500 underline underline-offset-4 transition hover:text-foreground"
                >
                  {blogPageConfig.clearFilterLabel}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {initialTags.map((tag) => {
                const isSelected = selectedTag === tag;

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="transition-colors"
                  >
                    <Badge isSelected={isSelected}>
                      {tag} ({tagPostCounts[tag] ?? 0})
                    </Badge>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className="shadow-section-inset px-6 md:px-8 py-4 dark:shadow-section-inset-dark">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {selectedTag
                ? `${blogPageConfig.taggedPostsLabel} "${selectedTag}"`
                : blogPageConfig.latestPostsLabel}
              {filteredPosts.length > 0 && (
                <span className="ml-2 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  ({filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"})
                </span>
              )}
            </h2>
          </div>

          <BlogList posts={filteredPosts} />
        </section>
      </div>
    </div>
  );
}

function BlogList({ posts }: { posts: BlogPostPreview[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-2xl font-semibold">{blogPageConfig.emptyTitle}</h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          {blogPageConfig.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function BlogCard({ post }: { post: BlogPostPreview }) {
  const { frontmatter, slug } = post;
  const { date, description, image, tags, title } = frontmatter;
  const [imageFailed, setImageFailed] = useState(false);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  return (
    <article className="group h-full w-full overflow-hidden rounded-lg border border-neutral-100 bg-background-container p-0 shadow-none transition-all dark:border-neutral-800">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {image && !imageFailed ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-neutral-300 dark:text-neutral-700">
              {title.slice(0, 1)}
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blog/${slug}`}>
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight transition group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
            {title}
          </h3>
        </Link>
        <p className="text-secondary mt-4 line-clamp-3">{description}</p>
      </div>

      <footer className="p-6 pt-0">
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, blogPageConfig.maxVisibleTags).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            {tags.length > blogPageConfig.maxVisibleTags && (
              <Badge>+{tags.length - blogPageConfig.maxVisibleTags} more</Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <time
              className="text-secondary flex items-center gap-2 text-sm"
              dateTime={date}
            >
              <CalendarIcon /> {formattedDate}
            </time>
            <Link
              href={`/blog/${slug}`}
              className="text-secondary flex items-center justify-end gap-2 text-sm underline-offset-4 hover:underline"
            >
              {blogPageConfig.readMoreLabel} <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}

function Badge({
  children,
  isSelected = false,
}: {
  children: React.ReactNode;
  isSelected?: boolean;
}) {
  return (
    <span
      className={
        isSelected
          ? "inline-flex items-center rounded-md border border-neutral-900 bg-neutral-900 px-2 py-0.5 text-xs font-medium capitalize text-white shadow-sm dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
          : "inline-flex items-center rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize text-neutral-700 shadow-sm transition hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
      }
    >
      {children}
    </span>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 256 256"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 256 256"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m221.7 133.7-72 72a8 8 0 0 1-11.4-11.4L196.7 136H40a8 8 0 0 1 0-16h156.7l-58.4-58.3a8 8 0 0 1 11.4-11.4l72 72a8.1 8.1 0 0 1 0 11.4Z" />
    </svg>
  );
}
