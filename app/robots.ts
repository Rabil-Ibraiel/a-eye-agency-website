import type { MetadataRoute } from "next";
import { siteConfig } from "@/content";

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/brand-lab", "/api/"],
    },
    sitemap: `${baseUrl()}/sitemap.xml`,
  };
}
