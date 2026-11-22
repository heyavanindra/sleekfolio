import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Undo2 } from "lucide-react";
import Container from "@/component/container";
import { BlogPreviewList } from "@/components/blog/blog-preview-list";
import { SiteNav } from "@/components/site-nav";
import { blogPageConfig } from "@/config";
import { getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = blogPageConfig.metadata;

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <main id="main-content" className="relative z-10 min-h-screen">
      <SiteNav />
      <Container>
        <section className="pt-10 pb-28 sm:pt-14 sm:pb-36">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-secondary hover:text-foreground transition-colors group"
            >
              <Undo2 className="size-3.5 sm:size-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </Link>
          </div>

          {/* Page Heading */}
          <header className="mb-10 sm:mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground text-pretty">
              {blogPageConfig.heading}
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-secondary leading-relaxed max-w-xl text-pretty font-sans">
              {blogPageConfig.description}
            </p>
          </header>

          {/* Posts List matching '/' route's blog section */}
          <div className="mt-8">
            <BlogPreviewList posts={posts} />
          </div>
        </section>
      </Container>
    </main>
  );
}
