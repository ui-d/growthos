import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Sparkles, Wrench, Bug } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Changelog - Growth OS",
  description: "See what's new in Growth OS. Track updates, improvements, and bug fixes.",
  openGraph: {
    title: "Changelog - Growth OS",
    description: "See what's new in Growth OS. Track updates, improvements, and bug fixes.",
    url: `${baseUrl}/changelog`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog - Growth OS",
    description: "See what's new in Growth OS. Track updates, improvements, and bug fixes.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/changelog`,
  },
}

const changelog = [
  {
    version: "1.0.0",
    date: "January 2025",
    title: "Initial Release",
    description: "The first public release of Growth OS",
    changes: [
      { type: "feature", text: "Interactive Builder wizard for creating growth specs" },
      { type: "feature", text: "Pre-built examples across SaaS, E-commerce, Creator, and more" },
      { type: "feature", text: "Shareable configuration links" },
      { type: "feature", text: "Export to Markdown, JSON, and Print to PDF" },
      { type: "feature", text: "Growth framework modules documentation" },
      { type: "feature", text: "Resource library with curated tools and references" },
    ],
  },
]

const changeTypeConfig = {
  feature: { icon: Sparkles, label: "New", className: "bg-green-500/10 text-green-600 dark:text-green-400" },
  improvement: { icon: Wrench, label: "Improved", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  fix: { icon: Bug, label: "Fixed", className: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <History className="mr-2 h-3 w-3" />
              Changelog
            </span>
            <h1 className="heading-primary mb-4">What&apos;s New</h1>
            <p className="text-lg text-muted-foreground">
              Track updates, improvements, and new features in Growth OS.
            </p>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="container-narrow section-spacing">
        <div className="space-y-8">
          {changelog.map((entry) => (
            <Card key={entry.version}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded">
                    v{entry.version}
                  </span>
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                </div>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>{entry.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {entry.changes.map((change, idx) => {
                    const config = changeTypeConfig[change.type as keyof typeof changeTypeConfig]
                    const Icon = config.icon
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${config.className}`}>
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </span>
                        <span className="text-sm">{change.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to stay updated on new releases?
          </p>
          <Button variant="outline" asChild>
            <Link href="/blog">Subscribe to our blog</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
