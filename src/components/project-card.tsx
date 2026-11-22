"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { type MouseEvent, useRef, useState } from "react";
import { ProjectTechAvatarGroup } from "@/components/project-tech-avatar-group";
import { SocialIcons } from "@/components/social-icons";
import type { ProjectItem } from "@/config";
import { cn } from "@/utils/cn";

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-[#151412] p-3.5 sm:p-4",
        "transition-[box-shadow,background-color] duration-240 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#1c1b18]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)]",
        "active:scale-[0.995] motion-reduce:transition-none motion-reduce:transform-none",
      )}
    >
      {/* Ambient Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.05), transparent 45%)`,
        }}
        aria-hidden="true"
      />


      {/* Visual preview window with natural fit & glass glare */}
      <Link
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} live preview`}
        className="relative block w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0d0f] transition-[border-color] duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1920}
          height={970}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          className="h-auto w-full object-contain transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] motion-reduce:transform-none"
        />

        {/* Subtle glass glare sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.06] opacity-0 transition-opacity duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08] transition-opacity duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
        />
      </Link>

      {/* Project information & description */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="type-item-title text-[17px] font-semibold tracking-tight sm:text-lg">
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/90 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {project.title}
              </Link>
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-secondary text-pretty sm:text-[13px]">
              {project.description}
            </p>
          </div>

          {/* Quick action buttons with tactile active press feedback */}
          <div className="flex shrink-0 items-center gap-1 pt-0.5">
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live`}
              title="Live Demo"
              className="flex size-7.5 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-white/[0.08] hover:text-foreground active:scale-90 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span
                className="font-sans text-sm leading-none transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              title="GitHub Repository"
              className="flex size-7.5 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-white/[0.08] hover:text-foreground active:scale-90 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <SocialIcons.github className="size-3.5 transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transform-none" />
            </Link>
          </div>
        </div>

        {/* Bottom row: Tech stack avatar group */}
        <div className="mt-auto pt-4">
          <ProjectTechAvatarGroup
            label={`${project.title} tech stack`}
            stack={project.stack}
          // className="mt-0"
          />
        </div>
      </div>
    </article>
  );
}
