"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "next-view-transitions";
import Container from "@/component/container";
import { SiteLogo } from "@/components/site-logo";

const navItems = [
  {
    label: "Work",
    href: "/#work",
  },
  {
    label: "Writing",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
] as const;

export function SiteNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="pt-8 md:pt-12">
      <Container>
        <nav className="flex h-9 items-center justify-between">
          <Link
            href="/"
            aria-label="Avanindra Tiwari home"
            className="site-brand-mark"
          >
            <SiteLogo className="h-5 sm:h-[22px] w-auto transition-transform duration-200 ease-out hover:scale-[1.03]" />
          </Link>

          <div
            className="site-nav-items relative flex items-center gap-1 sm:gap-1.5"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className="relative isolate inline-flex items-center px-3 py-1.5 text-sm sm:text-[14.5px] font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full text-secondary hover:text-foreground"
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        layoutId={
                          shouldReduceMotion ? undefined : "site-nav-hover-pill"
                        }
                        className="absolute inset-0 -z-10 rounded-full bg-[#1f1e1c]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          duration: 0.22,
                          bounce: 0,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}
