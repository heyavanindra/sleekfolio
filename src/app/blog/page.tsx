import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import Container from "@/component/container";
import { SiteNav } from "@/components/site-nav";
import { blogPageConfig } from "@/config";
import { formatPostDate, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = blogPageConfig.metadata;

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <main id="main-content" className="portfolio-grid-background">
      <SiteNav />
      <Container>
        <section className="pt-14 pb-24 md:pt-16">
          <Link href={blogPageConfig.backHref} className="portfolio-link">
            {blogPageConfig.backLabel}
          </Link>

          <div className="mt-10">
            <h1 className="type-page-title text-balance">
              {blogPageConfig.heading}
            </h1>
            <p className="type-body mt-6 max-w-xl text-pretty">
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
                    <h2 className="type-item-title max-w-xl break-words transition-colors duration-150 ease-out text-pretty group-hover:text-foreground">
                      {post.frontmatter.title}
                    </h2>
                    <time
                      dateTime={post.frontmatter.date}
                      className="type-meta shrink-0"
                    >
                      {formatPostDate(post.frontmatter.date)}
                    </time>
                  </div>

                  <p className="type-body mt-3 max-w-xl">
                    {post.frontmatter.description}
                  </p>

                  <p className="type-meta mt-4">
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
