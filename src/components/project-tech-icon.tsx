import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";
import { cn } from "@/utils/cn";

const projectTechIconNames: Record<string, IconName> = {
  "Next.js": "nextjs",
  WebSockets: "socketio",
  Redis: "redis",
  PostgreSQL: "postgresql",
  TypeScript: "typescript",
  "React Hook Form": "react",
  Bun: "bunjs",
};

type ProjectTechIconProps = Omit<HTMLMotionProps<"li">, "children"> & {
  children?: ReactNode;
  name: string;
};

export function ProjectTechIcon({
  children,
  className,
  name,
  title,
  ...props
}: ProjectTechIconProps) {
  const iconName = projectTechIconNames[name];

  if (!iconName) {
    return null;
  }

  return (
    <motion.li
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-full border border-foreground/10 bg-background/95 shadow-[0_0_0_1px_var(--background)] transition-colors duration-150 ease-out hover:border-foreground/18 hover:bg-background/95",
        className,
      )}
      title={title ?? name}
      {...props}
    >
      <StackIcon
        name={iconName}
        variant="dark"
        className={cn(
          "opacity-90 saturate-75",
          iconName === "nextjs" ? "size-5" : "size-[1.0625rem]",
        )}
      />
      <span className="sr-only">{name}</span>
      {children}
    </motion.li>
  );
}
