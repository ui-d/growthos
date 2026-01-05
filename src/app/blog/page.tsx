import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PenLine, ArrowRight, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Blog - Growth OS",
  description: "Insights, tutorials, and updates from the Growth OS team. Learn about growth engineering best practices.",
  openGraph: {
    title: "Blog - Growth OS",
    description: "Insights, tutorials, and updates from the Growth OS team.",
    url: `${baseUrl}/blog`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Growth OS",
    description: "Insights, tutorials, and updates from the Growth OS team.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <PenLine className="mr-2 h-3 w-3" />
              Blog
            </span>
            <h1 className="heading-primary mb-4">Insights & Updates</h1>
            <p className="text-lg text-muted-foreground">
              Growth engineering insights, tutorials, and project updates.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container-narrow section-spacing">
        <Card className="text-center py-16">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <PenLine className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Blog Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re preparing insightful content about growth engineering, analytics best practices, and product-led growth strategies.
              </p>
            </div>

            <div className="max-w-md mx-auto pt-4">
              <p className="text-sm font-medium mb-3 flex items-center justify-center gap-2">
                <Bell className="h-4 w-4" />
                Get notified when we publish
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/modules">
                  Read Modules
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/examples">
                  View Examples
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
