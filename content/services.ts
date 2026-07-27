import type { Service } from "@/types/content"

export const services = [
  {
    title: "Creative Direction & Content Strategy",
    slug: "creative-direction-content-strategy",
    eyebrow: "Direction / 01",
    shortDescription:
      "Concepts, campaign direction, content systems, and visual planning that give production a clear center.",
    openingStatement:
      "Turn a loose ambition into a visual point of view that can hold across an entire campaign.",
    whoItIsFor:
      "Teams preparing a launch, repositioning a brand, or producing more content without a clear creative system.",
    problems: [
      "The brief names outputs but not the idea connecting them.",
      "Different channels are drifting into different visual languages.",
      "Production is moving before the team has agreed on what success should look like.",
    ],
    capabilities: [
      "Creative concepts and campaign territories",
      "Visual direction and reference systems",
      "Content architecture and format planning",
      "Treatment development and production briefs",
      "Creative review across design, motion, and AI production",
    ],
    deliverables: [
      "Creative direction deck",
      "Campaign concept system",
      "Content and format map",
      "Visual treatment",
      "Production roadmap",
    ],
    process: [
      {
        title: "Find the focus",
        description:
          "Clarify the audience, the change you need to create, and the constraint that matters most.",
      },
      {
        title: "Build the territory",
        description:
          "Develop a small number of distinct directions and make each one concrete enough to judge.",
      },
      {
        title: "Make it executable",
        description:
          "Translate the chosen direction into rules, formats, and decisions the production can follow.",
      },
    ],
    relatedProjectSlugs: ["open-distance", "stay-with-the-light"],
    cta: { label: "Shape the Direction", href: "/contact" },
    published: true,
  },
  {
    title: "AI Content Production",
    slug: "ai-content-production",
    eyebrow: "Production / 02",
    shortDescription:
      "Art-directed generative imagery, AI video, visual experimentation, and scalable production with human control.",
    openingStatement:
      "Create more visual possibility without surrendering authorship, consistency, or finish.",
    whoItIsFor:
      "Brands and creative teams that need distinctive image or video production, rapid visual exploration, or a repeatable content language.",
    problems: [
      "The visual ambition is difficult to reach with conventional production alone.",
      "Generative outputs feel inconsistent, generic, or detached from the brand.",
      "A large content need is putting pressure on quality and continuity.",
    ],
    capabilities: [
      "Art-directed generative image production",
      "AI-assisted video and motion exploration",
      "Style and consistency systems",
      "Image selection, compositing, and retouching",
      "Format adaptation and production scaling",
    ],
    deliverables: [
      "Key visuals",
      "Image families",
      "AI-assisted video assets",
      "Campaign and social variations",
      "Production guidance for future extensions",
    ],
    process: [
      {
        title: "Define the visual grammar",
        description:
          "Set the non-negotiable rules for subject, composition, light, texture, and brand fit.",
      },
      {
        title: "Explore with intent",
        description:
          "Use focused production rounds to answer visual questions, not to accumulate random options.",
      },
      {
        title: "Select and finish",
        description:
          "Apply human judgment, compositing, retouching, and format testing before anything is delivered.",
      },
    ],
    relatedProjectSlugs: ["room-for-sound", "stay-with-the-light"],
    cta: { label: "Plan a Production", href: "/contact" },
    published: true,
  },
  {
    title: "Motion Design & Post-Production",
    slug: "motion-design-post-production",
    eyebrow: "Motion / 03",
    shortDescription:
      "Brand motion, explainers, title design, social video, editing, compositing, and finishing.",
    openingStatement:
      "Give the idea pace, emphasis, and a motion language people can recognize across every format.",
    whoItIsFor:
      "Teams launching a brand, campaign, product, or message that needs to move clearly and feel considered at every length.",
    problems: [
      "Static design has no defined behavior when it enters motion.",
      "Footage and assets exist, but the story, rhythm, or finish is not resolved.",
      "Social cutdowns are losing the character of the main campaign.",
    ],
    capabilities: [
      "Motion direction and behavior systems",
      "Title design and kinetic typography",
      "Editing and narrative structure",
      "2D animation, compositing, and finishing",
      "Social video and campaign cutdowns",
    ],
    deliverables: [
      "Brand-motion system",
      "Campaign films and cutdowns",
      "Explainers and title sequences",
      "Social motion templates",
      "Final masters and format exports",
    ],
    process: [
      {
        title: "Set the behavior",
        description:
          "Define how the visual system enters, changes, and resolves before animating every asset.",
      },
      {
        title: "Build the sequence",
        description:
          "Shape story, rhythm, sound relationships, and the hierarchy of each moment.",
      },
      {
        title: "Finish every format",
        description:
          "Composite, refine, and adapt the work so smaller versions retain the idea of the master.",
      },
    ],
    relatedProjectSlugs: ["room-for-sound", "open-distance"],
    cta: { label: "Put the Idea in Motion", href: "/contact" },
    published: true,
  },
  {
    title: "Brand & Visual Design",
    slug: "brand-visual-design",
    eyebrow: "Design / 04",
    shortDescription:
      "Identity systems, campaign design, social systems, key visuals, and editorial design.",
    openingStatement:
      "Build a visual system with enough character to be recognized and enough structure to keep working.",
    whoItIsFor:
      "New and evolving brands that need a clear identity, a campaign expression, or a stronger system for ongoing content.",
    problems: [
      "The brand looks different each time it appears.",
      "The identity works in a deck but breaks under real content demands.",
      "Campaign assets are polished individually but do not add up to one recognizable world.",
    ],
    capabilities: [
      "Visual identity and art direction",
      "Campaign and key-visual design",
      "Editorial and presentation systems",
      "Social templates and content toolkits",
      "Design guidance for motion and production",
    ],
    deliverables: [
      "Identity systems",
      "Campaign design systems",
      "Key visuals",
      "Social and content templates",
      "Practical visual guidelines",
    ],
    process: [
      {
        title: "Find the distinguishing idea",
        description:
          "Identify the visual tension or behavior the system can own rather than follow.",
      },
      {
        title: "Design the core",
        description:
          "Build the type, color, image, composition, and layout relationships as one language.",
      },
      {
        title: "Prove it in use",
        description:
          "Test the system against real formats, content density, motion, and production constraints.",
      },
    ],
    relatedProjectSlugs: ["open-distance", "room-for-sound"],
    cta: { label: "Build the Visual System", href: "/contact" },
    published: true,
  },
] satisfies readonly Service[]
