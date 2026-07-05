import { ShareActions } from "@/components/share-actions";
import { SocialLinks } from "@/components/social-links";
import { footerConfig } from "@/config";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer id="contact" className="mt-20 scroll-mt-20 pb-16 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {footerConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="type-body-lg max-w-xl break-words text-pretty">
        {footerConfig.description}
      </p>

      <p className="type-body mt-4 max-w-xl break-words text-pretty">
        You can find my work on{" "}
        <a
          href={siteConfig.author.github}
          className="portfolio-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        , connect with me on{" "}
        <a
          href={siteConfig.author.linkedin}
          className="portfolio-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        , or send a focused note by{" "}
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="portfolio-link"
        >
          email
        </a>
        .
      </p>

      {/* <div className="mt-6">
        <SocialLinks links={footerConfig.links} />
      </div> */}

      <ShareActions
        className="mt-6"
        title={`${siteConfig.name} - Software Engineer`}
        url={`https://${siteConfig.url}`}
      />

      <p className="type-caption mt-12">{footerConfig.copyright}</p>
    </footer>
  );
};

export default Footer;
