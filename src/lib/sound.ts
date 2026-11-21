// Pre-loaded audio engine for zero-latency click sounds and mute management

let audioCtx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let fallbackAudio: HTMLAudioElement | null = null;
let isPreloaded = false;
let lastPlayedTime = 0;

// Uses trimmed 0-latency PCM WAV (attack starts at 0.4ms rather than 298ms leading silence)
const SOUND_SRC = "/click.wav";
const STORAGE_KEY = "site_sound_muted";
export const SOUND_TOGGLE_EVENT = "site_sound_toggle";

/**
 * Checks whether click sound is currently muted
 */
export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Sets sound mute state and notifies listeners
 */
export function setSoundMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? "true" : "false");
    window.dispatchEvent(
      new CustomEvent(SOUND_TOGGLE_EVENT, { detail: { muted } }),
    );
  } catch {
    // Ignore localStorage errors in private browsing
  }
}

/**
 * Toggles sound mute state
 */
export function toggleSoundMuted(): boolean {
  const next = !isSoundMuted();
  setSoundMuted(next);
  return next;
}

/**
 * Pre-loads audio buffer into memory for zero latency
 */
export async function preloadClickSound(): Promise<void> {
  if (typeof window === "undefined" || isPreloaded) return;

  try {
    // Pre-create fallback HTMLAudioElement
    if (!fallbackAudio) {
      fallbackAudio = new Audio(SOUND_SRC);
      fallbackAudio.preload = "auto";
      fallbackAudio.volume = 0.65;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      isPreloaded = true;
      return;
    }

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    // Automatically unlock the AudioContext on first user touch/pointer interaction
    const unlock = () => {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", unlock, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", unlock, { once: true, passive: true });

    const response = await fetch(SOUND_SRC);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    isPreloaded = true;
  } catch {
    // Graceful fallback to HTMLAudioElement if Web Audio decoding fails
    isPreloaded = true;
  }
}

/**
 * Plays the pre-loaded click sound with zero latency.
 * Supports rapid polyphonic clicks via Web Audio API.
 * Includes a 50ms guard against accidental duplicate triggers.
 */
export function playClickSound(): void {
  if (typeof window === "undefined" || isSoundMuted()) return;

  const now = Date.now();
  if (now - lastPlayedTime < 50) return;
  lastPlayedTime = now;

  try {
    if (audioCtx && audioBuffer) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.65; // Balanced, crisp soft volume

      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.start(0);
      return;
    }

    // Fallback: simple HTMLAudioElement clone
    if (fallbackAudio) {
      const clone = fallbackAudio.cloneNode(true) as HTMLAudioElement;
      clone.volume = 0.65;
      clone.play().catch(() => {});
    } else {
      const audio = new Audio(SOUND_SRC);
      audio.volume = 0.65;
      audio.play().catch(() => {});
    }
  } catch {
    // Ignore audio playback errors
  }
}
