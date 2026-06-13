import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto w-full max-w-180 px-5 sm:px-6 lg:px-0">
      {/* <div className="absolute -left-12 bg-white/10 w-px h-full"></div> */}
      {/* <div className="absolute -right-12 bg-white/10 w-px h-full"></div> */}
      {children}
    </div>
  );
};

export default Container;
