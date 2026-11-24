"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { SoundFeedback } from "@/components/sound-feedback";
import type { ArchiveEntry } from "@/types/archive";
import { cn } from "@/utils/cn";

interface ArchiveRegisterProps {
  entries: ArchiveEntry[];
}

export function ArchiveRegister({ entries }: ArchiveRegisterProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (entries.length === 0) {
    return (
      <div className="py-8">
        <p className="font-mono text-xs sm:text-sm text-secondary">
          No entries found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Monospace lowercase section header */}
      <h2 className="font-mono text-sm sm:text-[15px] font-normal text-foreground lowercase tracking-normal mb-6 sm:mb-8 select-none">
        all curiosities
      </h2>

      {/* Clean monospace list with date, external link icon, blue text, and outline box on hover */}
      <ul
        className="flex flex-col gap-y-3.5 sm:gap-y-3 list-none p-0 m-0"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {entries.map((entry, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <li key={entry.number} className="relative">
              <SoundFeedback>
                <div className="flex items-start gap-3 sm:gap-4 font-mono text-xs sm:text-[13.5px]">
                  {/* Left Column: Date in muted slate-gray */}
                  <time
                    dateTime={entry.dateAdded}
                    className="shrink-0 w-[88px] sm:w-[98px] pt-[2.5px] tabular-nums text-zinc-500 select-none"
                  >
                    {entry.dateAdded}
                  </time>

                  {/* Right Column: Icon + Title with crisp outline box on hover */}
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    className={cn(
                      "group inline-flex items-start gap-1.5 -mx-2 -my-1 px-2 py-1 rounded-[4px]",
                      "border transition-colors duration-150 outline-none max-w-full w-fit leading-snug",
                      "text-[#6ba6e8] hover:text-[#8fc4ff]",
                      isHovered
                        ? "border-white/80 bg-white/[0.02]"
                        : "border-transparent"
                    )}
                  >
                    <HugeiconsIcon
                      icon={LinkSquare02Icon}
                      size={14}
                      strokeWidth={1.8}
                      className="shrink-0 mt-[2.5px] text-[#6ba6e8] group-hover:text-[#8fc4ff] transition-colors"
                    />
                    <span className="flex-1 break-words">
                      {entry.title}
                    </span>
                  </a>
                </div>
              </SoundFeedback>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
