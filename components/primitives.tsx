import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  className?: string;
}) {
  return (
    <header className={cn("editorial-grid items-start gap-y-6", className)}>
      <Eyebrow className="col-span-full md:col-span-2 lg:col-span-2">{eyebrow}</Eyebrow>
      <h2 className="display-md col-span-full md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3">
        {title}
      </h2>
      {copy ? (
        <p className="body-lg col-span-full text-muted-foreground md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9">
          {copy}
        </p>
      ) : null}
    </header>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn("editorial-grid items-start gap-y-6", className)}>
      <Eyebrow className="col-span-full md:col-span-2 lg:col-span-2">{eyebrow}</Eyebrow>
      <h1
        className={cn(
          "display-lg col-span-full md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3",
          titleClassName,
        )}
      >
        {title}
      </h1>
      <p className="body-lg col-span-full text-muted-foreground md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9">
        {copy}
      </p>
    </header>
  );
}

export function TextLink({
  href,
  children,
  className,
  direction,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "forward" | "back";
}) {
  return (
    <Link
      href={href}
      prefetch={href === "/contact" ? false : undefined}
      transitionTypes={
        direction ? [`nav-${direction}`] : undefined
      }
      className={cn("link-line", className)}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

export function NumberLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}
