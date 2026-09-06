"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function CircularProgressBar({
  progress,
  size = 26,
  strokeWidth = 2.4,
  className,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("-rotate-90 transform", className)}
      aria-hidden="true"
    >
      {/* Background Track Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth={strokeWidth}
      />
      {/* Active Progress Sweep Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 120ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      />
    </svg>
  );
}

function MicroTooltip({
  children,
  visible = true,
}: {
  children: ReactNode;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
        "rounded-full border border-white/10 bg-[#141416] px-2.5 py-0.5 text-[11px] font-medium tracking-tight text-white/90 shadow-2xl",
        "opacity-0 transition-all duration-150 ease-out group-hover:-top-9 group-hover:opacity-100 group-focus-within:-top-9 group-focus-within:opacity-100",
      )}
    >
      {children}
    </span>
  );
}

export function FloatingActionDock() {
  const pathname = usePathname();
  const isBlogPost = Boolean(
    pathname?.startsWith("/blog/") && pathname !== "/blog",
  );

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blogTitle, setBlogTitle] = useState("");
  const copyTimeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track page scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalHeight = scrollHeight - clientHeight;

      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const current = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(current))));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Fetch current blog title dynamically from the page
  useEffect(() => {
    if (!isBlogPost) return;

    const findTitle = () => {
      const h1 = document.querySelector("h1");
      if (h1?.textContent) {
        setBlogTitle(h1.textContent.trim());
      }
    };

    findTitle();
    const timer = setTimeout(findTitle, 150);
    return () => clearTimeout(timer);
  }, [isBlogPost]);

  // Clean up copy timeout
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(siteConfig.author.email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = siteConfig.author.email;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.author.email}`;
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <aside aria-label="Floating Action Dock" className="dock-island-shell">
      <AnimatePresence mode="wait">
        {isBlogPost ? (
          /* =======================================================
             BLOG READING CAPSULE (As seen in the reference screenshot)
             ======================================================= */
          <motion.div
            key="blog-dock"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.95 }
            }
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="group relative flex items-center"
          >
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={`Reading progress: ${scrollProgress}%. Click to scroll to top.`}
              className="dock-island-tray h-[42px] cursor-pointer px-4 gap-3 select-none hover:border-white/20 transition-all duration-150"
            >
              {/* White Dot */}
              <span
                className="size-2 rounded-full bg-white shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                aria-hidden="true"
              />

              {/* Blog Title */}
              <span className="text-[13.5px] font-medium tracking-tight text-white/90 max-w-[180px] sm:max-w-[280px] truncate">
                {blogTitle || "Reading..."}
              </span>

              {/* Circular Progress Bar */}
              <div className="flex items-center justify-center shrink-0">
                <CircularProgressBar
                  progress={scrollProgress}
                  size={24}
                  strokeWidth={2.4}
                />
              </div>
            </button>
            <MicroTooltip>{scrollProgress}% read · Back to top</MicroTooltip>
          </motion.div>
        ) : (
          /* =======================================================
             PRIMARY PORTFOLIO DOCK
             ======================================================= */
          <motion.div
            key="portfolio-dock"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.95 }
            }
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="dock-island-tray"
          >
            {/* Left Item: Resume / CV Button */}
            <div className="group relative flex items-center justify-center">
              <a
                href={siteConfig.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume (PDF, opens in new tab)"
                className="dock-action-btn size-[40px] rounded-full"
              >
                <ResumeIcon className="dock-icon size-[18px]" />
              </a>
              <MicroTooltip>View Resume</MicroTooltip>
            </div>

            {/* Center Item: Primary CTA Pill ("Let's Talk" with availability pulse) */}
            <div className="group relative flex items-center justify-center">
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Let's Talk (Send an email)"
                className="dock-action-btn h-[40px] px-3.5 sm:px-4 rounded-full gap-2"
              >
                <span
                  className="relative flex size-2 items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[13.5px] font-medium tracking-[-0.01em] text-white/90">
                  Let&apos;s Talk
                </span>
              </a>
              <MicroTooltip>Send an Email</MicroTooltip>
            </div>

            {/* Center Secondary: Separated Copy Email Button */}
            <div className="group relative flex items-center justify-center">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={
                  copied
                    ? "Email copied to clipboard"
                    : `Copy email address (${siteConfig.author.email})`
                }
                className={cn(
                  "dock-action-btn size-[40px] rounded-full",
                  copied &&
                    "border-emerald-500/30 bg-emerald-950/40 text-emerald-300",
                )}
              >
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email copied to clipboard" : ""}
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.8, opacity: 0 }
                      }
                      animate={{ scale: 1, opacity: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.8, opacity: 0 }
                      }
                      transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
                      className="flex items-center justify-center text-emerald-400"
                    >
                      <CheckIcon className="size-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.8, opacity: 0 }
                      }
                      animate={{ scale: 1, opacity: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.8, opacity: 0 }
                      }
                      transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
                      className="flex items-center justify-center"
                    >
                      <CopyIcon className="dock-icon size-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <MicroTooltip>{copied ? "Copied! ✓" : "Copy Email"}</MicroTooltip>
            </div>

            {/* Right Item: Circular Scroll Progress & Back to Top Button */}
            <div className="group relative flex items-center justify-center">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={`Page scroll progress: ${scrollProgress}%. Click to scroll to top.`}
                className="dock-action-btn relative size-[40px] rounded-full"
              >
                <CircularProgressBar
                  progress={scrollProgress}
                  size={26}
                  strokeWidth={2.4}
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <ArrowUpIcon className="dock-icon size-3 group-hover:text-white transition-colors" />
                </span>
              </button>
              <MicroTooltip>
                {scrollProgress > 0
                  ? `${scrollProgress}% · Back to top`
                  : "Back to top"}
              </MicroTooltip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
