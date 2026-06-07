import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Technology = {
  name: string;
  href: string;
  icon: ReactNode;
};

type TechnologyKey =
  | "aws"
  | "bun"
  | "docker"
  | "express"
  | "figma"
  | "githubActions"
  | "mongodb"
  | "nestjs"
  | "nextjs"
  | "nodejs"
  | "postgresql"
  | "postman"
  | "react"
  | "redis"
  | "tailwind"
  | "typescript"
  | "vercel"
  | "websockets";

type ExperienceItem = {
  company: string;
  position: string;
  location: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: TechnologyKey[];
  isCurrent: boolean;
  isBlur?: boolean;
};

const technologyConfig = {
  aws: {
    name: "AWS",
    href: "https://aws.amazon.com/",
    icon: <AWSIcon />,
  },
  bun: {
    name: "Bun",
    href: "https://bun.sh/",
    icon: <BunIcon />,
  },
  docker: {
    name: "Docker",
    href: "https://www.docker.com/",
    icon: <DockerIcon />,
  },
  express: {
    name: "Express",
    href: "https://expressjs.com/",
    icon: <ExpressIcon />,
  },
  figma: {
    name: "Figma",
    href: "https://figma.com/",
    icon: <FigmaIcon />,
  },
  githubActions: {
    name: "GitHub Actions",
    href: "https://github.com/features/actions",
    icon: <GithubIcon />,
  },
  mongodb: {
    name: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: <MongoDBIcon />,
  },
  nestjs: {
    name: "NestJS",
    href: "https://nestjs.com/",
    icon: <NestIcon />,
  },
  nextjs: {
    name: "Next.js",
    href: "https://nextjs.org/",
    icon: <NextIcon />,
  },
  nodejs: {
    name: "Node.js",
    href: "https://nodejs.org/",
    icon: <NodeIcon />,
  },
  postgresql: {
    name: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: <PostgresIcon />,
  },
  postman: {
    name: "Postman",
    href: "https://www.postman.com/",
    icon: <PostmanIcon />,
  },
  react: {
    name: "React",
    href: "https://react.dev/",
    icon: <ReactIcon />,
  },
  redis: {
    name: "Redis",
    href: "https://redis.io/",
    icon: <RedisIcon />,
  },
  tailwind: {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    icon: <TailwindIcon />,
  },
  typescript: {
    name: "TypeScript",
    href: "https://typescriptlang.org/",
    icon: <TypeScriptIcon />,
  },
  vercel: {
    name: "Vercel",
    href: "https://vercel.com/",
    icon: <VercelIcon />,
  },
  websockets: {
    name: "WebSockets",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    icon: <SocketIcon />,
  },
} satisfies Record<TechnologyKey, Technology>;
const experienceConfig = {
  section: {
    className: "mt-5 px-6 md:px-8",
    subHeading: "Real-world",
    heading: "Experience",
  },
  displayLimit: 2,
  cta: {
    href: "/work-experience",
    label: "View full experience",
  },
  statusLabels: {
    current: "Currently Building",
    present: "Present",
  },
  socialLinks: [
    {
      key: "website",
      label: "Visit Website",
      icon: <WebsiteIcon />,
    },
    {
      key: "linkedin",
      label: "Connect on LinkedIn",
      icon: <LinkedInIcon />,
    },
    {
      key: "github",
      label: "View GitHub",
      icon: <GithubIcon />,
    },
  ] satisfies Array<{
    key: "github" | "linkedin" | "website" | "x";
    label: string;
    icon: ReactNode;
  }>,
  experiences: [
    {
      isCurrent: true,
      isBlur: true,
      company: "Masters' Union",
      position: "Software Developer",
      location: "India",
      description: [
        "Built and optimized full-stack features using React, Next.js, and Node.js with a strong focus on performance, scalability, and production reliability.",
        "Implemented a Redis and Bull Queue based asynchronous pipeline to decouple WebSocket message handling from database writes, reducing real-time response latency by 40%+.",
        "Developed an in-memory API caching layer with stale-while-revalidate behavior to reduce redundant API requests and improve response times.",
        "Worked across frontend, backend, real-time communication, caching, and infrastructure concerns to ship end-to-end product features.",
      ],
      startDate: "January 2025",
      endDate: "Present",
      technologies: [
        "nextjs",
        "react",
        "typescript",
        "nodejs",
        "redis",
        "websockets",
        "tailwind",
      ],
      website: "#",
      linkedin: "#",
    },
    {
      isCurrent: false,
      company: "Nivesh Jano",
      position: "Technical Development Intern",
      location: "On-Site",
      description: [
        "Built 7+ production-grade modules using MERN and Next.js for fintech workflows, including credit scoring, role-based candidate management, and internal dashboard systems.",
        "Developed a credit scoring system with a 300–900 score range and a role-based candidate management platform that improved HR workflow efficiency by 40%+.",
        "Implemented multilingual architecture using react-i18next across multiple applications, reducing content update effort by 50%+.",
        "Built secure file-processing pipelines and an IMAP-based email parser to automate interview scheduling, email parsing, and candidate data extraction workflows.",
      ],
      startDate: "April 2025",
      endDate: "October 2025",
      technologies: [
        "nextjs",
        "react",
        "typescript",
        "express",
        "mongodb",
        "nodejs",
        "tailwind",
      ],
      website: "#",
      linkedin: "#",
    },
  ] satisfies ExperienceItem[],
};

