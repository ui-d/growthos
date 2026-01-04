import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getModuleBySlug, getAdjacentModules, getAllModules } from "@/lib/mdx"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ModulePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const modules = await getAllModules()
  return modules.map((module) => ({
    slug: module.slug,
  }))
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { slug } = await params
  const moduleData = await getModuleBySlug(slug)

  if (!moduleData) {
    return {
      title: "Module Not Found",
      description: "The requested module could not be found.",
    }
  }

  return {
    title: `${moduleData.frontmatter.title} - Growth OS`,
    description: moduleData.frontmatter.description,
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params
  const moduleData = await getModuleBySlug(slug)

  if (!moduleData) {
    notFound()
  }

  const { prev, next } = await getAdjacentModules(slug)

  return (
    <div className="container py-8 md:py-10">
      {/* Back to modules */}
      <div className="mb-6">
        <Link href="/modules">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </Link>
      </div>

      {/* Module header */}
      <div className="mb-8">
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            Module {moduleData.frontmatter.order}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{moduleData.frontmatter.title}</h1>
        <p className="text-lg text-muted-foreground">
          {moduleData.frontmatter.description}
        </p>
      </div>

      {/* Module content */}
      <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
        <MDXRemote source={moduleData.content} />
      </div>

      {/* Navigation */}
      {(prev || next) && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {prev && (
                  <Link href={`/modules/${prev.slug}`}>
                    <Button variant="ghost" className="h-auto p-0 justify-start">
                      <div className="flex items-center gap-3">
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                        <div className="text-left">
                          <div className="text-sm text-muted-foreground">Previous</div>
                          <div className="font-medium">{prev.frontmatter.title}</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex-1 flex justify-end">
                {next && (
                  <Link href={`/modules/${next.slug}`}>
                    <Button variant="ghost" className="h-auto p-0 justify-end">
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Next</div>
                          <div className="font-medium">{next.frontmatter.title}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}