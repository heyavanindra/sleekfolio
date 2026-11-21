"use client";

import React, {
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { playClickSound } from "@/lib/sound";

interface SoundFeedbackProps {
  children: ReactNode;
}

/**
 * Reusable wrapper component that plays sound on onMouseDown.
 * Attaches directly to the child element so no unexpected DOM wrapper is introduced.
 */
export function SoundFeedback({ children }: SoundFeedbackProps) {
  const lastTimeRef = useRef<number>(0);

  const triggerSound = () => {
    const now = Date.now();
    if (now - lastTimeRef.current < 60) return;
    lastTimeRef.current = now;
    playClickSound();
  };

  if (isValidElement(children)) {
    const child = children as ReactElement<{
      onMouseDown?: (e: React.MouseEvent) => void;
    }>;

    return cloneElement(child, {
      onMouseDown: (e: React.MouseEvent) => {
        if (e.button === 0) {
          triggerSound();
        }
        child.props.onMouseDown?.(e);
      },
    });
  }

  // Fallback to fragment so no unexpected span tag is injected into HTML
  return <>{children}</>;
}
