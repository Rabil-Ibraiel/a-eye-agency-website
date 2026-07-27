import type { Metadata } from "next";
import "./globals.css";
import { ScrollRevealController } from "@/components/motion/scroll-reveal-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content";

const homeIntroBootScript = `(() => {
  const root = document.documentElement;
  root.dataset.aeyeIntro = "skip";
  try {
    const navigation = performance.getEntriesByType("navigation")[0];
    const restored = navigation && navigation.type === "back_forward";
    const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const key = "aeye:intro:v2";
    if (location.pathname === "/" && !restored && !shouldReduce && !sessionStorage.getItem(key)) {
      root.dataset.aeyeIntro = "run";
      sessionStorage.setItem(key, "1");
    }
  } catch {}
})();`;

function configuredMetadataBase() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteConfig.siteUrl;
  if (!value) return new URL("http://localhost:3000");
  try {
    return new URL(value);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: configuredMetadataBase(),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.brandName,
  category: "Creative agency",
  openGraph: {
    type: "website",
    siteName: siteConfig.brandName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: homeIntroBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ScrollRevealController />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
