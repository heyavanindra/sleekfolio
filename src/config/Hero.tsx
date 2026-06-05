import Github from "@/components/svgs/Github";
import LinkedIn from "@/components/svgs/LinkedIn";
import Mail from "@/components/svgs/Mail";
import X from "@/components/svgs/X";
import Bun from "@/components/technologies/Bun";
import NextJs from "@/components/technologies/NextJs";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import ReactIcon from "@/components/technologies/ReactIcon";
import TypeScript from "@/components/technologies/TypeScript";

export const skillComponents = {
  TypeScript,
  ReactIcon,
  NextJs,
  Bun,
  PostgreSQL,
};

export const heroConfig = {
  name: "Avanindra",
  title: "A Full Stack web developer.",
  avatar: "/assets/logo.png",
  skills: [
    {
      name: "Typescript",
      href: "https://www.typescriptlang.org/",
      component: "TypeScript",
    },
    {
      name: "React",
      href: "https://react.dev/",
      component: "ReactIcon",
    },
    {
      name: "Next.js",
      href: "https://nextjs.org/",
      component: "NextJs",
    },
    {
      name: "Bun",
      href: "https://bun.sh/",
      component: "Bun",
    },
    {
      name: "PostgreSQL",
      href: "https://www.postgresql.org/",
      component: "PostgreSQL",
    },
  ],
  description: {
    template:
      "I build interactive web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. building <b>products</b> and web apps that can impact millions of lives.",
  },
  buttons: [
    {
      variant: "outline",
      text: "Resume / CV",
      href: "/resume",
      icon: "CV",
    },
    {
      variant: "default",
      text: "Get in touch",
      href: "/contact",
      icon: "Chat",
    },
  ],
};

export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/heyavanindra",
    icon: <X />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/heyavanindra/",
    icon: <LinkedIn />,
  },
  {
    name: "Github",
    href: "https://github.com/heyavanindra",
    icon: <Github />,
  },
  {
    name: "Email",
    href: "mailto:ramxcodes@gmail.com",
    icon: <Mail />,
  },
];
