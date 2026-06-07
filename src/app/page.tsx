import Container from "@/components/container";
import BlogSection from "@/sections/blog";
import Experience from "@/sections/experience";
import { Hero } from "@/sections/hero";
import Projects from "@/sections/projects";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Container>
        <Hero />
        <Projects></Projects>
        <BlogSection></BlogSection>
        <Experience></Experience>
      </Container>
    </main>
  );
}
