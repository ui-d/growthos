"use client"

interface PlausibleEventData {
  [key: string]: string | number | boolean | null | undefined
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: PlausibleEventData }) => void
  }
}

class Analytics {
  private enabled: boolean = false
  private domain: string | undefined

  constructor() {
    this.enabled = typeof window !== 'undefined' &&
                   process.env.NODE_ENV === 'production' &&
                   Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
    this.domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  }

  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  track(event: string, properties?: PlausibleEventData): void {
    if (!this.enabled || !this.isClient() || !window.plausible) {
      return
    }

    try {
      window.plausible(event, { props: properties })
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  trackPageView(): void {
    this.track('page_view')
  }

  trackBuilderGenerate(properties?: PlausibleEventData): void {
    this.track('builder_generate', properties)
  }

  trackBuilderCopyMarkdown(properties?: PlausibleEventData): void {
    this.track('builder_copy_markdown', properties)
  }

  trackBuilderDownloadMd(properties?: PlausibleEventData): void {
    this.track('builder_download_md', properties)
  }

  trackShareCopyLink(properties?: PlausibleEventData): void {
    this.track('share_copy_link', properties)
  }
}

export const analytics = new Analytics()