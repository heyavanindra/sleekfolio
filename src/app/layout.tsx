import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avanindra Tiwari — Software Engineer",
  description:
    "Software engineer building real-time products and full-stack systems with React, Next.js, WebSockets, and modern backend technologies.",

  metadataBase: new URL("https://aviii.xyz"),

  openGraph: {
    title: "Avanindra Tiwari — Software Engineer",
    description:
      "Software engineer building real-time products and full-stack systems.",
    url: "https://aviii.xyz",
    siteName: "Avanindra Tiwari",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avanindra Tiwari Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Avanindra Tiwari — Software Engineer",
    description:
      "Software engineer building real-time products and full-stack systems.",
    images: ["/og-image.png"],
  },
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
