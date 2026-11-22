import { SocialIcons } from "@/components/social-icons";
import { SoundFeedback } from "@/components/sound-feedback";
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
  "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/15 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.08] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]";

const socialLinkClass = cn(
  "inline-flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
  "transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
  finePointerHover,
  "active:scale-95",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
);

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-secondary">
      {links.map(({ icon, label, href }) => {
        const Icon = SocialIcons[icon];

        return (
          <SoundFeedback key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              className={socialLinkClass}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon
                aria-hidden="true"
                focusable="false"
                className={icon === "linkedin" ? "size-4" : "size-4.5"}
              />
            </a>
          </SoundFeedback>
        );
      })}
    </div>
  );
}
