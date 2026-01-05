import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, Github, Twitter } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Contact - Growth OS",
  description: "Get in touch with the Growth OS team. We'd love to hear from you.",
  openGraph: {
    title: "Contact - Growth OS",
    description: "Get in touch with the Growth OS team. We'd love to hear from you.",
    url: `${baseUrl}/contact`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Growth OS",
    description: "Get in touch with the Growth OS team. We'd love to hear from you.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

const contactMethods = [
  {
    title: "GitHub",
    description: "Report issues, request features, or contribute",
    icon: Github,
    href: "https://github.com",
    cta: "Open GitHub",
  },
  {
    title: "Twitter",
    description: "Follow for updates and announcements",
    icon: Twitter,
    href: "https://twitter.com",
    cta: "Follow Us",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <MessageSquare className="mr-2 h-3 w-3" />
              Contact
            </span>
            <h1 className="heading-primary mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions, feedback, or ideas? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container-narrow section-spacing">
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <Card key={method.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={method.href} target="_blank" rel="noopener noreferrer">
                      {method.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Newsletter */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to receive updates about new features and content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
