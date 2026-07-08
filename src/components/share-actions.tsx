"use client";

import type { SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type ShareActionsProps = {
  className?: string;
  title: string;
  url: string;
};

const shareButtonClass = cn(
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-transparent text-secondary",
  "transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
  "active:scale-[0.97]",
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  "motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:active:scale-100",
);

const copyButtonClass = cn(
  shareButtonClass,
  "relative overflow-hidden",
  "data-[copied=true]:border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] data-[copied=true]:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)] data-[copied=true]:text-foreground",
);

export function ShareActions({ className, title, url }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const copyResetTimeoutRef = useRef<number | null>(null);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  async function copyLink() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copyResetTimeoutRef.current = null;
      }, 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="type-caption mr-1">Share</span>
      <a
        aria-label="Share this portfolio on LinkedIn"
        className={shareButtonClass}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkedInIcon aria-hidden="true" className="size-4.5" />
      </a>
      <a
        aria-label="Share this portfolio on X"
        className={shareButtonClass}
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <XIcon aria-hidden="true" className="size-4" />
      </a>
      <button
        aria-label={copied ? "Portfolio link copied" : "Copy portfolio link"}
        className={copyButtonClass}
        data-copied={copied}
        onClick={copyLink}
        type="button"
      >
        <span className="t-icon-swap size-4.5" data-state={copied ? "b" : "a"}>
          <span className="t-icon" data-icon="a">
            <CopyIcon aria-hidden="true" className="size-full" />
          </span>
          <span className="t-icon" data-icon="b">
            <CopiedIcon aria-hidden="true" className="size-full" />
          </span>
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Portfolio link copied" : ""}
      </span>
    </div>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>LinkedIn</title>
      <path
        d="M6.9 9.4v8.9M6.9 5.7v.1M10.8 18.3v-5.1c0-2.2 1.4-3.9 3.6-3.9 2 0 3.1 1.4 3.1 3.7v5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>X</title>
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Copy link</title>
      <path
        d="M9 9V5.25C9 4.00736 10.0074 3 11.25 3H18.75C19.9926 3 21 4.00736 21 5.25V12.75C21 13.9926 19.9926 15 18.75 15H15M12.75 9H5.25C4.00736 9 3 10.0074 3 11.25V18.75C3 19.9926 4.00736 21 5.25 21H12.75C13.9926 21 15 19.9926 15 18.75V11.25C15 10.0074 13.9926 9 12.75 9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CopiedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Copied</title>
      <circle cx="12" cy="12" fill="currentColor" r="9.25" />
      <path
        d="m8.25 12.2 2.35 2.35 5.15-5.75"
        stroke="var(--background)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}
