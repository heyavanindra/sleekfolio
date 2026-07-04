import { Link } from "next-view-transitions";
import { projectsConfig } from "@/config";

export default function Projects() {
  return (
    <section className="mt-20 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {projectsConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="divide-y divide-border">
        {projectsConfig.items.map((project) => (
          <article key={project.title} className="py-10 first:pt-0 md:py-12">
            <div className="flex min-w-0 flex-col gap-5 md:flex-row md:justify-between md:gap-8">
              <div className="min-w-0">
                <h3 className="type-item-title max-w-full break-words text-pretty">
                  {project.title}
                </h3>

                <p className="type-body mt-3 max-w-xl break-words text-pretty">
                  {project.description}
                </p>

                <p className="type-meta mt-4 flex max-w-full flex-wrap gap-x-2 gap-y-1">
                  {project.stack.map((item, index) => (
                    <span key={item} className="break-words" translate="no">
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

              <div className="flex flex-wrap gap-x-4 gap-y-2 md:shrink-0 md:pt-1">
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  {projectsConfig.actionLabels.live}
                </Link>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
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
