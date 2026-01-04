import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, BarChart3, Target, FileText, PieChart, PlayCircle, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto space-y-6 pb-16 pt-16 md:pb-24 md:pt-24 lg:py-32">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Growth OS: system na activation
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              dla PLG SaaS
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Definiuj KPI, śledź metryki aktywacji i wdrażaj eksperymenty wzrostu oparte na danych.
            Przekształć swoją strategię produktową dzięki systematycznemu podejściu do wzrostu.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/builder">
                Open Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/modules">
                View Modules
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Try Example Section */}
      <section className="container mx-auto py-8">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Try example</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" size="sm" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Example 1
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Example 2
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Example 3
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            What you get
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Kompletny zestaw narzędzi do budowania i optymalizacji systemu aktywacji użytkowników
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">KPI Tree</CardTitle>
              <CardDescription>
                Hierarchiczne drzewo kluczowych wskaźników wydajności z powiązanymi metrykami
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Activation Spec</CardTitle>
              <CardDescription>
                Szczegółowa specyfikacja procesów aktywacji użytkowników z milestones
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Tracking Spec</CardTitle>
              <CardDescription>
                Implementacja trackingu wydarzeń i analityki dla pełnego monitoringu funnel&apos;a
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Dashboard Pack</CardTitle>
              <CardDescription>
                Gotowe dashboardy i raporty do monitorowania postępów aktywacji
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="bg-muted/30 rounded-2xl">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Prosty trzystopniowy proces od analizy do implementacji
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-bold">Analyze & Define</h3>
            <p className="text-muted-foreground">
              Zdefiniuj swój produkt, użytkowników docelowych i kluczowe wartości biznesowe
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-bold">Generate System</h3>
            <p className="text-muted-foreground">
              Automatycznie generuj KPI tree, specyfikacje aktywacji i plany trackingu
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-bold">Implement & Track</h3>
            <p className="text-muted-foreground">
              Wdrażaj rozwiązania używając gotowych specyfikacji i monitoruj wyniki
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Made For Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Made for
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto mb-8">
            Zaprojektowane specjalnie dla zespołów produktowych w startupach B2B SaaS
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Devtool PLG</CardTitle>
              <CardDescription className="text-base">
                Narzędzia deweloperskie z modelem Product-Led Growth wymagające
                precyzyjnego trackingu aktywacji technicznej i adoption metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">B2B SaaS</CardTitle>
              <CardDescription className="text-base">
                Platformy B2B z kompleksowymi procesami onboardingu,
                wymagające systematycznego podejścia do aktywacji użytkowników
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Ready to Build Your Growth OS?
          </h2>
          <p className="max-w-[600px] mx-auto text-lg opacity-90 mb-8">
            Zacznij już dziś budowę swojego systemu aktywacji.
            Wygeneruj kompletną strategię wzrostu w kilka minut.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/builder">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/modules">
                Explore Modules
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}