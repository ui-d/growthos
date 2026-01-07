import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Route, ArrowRight, BookOpen, Target, BarChart3, Beaker, Clock, Database, Code, LineChart } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Guides - Growth OS",
  description: "Step-by-step tutorials and best practices for building effective growth systems with Growth OS.",
  openGraph: {
    title: "Guides - Growth OS",
    description: "Step-by-step tutorials and best practices for growth systems.",
    url: `${baseUrl}/guides`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides - Growth OS",
    description: "Step-by-step tutorials and best practices for growth systems.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/guides`,
  },
}

const implementationGuides = [
  {
    title: "Segment Tracking & Governance",
    description: "Build a scalable tracking implementation with event dictionaries, environment management, spec review workflows, and governance best practices",
    icon: Database,
    readTime: "20 min",
    level: "Intermediate",
    href: "/guides/segment-tracking-governance",
    cta: "Read Guide",
  },
  {
    title: "Typed Event Tracking with TypeScript",
    description: "Eliminate tracking bugs at compile time with type-safe analytics for Mixpanel, PostHog, or any provider using TypeScript",
    icon: Code,
    readTime: "18 min",
    level: "Intermediate",
    href: "/guides/typed-event-tracking",
    cta: "Read Guide",
  },
  {
    title: "Dashboard Pack Implementation",
    description: "Build North Star and Activation dashboards with clear metric definitions, SQL queries, and alerting strategies",
    icon: LineChart,
    readTime: "25 min",
    level: "Advanced",
    href: "/guides/dashboard-pack-implementation",
    cta: "Read Guide",
  },
]

const guides = [
  {
    title: "Getting Started with Growth OS",
    description: "Learn the fundamentals and build your first growth specification in under 10 minutes",
    icon: BookOpen,
    readTime: "5 min",
    level: "Beginner",
    href: "/builder",
    cta: "Start Tutorial",
  },
  {
    title: "Defining Your North Star Metric",
    description: "How to identify the single metric that best captures the value your product delivers to customers",
    icon: Target,
    readTime: "8 min",
    level: "Beginner",
    href: "/modules",
    cta: "Learn More",
  },
  {
    title: "Building an Effective Tracking Plan",
    description: "Best practices for designing event taxonomies that scale with your product",
    icon: BarChart3,
    readTime: "12 min",
    level: "Intermediate",
    href: "/modules",
    cta: "Learn More",
  },
  {
    title: "Running Growth Experiments",
    description: "A systematic approach to hypothesis-driven experimentation and analysis",
    icon: Beaker,
    readTime: "15 min",
    level: "Advanced",
    href: "/examples",
    cta: "View Examples",
  },
]

const levelColors: Record<string, string> = {
  "Beginner": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Intermediate": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Advanced": "bg-red-500/10 text-red-600 dark:text-red-400",
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Route className="mr-2 h-3 w-3" />
              Guides
            </span>
            <h1 className="heading-primary mb-4">Learn by Doing</h1>
            <p className="text-lg text-muted-foreground">
              Step-by-step tutorials and best practices to help you build effective growth systems.
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Guides */}
      <section className="container-wide section-spacing">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Implementation Guides</h2>
          <p className="text-muted-foreground">
            Comprehensive, practical guides with code snippets, checklists, and proven patterns.
          </p>
        </div>
        <div className="space-y-4">
          {implementationGuides.map((guide) => {
            const Icon = guide.icon
            return (
              <Card key={guide.title} className="group hover:shadow-md transition-shadow border-primary/10">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors mb-2">
                          {guide.title}
                        </CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:shrink-0">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[guide.level]}`}>
                        {guide.level}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-16 md:pl-16">
                  <Button variant="default" size="sm" asChild className="group/btn">
                    <Link href={guide.href}>
                      {guide.cta}
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick Start Guides */}
      <section className="container-wide section-spacing-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Quick Start</h2>
          <p className="text-muted-foreground">
            Get started quickly with these introductory tutorials.
          </p>
        </div>
        <div className="space-y-4">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Card key={guide.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors mb-2">
                          {guide.title}
                        </CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:shrink-0">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[guide.level]}`}>
                        {guide.level}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-16 md:pl-16">
                  <Button variant="outline" size="sm" asChild className="group/btn">
                    <Link href={guide.href}>
                      {guide.cta}
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* More Guides Coming */}
      <section className="container-wide section-spacing-sm">
        <div className="text-center p-8 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">More guides coming soon</h2>
          <p className="text-muted-foreground mb-4">
            We are actively working on comprehensive tutorials covering advanced topics.
          </p>
          <Button variant="outline" asChild>
            <Link href="/changelog">View Changelog</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
