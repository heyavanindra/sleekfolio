import Link from "next/link";
import { HighlightedWords } from "@/components/highlighted-words";
import { blogSectionConfig } from "@/config/portfolio";
import { getPublishedBlogPosts } from "@/lib/blog";

const BlogSection = () => {
  const posts = getPublishedBlogPosts().slice(0, blogSectionConfig.limit);

  return (
    <section className="px-6 py-6  md:px-8 ">
      <div className="px-4">
        <HighlightedWords
          text={blogSectionConfig.heading}
          className="mt-0 text-xl md:text-xl"
        />

        {posts.length > 0 ? (
          <div className="mt-6 space-y-11">
            {posts.map((post) => (
              <BlogRow
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                date={post.frontmatter.date}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
              {blogSectionConfig.emptyTitle}
            </h3>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              {blogSectionConfig.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

function BlogRow({
  href,
  title,
  description,
  date,
}: {
  href: string;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <article>
      <Link
        href={href}
        className="grid gap-3 transition hover:opacity-80 md:grid-cols-[1fr_auto] md:gap-8"
      >
        <div>
          <h3 className="text-xl font-bold leading-snug text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
          <p className="mt-3 max-w-[37rem] text-lg leading-snug text-neutral-500 dark:text-neutral-400">
            {truncateDescription(description)}
          </p>
        </div>

        <time
          dateTime={date}
          className="text-lg leading-snug text-neutral-500 md:pt-1 md:text-right dark:text-neutral-400"
        >
          {formatPostDate(date)}
        </time>
      </Link>
    </article>
  );
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function truncateDescription(description: string) {
  if (description.length <= blogSectionConfig.descriptionMaxLength) {
    return description;
  }

  return `${description
    .slice(0, blogSectionConfig.descriptionMaxLength - 3)
    .trim()}...`;
}

export default BlogSection;
