import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import {
  FileText,
  Download,
  Eye,
  BarChart3,
  Code2,
  Database,
  GitBranch,
  Layers,
  BookOpen,
  FileSpreadsheet,
  FileJson,
  ArrowRight
} from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Growth OS Library - Resources & Templates",
  description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
  openGraph: {
    title: "Growth OS Library - Resources & Templates",
    description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
    url: `${baseUrl}/library`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS Library - Resources & Templates",
    description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/library`,
  },
}

const resources = {
  templates: [
    {
      title: "Activation Tracking Spec",
      description: "Complete template for defining and documenting activation events",
      icon: FileText,
      format: "Google Docs",
      category: "Activation"
    },
    {
      title: "Growth Metrics Dashboard",
      description: "Pre-built dashboard template with key growth metrics",
      icon: BarChart3,
      format: "Looker Studio",
      category: "Analytics"
    },
    {
      title: "Event Taxonomy",
      description: "Structured naming convention for analytics events",
      icon: Database,
      format: "Spreadsheet",
      category: "Tracking"
    },
    {
      title: "A/B Test Calculator",
      description: "Statistical significance calculator for experiments",
      icon: GitBranch,
      format: "Spreadsheet",
      category: "Experimentation"
    },
    {
      title: "Retention Cohorts",
      description: "Cohort analysis template for retention tracking",
      icon: Layers,
      format: "SQL Template",
      category: "Retention"
    },
    {
      title: "Growth Model",
      description: "Financial model template for growth projections",
      icon: FileSpreadsheet,
      format: "Excel/Sheets",
      category: "Planning"
    }
  ],
  guides: [
    {
      title: "Implementing Segment Tracking",
      description: "Step-by-step guide to implement Segment analytics",
      icon: Code2,
      readTime: "15 min",
      level: "Intermediate"
    },
    {
      title: "Building Growth Loops",
      description: "Framework for designing and implementing growth loops",
      icon: BarChart3,
      readTime: "20 min",
      level: "Advanced"
    },
    {
      title: "Activation Metrics 101",
      description: "How to identify and measure your activation metrics",
      icon: BookOpen,
      readTime: "10 min",
      level: "Beginner"
    },
    {
      title: "Data Layer Architecture",
      description: "Best practices for structuring your analytics data layer",
      icon: Database,
      readTime: "25 min",
      level: "Advanced"
    }
  ],
  codeSnippets: [
    {
      title: "React Analytics Hook",
      description: "Custom React hook for tracking user events",
      language: "TypeScript",
      icon: FileJson
    },
    {
      title: "Mixpanel Implementation",
      description: "Complete Mixpanel setup with TypeScript",
      language: "TypeScript",
      icon: FileJson
    },
    {
      title: "Growth SQL Queries",
      description: "Common SQL queries for growth metrics",
      language: "SQL",
      icon: Database
    },
    {
      title: "Event Tracking Utils",
      description: "Utility functions for consistent event tracking",
      language: "JavaScript",
      icon: Code2
    }
  ]
}

const categoryColors: Record<string, string> = {
  Activation: "bg-green-500/10 text-green-600",
  Analytics: "bg-blue-500/10 text-blue-600",
  Tracking: "bg-purple-500/10 text-purple-600",
  Experimentation: "bg-orange-500/10 text-orange-600",
  Retention: "bg-pink-500/10 text-pink-600",
  Planning: "bg-yellow-500/10 text-yellow-600"
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-600",
  Intermediate: "bg-yellow-500/10 text-yellow-600",
  Advanced: "bg-red-500/10 text-red-600"
}

export default function LibraryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-background dark:via-background dark:to-background border-b">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <BookOpen className="mr-2 h-3 w-3" />
              Growth Resources
            </span>
            <h1 className="heading-primary mb-4">Resource Library</h1>
            <p className="text-lg text-muted-foreground">
              Templates, guides, and code snippets to accelerate your growth engineering implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="container-wide section-spacing">
        <SectionHeader
          title="Templates & Tools"
          subtitle="Ready-to-use templates for implementing growth systems"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.templates.map((template, idx) => {
            const Icon = template.icon
            return (
              <Card key={idx} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className={categoryColors[template.category] || ""}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{template.format}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Guides Section */}
      <section className="bg-muted/30">
        <div className="container-wide section-spacing">
          <SectionHeader
            title="Implementation Guides"
            subtitle="In-depth tutorials and best practices"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {resources.guides.map((guide, idx) => {
              const Icon = guide.icon
              return (
                <Card key={idx} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{guide.readTime}</Badge>
                          <Badge className={levelColors[guide.level] || ""}>
                            {guide.level}
                          </Badge>
                        </div>
                        <CardTitle className="mb-2">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                        <Button variant="link" className="p-0 h-auto mt-3">
                          Read Guide
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Code Snippets Section */}
      <section className="container-wide section-spacing">
        <SectionHeader
          title="Code Snippets"
          subtitle="Copy-paste ready code for common growth implementations"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {resources.codeSnippets.map((snippet, idx) => {
            const Icon = snippet.icon
            return (
              <Card key={idx} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-base">{snippet.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {snippet.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{snippet.language}</Badge>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container-narrow section-spacing-sm">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="heading-tertiary mb-4">Need a Custom Template?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our Growth OS Builder to generate custom tracking specs and implementation guides tailored to your product.
              </p>
              <Button size="lg" asChild>
                <Link href="/builder">
                  Open Builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}