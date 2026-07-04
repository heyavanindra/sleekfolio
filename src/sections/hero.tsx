import { SocialLinks } from "@/components/social-links";
import { heroConfig } from "@/config";

const Hero = () => {
  return (
    <section className="pt-20 md:pt-24">
      <p className="max-w-full break-words text-xl font-medium tracking-[-0.035em] text-foreground text-pretty md:text-2xl md:tracking-[-0.045em]">
        {heroConfig.name}
      </p>

      <h1 className="mt-6 max-w-3xl wrap-break-word text-lg font-medium leading-snug tracking-[-0.015em] text-foreground text-pretty sm:text-xl md:leading-tight md:tracking-[-0.025em]">
        {heroConfig.headline}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-normal text-secondary text-pretty md:text-lg">
        {heroConfig.description}
      </p>

      <div className="mt-8">
        <SocialLinks links={heroConfig.links} />
      </div>
    </section>
  );
};

export default Hero;
