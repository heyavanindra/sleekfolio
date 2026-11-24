import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Undo03Icon,
} from "@hugeicons/core-free-icons";
import Container from "@/component/container";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogShareButton } from "@/components/blog/blog-share-button";
import { SiteNav } from "@/components/site-nav";
import { blogPostConfig } from "@/config";
import {
  formatEditorialDate,
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
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image
        ? [{ url: post.frontmatter.image }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="relative z-10 min-h-screen">
      <SiteNav />
      <Container>
        <article className="pt-10 pb-28 sm:pt-14 sm:pb-36">
          {/* Back to Blog Navigation */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-secondary hover:text-foreground transition-colors group"
            >
              <HugeiconsIcon
                icon={Undo03Icon}
                size={15}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Featured Hero Banner Image */}
          {post.frontmatter.image && (
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            </div>
          )}

          {/* Post Header */}
          <header className="mt-8 sm:mt-10">
            {/* Title: Big Editorial Serif */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-medium leading-[1.18] tracking-tight text-foreground text-pretty">
              {post.frontmatter.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-3.5 sm:mt-4 text-base sm:text-lg text-secondary leading-relaxed max-w-2xl text-pretty font-sans">
              {post.frontmatter.description}
            </p>

            {/* Metadata & Actions Bar */}
            <div className="mt-6 flex items-center justify-between gap-4 border-b border-border/60 pb-6">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-[13px] text-secondary">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  size={15}
                  strokeWidth={1.8}
                  className="text-secondary/70 shrink-0"
                />
                <time dateTime={post.frontmatter.date}>
                  {formatEditorialDate(post.frontmatter.date)}
                </time>
                <span className="opacity-40">·</span>
                <span>{post.frontmatter.readingTime}</span>
              </div>

              <BlogShareButton title={post.frontmatter.title} />
            </div>
          </header>

          {/* Article Body */}
          <BlogContent content={post.content} />
        </article>
      </Container>
    </main>
  );
}
