"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Share01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";

interface BlogShareButtonProps {
  title: string;
  url?: string;
}

export function BlogShareButton({ title, url }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");

    // Try Web Share API first if supported (e.g. mobile Safari / Chrome)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed or cancelled share sheet
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Clipboard fallback
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Link copied to clipboard" : "Share this post"}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] select-none"
    >
      {copied ? (
        <HugeiconsIcon
          icon={Tick01Icon}
          size={14}
          strokeWidth={2}
          className="text-emerald-400"
        />
      ) : (
        <HugeiconsIcon
          icon={Share01Icon}
          size={14}
          strokeWidth={1.8}
          className="text-secondary"
        />
      )}
      <span>{copied ? "Copied!" : "Share"}</span>
    </button>
  );
}
