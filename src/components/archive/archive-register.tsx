"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { formatArchiveRailDate, getAvailableTypes } from "@/lib/archive";
import type { ArchiveEntry, ArchiveEntryType } from "@/types/archive";

const FILTER_MIN_ENTRIES = 6;
const SORT_MIN_ENTRIES = 6;
const SEARCH_THRESHOLD = 20;

const TYPE_LABELS: Record<ArchiveEntryType, string> = {
  PAPER: "Paper",
  RFC: "RFC",
  ARTICLE: "Article",
  BOOK: "Book",
  DOCUMENT: "Document",
};

interface ArchiveRegisterProps {
  entries: ArchiveEntry[];
}

function formatLedgerNumber(numberStr: string) {
  const match = numberStr.match(/^(0+)(.*)$/);
  if (match && match[2]) {
    return (
      <>
        <span className="opacity-35 select-none">{match[1]}</span>
        <span className="text-foreground">{match[2]}</span>
      </>
    );
  }
  return <span className="text-foreground">{numberStr}</span>;
}

export function ArchiveRegister({ entries }: ArchiveRegisterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const selectedType = searchParams.get("type")?.toUpperCase() || null;
  const selectedTopic = searchParams.get("topic") || null;
  const sortOrder = searchParams.get("sort") === "oldest" ? "oldest" : "newest";
  const searchQuery = searchParams.get("q") || "";

  const availableTypes = useMemo(() => getAvailableTypes(entries), [entries]);

  // Eligibility thresholds for controls
  const canFilterType =
    entries.length >= FILTER_MIN_ENTRIES && availableTypes.length >= 2;
  const canSort = entries.length >= SORT_MIN_ENTRIES;
  const canSearch = entries.length >= SEARCH_THRESHOLD;
  const hasActiveFilter = Boolean(
    (selectedType && selectedType !== "ALL") ||
      selectedTopic ||
      (searchQuery && canSearch),
  );

  const shouldRenderControls =
    canFilterType || canSort || canSearch || hasActiveFilter;
  const canFilterTopics = canFilterType || hasActiveFilter;

  // Filter tab sliding indicator
  useEffect(() => {
    if (!canFilterType || !navRef.current) {
      setIndicator(null);
      return;
    }
    const activeLink = navRef.current.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    if (activeLink) {
      setIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    } else {
      setIndicator(null);
    }
  }, [selectedType, canFilterType, availableTypes]);

  // Filtered and sorted entries
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    if (selectedType && selectedType !== "ALL") {
      result = result.filter((e) => e.type === selectedType);
    }

    if (selectedTopic) {
      const topicLower = selectedTopic.toLowerCase();
      result = result.filter((e) =>
        e.topics.some((t) => t.toLowerCase() === topicLower),
      );
    }

    if (searchQuery.trim().length > 0 && canSearch) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.reason.toLowerCase().includes(q) ||
          e.topics.some((t) => t.toLowerCase().includes(q)),
      );
    }

    result.sort((a, b) => {
      const comp = b.dateAdded.localeCompare(a.dateAdded);
      if (comp !== 0) {
        return sortOrder === "oldest" ? -comp : comp;
      }
      return sortOrder === "oldest"
        ? a.number.localeCompare(b.number)
        : b.number.localeCompare(a.number);
    });

    return result;
  }, [entries, selectedType, selectedTopic, searchQuery, sortOrder, canSearch]);

  const isFiltering = Boolean(
    (selectedType && selectedType !== "ALL") ||
      selectedTopic ||
      (searchQuery && canSearch),
  );

  const createParamUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, val] of Object.entries(updates)) {
      if (val === null || val === "" || val === "ALL") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextUrl = createParamUrl({ q: e.target.value || null });
    router.replace(nextUrl, { scroll: false });
  };

  return (
    <div>
      {/* Active Topic Filter indicator (if set) */}
      {selectedTopic && (
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-secondary">
          <span className="flex items-center gap-2">
            <span>Topic:</span>
            <span className="text-foreground">{selectedTopic}</span>
          </span>
          <Link
            href={createParamUrl({ topic: null })}
            className="flex min-h-[32px] items-center text-secondary underline underline-offset-4 transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Remove topic filter for ${selectedTopic}`}
          >
            ✕ Clear
          </Link>
        </div>
      )}

      {/* Screen reader announcement: render only if controls qualify */}
      {shouldRenderControls && (
        <output className="sr-only" aria-live="polite">
          {isFiltering
            ? `Showing ${filteredEntries.length} of ${entries.length} entries.`
            : `Showing all ${entries.length} entries.`}
        </output>
      )}

      {/* Controls: hidden completely unless qualifying entries threshold is met */}
      {shouldRenderControls && (
        <div className="mb-8 border-y border-border py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {canFilterType ? (
              <nav
                ref={navRef}
                aria-label="Filter archive by type"
                className="relative flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none py-1"
              >
                <Link
                  href={createParamUrl({ type: null })}
                  aria-current={!selectedType ? "page" : undefined}
                  data-active={!selectedType ? "true" : undefined}
                  className={`flex min-h-[36px] items-center text-xs tracking-wide transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    !selectedType
                      ? "font-medium text-foreground"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  All
                </Link>

                {availableTypes.map((type) => {
                  const isActive = selectedType === type;
                  return (
                    <Link
                      key={type}
                      href={createParamUrl({ type: type.toLowerCase() })}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive ? "true" : undefined}
                      className={`flex min-h-[36px] items-center text-xs tracking-wide transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive
                          ? "font-medium text-foreground"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {TYPE_LABELS[type]}
                    </Link>
                  );
                })}

                {indicator && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 h-px bg-foreground transition-[transform,width] duration-[250ms] ease-[cubic-bezier(0.22,0.68,0.2,1)] motion-reduce:transition-none pointer-events-none"
                    style={{
                      transform: `translateX(${indicator.left}px)`,
                      width: `${indicator.width}px`,
                    }}
                  />
                )}
              </nav>
            ) : (
              <div />
            )}

            {canSort && (
              <div className="flex items-center justify-end">
                <Link
                  href={createParamUrl({
                    sort: sortOrder === "newest" ? "oldest" : "newest",
                  })}
                  aria-label={`Sort by date added. Currently ${sortOrder}. Click to switch to ${
                    sortOrder === "newest" ? "oldest" : "newest"
                  }.`}
                  className="flex min-h-[36px] items-center font-mono text-xs text-secondary transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {sortOrder === "newest" ? "Newest ↓" : "Oldest ↑"}
                </Link>
              </div>
            )}
          </div>

          {canSearch && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <label htmlFor={searchId} className="sr-only">
                Search archive register
              </label>
              <input
                id={searchId}
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title, topic, or reason..."
                className="w-full bg-transparent py-1.5 text-xs text-foreground placeholder:text-secondary/60 focus:outline-none focus:border-b focus:border-accent border-b border-transparent transition-colors"
              />
            </div>
          )}
        </div>
      )}

      {/* Entries Register: Ledger-style structure */}
      {filteredEntries.length === 0 ? (
        <div className="py-16 text-left">
          <p className="type-body font-sans">
            {selectedType
              ? `Nothing filed under ${TYPE_LABELS[selectedType as ArchiveEntryType] || selectedType} yet.`
              : "No entries matching this filter."}
          </p>
          <div className="mt-4">
            <Link href={pathname} className="portfolio-link text-sm font-sans">
              Show all
            </Link>
          </div>
        </div>
      ) : (
        <ol className="ledger-list relative">
          {filteredEntries.map((entry, index) => {
            const railDate = formatArchiveRailDate(entry.dateAdded);
            const visibleTopics = entry.topics.slice(0, 2);

            return (
              <li
                key={entry.number}
                className="ledger-row ledger-load-item relative pt-[36px] pb-[40px]"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                {/* Horizontal hairline above the first row (starts at margin line on desktop, full-width on mobile) */}
                {index === 0 && (
                  <div
                    className="absolute top-0 left-0 sm:left-[76px] right-0 h-px bg-border pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* Vertical margin line (desktop only, 76px from left = 56px rail + 20px half gap) */}
                <div
                  className="absolute top-0 bottom-0 left-[76px] w-px hidden sm:block bg-white/[0.09] pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="ledger-margin-accent absolute inset-0 bg-[var(--color-ledger-accent)] origin-top scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,0.68,0.2,1)]" />
                </div>

                {/* Horizontal bottom hairline (starts at margin line on desktop, full-width on mobile) */}
                <div
                  className="absolute bottom-0 left-0 sm:left-[76px] right-0 h-px bg-border pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="ledger-hairline-accent absolute inset-0 bg-[var(--color-ledger-accent)] origin-left scale-x-0 transition-transform duration-350 ease-[cubic-bezier(0.22,0.68,0.2,1)]" />
                </div>

                {/* Content container */}
                <article className="relative">
                  <div className="flex gap-4 sm:gap-[40px]">
                    {/* Left rail: fixed width 56px, mono 12px, tabular-nums */}
                    <div className="w-[56px] shrink-0 pt-1 select-none font-mono text-[12px] tabular-nums">
                      {formatLedgerNumber(entry.number)}
                    </div>

                    {/* Right column: text column */}
                    <div className="min-w-0 flex-1">
                      {/* Title row: serif 24px/1.2, tracking -0.01em, text-balance, warm off-white */}
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-serif text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-balance text-foreground line-clamp-2">
                          <a
                            href={entry.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ledger-title-link after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                          >
                            {entry.title}
                          </a>
                        </h2>

                        {/* Indicator arrow: ↗ (14px), aligned to first line of title, right-aligned, resting opacity 35% */}
                        <span
                          aria-hidden="true"
                          className="ledger-arrow text-[14px] leading-[1.2] text-secondary opacity-35 select-none shrink-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,0.68,0.2,1)]"
                        >
                          ↗
                        </span>
                      </div>

                      {/* Reason: serif italic 16px/1.55, max-width 52ch, text-pretty, clamp 2 lines, mt-[12px] */}
                      <p className="mt-[12px] font-serif italic text-[16px] leading-[1.55] max-w-[52ch] text-pretty line-clamp-2">
                        <span className="opacity-45 mr-1.5 select-none">
                          Kept because
                        </span>
                        <span className="opacity-[0.78] text-foreground">
                          {entry.reason}
                        </span>
                      </p>

                      {/* Meta line: sans 11px uppercase, tracking 0.1em, line-height 1, mt-[16px] */}
                      <div className="ledger-meta mt-[16px] font-sans text-[11px] uppercase tracking-[0.1em] leading-none text-secondary">
                        <span className="meta-seg-55 opacity-55 transition-opacity duration-200">
                          {entry.type}
                        </span>
                        <span className="meta-seg-25 mx-2 opacity-25 select-none transition-opacity duration-200">
                          ·
                        </span>
                        <span className="meta-seg-55 opacity-55 transition-opacity duration-200">
                          {railDate}
                        </span>
                        {visibleTopics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center"
                          >
                            <span className="meta-seg-25 mx-2 opacity-25 select-none transition-opacity duration-200">
                              ·
                            </span>
                            {canFilterTopics ? (
                              <Link
                                href={createParamUrl({ topic })}
                                className="meta-seg-40 opacity-40 relative z-10 transition-colors duration-150 hover:text-foreground focus-visible:outline-1 focus-visible:outline-accent"
                              >
                                {topic}
                              </Link>
                            ) : (
                              <span className="meta-seg-40 opacity-40 transition-opacity duration-200">
                                {topic}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
