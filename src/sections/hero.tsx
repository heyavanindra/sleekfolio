import { SocialLinks } from "@/components/social-links";
import { heroConfig } from "@/config";

const Hero = () => {
  return (
    <section className="pt-20 md:pt-24">
      <p className="type-page-title max-w-full break-words text-pretty">
        {heroConfig.name}
      </p>

      <h1 className="type-body-lg mt-6 max-w-3xl wrap-break-word text-pretty">
        {heroConfig.headline}
      </h1>

      <p className="type-body mt-6 max-w-xl text-pretty">
        {heroConfig.description}
      </p>

      <div className="mt-8">
        <SocialLinks links={heroConfig.links} />
      </div>
    </section>
  );
};

export default Hero;
