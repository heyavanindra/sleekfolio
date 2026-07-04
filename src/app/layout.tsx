import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <a
            href="#main-content"
            className="sr-only fixed top-3 left-3 z-50 rounded-sm bg-foreground px-3 py-2 text-sm font-medium text-background focus-visible:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Skip to main content
          </a>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
