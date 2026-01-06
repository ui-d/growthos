// Social and contact links
// These are used across the site for consistency
// If a value is empty, the corresponding link will be hidden

export const SITE_CONFIG = {
  name: "Growth OS",
  description: "The complete growth engineering framework for modern products.",
  author: "Dawid Nawrocki",
} as const

export const SOCIAL_LINKS = {
  github: {
    profile: "https://github.com/ui-d",
    // Leave empty if no repo exists yet
    repo: "",
  },
  linkedin: "https://linkedin.com/in/dawid-nawrocki",
  youtube: "https://youtube.com/uideveloper",
  portfolio: "https://dawidat.work",
  email: "dawiddeveloper@gmail.com",
} as const

// Helper to check if a link is configured
export function hasLink(link: string | undefined): link is string {
  return Boolean(link && link.trim().length > 0)
}
