import { Metadata } from "next"
import { Suspense } from "react"
import { BuilderWizard } from "@/components/builder/builder-wizard"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Growth OS Builder - Define Activation, Generate Tracking Specs",
  description: "Define activation as value, generate a tracking contract, and export a spec your team can ship. No signup required.",
  openGraph: {
    title: "Growth OS Builder - Define Activation, Generate Tracking Specs",
    description: "Define activation as value, generate a tracking contract, and export a spec your team can ship.",
    url: `${baseUrl}/builder`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS Builder - Define Activation, Generate Tracking Specs",
    description: "Define activation as value, generate a tracking contract, and export a spec your team can ship.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/builder`,
  },
}

function BuilderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Quick start skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
        <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
        <div className="h-8 w-36 bg-muted rounded animate-pulse"></div>
        <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Step indicator skeleton - Modern Pill Style with Gradient */}
      <nav aria-label="Progress" className="mb-10">
        <div className="flex items-center justify-center">
          <div className="inline-flex bg-background dark:bg-muted/30 rounded-full p-1 border border-border/50 dark:border-border/30 shadow-lg">
            {[
              { id: 1, name: "Product" },
              { id: 2, name: "Activation" },
              { id: 3, name: "Tracking" }
            ].map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                  step.id === 1
                    ? 'bg-gradient-to-r from-primary to-orange-400 text-white shadow-md'
                    : 'text-muted-foreground'
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  step.id === 1
                    ? 'bg-white text-primary'
                    : 'bg-muted dark:bg-muted/50 text-muted-foreground'
                }`}>
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Card Container skeleton */}
      <div className="bg-background dark:bg-muted/10 rounded-2xl shadow-xl border border-border/50 dark:border-border/30 overflow-hidden flex flex-col min-h-[600px]">
        {/* Top Toolbar skeleton */}
        <div className="border-b border-border/50 dark:border-border/30 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/50 dark:bg-muted/30">
          <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-28 bg-muted rounded animate-pulse"></div>
          </div>
        </div>

        {/* Two-pane Layout skeleton */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Form skeleton */}
          <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border/50 dark:border-border/30">
            <div className="mb-6">
              <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-56 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
                  <div className="h-11 w-full bg-muted rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Preview skeleton */}
          <div className="bg-muted/50 dark:bg-muted/20 hidden lg:flex items-center justify-center min-h-[400px] p-8">
            <div className="w-full h-full border-2 border-dashed border-border/50 dark:border-border/30 rounded-xl flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-muted rounded-full animate-pulse mb-4"></div>
              <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-gradient-to-br dark:from-background dark:to-muted/20 pb-20">
      <div className="container-full section-spacing-sm">
        {/* Hero Section - Rendered Server-Side */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 text-xs font-medium text-orange-600 dark:text-orange-400 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            Interactive Spec Builder
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Growth OS Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
            Define activation as value, generate a tracking contract, and export a spec your team can ship.
            <br className="hidden sm:block" />
            No signup. Start from an example or build from scratch.
          </p>
        </div>

        {/* Builder Content - Client-Side Interactive */}
        <Suspense fallback={<BuilderSkeleton />}>
          <BuilderWizard />
        </Suspense>
      </div>
    </div>
  )
}