const Experience = () => {
  const { displayLimit, experiences, section } = experienceConfig;

  return (
    <section className={cn("shadow-section-inset dark:shadow-section-inset-dark py-6",section.className)}>
      <SectionHeading
        subHeading={section.subHeading}
        heading={section.heading}
      />

      <div className="mt-4 flex flex-col gap-8">
        {experiences.slice(0, displayLimit).map((experience) => (
          <ExperienceCard key={experience.company} experience={experience} />
        ))}
      </div>

      {/* <div className="mt-8 flex justify-center">
        <Link
          href={cta.href}
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-background-container px-4 text-sm font-medium shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
        >
          {cta.label}
        </Link>
      </div> */}
    </section>
  );
};

function SectionHeading({
  subHeading,
  heading,
}: {
  subHeading: string;
  heading: string;
}) {
  return (
    <div>
      <p className="text-secondary text-sm">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceItem }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <CompanyLogo name={experience.company} />

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={cn(
                  "text-lg font-bold",
                  experience.isBlur ? "blur-[5px]" : "blur-none",
                )}
              >
                {experience.company}
              </h3>

              {experienceConfig.socialLinks.map((socialLink) => (
                <SocialLink
                  key={`${experience.company}-${socialLink.key}`}
                  href={experience[socialLink.key]}
                  label={socialLink.label}
                  icon={socialLink.icon}
                />
              ))}

              {experience.isCurrent && (
                <div className="flex items-center gap-1 rounded-md border border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500" />
                  {experienceConfig.statusLabels.current}
                </div>
              )}
            </div>
            <p>{experience.position}</p>
          </div>
        </div>

        <div className="text-secondary flex flex-col md:text-right">
          <p>
            {experience.startDate} -{" "}
            {experience.isCurrent
              ? experienceConfig.statusLabels.present
              : experience.endDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      <div>
        <h4 className="text-md mt-4 mb-2 font-semibold">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((technologyKey) => {
            const technology = technologyConfig[technologyKey];

            return (
              <Skill
                key={`${experience.company}-${technology.name}`}
                name={technology.name}
                href={technology.href}
              >
                {technology.icon}
              </Skill>
            );
          })}
        </div>
      </div>

      <div className="text-secondary flex flex-col">
        {experience.description.map((description) => (
          <p key={description}>
            {"\u2022"} {renderDescription(description)}
          </p>
        ))}
      </div>
    </div>
  );
}

function CompanyLogo({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 text-sm font-bold text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
      {initials}
    </div>
  );
}

function Skill({
  name,
  href,
  children,
}: {
  name: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white"
    >
      <span className="flex size-4 shrink-0 items-center justify-center">
        {children}
      </span>
      <span className="ml-1 text-sm font-bold">{name}</span>
    </Link>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: ReactNode;
}) {
  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      target={href === "#" ? undefined : "_blank"}
      rel={href === "#" ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      className="size-4 text-neutral-500 transition hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      {icon}
    </Link>
  );
}

