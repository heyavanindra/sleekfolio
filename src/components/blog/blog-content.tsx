import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { BlogComponents } from "./blog-components";

type BlogContentProps = {
  content: string;
};

const codeHighlightOptions = {
  defaultLang: "plaintext",
  filterMetaString: normalizeCodeMeta,
  keepBackground: false,
  theme: "github-dark",
} satisfies Options;

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="mt-10 max-w-2xl space-y-7">
      <MDXRemote
        source={content}
        components={BlogComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, codeHighlightOptions]],
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}

function normalizeCodeMeta(meta: string) {
  if (meta.includes("title=")) {
    return meta;
  }

  return meta.replace(/\bfilename=/g, "title=");
}
