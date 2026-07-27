import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content";

const footerLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/12 bg-black text-white">
      <div className="shell section-space pb-8">
        <div className="editorial-grid gap-y-12">
          <div className="col-span-full lg:col-span-6">
            <p className="max-w-xl text-[clamp(2.1rem,4.2vw,4.5rem)] leading-[0.96] font-medium tracking-[-0.055em]">
              One vision.
              <br />
              Every frame<span className="text-primary">.</span>
            </p>
          </div>
          <div className="col-span-full sm:col-span-4 lg:col-span-3 lg:col-start-7">
            <p className="mb-4 font-mono text-[0.65rem] tracking-[0.16em] text-white/48 uppercase">
              Explore
            </p>
            <ul className="flex flex-col gap-1">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link className="inline-flex min-h-11 items-center text-sm text-white/74 transition-colors hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-full sm:col-span-4 lg:col-span-3 lg:col-start-10">
            <p className="mb-4 font-mono text-[0.65rem] tracking-[0.16em] text-white/48 uppercase">
              Contact
            </p>
            <p className="max-w-52 text-sm leading-6 text-white/74">
              Tell us what you are building, launching, or changing.
            </p>
            <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase">
              Begin a conversation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-6 font-mono text-[0.625rem] tracking-[0.13em] text-white/42 uppercase sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}</p>
          <p>AI Content · Motion · Design · Campaigns</p>
        </div>
      </div>
    </footer>
  );
}
