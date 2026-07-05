import { experienceConfig } from "@/config";
import { cn } from "@/utils/cn";

const Experience = () => {
  return (
    <section className="mt-20 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {experienceConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="divide-y divide-border">
        {experienceConfig.items.map((experience) => {
          const isCurrent = !experience.endDate;

          return (
            <article key={experience.company} className="py-8">
              <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "type-item-title break-words text-pretty",
                      // isCurrent && "blur-[5px]",
                    )}
                  >
                    {experience.company}
                  </h3>

                  <div className="mt-3 flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                    <p className="break-words text-base font-medium leading-6 text-foreground">
                      {experience.role}
                    </p>
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="type-meta break-words">
                        {formatExperiencePeriod(
                          experience.startDate,
                          experience.endDate,
                        )}
                      </p>
                      {isCurrent ? (
                        <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2 font-mono text-xs leading-none whitespace-nowrap text-foreground/80">
                          <span
                            aria-hidden="true"
                            className="size-1.5 animate-pulse rounded-full bg-accent ring-2 ring-accent/15"
                          />
                          Working
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <ul className="type-body mt-5 max-w-3xl space-y-2 break-words">
                    {experience.highlights.map((highlight) => (
                      <li
                        className={cn(isCurrent && "blur-[5px]")}
                        key={highlight.text}
                      >
                        {highlight.emphasize
                          ? renderHighlightedText(
                              highlight.text,
                              highlight.emphasize,
                            )
                          : highlight.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div className="mt-1 shrink-0 self-start">
                <Image
                  src={experience.logo.src}
                  alt={experience.logo.alt}
                  width={experience.logo.width}
                  height={experience.logo.height}
                  className="h-9 w-auto object-contain"
                />
              </div> */}
              </div>
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
