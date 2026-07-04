import { SocialLinks } from "@/components/social-links";
import { footerConfig } from "@/config";

const Footer = () => {
  return (
    <footer className="mt-20 pb-16 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="type-section-label shrink-0">
          {footerConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="type-body-lg max-w-xl break-words text-pretty">
        {footerConfig.description}
      </p>

      <div className="mt-6">
        <SocialLinks links={footerConfig.links} />
      </div>

      <p className="type-caption mt-12">{footerConfig.copyright}</p>
    </footer>
  );
};

export default Footer;
