import { cn } from "@/utils/cn";

export function HighlightedWords({
  as: Component = "h2",
  words = undefined,
  text = "",
  className = "",
}) {
  const wordCounts = new Map();
  const renderedWords = (words ?? text.split(" "))
    .filter(Boolean)
    .map((word) => {
      const count = (wordCounts.get(word) ?? 0) + 1;
      wordCounts.set(word, count);

      return {
        id: `${word}-${count}`,
        word,
      };
    });

  return (
    <Component
      className={cn(
        "relative mt-4 w-fit max-w-lg text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.04] bg-neutral-100 dark:bg-neutral-800"
        style={{ opacity: 1 }}
      >
        <span className="absolute -top-px -left-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <span className="absolute -top-px -right-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <span className="absolute -bottom-px -left-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <span className="absolute -right-px -bottom-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
      </span>

      {renderedWords.map(({ id, word }) => (
        <span
          key={id}
          className="relative inline-block"
          style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}
        >
          {word}&nbsp;
        </span>
      ))}
    </Component>
  );
}
