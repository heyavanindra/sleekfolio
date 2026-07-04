import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import Container from "@/component/container";
import { BlogContent } from "@/components/blog/blog-content";
import { blogPostConfig } from "@/config";
import {
  formatPostDate,
  getBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: blogPostConfig.notFoundTitle,
    };
  }

  return {
    title: `${post.frontmatter.title} | ${blogPostConfig.titleSuffix}`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="bg-background">
      <Container>
        <article className="pt-28 pb-24 md:pt-36">
          <Link href={blogPostConfig.backHref} className="portfolio-link">
            {blogPostConfig.backLabel}
          </Link>

          <header className="mt-10 border-b border-border pb-10">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="type-caption rounded-md border border-border px-2 py-1 corner-squircle"
                  translate="no"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="type-page-title mt-6 break-words text-balance">
              {post.frontmatter.title}
            </h1>

            <p className="type-body-lg mt-6 max-w-2xl text-pretty">
              {post.frontmatter.description}
            </p>

            <div className="type-meta mt-6 flex flex-wrap gap-3">
              <time dateTime={post.frontmatter.date}>
                {formatPostDate(post.frontmatter.date)}
              </time>
              <span>/</span>
              <span>{post.frontmatter.readingTime}</span>
            </div>
          </header>

          <BlogContent content={post.content} />
        </article>
      </Container>
    </main>
  );
}
