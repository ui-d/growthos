import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Hammer, Library, FileText, ArrowRight, Layers, Route } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Documentation - Growth OS",
  description: "Learn how to use Growth OS to build effective growth systems. Explore modules, guides, architecture, and examples.",
  openGraph: {
    title: "Documentation - Growth OS",
    description: "Learn how to use Growth OS to build effective growth systems.",
    url: `${baseUrl}/documentation`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation - Growth OS",
    description: "Learn how to use Growth OS to build effective growth systems.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/documentation`,
  },
}

const docSections = [
  {
    title: "Modules",
    description: "Deep-dive into individual growth framework components including KPIs, activation metrics, and tracking plans",
    icon: FileText,
    href: "/modules",
    cta: "Browse Modules",
  },
  {
    title: "Guides",
    description: "Step-by-step tutorials and best practices for building effective growth systems",
    icon: Route,
    href: "/guides",
    cta: "Read Guides",
  },
  {
    title: "Architecture",
    description: "Understand how Growth OS components work together and the underlying design principles",
    icon: Layers,
    href: "/architecture",
    cta: "View Architecture",
  },
  {
    title: "Examples",
    description: "Scenario templates across different industries and use cases",
    icon: Hammer,
    href: "/examples",
    cta: "View Examples",
  },
]

const quickLinks = [
  { title: "Getting Started", href: "/builder", description: "Build your first growth spec" },
  { title: "Resource Library", href: "/library", description: "Curated tools and references" },
  { title: "Changelog", href: "/changelog", description: "Latest updates and releases" },
]

export default function DocumentationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <BookOpen className="mr-2 h-3 w-3" />
              Documentation
            </span>
            <h1 className="heading-primary mb-4">Learn Growth OS</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about building effective growth systems with Growth OS.
            </p>
          </div>
        </div>
      </section>

      {/* Main Documentation Sections */}
      <section className="container-wide section-spacing">
        <h2 className="text-2xl font-semibold mb-6">Documentation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="group/btn">
                    <Link href={section.href}>
                      {section.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium mb-1">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide section-spacing-sm">
        <div className="text-center p-8 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Ready to get started?</h2>
          <p className="text-muted-foreground mb-4">
            Open the builder and create your first growth specification.
          </p>
          <Button asChild>
            <Link href="/builder">
              Open Builder
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
