export type NavigationItem = {
  label: string
  href: string
}

export type SocialProfile = {
  platform: string
  label: string
  url: string
}

export type Founder = {
  id: string
  name: string | null
  role: string | null
  bio: string | null
  portrait: ImageMedia | null
  socialProfiles: readonly SocialProfile[] | null
  published: boolean
}

export type AvailabilityStatus = {
  acceptingProjects: boolean
  label: string
}

export type SeoConfig = {
  defaultTitle: string
  titleTemplate: string
  description: string
  locale: string
  socialImage: string | null
}

export type SiteConfig = {
  brandName: "A-Eye."
  tagline: string
  description: string
  siteUrl: string | null
  contactEmail: string | null
  phone: string | null
  whatsappUrl: string | null
  bookingUrl: string | null
  showreel: VideoMedia | null
  location: string | null
  socialProfiles: readonly SocialProfile[] | null
  navigation: readonly NavigationItem[]
  projectCta: NavigationItem
  founderCount: 3
  founders: readonly Founder[]
  availability: AvailabilityStatus | null
  seo: SeoConfig
}

export type AbstractMediaTreatment =
  | "signal-field"
  | "afterimage"
  | "material-study"
  | "focus-aperture"

export type AbstractMedia = {
  type: "abstract"
  id: string
  treatment: AbstractMediaTreatment
  alt: string
  aspectRatio: `${number}/${number}`
  caption?: string
}

export type ImageMedia = {
  type: "image"
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type VideoMedia = {
  type: "video"
  src: string
  poster: ImageMedia
  alt: string
  width: number
  height: number
  caption?: string
  ambient?: boolean
}

export type Media = AbstractMedia | ImageMedia | VideoMedia

export type ProcessItem = {
  number: string
  title: string
  description: string
}

export type FullMediaModule = {
  type: "full-media"
  media: Media
}

export type MediaPairModule = {
  type: "media-pair"
  media: readonly [Media, Media]
}

export type BeforeAfterModule = {
  type: "before-after"
  before: Media
  after: Media
  beforeLabel: string
  afterLabel: string
}

export type PullQuoteModule = {
  type: "pull-quote"
  quote: string
  attribution?: string
}

export type ProcessModule = {
  type: "process"
  heading: string
  steps: readonly ProcessItem[]
}

export type VisualSystemModule = {
  type: "visual-system"
  heading: string
  description: string
  swatches: readonly {
    name: string
    value: string
  }[]
}

export type CaseStudyModule =
  | FullMediaModule
  | MediaPairModule
  | BeforeAfterModule
  | PullQuoteModule
  | ProcessModule
  | VisualSystemModule

export type ProjectCategory =
  | "ai-content"
  | "motion"
  | "design"
  | "campaigns"

export type ProjectKind = "concept" | "experiment" | "placeholder" | "client"

export type VerifiedResult = {
  label: string
  value: string
  context: string
  verified: true
  evidence: {
    type: "client-confirmed" | "published-source" | "analytics-export"
    reference: string
  }
}

export type Credit = {
  role: string
  name: string
}

export type Project = {
  title: string
  slug: string
  kind: ProjectKind
  publicLabel: string
  conceptBrand: string | null
  client: string | null
  year: number
  industry: string | null
  categories: readonly ProjectCategory[]
  services: readonly string[]
  summary: string
  cardDescription: string
  heroMedia: Media
  challenge: string
  creativeApproach: string
  productionProcess: string
  deliverables: readonly string[]
  modules: readonly CaseStudyModule[]
  results: readonly VerifiedResult[]
  credits: readonly Credit[]
  published: boolean
  featured: boolean
}

export type ServiceProcessItem = {
  title: string
  description: string
}

export type Service = {
  title: string
  slug: string
  eyebrow: string
  shortDescription: string
  openingStatement: string
  whoItIsFor: string
  problems: readonly string[]
  capabilities: readonly string[]
  deliverables: readonly string[]
  process: readonly ServiceProcessItem[]
  relatedProjectSlugs: readonly string[]
  cta: {
    label: string
    href: string
  }
  published: boolean
}

export type HomePageContent = {
  hero: {
    eyebrow: string
    headline: string
    description: string
    primaryCta: NavigationItem
    secondaryCta: NavigationItem
  }
  selectedWork: {
    eyebrow: string
    heading: string
    description: string
    projectSlugs: readonly string[]
  }
  positioning: {
    eyebrow: string
    heading: string
    description: string
    stages: readonly {
      label: string
      description: string
    }[]
  }
  services: {
    eyebrow: string
    heading: string
    description: string
  }
  process: {
    eyebrow: string
    heading: string
    description: string
  }
  aboutPreview: {
    eyebrow: string
    heading: string
    description: string
    cta: NavigationItem
  }
  finalCta: {
    eyebrow: string
    heading: string
    description: string
    cta: NavigationItem
  }
}

export type AboutPageContent = {
  eyebrow: string
  heading: string
  introduction: string
  philosophy: {
    heading: string
    body: readonly string[]
  }
  purpose: {
    heading: string
    body: string
  }
  principles: readonly {
    title: string
    description: string
  }[]
  collaboration: {
    heading: string
    description: string
    points: readonly {
      title: string
      description: string
    }[]
  }
  team: {
    heading: string
    description: string
    emptyProfileNote: string
  }
  cta: {
    heading: string
    description: string
    link: NavigationItem
  }
}

export type IndexPageContent = {
  eyebrow: string
  heading: string
  description: string
}

export type ContactPageContent = IndexPageContent & {
  unconfiguredTransportMessage: string
  responseExpectation: string | null
}

export type PrivacyPageContent = {
  eyebrow: string
  heading: string
  effectiveDate: string | null
  introduction: string
  sections: readonly {
    heading: string
    body: readonly string[]
  }[]
}
