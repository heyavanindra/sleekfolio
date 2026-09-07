"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/utils/cn";

export interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Architectural Monochromatic Tracing Beam for Sleekfolio
 *
 * Refactored from Aceternity's default neon template to match Sleekfolio's
 * obsidian luxury and Apple/Linear editorial restraint:
 * - Monochromatic white-hot photon laser pulse (replaces cyan/purple neon)
 * - Laser-straight hairline track (replaces arbitrary zig-zag kinks)
 * - Contained within timeline gutter with zero viewport bleed or horizontal scroll
 * - Dynamic ResizeObserver for responsive font/content shifts
 * - Built-in prefers-reduced-motion compliance
 */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [0, Math.max(0, svgHeight)]),
    {
      stiffness: 420,
      damping: 85,
    },
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, Math.max(0, svgHeight - 60)]),
    {
      stiffness: 420,
      damping: 85,
    },
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full pl-6 sm:pl-8 md:pl-10",
        className,
      )}
    >
      {/* Laser-straight architectural timeline rail */}
      <div
        className="pointer-events-none absolute top-1.5 left-1.5 sm:left-2 -translate-x-1/2 select-none"
        aria-hidden="true"
      >
        {/* Origin node dot */}
        <div className="flex size-3.5 items-center justify-center rounded-full border border-white/15 bg-[#141416] shadow-sm">
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : undefined,
            }}
            animate={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            }}
            className="size-1.5 rounded-full bg-white"
          />
        </div>

        {/* Straight Hairline SVG Track & Active Beam */}
        {svgHeight > 0 && (
          <svg
            viewBox={`0 0 2 ${svgHeight}`}
            width="2"
            height={svgHeight}
            className="block ml-[6px]"
            aria-hidden="true"
          >
            {/* Ambient track hairline */}
            <line
              x1="1"
              y1="0"
              x2="1"
              y2={svgHeight}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />

            {/* Active white photon beam */}
            {!shouldReduceMotion && (
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2={svgHeight}
                stroke="url(#sleek-beam-gradient)"
                strokeWidth="1.75"
              />
            )}

            <defs>
              <motion.linearGradient
                id="sleek-beam-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Main Content Area */}
      <div ref={contentRef} className="min-w-0 w-full">
        {children}
      </div>
    </div>
  );
}
