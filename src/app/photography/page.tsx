import type { Metadata } from "next";
import Container from "@/component/container";
import { PhotoGallery } from "@/components/photography/photo-gallery";
import { SiteNav } from "@/components/site-nav";
import { allPhotographs, photoSpreads } from "@/data/photography/photos";

export const metadata: Metadata = {
  title: "Photographs — Avanindra Tiwari",
  description:
    "A personal photography collection. Fragments of light, places, architecture, and quiet intervals recorded across 35mm and medium format.",
  openGraph: {
    title: "Photographs — Avanindra Tiwari",
    description:
      "A personal photography collection. Fragments of light, places, and quiet intervals.",
  },
};

export default function PhotographyPage() {
  return (
    <main id="main-content" className="relative z-10 min-h-screen">
      <SiteNav />

      {/* 1. Masthead: anchored to standard narrow reading column (~672px) */}
      <Container>
        <header className="pt-14 pb-16 md:pt-16 sm:pb-20">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Photographs.
          </h1>
          <p className="mt-2 text-base text-secondary font-sans text-pretty">
            A collection of places, details and quiet intervals.
          </p>
        </header>
      </Container>

      {/* 2. Expanded Editorial Photobook Canvas (~880px / max-w-4xl) */}
      <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-8">
        <PhotoGallery spreads={photoSpreads} allPhotos={allPhotographs} />
      </div>

      {/* 3. Colophon: anchored back to standard reading column */}
      <Container>
        <footer className="mt-24 sm:mt-32 pb-28 sm:pb-32 pt-8 border-t border-border font-mono text-xs text-secondary">
          <p>
            {allPhotographs.length} photographs · continuous register · 35mm &
            medium format
          </p>
        </footer>
      </Container>
    </main>
  );
}
