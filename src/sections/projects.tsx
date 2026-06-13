import { Link } from "next-view-transitions";
import { projectsConfig } from "@/config";

export default function Projects() {
  return (
    <section className="mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="shrink-0 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          {projectsConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="divide-y divide-border">
        {projectsConfig.items.map((project) => (
          <article key={project.title} className="py-12 first:pt-0">
            <div className="flex min-w-0 flex-col gap-5 md:flex-row md:justify-between md:gap-8">
              <div className="min-w-0">
                <h3 className="max-w-full wrap-break-words text-2xl font-medium tracking-[-0.03em] text-foreground md:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-xl wrap-break-words text-base leading-relaxed text-secondary">
                  {project.description}
                </p>

                <p className="mt-4 flex max-w-full flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-secondary">
                  {project.stack.map((item, index) => (
                    <span key={item} className="wrap-break-words">
                      {index > 0 && (
                        <span className="mr-2" aria-hidden="true">
                          {"\u00b7"}
                        </span>
                      )}
                      {item}
                    </span>
                  ))}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-secondary md:shrink-0 md:pt-2">
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:text-foreground"
                >
                  {projectsConfig.actionLabels.live}
                </Link>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:text-foreground"
                >
                  {projectsConfig.actionLabels.github}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
