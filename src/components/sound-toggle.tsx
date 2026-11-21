"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SOUND_TOGGLE_EVENT,
  isSoundMuted,
  playClickSound,
  toggleSoundMuted,
} from "@/lib/sound";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state with localStorage on mount & listen for changes
  useEffect(() => {
    setMuted(isSoundMuted());

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.muted === "boolean") {
        setMuted(customEvent.detail.muted);
      } else {
        setMuted(isSoundMuted());
      }
    };

    window.addEventListener(SOUND_TOGGLE_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SOUND_TOGGLE_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Global keyboard shortcut: 'm' or 'M' to toggle sound
  useEffect(() => {
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
      setToastMessage(nextMuted ? "Sound muted" : "Sound enabled");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 1600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger the global click listener
    const nextMuted = toggleSoundMuted();
    if (!nextMuted) {
      playClickSound();
    }
    setToastMessage(nextMuted ? "Sound muted" : "Sound enabled");
  };

  const label = muted
    ? "Unmute sound effects (Press M)"
    : "Mute sound effects (Press M)";

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={label}
        aria-pressed={!muted}
        title={label}
        className="site-nav-link flex items-center justify-center p-1.5 -m-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {muted ? (
          <VolumeX className="size-[15px] opacity-60 hover:opacity-100 transition-opacity" />
        ) : (
          <Volume2 className="size-[15px] opacity-80 hover:opacity-100 transition-opacity" />
        )}
      </button>

      {/* Floating micro-notification toast */}
      {toastMessage && (
        <span
          role="status"
          className="pointer-events-none absolute top-full mt-2 right-0 z-50 whitespace-nowrap rounded-md border border-border bg-[#141416]/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono tracking-tight text-foreground shadow-lg animate-blur-in"
        >
          {toastMessage}
        </span>
      )}
    </div>
  );
}
