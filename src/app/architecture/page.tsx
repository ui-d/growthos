import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, ArrowRight, FileText, Target, BarChart3, Beaker, BookOpen } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Architecture - Growth OS",
  description: "Understand how Growth OS components work together. Learn about the underlying design principles and system architecture.",
  openGraph: {
    title: "Architecture - Growth OS",
    description: "Understand how Growth OS components work together.",
    url: `${baseUrl}/architecture`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture - Growth OS",
    description: "Understand how Growth OS components work together.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/architecture`,
  },
}

const architectureLayers = [
  {
    title: "KPI Tree",
    description: "The North Star metric and its supporting indicators that drive growth decisions",
    icon: Target,
    details: [
      "North Star Metric - the single metric that best captures customer value",
      "Input Metrics - leading indicators that drive the North Star",
      "Guardrail Metrics - safety constraints to prevent negative trade-offs",
    ],
  },
  {
    title: "Activation Framework",
    description: "Definition and measurement of user activation milestones",
    icon: FileText,
    details: [
      "Activation Events - key user actions that indicate value realization",
      "Activation Rate - percentage of users reaching activation",
      "Time to Value - how quickly users reach their aha moment",
    ],
  },
  {
    title: "Tracking Plan",
    description: "Structured event taxonomy for consistent data collection",
    icon: BarChart3,
    details: [
      "Core Events - essential user actions to track",
      "Event Properties - contextual data attached to each event",
      "Property Dictionary - standardized definitions for data consistency",
    ],
  },
  {
    title: "Experimentation",
    description: "Framework for running and evaluating growth experiments",
    icon: Beaker,
    details: [
      "Hypothesis Template - structured approach to experiment design",
      "Success Criteria - measurable outcomes for experiment evaluation",
      "Variant Design - control and treatment configurations",
    ],
  },
]

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Layers className="mr-2 h-3 w-3" />
              Architecture
            </span>
            <h1 className="heading-primary mb-4">System Architecture</h1>
            <p className="text-lg text-muted-foreground">
              Understand how Growth OS components work together to create a comprehensive growth framework.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-wide section-spacing-sm">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            Growth OS is designed as a layered system where each component builds upon and integrates with others.
            The architecture ensures that your growth metrics, activation definitions, tracking plans, and experiments
            are all aligned and working toward common goals.
          </p>
          <p className="text-muted-foreground">
            At the core is the KPI Tree, which defines what success looks like. The Activation Framework identifies
            the key moments when users realize value. The Tracking Plan ensures you capture the right data. And the
            Experimentation layer helps you systematically improve each component.
          </p>
        </Card>
      </section>

      {/* Architecture Layers */}
      <section className="container-wide section-spacing">
        <h2 className="text-2xl font-semibold mb-6">Core Components</h2>
        <div className="space-y-6">
          {architectureLayers.map((layer, index) => {
            const Icon = layer.icon
            return (
              <Card key={layer.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle>{layer.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="ml-13 pl-10">{layer.description}</CardDescription>
                </CardHeader>
                <CardContent className="ml-13 pl-10">
                  <ul className="space-y-2">
                    {layer.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide section-spacing-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Learn More</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Explore detailed documentation for each component in the Modules section.
            </p>
            <Button variant="outline" asChild>
              <Link href="/modules">
                Browse Modules
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Try It Out</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Build your own growth specification using the interactive builder.
            </p>
            <Button asChild>
              <Link href="/builder">
                Open Builder
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
