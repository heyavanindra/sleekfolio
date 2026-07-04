import { experienceConfig } from "@/config";

const Experience = () => {
  return (
    <section className="mt-20 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="shrink-0 font-medium uppercase tracking-[0.25em] text-secondary">
          {experienceConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="divide-y divide-border">
        {experienceConfig.items.map((experience) => (
          <article key={experience.company} className="py-8">
            <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <h3 className="break-words text-xl md:text-2xl  font-semibold tracking-[-0.015em] text-foreground text-pretty">
                  {experience.company}
                </h3>

                <div className="mt-3 flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
                  <p className="break-words text-lg font-medium tracking-[-0.015em] text-foreground">
                    {experience.role}
                  </p>
                  <p className="break-words text-base text-secondary sm:text-lg">
                    {formatExperiencePeriod(
                      experience.startDate,
                      experience.endDate,
                    )}
                  </p>
                </div>

                <ul className="mt-5 max-w-3xl space-y-2 break-words text-sm leading-7 text-secondary">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight.text}>
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
        ))}
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
