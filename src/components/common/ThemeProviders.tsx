"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

type ThemeProviderWrapperProps = React.PropsWithChildren<
  React.ComponentProps<typeof NextThemesProvider>
>;

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderWrapperProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
