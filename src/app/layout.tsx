import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full antialiased">
        <body className="flex min-h-full flex-col">{children}</body>
      </html>
    </ViewTransitions>
  );
}
