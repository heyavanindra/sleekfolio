import type { ComponentPropsWithoutRef } from "react";

export const BlogComponents = {
  CodeWindow,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="pt-4 text-2xl font-medium tracking-[-0.015em] text-pretty"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="pt-3 text-xl font-medium tracking-[-0.02em] text-pretty"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base leading-8 text-foreground/85" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="content-link" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="space-y-3 text-base leading-7 text-secondary" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal space-y-3 pl-5 text-base leading-7 text-secondary"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1 marker:text-accent" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l border-accent pl-5 text-base leading-8 text-secondary"
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
      className="overflow-x-auto rounded-md border border-border bg-black/30 p-4 text-sm leading-7 text-foreground corner-squircle"
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
