import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Hammer, Library, FileText, ArrowRight } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Documentation - Growth OS",
  description: "Learn how to use Growth OS to build effective growth systems. Explore guides, tutorials, and reference documentation.",
  openGraph: {
    title: "Documentation - Growth OS",
    description: "Learn how to use Growth OS to build effective growth systems.",
    url: `${baseUrl}/docs`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation - Growth OS",
    description: "Learn how to use Growth OS to build effective growth systems.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/docs`,
  },
}

const docSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of Growth OS and build your first growth spec",
    icon: BookOpen,
    href: "/builder",
    cta: "Open Builder",
  },
  {
    title: "Modules",
    description: "Deep-dive into individual growth framework components",
    icon: FileText,
    href: "/modules",
    cta: "Browse Modules",
  },
  {
    title: "Examples",
    description: "Scenario templates across different industries and use cases",
    icon: Hammer,
    href: "/examples",
    cta: "View Examples",
  },
  {
    title: "Resource Library",
    description: "Curated resources, tools, and references for growth teams",
    icon: Library,
    href: "/library",
    cta: "Explore Library",
  },
]

export default function DocsPage() {
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

      {/* Documentation Sections */}
      <section className="container-wide section-spacing">
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

        <div className="mt-12 text-center p-8 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">More documentation coming soon</h2>
          <p className="text-muted-foreground mb-4">
            We&apos;re actively working on comprehensive guides and API references.
          </p>
          <Button variant="outline" asChild>
            <Link href="/about">Learn more about Growth OS</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
