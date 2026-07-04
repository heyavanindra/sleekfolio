import StackIcon, { type IconName } from "tech-stack-icons";

const projectTechIconNames: Record<string, IconName> = {
  "Next.js": "nextjs",
  WebSockets: "socketio",
  Redis: "redis",
  PostgreSQL: "postgresql",
  TypeScript: "typescript",
  "React Hook Form": "react",
  Bun: "bunjs",
};

type ProjectTechIconProps = {
  name: string;
};

export function ProjectTechIcon({ name }: ProjectTechIconProps) {
  const iconName = projectTechIconNames[name];

  if (!iconName) {
    return null;
  }

  return (
    <li className="project-tech-icon" title={name}>
      <StackIcon
        name={iconName}
        variant="dark"
        className="size-5 opacity-75 grayscale"
      />
      <span className="sr-only">{name}</span>
    </li>
  );
}
