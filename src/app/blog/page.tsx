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
                  className="group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <h2 className="type-item-title max-w-xl break-words transition-colors duration-150 ease-out text-pretty group-hover:text-foreground">
                    {post.frontmatter.title}
                  </h2>
                </Link>

                <div className="type-meta mt-3 flex flex-wrap gap-3">
                  <time dateTime={post.frontmatter.date}>
                    {formatPostDate(post.frontmatter.date)}
                  </time>
                  <span>/</span>
                  <span>{post.frontmatter.readingTime}</span>
                </div>

                <p className="type-body mt-3 max-w-xl">
                  {post.frontmatter.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
