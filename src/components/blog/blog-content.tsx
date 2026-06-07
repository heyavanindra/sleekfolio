import rehypeShiki from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogComponents } from "./blog-components";

type BlogContentProps = {
  content: string;
};

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="prose-neutral max-w-none dark:prose-invert">
      <MDXRemote
        source={content}
        components={BlogComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
          },
        }}
      />
    </article>
  );
}