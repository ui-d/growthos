import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Terms of Service - Growth OS",
  description: "Terms of service for using Growth OS.",
  openGraph: {
    title: "Terms of Service - Growth OS",
    description: "Terms of service for using Growth OS.",
    url: `${baseUrl}/terms`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Growth OS",
    description: "Terms of service for using Growth OS.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <FileText className="mr-2 h-3 w-3" />
              Legal
            </span>
            <h1 className="heading-primary mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-narrow section-spacing">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Growth OS, you agree to be bound by these terms of service.
            </p>

            <h2>Use of Service</h2>
            <p>
              Growth OS is provided as an open-source tool for creating growth system specifications. You may:
            </p>
            <ul>
              <li>Use the Builder tool to create growth specifications</li>
              <li>Share configurations via generated URLs</li>
              <li>Export and use generated content for your projects</li>
              <li>Modify and distribute the source code under the project&apos;s license</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>
              When using Growth OS, you agree to:
            </p>
            <ul>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not attempt to disrupt or compromise the service</li>
              <li>Not use the service for any unlawful purpose</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              Growth OS is open source software. The source code is available under the project&apos;s license. Content you create using Growth OS belongs to you.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              Growth OS is provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Growth OS and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about these terms, please contact us through our website.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
