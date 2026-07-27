import type { MetadataRoute } from "next";
import { siteConfig } from "@/content";
import { publishedProjects, publishedServices } from "@/lib/content";

export const dynamic = "force-static";

function baseUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteConfig.siteUrl;
  if (!candidate) return "http://localhost:3000";
  try {
    return new URL(candidate).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const staticRoutes = ["", "/work", "/services", "/about", "/contact", "/privacy"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...publishedProjects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...publishedServices.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
