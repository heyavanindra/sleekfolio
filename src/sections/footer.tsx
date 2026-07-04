import { SocialLinks } from "@/components/social-links";
import { footerConfig } from "@/config";

const Footer = () => {
  return (
    <footer className="mt-20 pb-16 md:mt-24">
      <div className="mb-8 flex min-w-0 items-center gap-4">
        <h2 className="shrink-0 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          {footerConfig.section.label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="max-w-xl break-words text-base leading-7 text-foreground/90">
        {footerConfig.description}
      </p>

      <div className="mt-6">
        <SocialLinks links={footerConfig.links} />
      </div>

      <p className="mt-12 text-xs text-secondary">{footerConfig.copyright}</p>
    </footer>
  );
};

export default Footer;
