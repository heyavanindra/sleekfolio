import { Link } from "next-view-transitions";
import { BlogPreviewList } from "@/components/blog/blog-preview-list";
import { blogSectionConfig } from "@/config";
import { getPublishedBlogPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getPublishedBlogPosts().slice(0, blogSectionConfig.limit);
  const hasMoreContent = posts.length > blogSectionConfig.viewMoreThreshold;

  return (
    <section id="writing" className="mt-20 scroll-mt-20 md:mt-24">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {blogSectionConfig.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
        <Link href={blogSectionConfig.href} className="portfolio-link">
          {blogSectionConfig.allPostsLabel}
        </Link>
      </div>

      <BlogPreviewList posts={posts} />
      {hasMoreContent && (
        <div className="flex items-center justify-start pt-3">
          <Link href={blogSectionConfig.href} className="portfolio-link">
            {blogSectionConfig.viewMoreLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
