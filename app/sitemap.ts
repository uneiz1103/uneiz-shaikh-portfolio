import type { MetadataRoute } from "next";
import { getPublishedProjects, getPublishedWriting } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/writing", "/about", "/contact", "/resume"].map((path) => ({
    url: `${site.domain}${path || "/"}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getPublishedProjects().map((project) => ({
    url: `${site.domain}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const noteRoutes = getPublishedWriting().map((note) => ({
    url: `${site.domain}/writing/${note.slug}`,
    lastModified: new Date(note.updatedAt ?? note.publishedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
