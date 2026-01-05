import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Github } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "License - Growth OS",
  description: "License information for Growth OS open source project.",
  openGraph: {
    title: "License - Growth OS",
    description: "License information for Growth OS open source project.",
    url: `${baseUrl}/license`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "License - Growth OS",
    description: "License information for Growth OS open source project.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/license`,
  },
}

export default function LicensePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Scale className="mr-2 h-3 w-3" />
              Open Source
            </span>
            <h1 className="heading-primary mb-4">License</h1>
            <p className="text-lg text-muted-foreground">
              Growth OS is open source software
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-narrow section-spacing">
        <Card>
          <CardHeader>
            <CardTitle>MIT License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted rounded-lg p-6 font-mono text-sm">
              <p className="mb-4">MIT License</p>
              <p className="mb-4">Copyright (c) 2025 Growth OS</p>
              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the &quot;Software&quot;), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              <p className="mb-4">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              <p>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="text-muted-foreground mb-4">
                View the source code and contribute to the project on GitHub.
              </p>
              <Button variant="outline" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What This Means */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What This Means</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              The MIT License is a permissive open source license. This means you can:
            </p>
            <ul>
              <li><strong>Use</strong> Growth OS for any purpose, including commercial use</li>
              <li><strong>Modify</strong> the source code to fit your needs</li>
              <li><strong>Distribute</strong> copies of the original or modified software</li>
              <li><strong>Include</strong> Growth OS in proprietary software</li>
            </ul>
            <p>
              The only requirement is that you include the original copyright notice and license text when distributing the software.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
