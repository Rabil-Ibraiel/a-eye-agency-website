import type { SiteConfig } from "@/types/content"

export const siteConfig = {
  brandName: "A-Eye.",
  tagline: "See What Others Do Not.",
  description:
    "A-Eye is a creative content agency combining human direction, AI production, motion, and design to create sharper brands and content.",
  siteUrl: null,
  contactEmail: null,
  phone: null,
  whatsappUrl: null,
  bookingUrl: null,
  showreel: null,
  location: null,
  socialProfiles: null,
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  projectCta: { label: "Start a Project", href: "/contact" },
  founderCount: 3,
  founders: [
    {
      id: "founder-01",
      name: null,
      role: null,
      bio: null,
      portrait: null,
      socialProfiles: null,
      published: false,
    },
    {
      id: "founder-02",
      name: null,
      role: null,
      bio: null,
      portrait: null,
      socialProfiles: null,
      published: false,
    },
    {
      id: "founder-03",
      name: null,
      role: null,
      bio: null,
      portrait: null,
      socialProfiles: null,
      published: false,
    },
  ],
  availability: null,
  seo: {
    defaultTitle: "A-Eye. — See What Others Do Not.",
    titleTemplate: "%s — A-Eye.",
    description:
      "Human-led creative direction, AI production, motion, and design for sharper brands and content.",
    locale: "en",
    socialImage: null,
  },
} satisfies SiteConfig
