export type ExperienceItem = {
  company: string;
  logoId: "mastersUnion" | "niveshJano";
  role: string;
  startDate: string;
  endDate: string | null;
  stack?: string[];
  highlights: Array<{
    text: string;
    emphasize?: string;
  }>;
};

export const experienceConfig = {
  section: {
    label: "Companies I've worked with",
  },
  items: [
    {
      company: "Masters' Union",
      logoId: "mastersUnion" as const,
      role: "Software Developer",
      startDate: "2026-01-01",
      endDate: null,
      stack: [
        "React",
        "Next.js",
        "Node.js",
        "Redis",
        "Bull Queue",
        "PostgreSQL",
      ],
      highlights: [
        {
          text: "Reduced real-time response latency by 40%+ by introducing Redis caching and Bull Queue for asynchronous processing.",
          emphasize: "40%+",
        },
        {
          text: "Built and shipped production-ready full-stack features using React, Next.js, Node.js, and PostgreSQL.",
        },
        {
          text: "Implemented stale-while-revalidate caching strategies to reduce redundant API requests and improve application responsiveness.",
        },
        {
          text: "Collaborated closely with product and engineering teams to deliver features from development to production.",
        },
      ],
    },
    {
      company: "Nivesh Jano",
      logoId: "niveshJano" as const,
      role: "Technical Development Intern",
      startDate: "2025-04-01",
      endDate: "2025-10-01",
      stack: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
      highlights: [
        {
          text: "Built 7+ production-grade fintech modules using MERN and Next.js.",
          emphasize: "7+",
        },
        {
          text: "Developed a credit scoring system and role-based CMS that improved HR efficiency by 40%+.",
          emphasize: "40%+",
        },
        {
          text: "Implemented multilingual architecture and automated email processing with IMAP.",
        },
      ],
    },
  ],
};
