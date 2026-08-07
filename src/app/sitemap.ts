import type { MetadataRoute } from "next";
import { navLinks, projects, site } from "@/lib/content";

/** Home, every nav route, and every project case study. */
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
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
