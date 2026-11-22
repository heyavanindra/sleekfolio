"use client";

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CompanyLogos } from "@/components/company-logos";
import { ProjectTechAvatarGroup } from "@/components/project-tech-avatar-group";
import { experienceConfig } from "@/config";
import { playClickSound } from "@/lib/sound";
import { cn } from "@/utils/cn";

export default function Experience() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(
    experienceConfig.items[0]?.company ?? null,
  );

  return (
    <section id="experience" className="mt-20 scroll-mt-20 md:mt-24">
      {/* Section Header */}
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {experienceConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Experience Entries */}
      <div className="divide-y divide-border/40">
        {experienceConfig.items.map((experience) => {
          const isOpen = expandedCompany === experience.company;
          const isRoleHovered = hoveredRole === experience.company;
          const { period, duration } = formatPeriodAndDuration(
            experience.startDate,
            experience.endDate,
          );
          const LogoComponent =
            "logoId" in experience && experience.logoId
              ? CompanyLogos[experience.logoId as keyof typeof CompanyLogos]
              : null;

          return (
            <article
              key={experience.company}
              className="py-8 first:pt-0 last:pb-2 md:py-10"
            >
              {/* Company & Location Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {LogoComponent && (
                    <div className="flex size-5 shrink-0 items-center justify-center text-foreground sm:size-5.5">
                      <LogoComponent className="size-4.5 sm:size-5 object-contain" />
                    </div>
                  )}
                  <h3 className="font-semibold text-foreground text-base tracking-tight sm:text-lg">
                    {experience.company}
                  </h3>
                </div>

                {experience.location && (
                  <span className="text-xs font-normal text-foreground sm:text-sm">
                    {experience.location.replace(/\s*\([^)]*\)/g, "").trim()}
                  </span>
                )}
              </div>

              {/* Role Details */}
              <div className="mt-3">
                {/* Role Designation with Blog-style Hover Backdrop */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setExpandedCompany((prev) =>
                      prev === experience.company ? null : experience.company,
                    );
                  }}
                  onMouseEnter={() => setHoveredRole(experience.company)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onFocus={() => setHoveredRole(experience.company)}
                  onBlur={() => setHoveredRole(null)}
                  className={cn(
                    "group relative isolate -mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left",
                    "outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    "transition-transform duration-160 ease-out active:scale-[0.99]",
                  )}
                  aria-expanded={isOpen}
                >
                  {/* Animated Hover Pill Backdrop (no layout animation) */}
                  <AnimatePresence>
                    {isRoleHovered && (
                      <motion.span
                        className="absolute inset-0 -z-1 rounded-xl bg-white/[0.05] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.15,
                          ease: "easeOut",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>

                  <span
                    className={cn(
                      "font-semibold text-foreground text-sm tracking-tight sm:text-base",
                      "transition-all duration-200 ease-out",
                      isRoleHovered && "translate-x-0.5",
                    )}
                  >
                    {experience.role}
                  </span>

                  <span
                    className={cn(
                      "text-muted-foreground transition-colors group-hover:text-foreground",
                      isRoleHovered && "text-foreground",
                    )}
                  >
                    {isOpen ? (
                      <ChevronsDownUp className="size-3.5 sm:size-4" />
                    ) : (
                      <ChevronsUpDown className="size-3.5 sm:size-4" />
                    )}
                  </span>
                </button>

                {/* Metadata: Employment type, Period, Duration */}
                <div className="mt-1 flex items-center gap-2 text-xs font-mono text-muted-foreground sm:text-[13px]">
                  <span>{experience.employmentType || "Full-time"}</span>
                  <span className="text-border">|</span>
                  <span>{period}</span>
                  <span className="text-border">|</span>
                  <span>{duration}</span>
                </div>

                {/* Accordion Expandable Content (Bullet pointers) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3.5 list-disc space-y-2.5 pl-4 sm:pl-5 text-sm leading-relaxed text-secondary marker:text-neutral-400 sm:text-[14.5px]">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight.text} className="pl-1">
                            {highlight.emphasize
                              ? renderHighlightedText(
                                  highlight.text,
                                  highlight.emphasize,
                                )
                              : highlight.text}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tech Stack Icons */}
                {experience.stack && experience.stack.length > 0 && (
                  <div className="mt-4 flex items-center">
                    <ProjectTechAvatarGroup
                      label={`${experience.company} tech stack`}
                      stack={experience.stack}
                      className="mt-0"
                    />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function renderHighlightedText(text: string, highlight: string) {
  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <span className="font-medium text-foreground">{highlight}</span>
      {after}
    </>
  );
}

function formatPeriodAndDuration(startDate: string, endDate: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startFormatted = `${String(start.getUTCMonth() + 1).padStart(2, "0")}.${start.getUTCFullYear()}`;
  const endFormatted = endDate
    ? `${String(end.getUTCMonth() + 1).padStart(2, "0")}.${end.getUTCFullYear()}`
    : "Present";

  const startYear = start.getUTCFullYear();
  const startMonth = start.getUTCMonth();
  const endYear = end.getUTCFullYear();
  const endMonth = end.getUTCMonth();

  const totalMonths = Math.max(
    1,
    (endYear - startYear) * 12 + (endMonth - startMonth) + 1,
  );

  let duration = "";
  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    duration = months > 0 ? `${years}y ${months}m` : `${years}y`;
  } else {
    duration = `${totalMonths}m`;
  }

  return {
    period: `${startFormatted} — ${endFormatted}`,
    duration,
  };
}
