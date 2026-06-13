import { heroConfig } from "@/config";

const Hero = () => {
  return (
    <section className="pt-24">
      <p className="max-w-full wrap-break-words text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl md:tracking-tighter">
        {heroConfig.name}
      </p>

      <h1 className="mt-6 max-w-3xl wrap-break-words text-xl font-medium leading-tight tracking-[-0.03em] text-foreground sm:text-2xl md:text-4xl md:tracking-[-0.04em]">
        {heroConfig.headline}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-7 text-secondary md:text-lg">
        {heroConfig.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-secondary">
        {heroConfig.links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="transition-all duration-200 hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
