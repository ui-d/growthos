import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  Shield,
  Info,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Server,
  Database,
  GitBranch,
} from "lucide-react"
import { SOCIAL_LINKS, hasLink } from "@/lib/constants"
import { ArchitectureTOC } from "@/components/docs/architecture-toc"
import { MermaidDiagram } from "@/components/docs/mermaid-diagram"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Technical Deep Dive - Growth OS",
  description: "Recruiter-grade technical deep dive into Growth OS architecture. System flow diagrams, key engineering decisions, tradeoffs, and future roadmap.",
  openGraph: {
    title: "Technical Deep Dive - Growth OS",
    description: "Recruiter-grade technical deep dive into Growth OS architecture.",
    url: `${baseUrl}/technical-deep-dive`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Deep Dive - Growth OS",
    description: "Recruiter-grade technical deep dive into Growth OS architecture.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/technical-deep-dive`,
  },
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "system-flow", label: "System Flow" },
  { id: "key-decisions", label: "Key Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "future", label: "Future Options" },
]

const systemFlowChart = `flowchart LR
    A[Builder] --> B[Validate]
    B --> C[Generate]
    C --> D[Preview/Export]
    D --> E[Encode]
    E --> F[SSR Share]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style D fill:#f59e0b,stroke:#d97706,color:#fff
    style E fill:#ef4444,stroke:#dc2626,color:#fff
    style F fill:#6366f1,stroke:#4f46e5,color:#fff`

