import { Metadata } from "next"
import Link from "next/link"
import { getAllModules } from "@/lib/mdx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Growth OS Modules - Growth Components",
  description: "Explore modular growth components including activation tracking, experimentation frameworks, and analytics modules.",
  openGraph: {
    title: "Growth OS Modules - Growth Components",
    description: "Explore modular growth components including activation tracking, experimentation frameworks, and analytics modules.",
    url: `${baseUrl}/modules`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS Modules - Growth Components",
    description: "Explore modular growth components including activation tracking, experimentation frameworks, and analytics modules.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/modules`,
  },
}

export default async function ModulesPage() {
  const modules = await getAllModules()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Growth Framework Modules
            </span>
            <h1 className="heading-primary mb-4">Implementation Modules</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides and templates for implementing growth systems across different platforms and tools.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="container-wide section-spacing">
        {modules.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                {modules.length} module{modules.length !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <Link key={module.slug} href={`/modules/${module.slug}`} className="group">
                  <Card className="h-full card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                          Module {module.frontmatter.order}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {module.frontmatter.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {module.frontmatter.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-primary">
                        Read more
                        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Card className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No modules available yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for comprehensive growth implementation guides.
              </p>
              <Button asChild>
                <Link href="/builder">
                  Try the Builder Instead
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
