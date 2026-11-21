import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveRegister } from "@/components/archive/archive-register";
import { SiteNav } from "@/components/site-nav";
import { getArchiveEntries } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Repository of Remnants — Avanindra Tiwari",
  description:
    "Fragments of knowledge worth keeping. A curated personal archive of papers, specifications, and books with a note on why each was kept.",
  openGraph: {
    title: "Repository of Remnants — Avanindra Tiwari",
    description:
      "Fragments of knowledge worth keeping. A curated personal archive of papers, specifications, and books.",
  },
};

export default function ArchivePage() {
  const entries = getArchiveEntries();
  const isEmpty = entries.length === 0;

  return (
    <main
      id="main-content"
      className="portfolio-grid-background min-h-screen flex flex-col"
    >
      <SiteNav />
      <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-0 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col pt-14 pb-16 md:pt-16 sm:pb-20">
          {/* 1. Page Header: Title and Tagline only */}
          <header>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
              Repository of Remnants
            </h1>
            <p className="mt-2 text-base text-secondary font-sans">
              Fragments of knowledge worth keeping.
            </p>
          </header>

          {/* Gap between header and list: ~72px */}
          <div className="mt-[72px]">
            {isEmpty ? (
              <div className="py-12 border-t border-border">
                <p className="font-mono text-sm text-secondary">
                  The first entry is being chosen.
                </p>
              </div>
            ) : (
              <Suspense fallback={null}>
                <ArchiveRegister entries={entries} />
              </Suspense>
            )}
          </div>

          {/* 4. Colophon: pushed to the bottom with margin-top: auto */}
          <footer className="mt-auto pt-16 border-t border-border font-mono text-xs text-secondary">
            <p>
              {entries.length} {entries.length === 1 ? "entry" : "entries"} ·
              maintained by hand · numbers are never reused
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
