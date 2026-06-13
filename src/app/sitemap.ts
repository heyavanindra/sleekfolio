import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aviii.xyz",
      lastModified: new Date(),
    },
  ];
}