import Image from "next/image";
import type { ReactNode } from "react";


export const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col px-6  md:px-8">

        {/* <Image
          src="/assets/logo.png"
          alt="Pixel avatar of Ram"
          width={112}
          height={112}
          priority
          className="size-28 rounded-full bg-[#8ec5ff] object-cover"
        /> */}

        <div className="mt-8 w-full flex flex-col gap-2">
            <h1 className="text-4xl w-full flex  gap-2">
                Hi, I&apos;m  — <span className="text-secondary">Full Stack Developer</span>
            </h1>
        </div>
    </section>
  );
};