export default function TechnicalDeepDivePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              Technical Deep Dive
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              An honest look at how Growth OS works today: architecture decisions, tradeoffs acknowledged, and future possibilities clearly labeled.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Globe className="h-3 w-3" />
                No Backend
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Zap className="h-3 w-3" />
                Deterministic
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Shield className="h-3 w-3" />
                Zod Validation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Server className="h-3 w-3" />
                SSR Share
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with TOC */}
      <div className="container-wide py-10">
        <div className="flex gap-10 lg:gap-16">
          {/* TOC Sidebar - Desktop */}
          <ArchitectureTOC sections={sections} />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Overview</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-base text-muted-foreground leading-7 mb-4">
                  Growth OS is a <strong>deterministic specification generator</strong> for product-led growth teams.
                  Users configure their product metadata (type, primary object, value action) and the system outputs
                  complete growth specifications including KPI trees, activation definitions, and tracking plans.
                </p>
                <p className="text-base text-muted-foreground leading-7 mb-4">
                  The entire application runs <strong>client-side with no backend</strong>—all state is encoded into
                  shareable URLs using lz-string compression. Share pages are server-rendered for proper OG meta tags
                  and instant first paint.
                </p>
                <p className="text-base text-muted-foreground leading-7">
                  This architecture was chosen deliberately to minimize operational complexity while maximizing
                  portability: specs can be bookmarked, shared via any medium, and work forever without server dependencies.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-sm font-medium mb-1">Framework</div>
                  <div className="text-sm text-muted-foreground">Next.js 16 + React 19</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-sm font-medium mb-1">Language</div>
                  <div className="text-sm text-muted-foreground">TypeScript</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-sm font-medium mb-1">Validation</div>
                  <div className="text-sm text-muted-foreground">Zod Schemas</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-sm font-medium mb-1">State</div>
                  <div className="text-sm text-muted-foreground">URL-encoded (lz-string)</div>
                </div>
              </div>
            </section>

            {/* System Flow Diagram */}
            <section id="system-flow" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">System Flow</h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                The architecture follows a linear, unidirectional flow from user input to shareable output:
              </p>

              <MermaidDiagram chart={systemFlowChart} className="mb-6" />

              {/* Flow Steps Explanation */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-blue-500 font-mono text-sm shrink-0 font-semibold">1</span>
                  <div>
                    <div className="font-medium text-sm">Builder</div>
                    <div className="text-sm text-muted-foreground">
                      Multi-step wizard collects product type, primary object, value action, TTV, activation rules, and core events.
                      State managed via React with localStorage draft persistence.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-emerald-500 font-mono text-sm shrink-0 font-semibold">2</span>
                  <div>
                    <div className="font-medium text-sm">Validate</div>
                    <div className="text-sm text-muted-foreground">
                      Zod schemas validate each step progressively (Step1Schema, Step2Schema, Step3Schema).
                      Final GrowthSpecInputSchema validates the complete input before generation.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-violet-500 font-mono text-sm shrink-0 font-semibold">3</span>
                  <div>
                    <div className="font-medium text-sm">Generate</div>
                    <div className="text-sm text-muted-foreground">
                      <code className="text-primary text-xs">generateGrowthSpec()</code> is a pure function:
                      identical inputs always produce identical outputs. No randomness, no external dependencies.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-amber-500 font-mono text-sm shrink-0 font-semibold">4</span>
                  <div>
                    <div className="font-medium text-sm">Preview/Export</div>
                    <div className="text-sm text-muted-foreground">
                      Live preview renders the generated spec. Export options include Markdown, JSON, and Print-to-PDF.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-rose-500 font-mono text-sm shrink-0 font-semibold">5</span>
                  <div>
                    <div className="font-medium text-sm">Encode</div>
                    <div className="text-sm text-muted-foreground">
                      <code className="text-primary text-xs">JSON.stringify → compressToEncodedURIComponent</code> creates
                      a URL-safe string. Typical specs compress to ~1-2KB.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-indigo-500 font-mono text-sm shrink-0 font-semibold">6</span>
                  <div>
                    <div className="font-medium text-sm">SSR Share</div>
                    <div className="text-sm text-muted-foreground">
                      <code className="text-primary text-xs">/s?d=...</code> pages are server-rendered: decode → validate → generate
                      happens on the server for proper OG meta tags and instant first paint.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Decisions Section */}
            <section id="key-decisions" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Key Decisions
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Technical choices that define the architecture, with rationale for each.
              </p>

              {/* Decision 1: Deterministic Generator */}
              <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Deterministic Generator</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  The <code className="text-primary text-xs">generateGrowthSpec()</code> function is pure: same inputs always
                  produce identical outputs. No <code className="text-primary text-xs">Math.random()</code>, no timestamps
                  in output (only footer versioning), no external API calls.
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Cacheability:</strong> Same URL always renders identically. CDN-friendly.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Testability:</strong> Snapshot tests are reliable. No mocking required.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Debugging:</strong> Share a URL to reproduce exact output. No &quot;works on my machine&quot;.</span>
                  </div>
                </div>
              </div>

              {/* Decision 2: Schema Validation */}
              <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Zod Schema Validation</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Runtime validation at every boundary: form steps, URL decode, generator input. TypeScript types
                  are inferred from schemas, ensuring compile-time and runtime safety are in sync.
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Progressive validation:</strong> Each wizard step validates independently.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Safe decode:</strong> Malformed URLs fail gracefully with helpful error UI.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Single source of truth:</strong> Schema defines both validation and TypeScript types.</span>
                  </div>
                </div>
              </div>

              {/* Decision 3: No Backend */}
              <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">No Backend by Default</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  The entire application runs without a database, authentication system, or API server.
                  All state lives in the URL or localStorage.
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Zero infrastructure:</strong> Deploy to any static host (Vercel, Netlify, S3).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Privacy by design:</strong> User data never touches a server.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Offline-capable:</strong> Bookmarked URLs work forever. No link rot.</span>
                  </div>
                </div>
              </div>

              {/* Decision 4: SSR Share Pages */}
              <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">SSR for Share Pages</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  While the builder is client-heavy, share URLs (<code className="text-primary text-xs">/s?d=...</code>) are
                  fully server-rendered. This hybrid approach optimizes for different user journeys.
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Social previews:</strong> OG meta tags must be in initial HTML for link unfurling.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Instant paint:</strong> Full spec visible immediately, no hydration delay.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>SEO:</strong> Share pages are indexable (though marked noindex for privacy).</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tradeoffs Section */}
            <section id="tradeoffs" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Tradeoffs
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Every architecture has tradeoffs. Here&apos;s what we gave up and why we think it&apos;s worth it.
              </p>

              {/* URL Size Limits */}
              <Alert className="mb-4 border-amber-500/20 bg-amber-500/5">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300">URL Length Limits</AlertTitle>
                <AlertDescription className="mt-2 text-amber-900/80 dark:text-amber-100/80">
                  <p className="mb-2">
                    Complex specs produce URLs of ~1-2KB. While most browsers support 8KB+ URLs, some tools
                    (Slack, email clients) may truncate long URLs.
                  </p>
                  <div className="text-sm">
                    <strong>Mitigation:</strong> lz-string compression keeps payloads compact. Most real-world
                    specs stay well under browser limits.
                  </div>
                </AlertDescription>
              </Alert>

              {/* Persistence Limitations */}
              <Alert className="mb-4 border-amber-500/20 bg-amber-500/5">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300">No Persistent Storage</AlertTitle>
                <AlertDescription className="mt-2 text-amber-900/80 dark:text-amber-100/80">
                  <p className="mb-2">
                    Without a database, users can&apos;t save specs to an account. They must bookmark URLs or
                    export to files. There&apos;s no revision history or team sharing.
                  </p>
                  <div className="text-sm">
                    <strong>Mitigation:</strong> localStorage saves drafts locally. URL sharing works for
                    point-in-time collaboration. Export to Markdown/JSON for archival.
                  </div>
                </AlertDescription>
              </Alert>

              {/* SSR Complexity */}
              <Alert className="mb-4 border-amber-500/20 bg-amber-500/5">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300">SSR Complexity</AlertTitle>
                <AlertDescription className="mt-2 text-amber-900/80 dark:text-amber-100/80">
                  <p className="mb-2">
                    Share page SSR requires the generator to run on the server, adding complexity to the
                    client/server boundary. Server errors must be handled gracefully.
                  </p>
                  <div className="text-sm">
                    <strong>Mitigation:</strong> Deterministic generator means server output is predictable.
                    Zod validation catches malformed input before generation.
                  </div>
                </AlertDescription>
              </Alert>

              {/* No Analytics */}
              <Alert className="border-amber-500/20 bg-amber-500/5">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300">No Usage Analytics</AlertTitle>
                <AlertDescription className="mt-2 text-amber-900/80 dark:text-amber-100/80">
                  <p className="mb-2">
                    We can&apos;t track which specs are popular or how users interact with them.
                    This is a deliberate privacy tradeoff.
                  </p>
                  <div className="text-sm">
                    <strong>Mitigation:</strong> Optional analytics (privacy-respecting) could be added
                    for users who opt in.
                  </div>
                </AlertDescription>
              </Alert>
            </section>

            {/* Future Section */}
            <section id="future" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Future Options
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                These features are <strong>not currently implemented</strong>. They represent possible
                evolution paths, clearly labeled as future possibilities.
              </p>

              {/* Future Callout */}
              <Alert className="mb-6 border-primary/20 bg-primary/5">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Not Current Features</AlertTitle>
                <AlertDescription className="mt-2">
                  Everything below describes what <em>could</em> be built, not what exists today.
                  Growth OS currently has no database, no user accounts, and no authentication.
                </AlertDescription>
              </Alert>

              {/* Optional Accounts & Storage */}
              <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium text-muted-foreground">Optional: User Accounts & Storage</h3>
                  <Badge variant="outline" className="ml-auto text-xs">Future</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Adding authenticated accounts would enable persistent spec storage, revision history,
                  and team collaboration features.
                </p>
                <div className="text-sm space-y-2">
                  <div className="font-medium">What would change:</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>New database (Supabase/Postgres) to store user specs</li>
                    <li>Auth provider integration (OAuth, magic links)</li>
                    <li>Short URLs replacing lz-string encoded URLs</li>
                    <li>Revision history with diff view</li>
                    <li>Team workspaces with role-based access</li>
                  </ul>
                </div>
                <div className="text-sm mt-3 pt-3 border-t border-border/30">
                  <span className="font-medium">Why not now:</span>
                  <span className="text-muted-foreground ml-1">
                    The URL-based architecture serves the current use case well. Adding accounts
                    introduces infrastructure costs and privacy considerations that may not be
                    worth the tradeoff for a spec generator.
                  </span>
                </div>
              </div>

              {/* Analytics Platform Integration */}
              <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium text-muted-foreground">Optional: Analytics Platform Integration</h3>
                  <Badge variant="outline" className="ml-auto text-xs">Future</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Direct export to Amplitude, Mixpanel, or Segment tracking plan formats.
                </p>
                <div className="text-sm space-y-2">
                  <div className="font-medium">What would change:</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>New export targets in the generator</li>
                    <li>Platform-specific schema mappings</li>
                    <li>Optional API integration for direct push</li>
                  </ul>
                </div>
              </div>

              {/* Template Marketplace */}
              <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium text-muted-foreground">Optional: Community Templates</h3>
                  <Badge variant="outline" className="ml-auto text-xs">Future</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  A curated library of community-contributed spec templates for different industries and use cases.
                </p>
                <div className="text-sm space-y-2">
                  <div className="font-medium">What would change:</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Template submission and review workflow</li>
                    <li>Searchable template gallery</li>
                    <li>Template versioning and attribution</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="pt-6 border-t border-border/40">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href="/architecture">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Full Architecture
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/builder">
                    Open Builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/documentation">
                    Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {hasLink(SOCIAL_LINKS.github.profile) && (
                  <Button variant="outline" asChild>
                    <Link href={SOCIAL_LINKS.github.profile} target="_blank" rel="noopener noreferrer">
                      <Code className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
