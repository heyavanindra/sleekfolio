import { CompanyLogos } from "@/components/company-logos";
import { experienceConfig } from "@/config";

const Experience = () => {
  return (
    <section id="experience" className="mt-20 scroll-mt-20 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {experienceConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="divide-y divide-border/60">
        {experienceConfig.items.map((experience) => {
          const LogoComponent =
            "logoId" in experience && experience.logoId
              ? CompanyLogos[experience.logoId as keyof typeof CompanyLogos]
              : null;

          return (
            <article
              key={experience.company}
              className="py-10 first:pt-2 last:pb-2 md:py-14"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                {LogoComponent ? (
                  <div className="flex h-[29px] w-6 shrink-0 items-center justify-center text-foreground md:h-8 md:w-7">
                    <LogoComponent className="size-5 object-contain sm:size-5.5 md:size-6" />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="type-item-title break-words text-pretty">
                        {experience.company}
                      </h3>
                      <p className="mt-1 text-sm font-normal text-muted-foreground sm:text-base">
                        {experience.role}
                      </p>
                    </div>

                    <div className="pt-0.5 sm:pt-0 sm:shrink-0">
                      <span className="type-meta whitespace-nowrap">
                        {formatExperiencePeriod(
                          experience.startDate,
                          experience.endDate,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-5 list-disc space-y-2.5 pl-4 text-sm leading-relaxed text-secondary marker:text-neutral-400 sm:mt-6 sm:space-y-3 sm:text-[15px]">
                {experience.highlights.map((highlight) => (
                  <li key={highlight.text} className="pl-1">
                    {highlight.emphasize
                      ? renderHighlightedText(
                          highlight.text,
                          highlight.emphasize,
                        )
                      : highlight.text}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};

function renderHighlightedText(text: string, highlight: string) {
  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <span className="font-medium text-foreground">{highlight}</span>
      {after}
    </>
  );
}

function formatExperiencePeriod(startDate: string, endDate: string | null) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  });

  const start = formatter.format(new Date(startDate));
  const end = endDate ? formatter.format(new Date(endDate)) : "Present";

  return `${start} - ${end}`;
}

export default Experience;
