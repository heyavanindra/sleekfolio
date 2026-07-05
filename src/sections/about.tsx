import { Link } from "next-view-transitions";

export default function About() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="about-heading">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 id="about-heading" className="type-section-label shrink-0">
          About
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="type-body max-w-3xl space-y-5 text-pretty">
        <p>
          I like working where product polish meets backend depth: clean
          interfaces, reliable APIs, fast feedback loops, and systems that keep
          behaving well when real users arrive. My recent work has focused on
          real-time collaboration, queue-backed workflows, caching strategy,
          schema-driven forms, and the small UI details that make complex tools
          feel calm.
        </p>
        <p>
          Start with my{" "}
          <Link href="/#work" className="portfolio-link">
            projects
          </Link>
          , skim my{" "}
          <Link href="/#experience" className="portfolio-link">
            experience
          </Link>
          , read the{" "}
          <Link href="/blog" className="portfolio-link">
            blog
          </Link>
          , or{" "}
          <Link href="/#contact" className="portfolio-link">
            contact me
          </Link>{" "}
          if you are building a product that needs thoughtful engineering from
          the database to the final interaction.
        </p>
      </div>
    </section>
  );
}
