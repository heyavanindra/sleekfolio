import type { ArchiveEntry } from "@/types/archive";

/**
 * Repository of Remnants — Master Content Source
 *
 * This is the permanent register of curated papers, RFCs, articles, books,
 * and documents kept for their enduring value.
 *
 * HOW TO ADD A REAL ENTRY:
 * 1. Add a new object to the `archiveEntries` array below.
 * 2. Assign the next sequential 3-digit number (e.g. "001", "002").
 *    RULE: Numbers are permanent identifiers. Never reuse a number,
 *    even if an earlier entry is retired or deleted.
 * 3. Fill in the required fields:
 *    - `number`: string, zero-padded ("001")
 *    - `type`: "PAPER" | "RFC" | "ARTICLE" | "BOOK" | "DOCUMENT"
 *    - `title`: string
 *    - `description`: 1-2 sentences on what the document is
 *    - `reason`: 1 personal sentence explaining why you kept it
 *    - `topics`: string[] of relevant topics (e.g. ["Distributed systems", "Consensus"])
 *    - `dateAdded`: ISO 8601 date ("YYYY-MM-DD")
 *    - `sourceUrl`: string URL
 * 4. Optionally fill in:
 *    - `lastRevisited`: ISO 8601 date ("YYYY-MM-DD")
 *    - `localCopy`: relative path to local document or PDF (e.g. "/documents/remnants/001.pdf")
 *    - `notes`: markdown text containing takeaways, diagrams, or references
 *
 * Example:
 * {
 *   number: "001",
 *   type: "PAPER",
 *   title: "Hints for Computer System Design",
 *   description: "Butler Lampson's classic paper summarizing design aphorisms from systems work at Xerox PARC.",
 *   reason: "Essential mental model for separating mechanism from policy and embracing 'fast path, slow path' architectures.",
 *   topics: ["Systems design", "Architecture"],
 *   dateAdded: "2026-03-15",
 *   sourceUrl: "https://www.cs.cmu.edu/~crary/819-f09/Lampson83.pdf",
 * }
 */
export const archiveEntries: ArchiveEntry[] = [
  {
    number: "001",
    type: "PAPER",
    title: "Dynamo: Amazon's Highly Available Key-value Store",
    description:
      "Amazon's seminal SOSP 2007 paper detailing the decentralized, highly available, and eventually consistent key-value storage system powering their core infrastructure.",
    reason:
      "The definitive blueprint for practical distributed system trade-offs: SLA-driven 99.9th percentile design, consistent hashing, vector clocks, and hinted handoff at massive scale.",
    topics: [
      "Distributed systems",
      "Storage",
      "High availability",
      "Databases",
    ],
    dateAdded: "2026-11-21",
    sourceUrl:
      "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
    notes: `### Core Architecture & Key Concepts

- **Partitioning & Consistent Hashing**: Uses consistent hashing with virtual nodes to evenly partition keyspace and smoothly redistribute load as storage nodes join or leave the ring.
- **Always-Writable Principle**: Prioritizes write availability over strict consistency; writes are accepted even during server or network partitions, deferring conflict reconciliation to reads via vector clocks or client business logic.
- **Sloppy Quorum & Hinted Handoff**: Relaxes strict quorums $(N, R, W)$ by allowing transient healthy nodes outside the primary preference list to accept writes and hand them back when the primary recovers.
- **Anti-Entropy via Merkle Trees**: Background synchronization uses Merkle trees per key range to detect divergences between replicas with minimal data transfer.
- **Service Level Agreements (SLAs)**: Shifts performance optimization from average case to strict 99.9th percentile tail latency guarantees.`,
  },
];
