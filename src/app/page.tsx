import Container from "@/component/container";
import { SiteNav } from "@/components/site-nav";
import Blog from "@/sections/blog";
import Experience from "@/sections/experience";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import Projects from "@/sections/projects";

export default function Home() {
  return (
    <main
      id="main-content"
      className="portfolio-grid-background animate-blur-in overflow-x-hidden"
    >
      <SiteNav />
      <Container>
        <Hero />
        <Projects />
        <Experience />
        <Blog />
        <Footer />
      </Container>
    </main>
  );
}
