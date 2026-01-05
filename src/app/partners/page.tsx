import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Handshake, ArrowRight, Users } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Partners - Growth OS",
  description: "Partner with Growth OS. Learn about integration and collaboration opportunities.",
  openGraph: {
    title: "Partners - Growth OS",
    description: "Partner with Growth OS. Learn about integration and collaboration opportunities.",
    url: `${baseUrl}/partners`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners - Growth OS",
    description: "Partner with Growth OS. Learn about integration and collaboration opportunities.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/partners`,
  },
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Handshake className="mr-2 h-3 w-3" />
              Partners
            </span>
            <h1 className="heading-primary mb-4">Partner With Us</h1>
            <p className="text-lg text-muted-foreground">
              Interested in integrating with Growth OS or collaborating on growth engineering initiatives?
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-narrow section-spacing">
        <Card className="text-center py-16">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Partnership Opportunities</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re open to partnerships with analytics platforms, growth tools, and educational organizations.
              </p>
            </div>

            <div className="space-y-4 text-left max-w-md mx-auto pt-4">
              <h3 className="font-semibold">We&apos;re looking for:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Analytics and tracking tool integrations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Growth and product-led growth platforms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Educational content collaborations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Community and ecosystem partnerships
                </li>
              </ul>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">
                  Learn About Growth OS
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
