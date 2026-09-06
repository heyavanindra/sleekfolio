import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export const BlogComponents = {
  CodeWindow,
  CodeBadge,
  CodeSnippetHeader,
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className="my-8 h-px border-0 bg-white/[0.08] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      {...props}
    />
  ),
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
  code: Code,
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-md border border-border bg-black/30 p-4 font-mono text-sm leading-7 text-foreground corner-squircle",
        className,
      )}
      translate="no"
      {...props}
    />
  ),
};

export function CodeBadge({
  label = "Next.js 15",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 select-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 shadow-sm transition-colors duration-150 hover:bg-white/[0.08]",
        className,
      )}
    >
      {/* Engineered Status Dot with Glow */}
      <span
        className="size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
        aria-hidden="true"
      />

      {/* Typography Label */}
      <span className="text-[12.5px] font-medium tracking-tight text-white/85">
        {label}
      </span>

      {/* Calibrated 14x14 Icon with 1.5px Stroke */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-white/50"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5" strokeDasharray="24" strokeDashoffset="7" />
      </svg>
    </span>
  );
}

export function CodeSnippetHeader({
  title = "Code Snippet",
  badge = "Next.js 15",
  align = "between",
  className,
}: {
  title?: string;
  badge?: string;
  align?: "between" | "inline";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 pt-4 pb-2",
        align === "between" ? "justify-between" : "justify-start",
        className,
      )}
    >
      <h2 className="type-section-label !pt-0 text-pretty">{title}</h2>
      {badge ? <CodeBadge label={badge} /> : null}
    </div>
  );
}

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

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  "data-language"?: string;
};

function Code({ className, ...props }: CodeProps) {
  const isCodeBlock = Boolean(
    props["data-language"] || className?.includes("language-"),
  );

  return (
    <code
      className={
        isCodeBlock
          ? className
          : cn("bg-border px-1.5 py-0.5 text-sm text-foreground", className)
      }
      translate="no"
      {...props}
    />
  );
}
