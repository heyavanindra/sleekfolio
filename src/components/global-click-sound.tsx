"use client";

import { useEffect } from "react";
import {
  playClickSound,
  preloadClickSound,
  toggleSoundMuted,
} from "@/lib/sound";

/**
 * Initializes zero-latency audio buffer and applies onMouseDown/pointerdown
 * sound feedback to all navigation links across the entire project.
 * Supports the 'M' keyboard shortcut to toggle mute.
 */
export function GlobalClickSound() {
  useEffect(() => {
    preloadClickSound();

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      // Only fire on primary mouse/touch button
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore elements explicitly opting out
      if (
        target.closest("[data-sound-ignore]") ||
        target.closest("button[aria-pressed]")
      ) {
        return;
      }

      // Match all navigation links project-wide:
      // - Any link inside a <nav> (SiteNav, Archive filter tabs)
      // - Navigation link classes (.site-nav-link, .portfolio-link)
      // - Internal route navigation links (a[href^='/'], a[href^='#'])
      const isNavLink = Boolean(
        target.closest(
          "nav a, .site-nav-link, .portfolio-link, a[href^='/'], a[href^='#'], [role='tab']",
        ),
      );

      if (isNavLink) {
        playClickSound();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      e.preventDefault();
      const nextMuted = toggleSoundMuted();
      if (!nextMuted) {
        playClickSound();
      }
    };

    // Listen on pointerdown (fires immediately upon press down, before click or view transition)
    window.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
