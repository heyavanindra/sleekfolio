import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HighlightedWords } from "@/components/highlighted-words";

const technologyConfig = {
  appwrite: {
    label: "Appwrite",
    badge: "A",
    className: "text-[#f02e65]",
  },
  bun: {
    label: "Bun",
    badge: "B",
    className: "text-[#f9f1e1]",
  },
  mdx: {
    label: "MDX",
    badge: "M",
    className: "text-neutral-900 dark:text-neutral-100",
  },
  mongodb: {
    label: "MongoDB",
    badge: "M",
    className: "text-[#47a248]",
  },
  nextjs: {
    label: "Next.js",
    badge: "N",
    className: "text-neutral-900 dark:text-neutral-100",
  },
  react: {
    label: "React",
    badge: "R",
    className: "text-[#61dafb]",
  },
  socketio: {
    label: "Socket.io",
    badge: "S",
    className: "text-neutral-900 dark:text-neutral-100",
  },
  tailwind: {
    label: "Tailwind CSS",
    badge: "TW",
    className: "text-[#38bdf8]",
  },
  typescript: {
    label: "TypeScript",
    badge: "TS",
    className: "text-[#3178c6]",
  },
  vercel: {
    label: "Vercel",
    badge: "V",
    className: "text-neutral-900 dark:text-neutral-100",
  },
  redis: {
    label: "Redis",
    badge: "R",
    className: "text-[#dc382d]",
  },

  postgresql: {
    label: "PostgreSQL",
    badge: "PG",
    className: "text-[#336791]",
  },

  docker: {
    label: "Docker",
    badge: "D",
    className: "text-[#2496ed]",
  },

  nodejs: {
    label: "Node.js",
    badge: "N",
    className: "text-[#5fa04e]",
  },

  go: {
    label: "Go",
    badge: "Go",
    className: "text-[#00add8]",
  },

  websocket: {
    label: "WebSockets",
    badge: "WS",
    className: "text-neutral-900 dark:text-neutral-100",
  },
};

const projectsConfig = {
  section: {
    className:
      "my-4 border-y border-neutral-100 px-6 py-8 shadow-section-inset md:px-8 dark:border-neutral-800 dark:shadow-section-inset-dark",
    eyebrowWords: ["Ideas", "into", "Products"],
    subHeading: "Selected Work",
    heading: "Featured Projects",
  },
  displayLimit: 4,
  cta: {
    href: "/projects",
    label: "Show all projects",
  },
  statusLabels: {
    working: "All Systems Operational",
    building: "Building",
  },
  projects: [
    {
      title: "TheCoffeeRoom",
      description:
        "A real-time collaborative canvas platform where multiple users can draw together simultaneously. Built with WebSockets, Redis, PostgreSQL, and a microservice architecture for low-latency synchronization.",
      href: "/projects/thecoffeeroom",
      live: "https://thecoffeeroom.in",
      github: "https://github.com/heyavanindra/thecoffeeroom",
      technologies: [
        "nextjs",
        "typescript",
        "postgresql",
        "redis",
        "docker",
        "websocket",
      ],
      isWorking: true,
    },
    {
      title: "FastInvo",
      description:
        "A modern invoice generation SaaS with dynamic forms, PDF generation, live previews, and responsive workflows designed for freelancers and small businesses.",
      href: "/projects/fastinvo",
      live: "https://fastinvo.aviii.xyz",
      github: "https://github.com/heyavanindra/fastinvo",
      technologies: ["nextjs", "typescript", "react", "tailwind"],
      isWorking: true,
    },
    {
      title: "Interview Automation System",
      description:
        "Automated hiring workflow platform that extracts interview information from emails, processes scheduling requests, and streamlines candidate management operations.",
      href: "/projects/interview-automation",
      technologies: ["nextjs", "typescript", "nodejs", "mongodb"],
      isWorking: true,
    },
  ],
};

