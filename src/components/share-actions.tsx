"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import { cn } from "@/utils/cn";

type ShareActionsProps = {
  className?: string;
  title: string;
  url: string;
};

const shareButtonClass = cn(
  "inline-flex size-9 items-center justify-center rounded-lg border border-transparent bg-transparent text-secondary",
  "transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
  "active:scale-[0.97]",
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  "motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
);

export function ShareActions({ className, title, url }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

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
      window.setTimeout(() => setCopied(false), 1600);
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
        className={shareButtonClass}
        onClick={copyLink}
        type="button"
      >
        <CopyIcon aria-hidden="true" className="size-4.5" />
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
        d="M8 8.5V6.75A2.75 2.75 0 0 1 10.75 4h5.5A2.75 2.75 0 0 1 19 6.75v5.5A2.75 2.75 0 0 1 16.25 15H14.5"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M5 11.75A2.75 2.75 0 0 1 7.75 9h5.5A2.75 2.75 0 0 1 16 11.75v5.5A2.75 2.75 0 0 1 13.25 20h-5.5A2.75 2.75 0 0 1 5 17.25v-5.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
