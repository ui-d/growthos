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
      {/* Step indicator skeleton - Modern Pill Style */}
      <nav aria-label="Progress" className="mb-8">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center bg-muted/50 rounded-full p-1 gap-1">
            {[
              { id: 1, name: "Product" },
              { id: 2, name: "Activation" },
              { id: 3, name: "Tracking" }
            ].map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  step.id === 1
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                  step.id === 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Two-pane skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Form skeleton */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/40 bg-background shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
              <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-28 bg-muted rounded animate-pulse"></div>
              <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-28 bg-muted rounded animate-pulse"></div>
              <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-36 bg-muted rounded animate-pulse"></div>
              <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right - Preview skeleton */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border/40 bg-background shadow-md overflow-hidden">
            <div className="border-b border-border/30 bg-muted/20 p-4">
              <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="bg-muted/50 min-h-[400px] p-4 space-y-3">
              <div className="h-4 w-3/4 bg-muted/70 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-muted/70 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-muted/70 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-muted/70 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-muted/70 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-muted/70 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="container-full section-spacing-sm">
        {/* Hero Section - Rendered Server-Side */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Interactive Spec Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Growth OS Builder
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Define activation as value, generate a tracking contract, and export a spec your team can ship.
          </p>
          <p className="text-sm text-muted-foreground/80">
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
