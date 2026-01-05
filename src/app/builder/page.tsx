import { Metadata } from "next"
import { Suspense } from "react"
import { BuilderWizard } from "@/components/builder/builder-wizard"
import Link from "next/link"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Growth OS Builder - Configure Your Growth Strategy",
  description: "Use the Growth OS Builder to define your product's KPIs, activation metrics, and generate implementation guides for analytics tracking.",
  openGraph: {
    title: "Growth OS Builder - Configure Your Growth Strategy",
    description: "Use the Growth OS Builder to define your product's KPIs, activation metrics, and generate implementation guides for analytics tracking.",
    url: `${baseUrl}/builder`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS Builder - Configure Your Growth Strategy",
    description: "Use the Growth OS Builder to define your product's KPIs, activation metrics, and generate implementation guides for analytics tracking.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/builder`,
  },
}

function BuilderSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto"></div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Loading builder...</p>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-full section-spacing-sm">
        {/* Hero Section - Rendered Server-Side */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Interactive Configuration Tool
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Growth OS Builder
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Define your activation metrics, configure retention targets, and generate complete implementation guides.
          </p>
        </div>

        {/* Builder Steps Overview - Rendered Server-Side for SEO */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-2">1</div>
              <h3 className="font-medium mb-1">Product Basics</h3>
              <p className="text-sm text-muted-foreground">Define your product type, primary object, and pricing model</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-2">2</div>
              <h3 className="font-medium mb-1">Activation Rules</h3>
              <p className="text-sm text-muted-foreground">Set up activation events and time-to-value targets</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-2">3</div>
              <h3 className="font-medium mb-1">Event Tracking</h3>
              <p className="text-sm text-muted-foreground">Choose core events and custom tracking for your product</p>
            </div>
          </div>
        </div>

        {/* Quick Links - Rendered Server-Side */}
        <div className="max-w-4xl mx-auto mb-8 text-center text-sm text-muted-foreground">
          <span>Need inspiration? </span>
          <Link href="/examples" className="text-primary hover:underline">Browse examples</Link>
          <span> or </span>
          <Link href="/modules" className="text-primary hover:underline">explore modules</Link>
        </div>

        {/* Builder Content - Client-Side Interactive */}
        <Suspense fallback={<BuilderSkeleton />}>
          <BuilderWizard />
        </Suspense>
      </div>
    </div>
  )
}
