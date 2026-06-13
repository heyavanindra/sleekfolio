import Container from "@/component/container";
import Blog from "@/sections/blog";
import Experience from "@/sections/experience";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import Projects from "@/sections/projects";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-background">
      <Container>
        <Hero />
        <Projects />
        <Experience />
        <Blog />
        <Footer />
      </Container>
    </div>
  );
}
