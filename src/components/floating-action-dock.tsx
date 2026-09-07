"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

function CircularProgressBar({
  progress,
  size = 24,
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
        "pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 whitespace-nowrap",
        "rounded-full border border-white/10 bg-[#141416] px-2.5 py-0.5 text-[11px] font-medium tracking-tight text-white/90 shadow-2xl",
        "opacity-0 transition-all duration-150 ease-out group-hover:-top-9.5 group-hover:opacity-100 group-focus-within:-top-9.5 group-focus-within:opacity-100",
      )}
    >
      {children}
    </span>
  );
}

export function FloatingActionDock() {
  const pathname = usePathname();
  const isBlog = Boolean(pathname?.startsWith("/blog"));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [blogTitle, setBlogTitle] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Track page scroll percentage
  useEffect(() => {
    if (!isBlog) return;

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
  }, [isBlog]);

  // Fetch active heading dynamically as user scrolls through article
  useEffect(() => {
    if (!isBlog) return;

    const updateActiveHeading = () => {
      const headings = Array.from(
        document.querySelectorAll("article h2, article h3, article h4, h1"),
      );
      if (!headings.length) {
        const fallbackH1 = document.querySelector("h1");
        if (fallbackH1?.textContent) {
          setBlogTitle(fallbackH1.textContent.trim());
        }
        return;
      }

      const mainH1 = document.querySelector("h1");
      const scrollY = window.scrollY;

      // When near top of post, display main title
      if (scrollY < 200 && mainH1?.textContent) {
        setBlogTitle(mainH1.textContent.trim());
        return;
      }

      // Find current section heading scrolled past the top of the viewport
      let current = mainH1?.textContent?.trim() || "";
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 220 && heading.textContent?.trim()) {
          current = heading.textContent.trim();
        }
      }
      setBlogTitle(current);
    };

    updateActiveHeading();
    const timer = setTimeout(updateActiveHeading, 150);
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [isBlog]);

  const scrollToTop = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Remove dock everywhere except blog pages
  if (!isBlog) {
    return null;
  }

  return (
    <aside aria-label="Floating Action Dock" className="dock-island-shell">
      <AnimatePresence mode="wait">
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
              "pointer-events-auto relative flex h-[42px] sm:h-[44px] w-[240px] max-w-[calc(100vw-2rem)] items-center rounded-full select-none cursor-pointer",
              "bg-[#141416]/95 backdrop-blur-md pl-4 pr-2.5 gap-2.5 sm:gap-3",
              "border border-white/12 hover:border-white/25 shadow-2xl transition-all duration-200 active:scale-[0.98]",
            )}
            style={{
              boxShadow:
                "0 16px 36px -6px rgba(0, 0, 0, 0.85), 0 4px 12px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
            }}
          >
            {/* Clean 7px Pure White Dot with subtle glow */}
            <span
              className="size-[7px] rounded-full bg-white shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.45)]"
              aria-hidden="true"
            />

            {/* Title / Section Heading with Fixed Slot, Ellipsis Truncation, & Transitions.dev Text States Swap */}
            <div className="flex-1 min-w-0 overflow-hidden text-left relative h-[18px] flex items-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={blogTitle || "Reading..."}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { y: 6, filter: "blur(2px)", opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { y: 0, filter: "blur(0px)", opacity: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { y: -6, filter: "blur(2px)", opacity: 0 }
                  }
                  transition={{
                    duration: 0.16,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="block w-full truncate text-[13px] sm:text-[13.5px] font-medium tracking-tight text-white/95 leading-none"
                >
                  {blogTitle || "Reading..."}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Calibrated Circular Progress Ring */}
            <div className="flex items-center justify-center shrink-0">
              <CircularProgressBar
                progress={scrollProgress}
                size={24}
                strokeWidth={2.2}
              />
            </div>
          </button>
          <MicroTooltip>{scrollProgress}% read · Back to top</MicroTooltip>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
