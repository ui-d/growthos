import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, ArrowRight } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Careers - Growth OS",
  description: "Join the Growth OS community. We're an open-source project looking for contributors.",
  openGraph: {
    title: "Careers - Growth OS",
    description: "Join the Growth OS community. We're an open-source project looking for contributors.",
    url: `${baseUrl}/careers`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - Growth OS",
    description: "Join the Growth OS community. We're an open-source project looking for contributors.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/careers`,
  },
}

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Users className="mr-2 h-3 w-3" />
              Community
            </span>
            <h1 className="heading-primary mb-4">Join Our Community</h1>
            <p className="text-lg text-muted-foreground">
              Growth OS is an open-source project. We welcome contributors of all skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-narrow section-spacing">
        <Card className="text-center py-16">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Open Source Contribution</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Growth OS is built by the community. We don&apos;t have traditional job openings, but we&apos;d love your contributions.
              </p>
            </div>

            <div className="space-y-4 text-left max-w-md mx-auto pt-4">
              <h3 className="font-semibold">Ways to contribute:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Submit bug reports and feature requests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Improve documentation and tutorials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Add new examples and templates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Help with code reviews and testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  Share Growth OS with your network
                </li>
              </ul>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/about">
                  Learn About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
