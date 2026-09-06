"use client";

import { Liquid } from "liquid-gooey";
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

function PlusIcon({ className }: { className?: string }) {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.418 1H2.584C1.634 1 1 1.628 1 2.572v18.855C1 22.373 1.792 23 2.583 23h18.834c.95 0 1.583-.628 1.583-1.572V2.573C23.001 1.627 22.367 1 21.418 1ZM7.49 19.7H4.166V9.172h3.323L7.49 19.7ZM5.906 7.757c-1.108 0-1.898-.785-1.898-1.885S4.8 3.985 5.906 3.985c1.11 0 1.9.787 1.9 1.887s-.95 1.885-1.9 1.885ZM19.836 19.7h-3.324v-5.028c0-1.257 0-2.83-1.742-2.83-1.74 0-1.9 1.258-1.9 2.673V19.7H9.548V9.172h3.166v1.413c.633-1.1 1.9-1.728 3.165-1.728 3.325 0 3.957 2.2 3.957 5.028V19.7Z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
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
  size = 22,
  strokeWidth = 2.2,
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
        stroke="rgba(255, 255, 255, 0.20)"
        strokeWidth={strokeWidth}
      />
      {/* Active Progress Sweep Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 100ms linear",
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
  const [socialOpen, setSocialOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blogTitle, setBlogTitle] = useState("");
  const copyTimeoutRef = useRef<number | null>(null);
  const shareTimeoutRef = useRef<number | null>(null);
  const launcherRef = useRef<HTMLDivElement>(null);
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

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (shareTimeoutRef.current) {
        window.clearTimeout(shareTimeoutRef.current);
      }
    };
  }, []);

  // Close liquid launcher on click outside or Escape
  useEffect(() => {
    if (!socialOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSocialOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        launcherRef.current &&
        !launcherRef.current.contains(e.target as Node)
      ) {
        setSocialOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [socialOpen]);

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

  const handleSharePortfolio = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }

    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://${siteConfig.url}`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setShareCopied(true);

      if (shareTimeoutRef.current) {
        window.clearTimeout(shareTimeoutRef.current);
      }

      shareTimeoutRef.current = window.setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    } catch {
      // Fallback
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
              className={cn(
                "pointer-events-auto relative flex h-[38px] items-center rounded-full select-none cursor-pointer",
                "bg-[#141416] pl-3.5 pr-2.5 gap-3",
                "border border-white/10 hover:border-white/20 shadow-2xl transition-all duration-150 active:scale-[0.98]",
              )}
              style={{
                boxShadow:
                  "0 20px 40px -10px rgba(0, 0, 0, 0.85), 0 4px 12px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
              }}
            >
              {/* Clean 6px Pure White Dot */}
              <span
                className="size-1.5 rounded-full bg-white shrink-0"
                aria-hidden="true"
              />

              {/* Title with Ellipsis Truncation */}
              <span className="text-[13px] font-medium tracking-tight text-white/95 max-w-[170px] sm:max-w-[270px] truncate leading-none">
                {blogTitle || "Reading..."}
              </span>

              {/* Calibrated Circular Progress Ring */}
              <div className="flex items-center justify-center shrink-0">
                <CircularProgressBar
                  progress={scrollProgress}
                  size={22}
                  strokeWidth={2.2}
                />
              </div>
            </button>
            <MicroTooltip>{scrollProgress}% read · Back to top</MicroTooltip>
          </motion.div>
        ) : (
          /* =======================================================
             PRIMARY PORTFOLIO DOCK WITH LIQUID-GOOEY LAUNCHER
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

            {/* Liquid Gooey Connect & Socials Launcher */}
            <div
              className="relative flex items-center justify-center"
              ref={launcherRef}
            >
              <Liquid
                blur={6}
                contrast={18}
                fill="#141416"
                shadow="0 16px 32px -4px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.10)"
              >
                {/* Satellite 1: GitHub */}
                <Liquid.Item
                  x={socialOpen ? -54 : 0}
                  y={socialOpen ? -34 : 0}
                  scale={socialOpen ? 1 : 0.2}
                  transition="bouncy"
                  style={{ position: "absolute", top: 2, left: 2 }}
                >
                  <a
                    href={siteConfig.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile (opens in new tab)"
                    onClick={() => setSocialOpen(false)}
                    className={cn(
                      "group/sat relative flex size-[36px] items-center justify-center rounded-full bg-[#141416] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer select-none",
                      !socialOpen && "pointer-events-none opacity-0",
                    )}
                  >
                    <GithubIcon className="size-4" />
                    <MicroTooltip visible={socialOpen}>GitHub</MicroTooltip>
                  </a>
                </Liquid.Item>

                {/* Satellite 2: LinkedIn */}
                <Liquid.Item
                  x={0}
                  y={socialOpen ? -64 : 0}
                  scale={socialOpen ? 1 : 0.2}
                  transition="bouncy"
                  delay={40}
                  style={{ position: "absolute", top: 2, left: 2 }}
                >
                  <a
                    href={siteConfig.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile (opens in new tab)"
                    onClick={() => setSocialOpen(false)}
                    className={cn(
                      "group/sat relative flex size-[36px] items-center justify-center rounded-full bg-[#141416] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer select-none",
                      !socialOpen && "pointer-events-none opacity-0",
                    )}
                  >
                    <LinkedinIcon className="size-4" />
                    <MicroTooltip visible={socialOpen}>LinkedIn</MicroTooltip>
                  </a>
                </Liquid.Item>

                {/* Satellite 3: Share Portfolio */}
                <Liquid.Item
                  x={socialOpen ? 54 : 0}
                  y={socialOpen ? -34 : 0}
                  scale={socialOpen ? 1 : 0.2}
                  transition="bouncy"
                  delay={70}
                  style={{ position: "absolute", top: 2, left: 2 }}
                >
                  <button
                    type="button"
                    onClick={handleSharePortfolio}
                    aria-label={
                      shareCopied ? "Link copied!" : "Share portfolio link"
                    }
                    className={cn(
                      "group/sat relative flex size-[36px] items-center justify-center rounded-full bg-[#141416] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer select-none",
                      !socialOpen && "pointer-events-none opacity-0",
                      shareCopied &&
                        "border-emerald-500/40 text-emerald-400 bg-emerald-950/40",
                    )}
                  >
                    {shareCopied ? (
                      <CheckIcon className="size-3.5" />
                    ) : (
                      <ShareIcon className="size-3.5" />
                    )}
                    <MicroTooltip visible={socialOpen}>
                      {shareCopied ? "Copied! ✓" : "Share"}
                    </MicroTooltip>
                  </button>
                </Liquid.Item>

                {/* Anchor Trigger Button */}
                <Liquid.Item x={0} y={0}>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        typeof navigator !== "undefined" &&
                        navigator.vibrate
                      ) {
                        navigator.vibrate(10);
                      }
                      setSocialOpen((prev) => !prev);
                    }}
                    aria-expanded={socialOpen}
                    aria-label={
                      socialOpen
                        ? "Close social channels"
                        : "Connect & Share (opens GitHub, LinkedIn, Share)"
                    }
                    className={cn(
                      "dock-action-btn size-[40px] rounded-full relative z-10",
                      socialOpen &&
                        "bg-white/[0.16] text-white border-white/20",
                    )}
                  >
                    <PlusIcon
                      className={cn(
                        "size-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                        socialOpen && "rotate-45",
                      )}
                    />
                  </button>
                  <MicroTooltip visible={!socialOpen}>Connect</MicroTooltip>
                </Liquid.Item>
              </Liquid>
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
