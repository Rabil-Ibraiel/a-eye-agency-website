import {
  homePageContent,
  projects,
  services,
  siteConfig,
} from "@/content"
import type {
  Founder,
  ImageMedia,
  Media,
  Project,
  ProjectCategory,
  Service,
} from "@/types/content"

export type PublicFounder = Founder & {
  name: string
  role: string
  bio: string
  portrait: ImageMedia
  published: true
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isCompleteFounder(founder: Founder): founder is PublicFounder {
  return (
    founder.published === true &&
    isNonEmptyString(founder.name) &&
    isNonEmptyString(founder.role) &&
    isNonEmptyString(founder.bio) &&
    founder.portrait?.type === "image" &&
    isNonEmptyString(founder.portrait.src) &&
    isNonEmptyString(founder.portrait.alt)
  )
}

function addMissingTextError(
  errors: string[],
  value: unknown,
  label: string,
) {
  if (!isNonEmptyString(value)) {
    errors.push(`${label} must be a non-empty string.`)
  }
}

function validateMedia(errors: string[], media: Media, label: string) {
  addMissingTextError(errors, media.alt, `${label} alt text`)

  if (media.type === "abstract") {
    addMissingTextError(errors, media.id, `${label} identifier`)
    return
  }

  addMissingTextError(errors, media.src, `${label} source`)

  if (media.width <= 0 || media.height <= 0) {
    errors.push(`${label} must include positive intrinsic dimensions.`)
  }

  if (media.type === "video") {
    validateMedia(errors, media.poster, `${label} poster`)
  }
}

function validateModuleMedia(
  errors: string[],
  project: Project,
  label: string,
) {
  for (const [index, module] of project.modules.entries()) {
    const moduleLabel = `${label} module ${index + 1}`

    if (module.type === "full-media") {
      validateMedia(errors, module.media, `${moduleLabel} media`)
    }

    if (module.type === "media-pair") {
      module.media.forEach((media, mediaIndex) => {
        validateMedia(errors, media, `${moduleLabel} media ${mediaIndex + 1}`)
      })
    }

    if (module.type === "before-after") {
      validateMedia(errors, module.before, `${moduleLabel} before media`)
      validateMedia(errors, module.after, `${moduleLabel} after media`)
    }
  }
}

function findDuplicateSlugs<T extends { slug: string }>(
  items: readonly T[],
): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const item of items) {
    if (seen.has(item.slug)) duplicates.add(item.slug)
    seen.add(item.slug)
  }

  return [...duplicates]
}

function validateProject(errors: string[], project: Project) {
  const label = `Project “${project.slug || "unknown"}”`

  if (!slugPattern.test(project.slug)) {
    errors.push(`${label} has an invalid slug.`)
  }

  if (!project.published) return

  addMissingTextError(errors, project.title, `${label} title`)
  addMissingTextError(errors, project.publicLabel, `${label} public label`)
  addMissingTextError(errors, project.summary, `${label} summary`)
  addMissingTextError(errors, project.cardDescription, `${label} card description`)
  addMissingTextError(errors, project.challenge, `${label} challenge`)
  addMissingTextError(errors, project.creativeApproach, `${label} creative approach`)
  addMissingTextError(errors, project.productionProcess, `${label} production process`)
  validateMedia(errors, project.heroMedia, `${label} hero media`)
  validateModuleMedia(errors, project, label)

  if (project.categories.length === 0) {
    errors.push(`${label} needs at least one category.`)
  }
  if (project.services.length === 0) {
    errors.push(`${label} needs at least one service.`)
  }
  if (project.deliverables.length === 0) {
    errors.push(`${label} needs at least one deliverable.`)
  }

  if (project.kind === "concept") {
    if (project.publicLabel !== "Fictional Project") {
      errors.push(`${label} must be visibly labelled “Fictional Project”.`)
    }
    addMissingTextError(errors, project.conceptBrand, `${label} fictional brand`)
    if (project.client !== null) {
      errors.push(`${label} cannot name a client because it is concept work.`)
    }
    if (project.results.length > 0) {
      errors.push(`${label} cannot publish results because it is concept work.`)
    }
  }

  if (project.kind === "client" && !isNonEmptyString(project.client)) {
    errors.push(`${label} must name a verified client before publication.`)
  }

  if (project.kind === "client" && project.conceptBrand !== null) {
    errors.push(`${label} cannot name a fictional concept brand.`)
  }

  for (const result of project.results) {
    addMissingTextError(errors, result.label, `${label} result label`)
    addMissingTextError(errors, result.value, `${label} result value`)
    addMissingTextError(errors, result.context, `${label} result context`)
    addMissingTextError(
      errors,
      result.evidence.reference,
      `${label} result evidence`,
    )
    if (result.verified !== true) {
      errors.push(`${label} contains an unverified result.`)
    }
  }
}

