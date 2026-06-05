import Hero from "@/components/landing/Hero";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <ThemeToggle />
      <Hero />
    </main>
  );
}
