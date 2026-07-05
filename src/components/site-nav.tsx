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
          </div>
        </nav>
      </Container>
    </header>
  );
}
