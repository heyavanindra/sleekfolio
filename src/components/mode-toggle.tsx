"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const ModeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleHandler = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleHandler}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "flex h-1.5 w-12 items-center justify-start rounded-[50px] bg-zinc-100 px-1.25 py-[10px] shadow-inner hover:cursor-pointer dark:bg-zinc-700",
        isDark && "justify-end",
        className,
      )}
    >
      <motion.div
        className="flex size-fit items-center justify-center rounded-full "
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <motion.div whileTap={{ rotate: 180 }}>
          {isDark ? (
            <MoonIcon className="size-3  text-slate-200" />
          ) : (
            <SunIcon className="size-3 text-neutral-900" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ModeToggle;
