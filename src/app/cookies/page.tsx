import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Cookie Policy - Growth OS",
  description: "Cookie policy for Growth OS. Learn how we use cookies.",
  openGraph: {
    title: "Cookie Policy - Growth OS",
    description: "Cookie policy for Growth OS. Learn how we use cookies.",
    url: `${baseUrl}/cookies`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy - Growth OS",
    description: "Cookie policy for Growth OS. Learn how we use cookies.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/cookies`,
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Cookie className="mr-2 h-3 w-3" />
              Legal
            </span>
            <h1 className="heading-primary mb-4">Cookie Policy</h1>
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
            <CardTitle>How We Use Cookies</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your experience.
            </p>

            <h2>Cookies We Use</h2>
            <p>
              Growth OS uses minimal cookies:
            </p>

            <h3>Essential Cookies</h3>
            <ul>
              <li><strong>Theme Preference:</strong> Stores your light/dark mode preference</li>
              <li><strong>Session Data:</strong> Maintains your session state while using the site</li>
            </ul>

            <h3>Analytics Cookies (Optional)</h3>
            <ul>
              <li><strong>Usage Statistics:</strong> Help us understand how visitors use the site to improve the experience. These are privacy-focused and do not track you across other websites.</li>
            </ul>

            <h2>Local Storage</h2>
            <p>
              The Builder tool uses browser local storage to save your work-in-progress configurations. This data stays on your device and is not transmitted to our servers.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings:
            </p>
            <ul>
              <li>Block all cookies (may affect site functionality)</li>
              <li>Delete existing cookies</li>
              <li>Allow cookies from specific sites only</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              Some third-party services we use may set their own cookies. These are subject to the respective service&apos;s privacy policy.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us through our website.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
