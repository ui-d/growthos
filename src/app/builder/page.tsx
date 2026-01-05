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
      {/* Step indicator skeleton */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center justify-center">
          {[
            { id: 1, name: "Product", desc: "Define your product basics" },
            { id: 2, name: "Activation", desc: "Set activation rules" },
            { id: 3, name: "Tracking", desc: "Choose events to track" }
          ].map((step, idx) => (
            <li key={step.id} className={`relative ${idx !== 2 ? 'pr-8 sm:pr-20' : ''}`}>
              {idx !== 2 && (
                <div className="absolute top-4 left-7 -ml-px mt-0.5 h-0.5 w-full bg-border" aria-hidden="true" />
              )}
              <div className="group relative flex flex-col items-center">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background relative z-10 ${
                  step.id === 1 ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-muted text-muted-foreground'
                }`}>
                  {step.id}
                </span>
                <span className={`mt-2 text-xs font-medium ${step.id === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Two-pane skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Form skeleton */}
        <div className="space-y-6">
          <div className="rounded-xl border-2 bg-card p-6 space-y-4">
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
          <div className="rounded-xl border-2 bg-card overflow-hidden">
            <div className="border-b bg-muted/30 p-4">
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
    <div className="min-h-screen bg-background pb-20">
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Growth OS Builder
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Define activation as value, generate a tracking contract, and export a spec your team can ship.
          </p>
          <p className="text-sm text-muted-foreground">
            No signup. Start from an example or build from scratch.
          </p>
        </div>

        {/* Builder Steps Overview - Rendered Server-Side for SEO */}
        <div className="max-w-3xl mx-auto mb-8">
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

        {/* Builder Content - Client-Side Interactive */}
        <Suspense fallback={<BuilderSkeleton />}>
          <BuilderWizard />
        </Suspense>
      </div>
    </div>
  )
}
