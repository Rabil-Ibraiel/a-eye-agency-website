import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = as;
  const delayMs = Math.round(Math.min(Math.max(delay, 0), 0.18) * 1000);

  return (
    <Component
      className={cn("scroll-reveal", className)}
      data-scroll-reveal=""
      style={{ "--scroll-reveal-delay": `${delayMs}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}
