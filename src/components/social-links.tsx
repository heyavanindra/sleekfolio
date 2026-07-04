import { SocialIcons } from "@/components/social-icons";
import { cn } from "@/utils/cn";

type SocialIconKey = keyof typeof SocialIcons;

type SocialLink = {
  icon: SocialIconKey;
  label: string;
  href: string;
};

type SocialLinksProps = {
  links: readonly SocialLink[];
};

const finePointerHover =
  "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground";

const socialLinkClass = cn(
  "inline-flex size-9 items-center justify-center rounded-lg border border-transparent bg-transparent text-secondary",
  "transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
  finePointerHover,
  "active:scale-[0.97]",
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  "motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
);

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-secondary">
      {links.map(({ icon, label, href }) => {
        const Icon = SocialIcons[icon];

        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={socialLinkClass}
          >
            <Icon aria-hidden="true" focusable="false" className="size-5" />
          </a>
        );
      })}
    </div>
  );
}
