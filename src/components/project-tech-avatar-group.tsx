"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ProjectTechIcon } from "@/components/project-tech-icon";

type ProjectTechAvatarGroupProps = {
  label: string;
  stack: string[];
};

export function ProjectTechAvatarGroup({
  label,
  stack,
}: ProjectTechAvatarGroupProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-18, 18], [-4, 4]), {
    damping: 18,
    stiffness: 160,
  });
  const translateX = useSpring(useTransform(x, [-18, 18], [-6, 6]), {
    damping: 18,
    stiffness: 160,
  });

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const clientX = event.clientX;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      x.set(clientX - rect.left - rect.width / 2);
    });
  };

  return (
    <ul
      className="mt-5 flex max-w-full flex-wrap items-center pl-1"
      aria-label={label}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {stack.map((item, index) => {
        const distance =
          hoveredIndex === null
            ? Number.POSITIVE_INFINITY
            : Math.abs(index - hoveredIndex);
        const lift = hoveredIndex === null ? 0 : -3 * 0.4 ** distance;
        const isHovered = hoveredIndex === index;

        return (
          <ProjectTechIcon
            key={item}
            name={item}
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: isHovered ? 1.025 : 1, y: lift }
            }
            className="-ml-3 first:ml-0"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseMove={handleMouseMove}
            style={{ zIndex: index + 1 }}
            title=""
            transition={{
              damping: hoveredIndex === null ? 14 : 24,
              stiffness: hoveredIndex === null ? 260 : 340,
              type: "spring",
            }}
          >
            <AnimatePresence>
              {isHovered ? (
                <span className="pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 z-50 -translate-x-1/2">
                  <motion.span
                    className="relative flex items-center rounded-md border border-border bg-background/95 px-2.5 py-1.5 font-mono text-[0.7rem] leading-none whitespace-nowrap text-foreground shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm"
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 6, scale: 0.96 }
                    }
                    animate={{
                      opacity: 1,
                      ...(shouldReduceMotion ? {} : { y: 0, scale: 1 }),
                      transition: {
                        ...(shouldReduceMotion
                          ? { duration: 0.12, ease: "easeOut" }
                          : {
                              damping: 18,
                              stiffness: 260,
                              type: "spring",
                            }),
                      },
                    }}
                    exit={
                      shouldReduceMotion
                        ? {
                            opacity: 0,
                            transition: { duration: 0.08, ease: "easeOut" },
                          }
                        : {
                            opacity: 0,
                            y: 4,
                            scale: 0.98,
                            transition: { duration: 0.08, ease: "easeOut" },
                          }
                    }
                    style={
                      shouldReduceMotion ? undefined : { rotate, x: translateX }
                    }
                  >
                    {item}
                    <span className="absolute top-full left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-border bg-background" />
                  </motion.span>
                </span>
              ) : null}
            </AnimatePresence>
          </ProjectTechIcon>
        );
      })}
    </ul>
  );
}
