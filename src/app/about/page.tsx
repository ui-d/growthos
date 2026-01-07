import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Zap,
  BarChart3,
  Target,
  Rocket,
  Code2,
  Workflow,
  FileText,
  BookOpen,
  Wrench,
} from "lucide-react"
import { SOCIAL_LINKS, SITE_CONFIG, hasLink } from "@/lib/constants"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "About - Growth OS",
  description: "Growth / Activation Engineer building activation and revenue infrastructure for PLG SaaS.",
  openGraph: {
    title: "About - Growth OS",
    description: "Growth / Activation Engineer building activation and revenue infrastructure for PLG SaaS.",
    url: `${baseUrl}/about`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Growth OS",
    description: "Growth / Activation Engineer building activation and revenue infrastructure for PLG SaaS.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

const FOCUS_AREAS = [
  "Activation & TTV optimization",
  "Instrumentation architecture",
  "Experiment infrastructure",
]

const ARTIFACTS = [
  { name: "KPI tree + North Star definitions", icon: Target },
  { name: "Activation spec + TTV instrumentation", icon: Zap },
  { name: "Tracking plan + property dictionary", icon: FileText },
  { name: "Dashboard pack (activation, retention, adoption, revenue)", icon: BarChart3 },
  { name: "Experiment system (scoring + decision log)", icon: Rocket },
  { name: "Data quality + governance", icon: Workflow },
]

const TOOLING = [
  { category: "Analytics", tools: "Segment, Mixpanel, Amplitude, PostHog" },
  { category: "Data", tools: "SQL, reverse ETL, feature flags, experimentation" },
  { category: "Frontend", tools: "Next.js, TypeScript, React, Tailwind" },
]

const PRINCIPLES = [
  { title: "Definitions first", description: "Instrumentation second, experiments third, scale last." },
  { title: "Bias to measurable changes", description: "Small, validated iterations that compound." },
  { title: "Trust data boundaries", description: "Validate at system edges, trust internal contracts." },
  { title: "Ship artifacts, not slides", description: "Specs, tracking plans, dashboards—things teams use." },
]

const PROOF_LINKS = [
  { href: "/architecture", label: "Architecture", description: "How this system is built—data model, SSR, validation." },
  { href: "/guides", label: "Guides", description: "Step-by-step processes for growth engineering." },
  { href: "/library", label: "Examples", description: "Real specs for PLG SaaS, devtools, marketplaces." },
  { href: "/builder", label: "Builder", description: "Generate your own growth specification." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              About
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I build activation and revenue infrastructure for PLG SaaS.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Zap className="h-3 w-3" />
                Activation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <BarChart3 className="h-3 w-3" />
                Instrumentation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Rocket className="h-3 w-3" />
                Experimentation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Target className="h-3 w-3" />
                Dashboards
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Code2 className="h-3 w-3" />
                TypeScript
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container-wide py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Profile Card - Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <Card className="border-border/40 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-semibold text-lg">{SITE_CONFIG.author}</h2>
                      <p className="text-sm text-muted-foreground">Growth / Activation Engineer</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Focus</p>
                      <ul className="space-y-1.5">
                        {FOCUS_AREAS.map((area) => (
                          <li key={area} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {hasLink(SOCIAL_LINKS.linkedin) && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-1.5" />
                            LinkedIn
                          </Link>
                        </Button>
                      )}
                      {hasLink(SOCIAL_LINKS.github.profile) && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={SOCIAL_LINKS.github.profile} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1.5" />
                            GitHub
                          </Link>
                        </Button>
                      )}
                      {hasLink(SOCIAL_LINKS.email) && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`mailto:${SOCIAL_LINKS.email}`}>
                            <Mail className="h-4 w-4 mr-1.5" />
                            Email
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-12">
            {/* What I Do Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">What I do</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Reduce time-to-value</div>
                    <div className="text-sm text-muted-foreground">Define activation events, instrument TTV, and build onboarding experiments that convert signups to active users.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <BarChart3 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Build measurement infrastructure</div>
                    <div className="text-sm text-muted-foreground">Tracking plans, property dictionaries, and dashboards that answer &quot;what&apos;s happening&quot; without ad-hoc queries.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Run structured experiments</div>
                    <div className="text-sm text-muted-foreground">Hypothesis → test → decision log. Prioritization frameworks that focus effort on high-impact bets.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Artifacts I Ship Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Artifacts I ship</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARTIFACTS.map((artifact) => (
                  <div key={artifact.name} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <artifact.icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{artifact.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tooling Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Tooling</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TOOLING.map((item) => (
                  <div key={item.category} className="p-4 rounded-xl bg-muted/40">
                    <div className="text-sm font-medium mb-1">{item.category}</div>
                    <div className="text-sm text-muted-foreground">{item.tools}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* How I Work Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">How I work</h2>
              <div className="space-y-3">
                {PRINCIPLES.map((principle, index) => (
                  <div key={principle.title} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                    <span className="text-primary font-mono text-sm shrink-0">0{index + 1}</span>
                    <div>
                      <div className="font-medium text-sm">{principle.title}</div>
                      <div className="text-sm text-muted-foreground">{principle.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Proof and Links Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Proof and links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROOF_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group p-5 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/40 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Open Source Note */}
            <section className="pt-4 border-t border-border/40">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4" />
                <span>This project is open source.</span>
                <Link href="/license" className="text-primary hover:underline inline-flex items-center gap-1">
                  View License
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
