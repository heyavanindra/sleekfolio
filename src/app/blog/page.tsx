import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/container";
import { blogPageConfig } from "@/config/portfolio";
import { getAllTags, getPublishedBlogPosts } from "@/lib/blog";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: blogPageConfig.metadata.title,
  description: blogPageConfig.metadata.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogPage() {
  const allPosts = getPublishedBlogPosts();
  const allTags = getAllTags();

  return (
    <main>
      <Container>
        <Suspense fallback={<BlogPageLoading />}>
          <BlogPageClient initialPosts={allPosts} initialTags={allTags} />
        </Suspense>
      </Container>
    </main>
  );
}

function BlogPageLoading() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Container>
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-12 w-32" />
            <Skeleton className="mx-auto h-6 w-full max-w-md" />
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-wrap gap-2">
              {blogPageConfig.loading.tagIds.map((id) => (
                <Skeleton key={id} className="h-8 w-20" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid gap-6 md:grid-cols-2">
              {blogPageConfig.loading.postIds.map((id) => (
                <div
                  key={id}
                  className="overflow-hidden rounded-lg border border-neutral-100 dark:border-neutral-800"
                >
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function Separator() {
  return <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />;
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800 ${className}`}
    />
  );
}
