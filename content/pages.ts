import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  IndexPageContent,
  PrivacyPageContent,
} from "@/types/content"

export const homePageContent = {
  hero: {
    eyebrow: "AI Content · Motion · Design",
    headline: "We don’t make content. We make impact.",
    description:
      "A-Eye is a creative content agency combining human direction, AI production, motion, and design to create sharper brands and content.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "View Our Work", href: "/work" },
  },
  selectedWork: {
    eyebrow: "Selected Fictional Projects",
    heading: "Ideas, brought into focus.",
    description:
      "Three clearly labelled fictional briefs showing how A-Eye builds campaign systems, motion languages, and art-directed production.",
    projectSlugs: [
      "open-distance",
      "room-for-sound",
      "stay-with-the-light",
    ],
  },
  positioning: {
    eyebrow: "Integrated Production",
    heading: "One vision. Every frame.",
    description:
      "We connect the thinking and the making, so the central idea survives every handoff, format, and deadline.",
    stages: [
      {
        label: "Strategy",
        description: "Find the point of view and the reason it matters.",
      },
      {
        label: "Direction",
        description: "Set the visual rules that keep every choice coherent.",
      },
      {
        label: "Production",
        description: "Build the imagery, design, and motion with controlled craft.",
      },
      {
        label: "System",
        description: "Carry the idea across the formats the audience will actually see.",
      },
    ],
  },
  services: {
    eyebrow: "Capabilities",
    heading: "Built to work together.",
    description:
      "Bring us in for a focused need or connect the full system from first idea to final frame.",
  },
  process: {
    eyebrow: "How We Work",
    heading: "Clarity first. Craft throughout.",
    description:
      "A practical five-stage process keeps decisions visible, production focused, and the final work coherent.",
  },
  aboutPreview: {
    eyebrow: "The Studio",
    heading: "Three creatives. One connected point of view.",
    description:
      "A-Eye is a small creative team working across direction, AI production, motion, and design. We stay close to the work from concept through delivery.",
    cta: { label: "About A-Eye", href: "/about" },
  },
  finalCta: {
    eyebrow: "Start a Conversation",
    heading: "What are you trying to make people see?",
    description:
      "Tell us what you are building, launching, or changing. We will help shape the idea and the content around it.",
    cta: { label: "Start a Project", href: "/contact" },
  },
} satisfies HomePageContent

export const aboutPageContent = {
  eyebrow: "About A-Eye",
  heading: "Close to the idea. Capable across the work.",
  introduction:
    "We are a three-person creative team working across direction, AI production, motion, and design. Small enough to stay close to every project, broad enough to carry an idea from concept to final delivery.",
  philosophy: {
    heading: "Perception before production.",
    body: [
      "The best work starts with noticing the thing others pass over: a sharper angle, a stronger tension, a more useful way to frame the problem.",
      "We use new production methods where they improve the work, but tools never replace judgment. Human direction holds the idea together from the first decision to the final frame.",
    ],
  },
  purpose: {
    heading: "Why A-Eye exists",
    body: "Creative production is changing quickly, but speed without direction only creates more noise. A-Eye exists to pair expanded production possibilities with a clear point of view, giving brands content that is distinctive, coherent, and made for the way it will be seen.",
  },
  principles: [
    {
      title: "Direction before tools",
      description:
        "We decide what the work needs to say and how it should feel before choosing how to make it.",
    },
    {
      title: "Every frame has a purpose",
      description:
        "Composition, motion, and detail should direct attention—not simply decorate the surface.",
    },
    {
      title: "New technology, controlled taste",
      description:
        "We use emerging methods deliberately, with authorship, editing, and craft at every stage.",
    },
    {
      title: "One visual system across every format",
      description:
        "The idea should remain recognizable from a hero film to the smallest social cutdown.",
    },
    {
      title: "Clear communication throughout production",
      description:
        "Clients should understand what is being decided, what comes next, and where their input matters.",
    },
  ],
  collaboration: {
    heading: "A focused team, shaped around the work.",
    description:
      "The three founders stay connected to the project, bringing in specialist support only when the scope genuinely needs it.",
    points: [
      {
        title: "Direct collaboration",
        description:
          "The people shaping the idea remain involved in the details that bring it to life.",
      },
      {
        title: "Connected production",
        description:
          "Direction, design, AI production, and motion develop as one system instead of separate outputs.",
      },
      {
        title: "Honest scope",
        description:
          "We define what the work needs, what it does not, and how to use the available time well.",
      },
    ],
  },
  team: {
    heading: "The founding team",
    description:
      "Meet the three creatives leading direction, production, motion, and design across A-Eye projects.",
    emptyProfileNote: "Add each founder's name, role, 40–60 word bio, and approved 4:5 portrait.",
  },
  cta: {
    heading: "Bring the next idea into focus.",
    description:
      "Share what you are making and where it needs to go. We will help define the clearest creative path.",
    link: { label: "Start a Project", href: "/contact" },
  },
} satisfies AboutPageContent

export const workPageContent = {
  eyebrow: "Work",
  heading: "Projects in direction, design, and motion.",
  description:
    "A collection of clearly labelled fictional briefs created to demonstrate A-Eye's approach. These are not client commissions, and no performance claims are made.",
} satisfies IndexPageContent

export const servicesPageContent = {
  eyebrow: "Services",
  heading: "From the first idea to the final frame.",
  description:
    "Four connected capabilities help brands find the direction, make the work, and carry it across the formats that matter.",
} satisfies IndexPageContent

export const contactPageContent = {
  eyebrow: "Start a Project",
  heading: "Tell us what needs to be seen.",
  description:
    "Share the goal, the context, and what you know so far. It is fine if the scope is not fully formed yet.",
  unconfiguredTransportMessage:
    "Online inquiry delivery is not configured yet. No message will be marked as sent until a real delivery service is connected.",
  responseExpectation: null,
} satisfies ContactPageContent

export const privacyPageContent = {
  eyebrow: "Privacy",
  heading: "Inquiry form privacy",
  effectiveDate: null,
  introduction:
    "This page explains the information the A-Eye inquiry form is designed to collect and how that information is intended to be used.",
  sections: [
    {
      heading: "Information submitted",
      body: [
        "The form may collect your name, email address, organization, project details, budget range, timing, service interests, and contact preference.",
      ],
    },
    {
      heading: "How it is intended to be used",
      body: [
        "Submitted information is intended only to review and respond to your inquiry, discuss a potential project, and maintain relevant business correspondence.",
      ],
    },
    {
      heading: "Storage and service providers",
      body: [
        "Inquiry details will be handled by the final form-delivery and hosting providers. Their names, processing locations, and retention periods will be published here before live submissions are enabled.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "A dedicated privacy contact will be published before live submissions are enabled. Until then, the form remains in setup mode and never reports an unconfigured submission as delivered.",
      ],
    },
  ],
} satisfies PrivacyPageContent
