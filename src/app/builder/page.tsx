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
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-background to-red-50/50 dark:from-background dark:via-background dark:to-background">
      <div className="container-wide section-spacing-sm">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Interactive Configuration Tool
          </span>
          <h1 className="heading-primary mb-4">Growth OS Builder</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Define your activation metrics, configure retention targets, and generate complete implementation guides for your growth strategy.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading builder...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-background to-red-50/50 dark:from-background dark:via-background dark:to-background">
        <div className="container-wide section-spacing-sm">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Interactive Configuration Tool
            </span>
            <h1 className="heading-primary mb-4">Growth OS Builder</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Define your activation metrics, configure retention targets, and generate complete implementation guides for your growth strategy.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <BuilderWizard />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
