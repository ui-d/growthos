import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Pricing - Growth OS",
  description: "Growth OS is free and open source. No pricing tiers, no hidden costs. Build better growth systems without barriers.",
  openGraph: {
    title: "Pricing - Growth OS",
    description: "Growth OS is free and open source. No pricing tiers, no hidden costs.",
    url: `${baseUrl}/pricing`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Growth OS",
    description: "Growth OS is free and open source. No pricing tiers, no hidden costs.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
}

const features = [
  "Full access to the Builder tool",
  "All growth framework modules",
  "Pre-built examples and templates",
  "Export to Markdown, JSON, and Print to PDF",
  "Share configurations via URL",
  "Community-driven updates",
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="mr-2 h-3 w-3" />
              Open Source
            </span>
            <h1 className="heading-primary mb-4">Free Forever</h1>
            <p className="text-lg text-muted-foreground">
              Growth OS is and will always be free and open source. No pricing tiers, no paywalls, no hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="container-narrow section-spacing">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl">Open Source</CardTitle>
            <CardDescription className="text-lg">
              Everything you need to build growth systems
            </CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/builder">Start Building</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/examples">View Examples</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Why free?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe growth engineering best practices should be accessible to everyone.
            Growth OS is built by the community, for the community. If you find it valuable,
            consider contributing to the project or sharing it with others.
          </p>
        </div>
      </section>
    </div>
  )
}
