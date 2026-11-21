"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoLightbox } from "@/components/photography/photo-lightbox";
import type { PhotoSpread, Photograph } from "@/types/photography";

interface PhotoGalleryProps {
  spreads: PhotoSpread[];
  allPhotos: Photograph[];
}

export function PhotoGallery({ spreads, allPhotos }: PhotoGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openPhoto = (photoId: string) => {
    const idx = allPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
    }
  };

  return (
    <>
      <div className="space-y-16 sm:space-y-24">
        {spreads.map((spread, spreadIdx) => {
          if (spread.type === "full") {
            const photo = spread.photo;
            return (
              <section
                key={`spread-full-${photo.id}`}
                aria-label={`Photograph: ${photo.title}`}
                className="w-full"
              >
                <div
                  onClick={() => openPhoto(photo.id)}
                  className="group cursor-zoom-in"
                >
                  <div className="relative w-full overflow-hidden bg-white/[0.02]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      priority={spreadIdx === 0}
                      className="w-full h-auto object-cover transition-opacity duration-200 group-hover:opacity-90"
                      sizes="(max-width: 880px) 100vw, 880px"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-3 flex items-baseline justify-between font-sans text-xs text-secondary">
                    <p className="uppercase tracking-[0.08em] text-foreground/90 transition-colors duration-150 group-hover:text-foreground">
                      {photo.id} — {photo.title}
                    </p>
                    <p className="text-[11px] text-secondary/70">
                      {[photo.location, photo.date, photo.camera]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              </section>
            );
          }

          if (spread.type === "diptych") {
            const [photoA, photoB] = spread.photos;
            return (
              <section
                key={`spread-diptych-${photoA.id}-${photoB.id}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10"
              >
                {[photoA, photoB].map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => openPhoto(photo.id)}
                    className="group cursor-zoom-in"
                  >
                    <div className="relative w-full overflow-hidden bg-white/[0.02]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        className="w-full h-auto object-cover transition-opacity duration-200 group-hover:opacity-90"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </div>

                    {/* Caption */}
                    <div className="mt-3 flex items-baseline justify-between font-sans text-xs text-secondary">
                      <p className="uppercase tracking-[0.08em] text-foreground/90 transition-colors duration-150 group-hover:text-foreground">
                        {photo.id} — {photo.title}
                      </p>
                      <p className="text-[11px] text-secondary/70">
                        {[photo.location, photo.date]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            );
          }

          if (spread.type === "solo") {
            const photo = spread.photo;
            const isRight = spread.align === "right";

            return (
              <section key={`spread-solo-${photo.id}`} className="w-full flex">
                <div
                  onClick={() => openPhoto(photo.id)}
                  className={`w-full md:w-[62%] ${isRight ? "md:ml-auto" : "md:mr-auto"} group cursor-zoom-in`}
                >
                  <div className="relative w-full overflow-hidden bg-white/[0.02]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      className="w-full h-auto object-cover transition-opacity duration-200 group-hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-3 flex items-baseline justify-between font-sans text-xs text-secondary">
                    <p className="uppercase tracking-[0.08em] text-foreground/90 transition-colors duration-150 group-hover:text-foreground">
                      {photo.id} — {photo.title}
                    </p>
                    <p className="text-[11px] text-secondary/70">
                      {[photo.location, photo.date, photo.camera]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      {/* Lightbox / Immersive Viewer Modal */}
      <PhotoLightbox
        photos={allPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </>
  );
}
