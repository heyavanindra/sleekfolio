"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
// import ModeToggle from "./ui/mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";
// import LogoSvg from "./ui/logo-svg";

const Navbar = ({}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "start end"],
  });
  const [isVisible, setIsVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      console.log(latest);
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
      className="sticky z-60 top-0  w-full bg-transparent"
      ref={ref}
      animate={{
        top: isVisible ? "10px" : "0%",
      }}
    >
      <motion.div
        className="mx-auto rounded-full  p-3 px-6 flex justify-between items-center"
        animate={{
          backdropFilter: isVisible ? "blur(10px)" : "none",
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
          <div className="size-10 flex justify-center items-center">
           {/* <LogoSvg></LogoSvg> */}
          </div>
          <div>FastInvo</div>
        </Link>
        <div className="">
            <ul className="flex justify-center items-center gap-x-6">
                <li className="text-neutral-200 cursor-pointer">About</li>
                <li className="text-neutral-200 cursor-pointer">Blog</li>
                <li className="text-neutral-200 cursor-pointer">contact</li>
            </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;