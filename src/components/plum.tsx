"use client";

import { useEffect, useRef } from "react";

const R180 = Math.PI;
const R90 = Math.PI / 2;
const R15 = Math.PI / 12;
// Whisper-soft graphite ink matching antfu.me
const COLOR = "#88888825";
const LEN = 6;
const MIN_BRANCH = 30;

const polar = (x: number, y: number, r: number, theta: number) =>
  [x + r * Math.cos(theta), y + r * Math.sin(theta)] as const;

export function Plum() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const setupCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();

    const randomMiddle = () => Math.random() * 0.6 + 0.2;

    let steps: (() => void)[] = [];
    let prev: (() => void)[] = [];
    let last = performance.now();
    const interval = 1000 / 40;

    const step = (
      x: number,
      y: number,
      rad: number,
      counter = { value: 0 },
    ) => {
      if (stopped) return;
      const length = Math.random() * LEN;
      counter.value += 1;
      const [nx, ny] = polar(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + Math.random() * R15;
      const rad2 = rad - Math.random() * R15;

      // Allow slight overdraw before stopping branch
      if (nx < -100 || nx > w + 100 || ny < -100 || ny > h + 100) return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (Math.random() < rate) steps.push(() => step(nx, ny, rad1, counter));
      if (Math.random() < rate) steps.push(() => step(nx, ny, rad2, counter));
    };

    const frame = () => {
      if (stopped) return;
      raf = requestAnimationFrame(frame);
      if (performance.now() - last < interval) return;
      last = performance.now();

      prev = steps;
      steps = [];

      // Serene finish: when active branches finish, stop animation completely
      if (!prev.length) {
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }

      // 50% chance to defer step to the next frame for an organic staggered rhythm
      prev.forEach((fn) => (Math.random() < 0.5 ? steps.push(fn) : fn()));
    };

    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = COLOR;

      prev = [];
      // Exactly 4 asymmetrical seeds (1 per edge) to leave calm, generous negative space
      steps = [
        () => step(randomMiddle() * w, -5, R90),
        () => step(randomMiddle() * w, h + 5, -R90),
        () => step(-5, randomMiddle() * h, 0),
        () => step(w + 5, randomMiddle() * h, R180),
      ];

      // On mobile screens, use only 2 seeds to prevent overcrowding
      if (w < 500) {
        steps = steps.slice(0, 2);
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        let count = 0;
        while (steps.length && count < 1500) {
          prev = steps;
          steps = [];
          prev.forEach((fn) => fn());
          count += 1;
        }
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    start();

    return () => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Smooth full-viewport gradient without hard-edged percentage stops
  const mask = "radial-gradient(circle, transparent, black)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-1 print:hidden"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
      aria-hidden="true"
    >
      <canvas ref={ref} className="block size-full" />
    </div>
  );
}
