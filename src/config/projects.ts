export const projectsConfig = {
  section: {
    label: "Featured Work",
  },
  actionLabels: {
    live: "Live",
    github: "GitHub",
  },
  items: [
    {
      title: "TheCoffeeRoom",
      description:
        "Real-time collaborative whiteboard built with WebSockets, Redis, and PostgreSQL for low-latency multiplayer collaboration.",
      stack: ["Next.js", "WebSockets", "Redis", "PostgreSQL"],
      live: "https://thecoffeeroom.in",
      github: "https://github.com/heyavanindra/thecoffeeroom",
    },
    {
      title: "FastInvo",
      description:
        "Invoice generation platform with live PDF previews, dynamic forms, and schema-driven validation.",
      stack: ["Next.js", "TypeScript", "React Hook Form", "Bun"],
      live: "https://fastinvo.aviii.xyz",
      github: "https://github.com/heyavanindra/fastinvo",
    },
  ],
};
