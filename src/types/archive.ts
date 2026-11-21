export type ArchiveEntryType =
  | "PAPER"
  | "RFC"
  | "ARTICLE"
  | "BOOK"
  | "DOCUMENT";

export interface ArchiveEntry {
  /**
   * Permanent 3-digit zero-padded identifier (e.g. "001", "002").
   * PERMANENT: Never derived from array index or sort order.
   * Never reuse a number, even if an entry is removed.
   */
  number: string;

  /**
   * Category of the remnant document.
   */
  type: ArchiveEntryType;

  /**
   * Title of the document or paper.
   */
  title: string;

  /**
   * One or two sentences describing what the document is.
   */
  description: string;

  /**
   * One sentence in personal voice explaining why it was kept. Required.
   */
  reason: string;

  /**
   * Topic tags (max 2 shown in the register index; all shown on the record).
   */
  topics: string[];

  /**
   * ISO 8601 date string when added to the archive (e.g. "2026-03-15").
   */
  dateAdded: string;

  /**
   * Optional ISO 8601 date string when last revisited.
   */
  lastRevisited?: string;

  /**
   * Canonical URL of the original source.
   */
  sourceUrl: string;

  /**
   * Optional path to an archived local copy (e.g. "/documents/paper.pdf").
   */
  localCopy?: string;

  /**
   * Optional longer markdown takeaways, notes, or ideas worth revisiting.
   */
  notes?: string;
}