function validateService(
  errors: string[],
  service: Service,
  projectSlugs: ReadonlySet<string>,
) {
  const label = `Service “${service.slug || "unknown"}”`

  if (!slugPattern.test(service.slug)) {
    errors.push(`${label} has an invalid slug.`)
  }

  if (!service.published) return

  addMissingTextError(errors, service.title, `${label} title`)
  addMissingTextError(errors, service.shortDescription, `${label} summary`)
  addMissingTextError(
    errors,
    service.openingStatement,
    `${label} opening statement`,
  )
  addMissingTextError(errors, service.whoItIsFor, `${label} audience`)
  addMissingTextError(errors, service.cta.label, `${label} CTA label`)
  addMissingTextError(errors, service.cta.href, `${label} CTA destination`)

  const requiredCollections = [
    ["problems", service.problems],
    ["capabilities", service.capabilities],
    ["deliverables", service.deliverables],
    ["process", service.process],
  ] as const

  for (const [name, collection] of requiredCollections) {
    if (collection.length === 0) {
      errors.push(`${label} needs at least one ${name} entry.`)
    }
  }

  for (const slug of service.relatedProjectSlugs) {
    if (!projectSlugs.has(slug)) {
      errors.push(`${label} references missing project “${slug}”.`)
    }
  }
}

export function validateContentIntegrity(): string[] {
  const errors: string[] = []
  const duplicateProjectSlugs = findDuplicateSlugs(projects)
  const duplicateServiceSlugs = findDuplicateSlugs(services)

  for (const slug of duplicateProjectSlugs) {
    errors.push(`Duplicate project slug: “${slug}”.`)
  }
  for (const slug of duplicateServiceSlugs) {
    errors.push(`Duplicate service slug: “${slug}”.`)
  }

  const publishedProjectSlugs = new Set(
    projects.filter((project) => project.published).map((project) => project.slug),
  )

  for (const project of projects) validateProject(errors, project)
  for (const service of services) {
    validateService(errors, service, publishedProjectSlugs)
  }

  for (const slug of homePageContent.selectedWork.projectSlugs) {
    if (!publishedProjectSlugs.has(slug)) {
      errors.push(`Homepage selected work references missing project “${slug}”.`)
    }
  }

  if (siteConfig.founders.length !== siteConfig.founderCount) {
    errors.push(
      `Site config declares ${siteConfig.founderCount} founders but contains ${siteConfig.founders.length} founder records.`,
    )
  }

  for (const founder of siteConfig.founders) {
    if (founder.published && !isCompleteFounder(founder)) {
      errors.push(
        `Founder “${founder.id}” is marked published but does not have a complete public profile.`,
      )
    }
  }

  const navigationHrefs = siteConfig.navigation.map((item) => item.href)
  if (new Set(navigationHrefs).size !== navigationHrefs.length) {
    errors.push("Primary navigation contains duplicate destinations.")
  }

  return errors
}

export const publishedProjects: readonly Project[] = projects.filter(
  (project) => project.published,
)

export const featuredProjects: readonly Project[] = publishedProjects.filter(
  (project) => project.featured,
)

export const publishedServices: readonly Service[] = services.filter(
  (service) => service.published,
)

const configuredFounders: readonly Founder[] = siteConfig.founders

export const publicFounders: readonly PublicFounder[] =
  configuredFounders.filter(isCompleteFounder)

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((project) => project.slug === slug)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return publishedServices.find((service) => service.slug === slug)
}

export function getProjectsByCategory(
  category: ProjectCategory | "all",
): readonly Project[] {
  if (category === "all") return publishedProjects
  return publishedProjects.filter((project) =>
    project.categories.includes(category),
  )
}

export function getRelatedProjects(service: Service): readonly Project[] {
  return service.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project))
}

export function getNextProject(slug: string): Project | undefined {
  const currentIndex = publishedProjects.findIndex(
    (project) => project.slug === slug,
  )
  if (currentIndex < 0 || publishedProjects.length < 2) return undefined
  return publishedProjects[(currentIndex + 1) % publishedProjects.length]
}

export const contentValidationErrors = validateContentIntegrity()

if (contentValidationErrors.length > 0) {
  throw new Error(
    `Content validation failed:\n- ${contentValidationErrors.join("\n- ")}`,
  )
}
