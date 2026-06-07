"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { navbarConfig } from "@/config/portfolio";
import ModeToggle from "./mode-toggle";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });
  const { theme } = useTheme();
  const shadow =
    theme === "dark"
      ? "0 2px 8px rgba(255,255,255,0.05), 0 1px 3px rgba(255,255,255,0.08)"
      : "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)";

  return (
    <motion.div
      className="fixed top-0 left-1/2 z-60 w-full max-w-4xl -translate-x-1/2 bg-transparent px-4 md:px-8"
      animate={{
        y: isVisible ? 10 : 0,
      }}
    >
      <motion.div
        className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-white/50 px-3 py-2 backdrop-blur-sm dark:bg-neutral-900/50"
        animate={{
          backdropFilter: isVisible ? "blur(5px)" : "none",
          maxWidth: isVisible ? "800px" : "890px",
          boxShadow: isVisible ? shadow : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
        }}
      >
        <Link
          href={"/"}
          className=" text-xl gap-x-2  flex justify-center items-center"
        >
          <Image
            src={navbarConfig.logo.src}
            alt={navbarConfig.logo.alt}
            height={40}
            width={40}
            className="size-10"
          />
        </Link>
        <div className="flex items-center">
          <ModeToggle></ModeToggle>
          {navbarConfig.links.map((link) => (
            <Link
              key={link.href}
              className="max-md:hidden relative px-2 py-1 text-sm"
              href={link.href}
            >
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
