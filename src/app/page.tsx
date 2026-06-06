import Container from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import {Hero} from "@/sections/hero"

export default function Home() {
  return (
    <main className="max-h-screen w-full bg-background">
      <Container>
        {/* <div className="relative z-10 flex justify-end p-6">
          <ThemeToggle />
        </div> */}
        <Hero/>
      </Container>
    </main>
  );
}
