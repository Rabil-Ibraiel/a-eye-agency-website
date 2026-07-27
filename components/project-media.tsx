import Image from "next/image";
import type { Media } from "@/types/content";
import { cn } from "@/lib/utils";

const treatmentClasses = {
  "signal-field":
    "bg-[radial-gradient(circle_at_70%_35%,var(--signal)_0_8%,transparent_8.5%),linear-gradient(135deg,#161816_0_52%,#272b26_52%_54%,#0b0c0c_54%)]",
  afterimage:
    "bg-[linear-gradient(110deg,transparent_0_22%,#b7ff3c_22%_42%,transparent_42%),linear-gradient(75deg,#191b19_0_46%,#f2eee5_46%_61%,#0b0c0c_61%)]",
  "material-study":
    "bg-[radial-gradient(ellipse_at_50%_50%,#5d625a_0_12%,#20231f_13%_32%,#0b0c0c_33%)]",
  "focus-aperture":
    "bg-[radial-gradient(circle_at_62%_44%,#f2eee5_0_22%,#b7ff3c_22.5%_25%,#141614_25.5%)]",
} as const;

export function ProjectMedia({
  media,
  className,
  priority = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 58vw",
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (media.type === "image") {
    return (
      <div className={cn("relative overflow-hidden bg-card", className)}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className={cn("relative overflow-hidden bg-card", className)}>
        <Image
          src={media.poster.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={media.alt}
      className={cn(
        "relative overflow-hidden border border-border bg-card",
        treatmentClasses[media.treatment],
        className,
      )}
    >
      <span className="absolute inset-5 border border-current/20" aria-hidden="true" />
      <span className="absolute top-5 left-5 font-mono text-[0.58rem] tracking-[0.15em] uppercase opacity-60" aria-hidden="true">
        A-Eye / {media.id}
      </span>
    </div>
  );
}
