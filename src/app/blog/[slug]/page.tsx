import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/blog-content";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          {post.frontmatter.description}
        </p>
        <time className="mt-3 block text-sm text-neutral-500">
          {post.frontmatter.date}
        </time>
      </header>

      <BlogContent content={post.content} />
    </main>
  );
}