function renderDescription(text: string) {
  const parts = text.split(/(\*.*?\*)/g);

  return parts.map((part) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const value = part.slice(1, -1);
      return (
        <b key={`${value}-${part}`} className="font-semibold text-foreground">
          {value}
        </b>
      );
    }

    return part;
  });
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm87.6 96h-39.8a152.3 152.3 0 0 0-10.5-52.9A88.4 88.4 0 0 1 215.6 120ZM128 40c8.5 0 20.6 15.3 27.3 40a136.4 136.4 0 0 1 4.5 40H96.2a136.4 136.4 0 0 1 4.5-40C107.4 55.3 119.5 40 128 40ZM90.7 67.1A152.3 152.3 0 0 0 80.2 120H40.4a88.4 88.4 0 0 1 50.3-52.9ZM40.4 136h39.8a152.3 152.3 0 0 0 10.5 52.9A88.4 88.4 0 0 1 40.4 136ZM128 216c-8.5 0-20.6-15.3-27.3-40a136.4 136.4 0 0 1-4.5-40h63.6a136.4 136.4 0 0 1-4.5 40c-6.7 24.7-18.8 40-27.3 40Zm37.3-27.1a152.3 152.3 0 0 0 10.5-52.9h39.8a88.4 88.4 0 0 1-50.3 52.9Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16Zm0 192H40V40h176ZM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.8-1.8A36 36 0 0 1 184 140ZM100 84a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M208.3 75.7A59.8 59.8 0 0 0 202.9 28 8 8 0 0 0 196 24a59.8 59.8 0 0 0-48 24h-24a59.8 59.8 0 0 0-48-24 8 8 0 0 0-6.9 4 59.8 59.8 0 0 0-5.4 47.7A58.1 58.1 0 0 0 56 104v8a56.1 56.1 0 0 0 48.4 55.5A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24 40 40 0 0 0-40-40 8 8 0 0 0 0 16 24 24 0 0 1 24 24 40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.4-24.5A56.1 56.1 0 0 0 216 112v-8a58.1 58.1 0 0 0-7.7-28.3ZM200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.7 41.7 0 0 1 6.9-22.5A8 8 0 0 0 80 73.8a43.8 43.8 0 0 1 .8-33.6 43.9 43.9 0 0 1 32.3 20.1 8 8 0 0 0 6.7 3.7h32.4a8 8 0 0 0 6.7-3.7 43.9 43.9 0 0 1 32.3-20.1 43.8 43.8 0 0 1 .8 33.6 8.1 8.1 0 0 0 1 7.7 41.7 41.7 0 0 1 7 22.5Z" />
    </svg>
  );
}

function TypeScriptIcon() {
  return <span className="text-[10px] font-black text-[#3178c6]">TS</span>;
}

function ReactIcon() {
  return <span className="text-[10px] font-black text-[#61dafb]">R</span>;
}

function NextIcon() {
  return <span className="text-[10px] font-black">N</span>;
}

function TailwindIcon() {
  return <span className="text-[10px] font-black text-[#38bdf8]">TW</span>;
}

function FigmaIcon() {
  return <span className="text-[10px] font-black text-[#a259ff]">F</span>;
}

function VercelIcon() {
  return <span className="text-[10px] font-black">V</span>;
}

function AWSIcon() {
  return <span className="text-[10px] font-black text-[#ff9900]">AWS</span>;
}

function PostmanIcon() {
  return <span className="text-[10px] font-black text-[#ff6c37]">P</span>;
}

function BunIcon() {
  return <span className="text-[10px] font-black text-[#b08d57]">B</span>;
}

function DockerIcon() {
  return <span className="text-[10px] font-black text-[#2496ed]">D</span>;
}

function MongoDBIcon() {
  return <span className="text-[10px] font-black text-[#47a248]">M</span>;
}

function NodeIcon() {
  return <span className="text-[10px] font-black text-[#5fa04e]">N</span>;
}

function PostgresIcon() {
  return <span className="text-[10px] font-black text-[#4169e1]">PG</span>;
}

function RedisIcon() {
  return <span className="text-[10px] font-black text-[#ff4438]">R</span>;
}

function NestIcon() {
  return <span className="text-[10px] font-black text-[#e0234e]">N</span>;
}

function ExpressIcon() {
  return <span className="text-[10px] font-black">EX</span>;
}

function SocketIcon() {
  return <span className="text-[10px] font-black text-[#facc15]">WS</span>;
}

export default Experience;