const Projects = () => {
  const { displayLimit, projects, section } = projectsConfig;
  const visibleProjects = projects.slice(0, displayLimit);

  return (
    <section className={section.className}>
      <div className="pl-4">
        <HighlightedWords words={section.eyebrowWords} />
      </div>

      <div className="mt-8 px-4">
        <SectionHeading
          subHeading={section.subHeading}
          heading={section.heading}
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* <div className="mt-8 flex justify-center">
          <Link
            href={projectsConfig.cta.href}
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-background-container px-4 text-sm font-medium shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
          >
            {projectsConfig.cta.label}
          </Link>
        </div> */}
      </div>
    </section>
  );
};

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-secondary text-sm">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-md border border-neutral-100 bg-background-container p-5 transition hover:border-neutral-200 dark:border-neutral-800 dark:hover:border-neutral-700">
      <div>
        <div className="flex items-start justify-between gap-4">
          <Link href={project.href}>
            <h3 className="text-xl font-bold leading-tight transition group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
              {project.title}
            </h3>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <IconLink href={project.github} label={`${project.title} GitHub`}>
                <GithubIcon />
              </IconLink>
            )}
            {project.live && (
              <IconLink
                href={project.live}
                label={`${project.title} live site`}
              >
                <ArrowUpRight className="size-4" />
              </IconLink>
            )}
          </div>
        </div>

        <p className="text-secondary mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5">
          <h4 className="mb-2 text-sm font-semibold">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technologyKey) => (
              <TechnologyBadge
                key={`${project.title}-${technologyKey}`}
                technologyKey={technologyKey}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ProjectStatus isWorking={project.isWorking} />
        <Link
          href={project.href}
          className="text-secondary inline-flex items-center gap-1 text-sm underline-offset-4 transition hover:text-foreground hover:underline"
        >
          View Details
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

function IconLink({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="text-secondary flex size-8 items-center justify-center rounded-md border border-neutral-100 transition hover:text-foreground dark:border-neutral-800"
    >
      {children}
    </Link>
  );
}

function TechnologyBadge({ technologyKey }) {
  const technology = technologyConfig[technologyKey];

  if (!technology) {
    return null;
  }

  return (
    <span className="inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white">
      <span
        className={`flex size-4 shrink-0 items-center justify-center text-[10px] font-black ${technology.className}`}
      >
        {technology.badge}
      </span>
      <span className="ml-1 text-sm font-bold">{technology.label}</span>
    </span>
  );
}

function ProjectStatus({ isWorking }) {
  const label = isWorking
    ? projectsConfig.statusLabels.working
    : projectsConfig.statusLabels.building;

  return (
    <div
      className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${
        isWorking
          ? "border-green-300 bg-green-500/10"
          : "border-red-300 bg-red-500/10"
      }`}
    >
      <div
        className={`size-2 animate-pulse rounded-full ${
          isWorking ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {label}
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M208.3 75.7A59.8 59.8 0 0 0 202.9 28 8 8 0 0 0 196 24a59.8 59.8 0 0 0-48 24h-24a59.8 59.8 0 0 0-48-24 8 8 0 0 0-6.9 4 59.8 59.8 0 0 0-5.4 47.7A58.1 58.1 0 0 0 56 104v8a56.1 56.1 0 0 0 48.4 55.5A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24 40 40 0 0 0-40-40 8 8 0 0 0 0 16 24 24 0 0 1 24 24 40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.4-24.5A56.1 56.1 0 0 0 216 112v-8a58.1 58.1 0 0 0-7.7-28.3ZM200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.7 41.7 0 0 1 6.9-22.5A8 8 0 0 0 80 73.8a43.8 43.8 0 0 1 .8-33.6 43.9 43.9 0 0 1 32.3 20.1 8 8 0 0 0 6.7 3.7h32.4a8 8 0 0 0 6.7-3.7 43.9 43.9 0 0 1 32.3-20.1 43.8 43.8 0 0 1 .8 33.6 8.1 8.1 0 0 0 1 7.7A41.7 41.7 0 0 1 200 104Z" />
    </svg>
  );
}

export default Projects;
