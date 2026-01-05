import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getModuleBySlug, getAdjacentModules, getAllModules, extractHeadings } from "@/lib/mdx"
import { Button } from "@/components/ui/button"
import { ModuleSidebar } from "@/components/modules/module-sidebar"
import { TableOfContents } from "@/components/modules/table-of-contents"

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

// Custom components for MDX to add IDs to headings
const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    return <h2 id={id} className="scroll-mt-24" {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    return <h3 id={id} className="scroll-mt-24" {...props}>{children}</h3>
  },
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params
  const [moduleData, modules] = await Promise.all([
    getModuleBySlug(slug),
    getAllModules()
  ])

  if (!moduleData) {
    notFound()
  }

  const { prev, next } = await getAdjacentModules(slug)
  const headings = extractHeadings(moduleData.content)

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8 py-8">
        {/* Left Sidebar - Module Navigation */}
        <ModuleSidebar modules={modules} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="flex items-center space-x-2 border border-primary/20 rounded-full px-4 py-1.5 w-fit bg-primary/5">
              <li>
                <Link
                  href="/modules"
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Modules
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="text-primary w-3 h-3 mx-1" />
                <span className="text-xs font-medium text-primary">
                  {moduleData.frontmatter.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Module Header */}
          <div className="mb-10">
            <div className="mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                Module {moduleData.frontmatter.order}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
              {moduleData.frontmatter.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {moduleData.frontmatter.description}
            </p>
          </div>

          {/* Module Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:my-1 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-strong:text-foreground mb-16">
            <MDXRemote source={moduleData.content} components={mdxComponents} />
          </div>

          {/* Navigation */}
          {(prev || next) && (
            <div className="border-t border-border pt-8">
              <div className="flex justify-between items-stretch gap-4">
                <div className="flex-1">
                  {prev && (
                    <Link
                      href={`/modules/${prev.slug}`}
                      className="group flex flex-col h-full p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {prev.frontmatter.title}
                      </div>
                    </Link>
                  )}
                </div>

                <div className="flex-1">
                  {next && (
                    <Link
                      href={`/modules/${next.slug}`}
                      className="group flex flex-col h-full p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                        <span>Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {next.frontmatter.title}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar - Table of Contents */}
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}
