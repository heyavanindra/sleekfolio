import { footerConfig } from "@/config/portfolio";

const Footer = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center p-6">
      <p className="text-pretty text-sm text-neutral-900 dark:text-neutral-200">
        {footerConfig.credit}
      </p>
      <p className="text-pretty text-sm text-neutral-900 dark:text-neutral-200">
        &copy; {footerConfig.copyright}
      </p>
    </div>
  );
};

export default Footer;
