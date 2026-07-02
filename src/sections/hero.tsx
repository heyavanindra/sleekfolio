import { heroConfig } from "@/config";

const Hero = () => {
  return (
    <section className="pt-20 md:pt-24">
      <p className="max-w-full break-words text-4xl font-medium tracking-[-0.035em] text-foreground text-balance sm:text-5xl md:text-6xl md:tracking-[-0.045em]">
        {heroConfig.name}
      </p>

      <h1 className="mt-6 max-w-3xl break-words text-xl font-medium leading-snug tracking-[-0.015em] text-foreground text-pretty sm:text-2xl md:text-4xl md:leading-tight md:tracking-[-0.025em]">
        {heroConfig.headline}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-7 text-secondary text-pretty md:text-lg">
        {heroConfig.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-secondary">
        {heroConfig.links.map(({ label, href }) => (
          <a key={label} href={href} className="portfolio-link">
            {label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
