import { Link } from "next-view-transitions";
import { SocialLinks } from "@/components/social-links";
import { heroConfig } from "@/config";

const Hero = () => {
  return (
    <section className="pt-14 md:pt-16">
      <p className="type-page-title max-w-full break-words text-pretty">
        {heroConfig.name}
      </p>

      <h1 className="type-body-lg mt-6 max-w-3xl wrap-break-word text-pretty">
        {heroConfig.headline}
      </h1>

      <p className="type-body mt-6 max-w-xl text-pretty">
        {heroConfig.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
        <Link href="/#work" className="portfolio-link">
          View work
        </Link>
        <Link href="/#experience" className="portfolio-link">
          Experience
        </Link>
        <Link href="/#contact" className="portfolio-link">
          Contact
        </Link>
      </div>

      <div className="mt-8">
        <SocialLinks links={heroConfig.links} />
      </div>
    </section>
  );
};

export default Hero;
