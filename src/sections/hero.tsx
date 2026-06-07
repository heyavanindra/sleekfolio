import { heroConfig } from "@/config/portfolio";

export const Hero = () => {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-8">
      {/* <Image
        src={heroConfig.avatar.src}
        alt={heroConfig.avatar.alt}
        width={112}
        height={112}
        priority
        className="size-28 rounded-full bg-[#8ec5ff] object-cover"
      /> */}

      <div className="flex w-full flex-col gap-2 px-4">
        <h1 className="flex flex-col md:flex-row w-full gap-2 text-4xl font-bold">
          {heroConfig.introPrefix} {heroConfig.name} —
          <span className="text-secondary">{heroConfig.role}</span>
        </h1>
      </div>

      <div style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}>
        <h2 className="text-secondary max-w-lg px-4 pt-4 text-sm md:text-base">
          {heroConfig.description}
        </h2>
      </div>
    </section>
  );
};
