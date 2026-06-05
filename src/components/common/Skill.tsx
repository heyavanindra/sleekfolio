import Link from "next/link";
import React from "react";

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
  return (
    <Link
      href={href ?? ""}
      target="_blank"
      className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-border bg-muted px-2 py-1 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <div className="size-4 flex-shrink-0">{children}</div>
      <p className="ml-1 text-sm font-bold">{name}</p>
    </Link>
  );
}
