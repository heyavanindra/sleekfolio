import { Link } from "next-view-transitions";
import Container from "@/component/container";

const navItems = [
  {
    label: "Work",
    href: "/#work",
  },
  {
    label: "Writing",
    href: "/blog",
  },
] as const;

export function SiteNav() {
  return (
    <header className="pt-8 md:pt-12">
      <Container>
        <nav className="flex h-9 items-center justify-between">
          <Link
            href="/"
            aria-label="Avanindra Tiwari home"
            className="site-brand-mark"
          >
            AT.
          </Link>

          <div className="site-nav-items flex items-center gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav-link">
                {item.label}
              </Link>
            ))}

            <span
              className="theme-indicator"
              role="img"
              aria-label="Dark theme"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                focusable="false"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M20.4 14.9A8.6 8.6 0 0 1 9.1 3.6 8.6 8.6 0 1 0 20.4 14.9Z" />
              </svg>
            </span>
          </div>
        </nav>
      </Container>
    </header>
  );
}
