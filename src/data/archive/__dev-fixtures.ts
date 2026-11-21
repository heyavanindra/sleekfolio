import type { ArchiveEntry } from "@/types/archive";

/**
 * DEV FIXTURES ONLY — NEVER INCLUDED IN PRODUCTION BUILDS.
 *
 * Obviously fake placeholder content for local visual testing of the UI states
 * and interaction behavior.
 */
export const devArchiveFixtures: ArchiveEntry[] = [
  {
    number: "001",
    type: "PAPER",
    title:
      "Placeholder Title: On Distributed Consensus Under Asynchronous Partial Partitions",
    description:
      "A foundational exploration of consistency models and quorum intersection across degraded wide-area topologies.",
    reason:
      "Clear articulation of why partition boundaries cannot be completely hidden by abstractions.",
    topics: ["Distributed systems", "Consensus", "Fault tolerance"],
    dateAdded: "2026-01-14",
    lastRevisited: "2026-03-02",
    sourceUrl: "https://example.com/papers/001-placeholder",
    localCopy: "/documents/remnants/001-placeholder.pdf",
    notes: `### Takeaways & Observations

- The abstraction begins leaking the moment network packet latency variance exceeds bounded thresholds.
- Simplicity in the failure detector model prevents cascading failures far better than aggressive reconnect storms.
- When in doubt, prefer explicit fail-stop over ambiguous state recovery.`,
  },
  {
    number: "002",
    type: "RFC",
    title:
      "Placeholder RFC: Architectural Principles for Ephemeral Stream Processing",
    description:
      "A specification outlining framed message semantics and backpressure negotiation over stateless transport channels.",
    reason:
      "The backpressure handshake model solves edge queue blowout without complex window bookkeeping.",
    topics: ["Networking", "Protocols"],
    dateAdded: "2026-02-18",
    sourceUrl: "https://example.com/rfc/placeholder-rfc",
  },
  {
    number: "003",
    type: "BOOK",
    title: "Placeholder Book: Designing Systems for Graceful Degradation",
    description:
      "A classic treatise on operational resilience, bulkheading, and shed-load design in high-concurrency environments.",
    reason:
      "Taught me to design failure modes first before writing the happy path.",
    topics: ["Systems design", "Reliability"],
    dateAdded: "2026-03-10",
    sourceUrl: "https://example.com/books/placeholder-book",
    notes:
      "A mandatory revisit whenever structuring shed-load boundaries or circuit breakers in high-concurrency services.",
  },
  {
    number: "004",
    type: "ARTICLE",
    title:
      "Placeholder Article: Memory Layout and Cache Locality in Modern Runtimes",
    description:
      "Detailed dissection of cache-line invalidation and struct-of-arrays optimizations in garbage-collected engines.",
    reason:
      "Precise empirical benchmarks showing how small layout decisions compound at high throughput.",
    topics: ["Performance", "Memory"],
    dateAdded: "2026-04-05",
    sourceUrl: "https://example.com/articles/placeholder-memory",
  },
  {
    number: "005",
    type: "DOCUMENT",
    title:
      "Placeholder Document: Safety Invariants for High-Availability Cluster Formation",
    description:
      "Internal technical specification documenting split-brain mitigation and lease renewal timeouts.",
    reason:
      "Crisp definition of state machine invariants that eliminated intermittent cluster flapping.",
    topics: ["Distributed systems", "Reliability"],
    dateAdded: "2026-05-12",
    sourceUrl: "https://example.com/docs/placeholder-safety",
  },
];
