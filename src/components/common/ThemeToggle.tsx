"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import Moon from "../svgs/Moon";
import Sun from "../svgs/Sun";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn-inner-shadow fixed top-6 right-6 z-50 inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
