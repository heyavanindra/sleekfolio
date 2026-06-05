import React from "react";
import Border from "../main/Border";

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in-blur container mx-auto max-w-3xl px-4 ${className ?? ""}`}
      {...props}
    >
      <Border className="-left-12"></Border>
      <Border className="-right-12"></Border>
      {children}
    </div>
  );
}
