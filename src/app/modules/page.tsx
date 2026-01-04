import { Metadata } from "next"
import Link from "next/link"
import { getAllModules } from "@/lib/mdx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="container py-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Modules</h1>
        <p className="text-muted-foreground text-lg">
          Explore our comprehensive collection of growth modules and documentation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.slug} href={`/modules/${module.slug}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{module.frontmatter.title}</CardTitle>
                <CardDescription>
                  {module.frontmatter.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Module {module.frontmatter.order}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {modules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No modules found.</p>
        </div>
      )}
    </div>
  );
}
