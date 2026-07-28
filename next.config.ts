import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = isGitHubPages
  ? configuredBasePath ||
    `/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "a-eye-agency-website"}`
  : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  ...(isGitHubPages
    ? {
        output: "export" as const,
        distDir: ".next-pages",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: {
          loader: "custom" as const,
          loaderFile: "./lib/github-pages-image-loader.ts",
        },
      }
    : {}),
};

export default nextConfig;
