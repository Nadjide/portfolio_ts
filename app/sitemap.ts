import type { MetadataRoute } from "next";

import { portfolioUrl } from "./contactData";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portfolioUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
