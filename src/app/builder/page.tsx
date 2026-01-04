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
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Growth OS Builder</h1>
          <p className="text-muted-foreground">
            Configure your product&apos;s growth strategy and generate tracking implementation guides.
          </p>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading builder...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <div className="container py-8 md:py-10">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Growth OS Builder</h1>
            <p className="text-muted-foreground">
              Configure your product&apos;s growth strategy and generate tracking implementation guides.
            </p>
          </div>
          <BuilderWizard />
        </div>
      </div>
    </Suspense>
  );
}
