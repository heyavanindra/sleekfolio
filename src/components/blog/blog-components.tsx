import type { ComponentPropsWithoutRef } from "react";

export const BlogComponents = {
  CodeWindow,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="type-section-label pt-4 text-pretty" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="type-item-title pt-3 text-pretty" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="type-prose" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="content-link" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="type-prose space-y-3" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="type-prose list-decimal space-y-3 pl-5" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1 marker:text-accent" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="type-prose border-l border-accent pl-5 text-secondary"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-border px-1.5 py-0.5 text-sm text-foreground"
      translate="no"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="overflow-x-auto rounded-md border border-border bg-black/30 p-4 font-mono text-sm leading-7 text-foreground corner-squircle"
      translate="no"
      {...props}
    />
  ),
};

function CodeWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-black/20 corner-squircle">
      <div className="border-b border-border px-4 py-2 font-mono text-xs text-secondary">
        {title}
      </div>
      <div className="[&_pre]:border-0">{children}</div>
    </div>
  );
}
