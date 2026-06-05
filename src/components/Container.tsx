import React, { ReactNode } from "react";
import Border from "./main/Border";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="relative mx-auto w-full h-screen max-w-2xl px-4">
      <Border className="-left-6"></Border>
      <Border className="-right-6"></Border>
        {children}
    </div>
  );
};

export default Container;
