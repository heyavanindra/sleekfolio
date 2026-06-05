import { heroConfig, skillComponents, socialLinks } from "@/config/Hero";
import { parseTemplate } from "@/lib/hero";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Container from "../common/Container";
import Skill from "../common/Skill";
import CV from "../svgs/CV";
import Chat from "../svgs/Chat";

const buttonIcons = {
  CV,
  Chat,
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const DescriptionSection = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === "skill" && "skill" in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];

        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      }

      if (part.type === "bold" && "text" in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      }

      if (part.type === "text" && "text" in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }

      return null;
    });
  };

  return (
    <Container className="mx-auto h-screen max-w-2xl">
      <Image
        src={avatar}
        alt="hero"
        width={100}
        height={100}
        priority
        className="size-24 rounded-full bg-avatar-bg"
      />

      <div className="mt-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold">
          Hi, I&apos;m {name} &mdash;{" "}
          <span className="text-secondary">{title}</span>
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base whitespace-pre-wrap text-muted-foreground md:text-lg">
          <DescriptionSection />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {buttons.map((button) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];

          return (
            <Link
              key={button.text}
              href={button.href}
              className={cn(
                "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all outline-none",
                "btn-inner-shadow focus-visible:ring-ring/50 hover:cursor-pointer focus-visible:ring-[3px]",
                button.variant === "outline" &&
                  "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                button.variant === "default" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {IconComponent && (
                <span className="size-4">
                  <IconComponent />
                </span>
              )}
              {button.text}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex gap-2">
        {socialLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            title={link.name}
            className="text-secondary flex items-center gap-2 transition-colors hover:text-primary"
          >
            <span className="size-6">{link.icon}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
