import { Metadata } from "next"
import { Suspense } from "react"
import { BuilderWizard } from "@/components/builder/builder-wizard"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

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

function BuilderFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-full section-spacing-sm">
        {/* Hero Section */}
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

        {/* Loading state */}
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto"></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Loading builder...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <div className="min-h-screen bg-background">
        <div className="container-full section-spacing-sm">
          {/* Hero Section */}
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

          {/* Builder Content */}
          <BuilderWizard />
        </div>
      </div>
    </Suspense>
  );
}
