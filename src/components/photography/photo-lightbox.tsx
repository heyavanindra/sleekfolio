"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Photograph } from "@/types/photography";

interface PhotoLightboxProps {
  photos: Photograph[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isOpen = currentIndex !== null;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  const total = photos.length;
  const displayIndex = currentIndex !== null ? currentIndex + 1 : 0;
  const formattedIndex = `${String(displayIndex).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex - 1 + total) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe takes precedence if > 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (deltaY > 80 && Math.abs(deltaY) > Math.abs(deltaX)) {
      // Swipe down to dismiss
      onClose();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph viewer: ${currentPhoto.title}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505]/96 backdrop-blur-md transition-opacity duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Close button & Monospace counter */}
      <div className="flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer (Escape)"
          className="group flex min-h-[44px] items-center gap-2 font-mono text-xs text-secondary transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span
            aria-hidden="true"
            className="text-sm select-none transition-transform duration-150 motion-safe:group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>Close</span>
        </button>

        <span className="font-mono text-xs text-secondary/80 tabular-nums">
          {formattedIndex}
        </span>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph (Arrow Left)"
          className="absolute left-2 sm:left-6 z-10 flex size-12 items-center justify-center rounded-full text-secondary/60 transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="text-2xl select-none" aria-hidden="true">
            ‹
          </span>
        </button>

        {/* The Photograph */}
        <div
          className="relative max-h-[76vh] sm:max-h-[82vh] max-w-[92vw] sm:max-w-[84vw] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            width={currentPhoto.width}
            height={currentPhoto.height}
            priority
            className="max-h-[76vh] sm:max-h-[82vh] w-auto max-w-full object-contain pointer-events-none"
            sizes="(max-width: 768px) 92vw, 84vw"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph (Arrow Right)"
          className="absolute right-2 sm:right-6 z-10 flex size-12 items-center justify-center rounded-full text-secondary/60 transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="text-2xl select-none" aria-hidden="true">
            ›
          </span>
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="flex min-h-[4rem] w-full flex-col items-center justify-center px-6 py-4 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.08em] text-foreground">
          {currentPhoto.id} — {currentPhoto.title}
        </p>
        <p className="mt-1 font-sans text-[11px] text-secondary/70">
          {[currentPhoto.location, currentPhoto.date, currentPhoto.camera]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </div>
  );
}
