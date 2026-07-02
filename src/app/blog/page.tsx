import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import Container from "@/component/container";
import { blogPageConfig } from "@/config";
import { formatPostDate, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = blogPageConfig.metadata;

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <main id="main-content" className="bg-background">
      <Container>
        <section className="pt-28 pb-24 md:pt-36">
          <Link
            href={blogPageConfig.backHref}
            className="portfolio-link text-sm"
          >
            {blogPageConfig.backLabel}
          </Link>

          <div className="mt-10">
            <h1 className="text-5xl font-medium tracking-[-0.035em] text-balance md:text-6xl md:tracking-[-0.045em]">
              {blogPageConfig.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-secondary text-pretty">
              {blogPageConfig.description}
            </p>
          </div>

          <div className="mt-14 divide-y divide-border">
            {posts.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                    <h2 className="max-w-xl break-words text-2xl font-medium tracking-[-0.015em] transition-colors duration-150 ease-out group-hover:text-foreground text-pretty">
                      {post.frontmatter.title}
                    </h2>
                    <time
                      dateTime={post.frontmatter.date}
                      className="shrink-0 text-sm text-secondary"
                    >
                      {formatPostDate(post.frontmatter.date)}
                    </time>
                  </div>

                  <p className="mt-4 max-w-xl text-base leading-7 text-foreground/80">
                    {post.frontmatter.description}
                  </p>

                  <p className="mt-4 text-sm text-secondary">
                    {post.frontmatter.readingTime}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
