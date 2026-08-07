import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/content";

/** Home plus one entry per nav route, so every page is indexable. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...navLinks.map((link) => ({
      url: `${site.url}/${link.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Projects and contact are the pages that matter most to a recruiter.
      priority: link.id === "projects" || link.id === "contact" ? 0.9 : 0.7,
    })),
  ];
}
