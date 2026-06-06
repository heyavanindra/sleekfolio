import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Navbar from "./navbar";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "relative h-screen  w-full max-w-4xl mx-auto bg-background-container md:px-8",
        className,
      )}
    >
      <div className="absolute top-0 right-0 h-full w-4 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed md:w-8"></div>
      <div className="absolute top-0 left-0 h-full w-4 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed md:w-8"></div>
      <Navbar></Navbar>

      {children}
    </div>
  );
};

export default Container;
