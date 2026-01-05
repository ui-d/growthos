import Link from "next/link"
import { Button } from "@/components/ui/button"
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
            title="Your activation toolkit"
            subtitle="Four interconnected components that transform how you measure and drive user activation"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">KPI Tree + North Star</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build a hierarchical metrics framework with your North Star at the top.
                  Create guardrails that prevent gaming while driving the right behaviors.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Activation Spec</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Define activation as real value delivery, not vanity metrics.
                  Measure Time-to-Value precisely and identify exactly when users succeed.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tracking Plan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get a developer-ready event contract with properties, types, and triggers.
                  Ship analytics instrumentation faster with clear specifications.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dashboard Pack</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pre-configured dashboards for activation, retention, adoption, and revenue.
                  Stop building from scratch—start with proven templates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing bg-gradient-to-b from-muted/40 to-transparent">
        <div className="container-wide">
          <SectionHeader
            title="Three steps to clarity"
            subtitle="Go from scattered metrics to a complete activation system in minutes"
            centered
          />
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose your product type</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select your product category and define the primary object that delivers value to users
                </p>
              </div>

              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Define your activation moment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Set the specific criteria and key action that signals a user has experienced real value
                </p>
              </div>

              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Export and implement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get your complete system as Markdown, shareable link, or PDF—ready for your team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <SectionHeader
            title="Built for PLG teams"
            subtitle="Designed for companies where users find value before talking to sales"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/50 to-muted/20 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                  <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Developer Tools</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  API platforms, CLIs, SDKs, and infrastructure tools with code-first onboarding flows
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/50 to-muted/20 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                  <Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">B2B SaaS</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Workspace and team-based products where activation happens at the account level
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/50 to-muted/20 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Self-Serve Products</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Products where users experience value independently before any sales contact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-spacing">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-orange-600 shadow-2xl shadow-primary/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Build your activation system in 60 seconds
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Stop guessing at metrics. Start with a complete framework tailored to your product.
              </p>
              <Button size="lg" variant="secondary" asChild className="group text-base px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/builder">
                  Open Builder
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}