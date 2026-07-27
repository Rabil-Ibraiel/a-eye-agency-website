import type { Project } from "@/types/content"

export const projectFilters = [
  { value: "all", label: "All" },
  { value: "ai-content", label: "AI Content" },
  { value: "motion", label: "Motion" },
  { value: "design", label: "Design" },
  { value: "campaigns", label: "Campaigns" },
] as const

export const projects = [
  {
    title: "Open Distance",
    slug: "open-distance",
    kind: "concept",
    publicLabel: "Fictional Project",
    conceptBrand: "Sahra Mobility",
    client: null,
    year: 2026,
    industry: "Electric intercity mobility",
    categories: ["campaigns", "design", "motion"],
    services: [
      "Creative Direction & Content Strategy",
      "Brand & Visual Design",
      "Motion Design & Post-Production",
    ],
    summary:
      "A fictional launch platform for Sahra Mobility, turning electric intercity travel into a calm, confident picture of open distance.",
    cardDescription:
      "A believable mobility launch built from desert-scale photography, a precise transport system, and motion shaped around the horizon.",
    heroMedia: {
      type: "image",
      src: "/media/projects/open-distance/hero-v1.webp",
      alt: "A cream electric coach with a vermilion accent travelling through an open desert landscape at dawn.",
      width: 1600,
      height: 1000,
      caption: "Sahra Mobility is a fictional brand created for this self-initiated A-Eye project.",
    },
    challenge:
      "For this fictional brief, Sahra Mobility is preparing its first electric route between desert cities. The launch needs to make long-distance public travel feel desirable and contemporary without leaning on technical claims, luxury cliches, or futuristic spectacle.",
    creativeApproach:
      "The horizon becomes the system's organizing line. Cream vehicles, vermilion markers, and generous desert space create instant recognition, while layouts and transitions move horizontally to express progress without visual noise.",
    productionProcess:
      "We developed the fictional vehicle, passenger environment, transit pavilion, campaign palette, and motion behavior as one connected world. Image production was directed around consistent materials, light, and geography, then tested across launch, editorial, and social formats.",
    deliverables: [
      "Launch campaign territory",
      "Art-directed image family",
      "Transit brand system",
      "Motion and social toolkit",
    ],
    modules: [
      {
        type: "process",
        heading: "A journey built around one line",
        steps: [
          {
            number: "01",
            title: "Orient",
            description: "Use the horizon to establish scale, calm, and a consistent visual anchor.",
          },
          {
            number: "02",
            title: "Signal",
            description: "Repeat one vermilion marker across vehicle, environment, and information.",
          },
          {
            number: "03",
            title: "Move",
            description: "Let horizontal crops and transitions carry the system through every format.",
          },
        ],
      },
      {
        type: "media-pair",
        media: [
          {
            type: "image",
            src: "/media/projects/open-distance/interior-v1.webp",
            alt: "A calm electric coach interior with cream seats, vermilion upholstery, and desert views.",
            width: 1600,
            height: 1000,
            caption: "Passenger environment concept: materials and color continue the exterior system.",
          },
          {
            type: "image",
            src: "/media/projects/open-distance/station-v1.webp",
            alt: "The fictional Sahra Mobility coach beside a minimal desert transit pavilion and blank wayfinding markers.",
            width: 1600,
            height: 1000,
            caption: "Arrival concept: one visual language across vehicle, place, and wayfinding.",
          },
        ],
      },
      {
        type: "visual-system",
        heading: "Desert scale, civic precision",
        description:
          "Warm neutrals keep the system grounded in place. Vermilion carries navigation and emphasis, while charcoal gives information a dependable structural layer.",
        swatches: [
          { name: "Dune", value: "#D9C3A2" },
          { name: "Coach", value: "#E8E0D1" },
          { name: "Signal", value: "#C84632" },
          { name: "Route", value: "#202526" },
        ],
      },
    ],
    results: [],
    credits: [],
    published: true,
    featured: true,
  },
  {
    title: "Room for Sound",
    slug: "room-for-sound",
    kind: "concept",
    publicLabel: "Fictional Project",
    conceptBrand: "Morrow Audio",
    client: null,
    year: 2026,
    industry: "Consumer audio technology",
    categories: ["ai-content", "motion", "design"],
    services: [
      "AI Content Production",
      "Motion Design & Post-Production",
      "Brand & Visual Design",
    ],
    summary:
      "A fictional product launch for Morrow Audio that makes spatial sound visible through material, light, and controlled optical traces.",
    cardDescription:
      "A spatial-audio launch world built around one sculptural product, tactile macro imagery, and a motion identity that lingers.",
    heroMedia: {
      type: "image",
      src: "/media/projects/room-for-sound/hero-v1.webp",
      alt: "A sculptural dark aluminum speaker with a translucent violet acoustic membrane in a charcoal studio.",
      width: 1600,
      height: 1000,
      caption: "Morrow Audio is a fictional brand created for this self-initiated A-Eye project.",
    },
    challenge:
      "For this fictional brief, Morrow Audio is entering a category crowded with cylinders, feature diagrams, and vague claims about immersion. The launch needs to make acoustic depth feel tangible while keeping the product credible, quiet, and desirable.",
    creativeApproach:
      "A razor-sharp product remains the anchor while a restrained horizontal trace suggests sound moving through space. Ultraviolet glass, cyan edge light, and brushed graphite give the product a recognizable material signature without turning the campaign into science fiction.",
    productionProcess:
      "We designed a consistent fictional product and built its image family from hero, macro, and in-room views. The same anchor-and-trace rule was mapped into product rotations, title transitions, feature loops, and reduced-motion alternatives.",
    deliverables: [
      "Product launch direction",
      "Hero and macro image system",
      "Motion identity principles",
      "Launch film and product loops",
    ],
    modules: [
      {
        type: "process",
        heading: "Make the invisible feel physical",
        steps: [
          {
            number: "01",
            title: "Anchor",
            description: "Keep the product geometry crisp enough to feel engineered and believable.",
          },
          {
            number: "02",
            title: "Trace",
            description: "Use one controlled optical echo to suggest acoustic depth and direction.",
          },
          {
            number: "03",
            title: "Resolve",
            description: "Return every sequence to a quiet, legible product state.",
          },
        ],
      },
      {
        type: "media-pair",
        media: [
          {
            type: "image",
            src: "/media/projects/room-for-sound/material-v1.webp",
            alt: "Macro detail of brushed dark aluminum meeting a translucent violet acoustic surface with a cyan edge.",
            width: 1600,
            height: 1000,
            caption: "Material study: a precise join between engineered shell and acoustic membrane.",
          },
          {
            type: "image",
            src: "/media/projects/room-for-sound/interior-v1.webp",
            alt: "The fictional Morrow Audio speaker placed in a warm, restrained concrete listening room.",
            width: 1600,
            height: 1000,
            caption: "In-room application: the product stays distinctive without dominating the space.",
          },
        ],
      },
      {
        type: "visual-system",
        heading: "A quiet field with one resonance",
        description:
          "Graphite and ink hold the product in a calm visual field. Violet carries the acoustic material, cyan defines the edge, and one acid cue acts as a precise status signal.",
        swatches: [
          { name: "Ink", value: "#0B0C10" },
          { name: "Graphite", value: "#242830" },
          { name: "Resonance", value: "#6C4AD8" },
          { name: "Edge", value: "#43D7F2" },
        ],
      },
    ],
    results: [],
    credits: [],
    published: true,
    featured: true,
  },
  {
    title: "Stay With the Light",
    slug: "stay-with-the-light",
    kind: "concept",
    publicLabel: "Fictional Project",
    conceptBrand: "Aster House",
    client: null,
    year: 2026,
    industry: "Boutique hospitality",
    categories: ["campaigns", "ai-content", "design"],
    services: [
      "Creative Direction & Content Strategy",
      "AI Content Production",
      "Brand & Visual Design",
    ],
    summary:
      "A fictional hospitality campaign for Aster House, shaped by limestone, long shadows, and the changing rhythm of desert light.",
    cardDescription:
      "A warm hospitality image world that carries one fictional retreat from first-light discovery to blue-hour intimacy.",
    heroMedia: {
      type: "image",
      src: "/media/projects/stay-with-the-light/hero-v1.webp",
      alt: "A limestone retreat courtyard with olive trees, linen curtains, and a narrow reflecting pool facing dry hills.",
      width: 1600,
      height: 1000,
      caption: "Aster House is a fictional brand created for this self-initiated A-Eye project.",
    },
    challenge:
      "For this fictional brief, Aster House is preparing to open a small retreat in an oversaturated luxury-travel market. The launch needs to communicate place, privacy, and material character without resort cliches or over-staged lifestyle photography.",
    creativeApproach:
      "Light is treated as the central brand behavior. Architectural frames, rough limestone, linen, cobalt water, and a restrained rust accent make the property recognizable across wide exteriors, quiet interiors, and evening hospitality moments.",
    productionProcess:
      "We established a consistent fictional property, material palette, landscape, and daily light cycle before producing the image family. Frames were selected for narrative range, then organized into a launch sequence from arrival to room to evening table.",
    deliverables: [
      "Hospitality launch concept",
      "Art-directed property image family",
      "Editorial and booking-site system",
      "Campaign and social adaptations",
    ],
    modules: [
      {
        type: "process",
        heading: "One place across one day",
        steps: [
          {
            number: "01",
            title: "Arrive",
            description: "Lead with the architecture and landscape before introducing lifestyle detail.",
          },
          {
            number: "02",
            title: "Settle",
            description: "Move closer to linen, stone, timber, and the imperfect surfaces of the room.",
          },
          {
            number: "03",
            title: "Gather",
            description: "Close in blue hour, when warm light turns the property into a shared experience.",
          },
        ],
      },
      {
        type: "media-pair",
        media: [
          {
            type: "image",
            src: "/media/projects/stay-with-the-light/suite-v1.webp",
            alt: "A tactile limestone guest room with a linen bed, timber side table, cobalt vessel, and an arched desert view.",
            width: 1600,
            height: 1000,
            caption: "Room concept: natural imperfection and a small cobalt cue create the identity.",
          },
          {
            type: "image",
            src: "/media/projects/stay-with-the-light/evening-v1.webp",
            alt: "A long dining table beside the retreat's reflecting pool at blue hour with warm architectural light.",
            width: 1600,
            height: 1000,
            caption: "Evening concept: the same space shifts from quiet retreat to intimate gathering.",
          },
        ],
      },
      {
        type: "visual-system",
        heading: "Material first, color in restraint",
        description:
          "Limestone and linen do most of the work. Cobalt connects water and objects, rust adds human warmth, and olive keeps the architecture tied to the landscape.",
        swatches: [
          { name: "Limestone", value: "#D8C5A6" },
          { name: "Linen", value: "#EEE5D6" },
          { name: "Cobalt", value: "#244A64" },
          { name: "Ember", value: "#A84F35" },
        ],
      },
    ],
    results: [],
    credits: [],
    published: true,
    featured: true,
  },
] satisfies readonly Project[]
