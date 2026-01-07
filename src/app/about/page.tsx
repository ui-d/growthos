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
  Youtube,
  ExternalLink,
  Zap,
  BarChart3,
  Target,
  Rocket,
  Code2,
  Workflow,
  FileText,
  Wrench,
  Bot,
  Globe,
  Building2,
} from "lucide-react"
import { SOCIAL_LINKS, SITE_CONFIG, hasLink } from "@/lib/constants"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "About - Growth OS",
  description: "Growth Engineer with full-stack expertise in React, Next.js, Node.js, and modern marketing stacks. Building acquisition surfaces and activation infrastructure for PLG SaaS.",
  openGraph: {
    title: "About - Growth OS",
    description: "Growth Engineer with full-stack expertise in React, Next.js, Node.js, and modern marketing stacks. Building acquisition surfaces and activation infrastructure for PLG SaaS.",
    url: `${baseUrl}/about`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Growth OS",
    description: "Growth Engineer with full-stack expertise in React, Next.js, Node.js, and modern marketing stacks. Building acquisition surfaces and activation infrastructure for PLG SaaS.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

const FOCUS_AREAS = [
  "Acquisition & activation surfaces",
  "GTM automation & measurement",
  "AI-first development workflows",
]

const EXPERIENCE = [
  { company: "Appsmith", role: "Growth Engineer", period: "Jun 2024 - Present", tech: "TypeScript, Node, Contentful, Analytics / GTM Stack" },
  { company: "Stenn", role: "Web Engineer (Marketing)", period: "Mar 2024 - Jun 2024", tech: "Webflow, JavaScript, React, Salesforce, GTM" },
  { company: "Hygraph", role: "Frontend Developer (Marketing)", period: "Sep 2023 - Mar 2024", tech: "Next.js 13, TypeScript, Tailwind, Storybook" },
  { company: "Pilot", role: "Growth Engineer", period: "Feb 2022 - Aug 2023", tech: "React, Next.js, Tailwind, Storyblok, GSAP" },
  { company: "Ziflow", role: "Web Developer (Marketing)", period: "Oct 2019 - Feb 2022", tech: "HubSpot, HTML5, CSS3, ES6+, GSAP, Lottie" },
]

const TOOLING = [
  { category: "AI-First", tools: "Claude Code, Cursor, Lovable, Gemini, v0.dev, AI Agents" },
  { category: "Frontend", tools: "TypeScript, React, Next.js, Vue, Tailwind, GSAP" },
  { category: "Backend", tools: "Node.js, Python, Serverless/Edge, Headless CMS, Vercel" },
  { category: "Data", tools: "SQL, PostgreSQL, Supabase, BigQuery, Fivetran, Looker" },
  { category: "Marketing", tools: "Mixpanel, GA4, Segment, Chilipiper, Clay, Intercom" },
  { category: "Low-code", tools: "Webflow, Make.com, Zapier, Airtable, n8n" },
]

const ARTIFACTS = [
  { name: "Marketing websites & landing pages", icon: Globe },
  { name: "Signup/demo flows & conversion funnels", icon: Zap },
  { name: "Lead enrichment & routing automation", icon: Workflow },
  { name: "Attribution & instrumentation systems", icon: BarChart3 },
  { name: "A/B testing & experimentation frameworks", icon: Rocket },
  { name: "CMS workflows & content operations", icon: FileText },
]

const PRINCIPLES = [
  { title: "AI-first delivery", description: "Leverage AI workflows for prototyping, debugging, refactoring, and documentation while maintaining high code review standards." },
  { title: "Measurement before scale", description: "Build instrumentation and attribution hygiene first—then optimize what you can measure." },
  { title: "Ship with guardrails", description: "Enable cross-team shipping with content controls and safer publishing workflows." },
  { title: "Structured experimentation", description: "Hypotheses, testing, measured rollouts. Prioritize high-impact bets with clear decision logs." },
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
              Growth Engineer with full-stack expertise in React, Next.js, Node.js, and modern marketing stacks. I build and optimize acquisition surfaces: marketing websites, landing pages, signup/demo flows, and experimentation frameworks.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Bot className="h-3 w-3" />
                AI-First
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Code2 className="h-3 w-3" />
                Fullstack
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <BarChart3 className="h-3 w-3" />
                GTM Automation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Rocket className="h-3 w-3" />
                Experimentation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Target className="h-3 w-3" />
                Attribution
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
                      <p className="text-sm text-muted-foreground">Growth Engineer | AI-First</p>
                      <p className="text-xs text-muted-foreground mt-1">Toruń, Poland (Open to Remote)</p>
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
                      {hasLink(SOCIAL_LINKS.youtube) && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
                            <Youtube className="h-4 w-4 mr-1.5" />
                            YouTube
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
                  <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Build acquisition surfaces</div>
                    <div className="text-sm text-muted-foreground">Technical owner of marketing websites, landing pages, sign-up flows, and conversion-critical paths. Architecture choices, reusable components, and UX patterns.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <BarChart3 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Design measurement & automation</div>
                    <div className="text-sm text-muted-foreground">Lead enrichment, attribution consistency, and routing between marketing and sales systems. Instrumentation that improves pipeline quality and revenue.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <Bot className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Apply AI-first workflows</div>
                    <div className="text-sm text-muted-foreground">Speed up prototyping, debugging, refactoring, test scaffolding, and documentation while keeping high standards for performance (Core Web Vitals), accessibility, and experiment validity.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Experience</h2>
              <div className="space-y-3">
                {EXPERIENCE.map((exp) => (
                  <div key={exp.company} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="font-medium text-sm">{exp.role}</div>
                        <div className="text-xs text-muted-foreground">{exp.period}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{exp.company}</div>
                      <div className="text-xs text-muted-foreground/70 mt-1">{exp.tech}</div>
                    </div>
                  </div>
                ))}
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

            {/* Technical Skills Section */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Technical skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TOOLING.map((item) => (
                  <div key={item.category} className="p-4 rounded-xl bg-muted/40">
                    <div className="text-sm font-medium mb-1">{item.category}</div>
                    <div className="text-xs text-muted-foreground">{item.tools}</div>
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
