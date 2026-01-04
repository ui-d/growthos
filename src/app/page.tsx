import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import {
  ArrowRight,
  Target,
  Zap,
  FileText,
  BarChart3,
  Settings,
  Users,
  Code2,
  Building,
  Rocket
} from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-background dark:via-background dark:to-background section-spacing">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/25 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
        <div className="relative container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Rocket className="mr-2 h-3 w-3" />
              Activation system for PLG SaaS
            </Badge>
            <h1 className="heading-primary mb-6 text-foreground">
              Growth OS — Activation system for
              <span className="gradient-text"> PLG SaaS</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
              A builder + templates for KPI trees, activation specs, tracking plans, and dashboard packs.
              Less chaos, faster time-to-value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/builder">
                  <Settings className="mr-2 h-5 w-5" />
                  Open Builder
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/modules">
                  View Modules
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <SectionHeader
            title="What you get"
            subtitle="Everything you need to build a comprehensive activation system"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">KPI Tree + North Star</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One source of truth for metrics and guardrails.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Activation Spec</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Define activation as value (not logins) and measure TTV.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Tracking Plan</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A developer-friendly event + properties contract.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Dashboard Pack</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Standard boards for activation, retention, adoption, and revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container-wide">
          <SectionHeader
            title="How it works"
            subtitle="Generate your activation system in three simple steps"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose product type + primary object</h3>
              <p className="text-muted-foreground">
                Select your product category and define the core object users interact with to get value
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Define activation rules + key value action</h3>
              <p className="text-muted-foreground">
                Set the specific criteria that indicate a user has reached their first value moment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Markdown, share link, and PDF</h3>
              <p className="text-muted-foreground">
                Get your complete activation system in multiple formats ready for implementation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <SectionHeader
            title="Built for"
            subtitle="Designed specifically for modern product-led growth companies"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <Code2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Devtool PLG</h3>
                <p className="text-muted-foreground text-sm">
                  Developer tools and platforms with code-first onboarding flows
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">B2B SaaS (workspace/account-level)</h3>
                <p className="text-muted-foreground text-sm">
                  Business software with team-based activation and collaboration features
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Self-serve onboarding</h3>
                <p className="text-muted-foreground text-sm">
                  Products where users can experience value without sales intervention
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-spacing">
        <div className="container-narrow">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <div className="p-12 text-center">
              <h2 className="heading-secondary mb-4 text-white">
                Generate your first Growth OS spec in 60 seconds
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Start building your activation system today with our guided builder
              </p>
              <Button size="lg" variant="secondary" asChild className="group">
                <Link href="/builder">
                  Open Builder
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}