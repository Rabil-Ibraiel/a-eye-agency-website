"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const desktopItemClass =
  "relative flex h-11 items-center px-6 text-xs font-semibold tracking-[0.1em] text-white/66 uppercase transition-colors duration-[160ms] hover:text-white focus-visible:text-white";

const brandMark = (
  <Image
    src="/brand/a-eye-logo.png"
    alt=""
    width={220}
    height={245}
    priority
    className="h-9 w-auto"
  />
);

export function SiteHeader() {
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDetailsElement>(null);

  function closeMobileNav() {
    mobileNavRef.current?.removeAttribute("open");
  }

  return (
    <header
      className="sticky top-0 z-40 bg-black/96 text-white after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.16)_18%,rgba(255,255,255,0.16)_82%,transparent_100%)]"
      style={{ viewTransitionName: "site-header" }}
    >
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[100] -translate-y-24 bg-primary px-4 py-3 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="shell grid h-[4.25rem] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {pathname === "/" ? (
          <span
            aria-current="page"
            aria-label="A-Eye home"
            className="flex min-h-11 items-center justify-self-start"
          >
            {brandMark}
          </span>
        ) : (
          <Link
            href="/"
            aria-label="A-Eye home"
            className="flex min-h-11 items-center justify-self-start transition-opacity duration-[160ms] hover:opacity-78"
          >
            {brandMark}
          </Link>
        )}

        <nav
          aria-label="Primary navigation"
          className="hidden items-center justify-self-center lg:flex"
        >
          {navigation.map((item, index) => {
            const active = isActive(pathname, item.href);
            return (
              <div key={item.href} className="flex items-center">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="h-6 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]"
                  />
                ) : null}
                {active ? (
                  <span
                    aria-current="page"
                    className={cn(
                      desktopItemClass,
                      "text-white after:absolute after:right-6 after:bottom-1 after:left-6 after:h-px after:bg-primary",
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={item.href === "/contact" ? false : undefined}
                    className={desktopItemClass}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-none px-4 text-xs tracking-[0.09em] uppercase"
          >
            <Link
              href="/contact"
              prefetch={false}
              scroll={pathname === "/contact" ? false : undefined}
            >
              Start a project
              <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <details
          ref={mobileNavRef}
          className="mobile-nav group justify-self-end lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMobileNav();
              mobileNavRef.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:bg-white/10">
            <span className="sr-only group-open:hidden">Open navigation</span>
            <span className="sr-only hidden group-open:block">Close navigation</span>
            <Menu aria-hidden="true" className="size-5 group-open:hidden" />
            <X aria-hidden="true" className="hidden size-5 group-open:block" />
          </summary>
          <div className="fixed inset-x-0 top-[4.25rem] bottom-0 z-30 flex flex-col border-t border-white/10 bg-black px-[var(--gutter)] py-3">
            <nav aria-label="Mobile navigation" className="flex flex-1 flex-col">
              {navigation.map((item, index) => {
                const active = isActive(pathname, item.href);
                const className = cn(
                  "flex min-h-14 items-center justify-between border-b border-white/15 text-2xl font-medium tracking-[-0.04em]",
                  active && "text-primary",
                );
                return active ? (
                  <span key={item.href} aria-current="page" className={className}>
                    <span>{item.label}</span>
                    <span className="font-mono text-xs tracking-[0.13em] text-white/48">
                      0{index + 1}
                    </span>
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={item.href === "/contact" ? false : undefined}
                    className={className}
                    onClick={closeMobileNav}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs tracking-[0.13em] text-white/48">
                      0{index + 1}
                    </span>
                  </Link>
                );
              })}
              <Button
                asChild
                className="mt-auto h-12 rounded-none text-xs tracking-[0.1em] uppercase"
              >
                <Link
                  href="/contact"
                  prefetch={false}
                  scroll={pathname === "/contact" ? false : undefined}
                  onClick={closeMobileNav}
                >
                  Start a project
                  <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
