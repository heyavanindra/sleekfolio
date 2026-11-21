import { devArchiveFixtures } from "@/data/archive/__dev-fixtures";
import { archiveEntries } from "@/data/archive/entries";
import type { ArchiveEntry, ArchiveEntryType } from "@/types/archive";

interface QueryOptions {
  allowFixtures?: boolean;
}

/**
 * Returns archive entries. In production builds, dev fixtures are strictly excluded
 * and never loaded.
 */
export function getArchiveEntries(options?: QueryOptions): ArchiveEntry[] {
  const isDev = process.env.NODE_ENV !== "production";
  const useFixtures =
    isDev &&
    (options?.allowFixtures ??
      process.env.NEXT_PUBLIC_USE_ARCHIVE_FIXTURES === "true");

  const source = useFixtures ? devArchiveFixtures : archiveEntries;

  return [...source].sort((a, b) => a.number.localeCompare(b.number));
}

/**
 * Finds a single entry by its permanent 3-digit zero-padded number.
 */
export function getArchiveEntryByNumber(
  number: string,
  options?: QueryOptions,
): ArchiveEntry | undefined {
  const entries = getArchiveEntries(options);
  return entries.find((e) => e.number === number);
}

/**
 * Retrieves adjacent entries sorted strictly by permanent entry number.
 */
export function getAdjacentEntries(
  number: string,
  options?: QueryOptions,
): { prev?: ArchiveEntry; next?: ArchiveEntry } {
  const entries = getArchiveEntries(options);
  const index = entries.findIndex((e) => e.number === number);

  if (index === -1) {
    return { prev: undefined, next: undefined };
  }

  return {
    prev: index > 0 ? entries[index - 1] : undefined,
    next: index < entries.length - 1 ? entries[index + 1] : undefined,
  };
}

/**
 * Finds up to `limit` related entries sharing at least one topic.
 */
export function getRelatedEntries(
  entry: ArchiveEntry,
  options?: QueryOptions & { limit?: number },
): ArchiveEntry[] {
  const limit = options?.limit ?? 2;
  const entries = getArchiveEntries(options);

  const topicSet = new Set(entry.topics.map((t) => t.toLowerCase()));

  return entries
    .filter(
      (candidate) =>
        candidate.number !== entry.number &&
        candidate.topics.some((t) => topicSet.has(t.toLowerCase())),
    )
    .slice(0, limit);
}

/**
 * Extracts and returns all unique entry types present in the given entries.
 */
export function getAvailableTypes(entries: ArchiveEntry[]): ArchiveEntryType[] {
  const seen = new Set<ArchiveEntryType>();
  for (const entry of entries) {
    seen.add(entry.type);
  }
  const order: ArchiveEntryType[] = [
    "PAPER",
    "RFC",
    "ARTICLE",
    "BOOK",
    "DOCUMENT",
  ];
  return order.filter((type) => seen.has(type));
}

/**
 * Formats ISO date to "d Mon yyyy" (e.g. "14 Jan 2026").
 */
export function formatArchiveDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return isoDate;
  }
}

/**
 * Formats ISO date for the left rail: "MON YYYY" (e.g. "JAN 2026").
 */
export function formatArchiveRailDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    })
      .format(d)
      .toUpperCase();
    const year = d.getUTCFullYear();
    return `${month} ${year}`;
  } catch {
    return isoDate;
  }
}

/**
 * Parses and returns clean domain name for source links (e.g. "arxiv.org").
 */
export function formatSourceDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
