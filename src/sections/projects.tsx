import { ProjectCard } from "@/components/project-card";
import { projectsConfig } from "@/config";

export default function Projects() {
  return (
    <section id="work" className="mt-20 scroll-mt-20 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {projectsConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {projectsConfig.items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
