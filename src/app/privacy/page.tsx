import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Privacy Policy - Growth OS",
  description: "Privacy policy for Growth OS. Learn how we handle your data.",
  openGraph: {
    title: "Privacy Policy - Growth OS",
    description: "Privacy policy for Growth OS. Learn how we handle your data.",
    url: `${baseUrl}/privacy`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Growth OS",
    description: "Privacy policy for Growth OS. Learn how we handle your data.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Shield className="mr-2 h-3 w-3" />
              Legal
            </span>
            <h1 className="heading-primary mb-4">Privacy Policy</h1>
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
            <CardTitle>Your Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              Growth OS is an open-source project that respects your privacy. This policy explains how we handle information when you use our website and tools.
            </p>

            <h2>Data We Collect</h2>
            <p>
              <strong>We collect minimal data:</strong>
            </p>
            <ul>
              <li><strong>Usage Analytics:</strong> We may use privacy-friendly analytics to understand how visitors use our site. This data is aggregated and does not identify individual users.</li>
              <li><strong>Configuration Data:</strong> When you use the Builder tool, your configurations are processed locally in your browser. Shared configurations are encoded in the URL and not stored on our servers.</li>
              <li><strong>Newsletter Subscriptions:</strong> If you subscribe to updates, we collect your email address to send you relevant content.</li>
            </ul>

            <h2>Data We Don&apos;t Collect</h2>
            <ul>
              <li>Personal identification information (unless you provide it voluntarily)</li>
              <li>Payment information (Growth OS is free)</li>
              <li>Tracking across other websites</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>
              Our website may use third-party services for hosting, analytics, or other functionality. These services have their own privacy policies.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access any data we have about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of communications</li>
            </ul>

            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us through our website.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy from time to time. Significant changes will be announced on our website.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
