import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { OutputPreview } from "@/components/marketing/output-preview"
import {
  ArrowRight,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Hammer
} from "lucide-react"
import {
  KpiTreeIllustration,
  ActivationIllustration,
  TrackingPlanIllustration,
  DashboardIllustration,
  DevtoolIllustration,
  B2bSaasIllustration,
  SelfServeIllustration
} from "@/components/illustrations/feature-illustrations"

export default function HomePage() {
  return (
    <>
      {/* Hero Section - 2 Column Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-background dark:via-background dark:to-background section-spacing">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/25 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
        <div className="relative container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* Left Column - Copy */}
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="mb-6">
                <Rocket className="mr-2 h-3 w-3" />
                Activation system for PLG SaaS
              </Badge>
              <h1 className="heading-primary mb-6 text-foreground">
                Growth OS — Activation system for
                <span className="gradient-text"> PLG SaaS</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance max-w-xl mx-auto lg:mx-0">
                Define activation as value delivery. Generate an engineering-ready tracking plan in 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="group">
                  <Link href="/builder">
                    Open Builder
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/examples">
                    View Examples
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No signup. Generate in ~60 seconds.
              </p>
            </div>

            {/* Right Column - Output Preview */}
            <div>
              <OutputPreview />
            </div>
          </div>
        </div>
      </section>

      {/* This Solves Section */}
      <section className="section-spacing-sm bg-muted/30 border-y border-border/50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold mb-8 text-center">This solves</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Activation definitions differ across teams</p>
                <p className="text-sm text-muted-foreground mb-2">Results do not compound when everyone measures differently.</p>
                <p className="text-sm text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  One shared activation spec everyone can reference.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Tracking drifts over time</p>
                <p className="text-sm text-muted-foreground mb-2">Duplicate events, inconsistent properties, mystery metrics.</p>
                <p className="text-sm text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Tracking plan with event contracts engineers can ship.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Dashboards do not match definitions</p>
                <p className="text-sm text-muted-foreground mb-2">Decisions become opinions when metrics are ambiguous.</p>
                <p className="text-sm text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Dashboard pack tied to your KPI tree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <SectionHeader
            title="What you get"
            subtitle="Four interconnected outputs that form a complete activation system"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <KpiTreeIllustration className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">KPI Tree + North Star</h3>
                <p className="text-muted-foreground leading-relaxed">
                  One source of truth for metrics and guardrails. Align teams around what matters.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <ActivationIllustration className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Activation Spec</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Define activation as value (not logins) and measure Time-to-Value precisely.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <TrackingPlanIllustration className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tracking Plan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  An event + properties contract engineers can ship. No ambiguity, no drift.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <DashboardIllustration className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dashboard Pack</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Standard boards for activation, retention, adoption, and revenue. Ready to build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Teaser Section */}
      <section className="section-spacing bg-gradient-to-b from-muted/40 to-transparent">
        <div className="container-wide">
          <SectionHeader
            title="See it in action"
            subtitle="Reference templates for different product types and activation patterns"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/examples?category=B2B" className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-500/10 to-blue-500/5 p-6 hover:shadow-lg transition-all duration-300 border border-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <DevtoolIllustration className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Devtool: First Deploy</h3>
                  <p className="text-sm text-muted-foreground">
                    PLG activation for developer tools focused on first successful deployment.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/examples?category=SaaS" className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-500/10 to-purple-500/5 p-6 hover:shadow-lg transition-all duration-300 border border-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <B2bSaasIllustration className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">B2B SaaS: Invite & Share</h3>
                  <p className="text-sm text-muted-foreground">
                    PLG activation through collaborative project sharing and team invitations.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/examples?category=SaaS" className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-green-500/10 to-green-500/5 p-6 hover:shadow-lg transition-all duration-300 border border-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <DashboardIllustration className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics: Publish Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    PLG activation through dashboard creation and publishing workflows.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild className="group">
              <Link href="/examples">
                View all examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing">
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
                  Export to Markdown or JSON, share via link, or Print to PDF for your team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="section-spacing bg-muted/30 border-y border-border/50">
        <div className="container-wide">
          <SectionHeader
            title="Built for PLG teams"
            subtitle="Designed for companies where users find value before talking to sales"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card to-card/50 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                  <DevtoolIllustration className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Developer Tools</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  API platforms, CLIs, SDKs, and infrastructure tools with code-first onboarding flows
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card to-card/50 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                  <B2bSaasIllustration className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">B2B SaaS</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Workspace and team-based products where activation happens at the account level
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card to-card/50 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                  <SelfServeIllustration className="h-8 w-8 text-green-600 dark:text-green-400" />
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

      {/* Why I Built This Section */}
      <section className="section-spacing">
        <div className="container-narrow">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
            Why I built this
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
            Nobody agreed on what <span className="gradient-text">activation</span> meant.
          </h2>

          <div className="max-w-2xl space-y-4 text-lg text-muted-foreground">
            <p>
              Product said &quot;completed onboarding.&quot; Growth said &quot;first login.&quot; Finance said &quot;paid conversion.&quot; Engineering tracked nothing.
            </p>
            <p>
              After 10 years of watching teams optimize the wrong metrics, I built Growth OS—one framework that defines activation as value delivery and generates everything you need to ship it.
            </p>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            — Dawid
          </p>
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
              <Hammer className="h-12 w-12 text-white/90 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Build your activation system
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Stop guessing at metrics. Start with a complete framework tailored to your product.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="group text-base px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Link href="/builder">
                    Open Builder
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link href="/examples">
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
