import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogComponents } from "./blog-components";

type BlogContentProps = {
  content: string;
};

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="mt-10 max-w-2xl space-y-7">
      <MDXRemote
        source={content}
        components={BlogComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
