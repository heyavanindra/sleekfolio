import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveRegister } from "@/components/archive/archive-register";
import { SiteNav } from "@/components/site-nav";
import { getArchiveEntries } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Repository of Curiosities — Avanindra Tiwari",
  description:
    "An eclectic hoard of papers, tools, gems, and rabbit holes worth keeping.",
  openGraph: {
    title: "Repository of Curiosities — Avanindra Tiwari",
    description:
      "An eclectic hoard of papers, tools, gems, and rabbit holes worth keeping.",
  },
};

export default function ArchivePage() {
  const entries = getArchiveEntries();
  const isEmpty = entries.length === 0;

  return (
    <main
      id="main-content"
      className="relative z-10 min-h-screen flex flex-col"
    >
      <SiteNav />
      <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-0 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col pt-14 pb-16 md:pt-16 sm:pb-20">
          {/* 1. Page Header: Title and Tagline */}
          <header>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
              Repository of Curiosities
            </h1>
            <p className="mt-2 text-base text-secondary font-sans">
              An eclectic hoard of papers, tools, gems, and rabbit holes worth keeping.
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

        </div>
      </div>
    </main>
  );
}
