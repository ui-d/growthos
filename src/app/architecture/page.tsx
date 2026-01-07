import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  ArrowRight,
  Code,
  Database,
  Share2,
  Server,
  Shield,
  TestTube2,
  Rocket,
  FileDown,
  ChevronRight,
  Globe,
  Zap,
  Lock,
  CheckCircle2,
  Info,
  BookOpen,
  Wrench,
} from "lucide-react"
import { SOCIAL_LINKS, hasLink } from "@/lib/constants"
import { ArchitectureTOC } from "@/components/docs/architecture-toc"
import { ArchitectureDiagram } from "@/components/docs/architecture-diagram"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Architecture - Growth OS",
  description: "Technical architecture and engineering decisions behind Growth OS. Data model, generator design, SSR strategy, and validation approach.",
  openGraph: {
    title: "Architecture - Growth OS",
    description: "Technical architecture and engineering decisions behind Growth OS.",
    url: `${baseUrl}/architecture`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture - Growth OS",
    description: "Technical architecture and engineering decisions behind Growth OS.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/architecture`,
  },
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "system-flow", label: "System Flow" },
  { id: "data-model", label: "Data Model" },
  { id: "generator", label: "Generator Design" },
  { id: "share-links", label: "Share Links" },
  { id: "ssr", label: "SSR Strategy" },
  { id: "exports", label: "Exports" },
  { id: "validation", label: "Validation" },
  { id: "testing", label: "Testing" },
  { id: "roadmap", label: "Roadmap" },
  { id: "engineering-notes", label: "Engineering Notes" },
]

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              Architecture
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Build specs in the browser, validate with Zod, generate deterministic output, and share via URL-encoded state.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Globe className="h-3 w-3" />
                No Backend
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Share2 className="h-3 w-3" />
                URL Share
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Zap className="h-3 w-3" />
                Deterministic
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Shield className="h-3 w-3" />
                Zod Validation
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
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Growth OS is a deterministic specification generator for product-led growth teams. Users input product metadata
                (type, primary object, value action) and configuration choices (activation rules, tracking events), and the system
                outputs a complete growth specification including KPI trees, activation definitions, tracking plans, and experiment
                templates.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <div className="text-sm font-medium mb-1">Styling</div>
                  <div className="text-sm text-muted-foreground">Tailwind CSS v4</div>
                </div>
              </div>
            </section>

            {/* System Flow Diagram */}
            <section id="system-flow" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">System Flow</h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                The architecture follows a linear flow from input to shareable output, with validation at each boundary.
              </p>
              <ArchitectureDiagram />
            </section>

            {/* Data Model Section */}
            <section id="data-model" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Model
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                The core data structure captures everything needed to generate a complete growth specification.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">productType</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      B2B SaaS vs Devtool. Determines metric naming conventions and default guardrails.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">primaryObject</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      The core entity users create. Used to generate North Star metric naming.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">valueAction</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      The action that delivers value. Forms the basis of activation event naming.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">ttvMinutes</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Time-to-value in minutes. Informs onboarding experiment design.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">activationRules</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Array of predefined rule types converted to human-readable rules during generation.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                    <code className="text-sm text-primary font-mono">coreEvents</code>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Enum-based event selection ensuring consistent event taxonomy across specs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Generator Design Section */}
            <section id="generator" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Generator Design
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                The generator (<code className="text-primary text-sm">generateGrowthSpec</code>) is a pure function:
                identical inputs always produce identical outputs.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Cacheability</div>
                    <div className="text-sm text-muted-foreground">Same URL always renders the same spec. CDN-friendly.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Testability</div>
                    <div className="text-sm text-muted-foreground">No mocking required. Snapshot tests work reliably.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Debugging</div>
                    <div className="text-sm text-muted-foreground">Share a URL and reproduce exact output. No &quot;works on my machine&quot;.</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The only non-deterministic element is the timestamp in the footer, which uses the generation date for versioning shared specs.
              </p>
            </section>

            {/* Share Links Section */}
            <section id="share-links" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                Share Links
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Share URLs use <code className="text-primary text-sm">lz-string</code> compression with URI-safe encoding.
              </p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/40 font-mono text-sm mb-6 overflow-x-auto">
                <div className="text-muted-foreground">/s?d=N4IgxgFg... (compressed BuilderWizardState)</div>
                <div className="mt-2 pt-2 border-t border-border/30">
                  <span className="text-primary">encode:</span> JSON.stringify → compressToEncodedURIComponent<br />
                  <span className="text-primary">decode:</span> decompressFromEncodedURIComponent → JSON.parse
                </div>
              </div>

              {/* Callout Card: Why URL-encoded? */}
              <Alert className="mb-6 border-primary/20 bg-primary/5">
                <Lock className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Why URL-encoded instead of database?</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Zero infrastructure:</strong> No database, no auth, no API keys. Deploy anywhere.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Privacy by design:</strong> Data never touches our servers. Users own their URLs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Offline-capable:</strong> Bookmarked URLs work forever. No link rot.</span>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Callout Card: Tradeoffs */}
              <Alert className="border-amber-500/20 bg-amber-500/5">
                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300">Tradeoffs</AlertTitle>
                <AlertDescription className="mt-2 space-y-2 text-amber-900/80 dark:text-amber-100/80">
                  <div className="flex items-start gap-2">
                    <span>−</span>
                    <span><strong>URL length:</strong> Complex specs produce long URLs (~2KB). Most browsers handle 8KB+.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>−</span>
                    <span><strong>No analytics:</strong> We can&apos;t track which specs are popular (privacy tradeoff).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>−</span>
                    <span><strong>No versioning:</strong> URL is the version. Editing creates a new URL.</span>
                  </div>
                </AlertDescription>
              </Alert>
            </section>

            {/* SSR Strategy Section */}
            <section id="ssr" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                SSR Strategy
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Different pages use different rendering strategies based on their needs.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/40 shadow-none">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="font-medium text-sm">/builder (Client-Heavy)</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Hero/layout server-rendered for fast first paint</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Wizard form as client component with Suspense</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>localStorage for draft persistence</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/40 shadow-none">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="font-medium text-sm">/s?d=... (Server-Heavy)</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Full SSR: decode → validate → generate on server</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Dynamic OG metadata from decoded spec</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>robots: noindex for share URLs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* SSR Callout */}
              <Alert className="mt-6 border-primary/20 bg-primary/5">
                <Server className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Why SSR for share pages?</AlertTitle>
                <AlertDescription className="mt-2">
                  Share URLs need server rendering for two reasons: (1) OG meta tags must be in the initial HTML for social previews, and (2) first paint should show the full spec without hydration delay.
                </AlertDescription>
              </Alert>
            </section>

            {/* Exports Section */}
            <section id="exports" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <FileDown className="h-5 w-5 text-primary" />
                Exports
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Three export formats, each with honest tradeoffs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-medium text-sm mb-2">Markdown (.md)</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Full spec as structured markdown</li>
                    <li>• Tables for tracking plans</li>
                    <li>• Copy or download</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground/70">
                    Tables may render differently across tools
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-medium text-sm mb-2">JSON</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Raw BuilderWizardState</li>
                    <li>• Machine-readable</li>
                    <li>• Same as URL payload</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground/70">
                    Input data only, not generated output
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-medium text-sm mb-2">Print to PDF</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Native window.print()</li>
                    <li>• @media print styling</li>
                    <li>• Save as PDF in dialog</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground/70">
                    Quality depends on browser
                  </div>
                </div>
              </div>
            </section>

            {/* Validation Section */}
            <section id="validation" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Validation Strategy
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Runtime validation using Zod ensures type safety at system boundaries.
              </p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/40 font-mono text-sm mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm">{`export const GrowthSpecInputSchema = z.object({
  productType: ProductTypeSchema.or(z.literal('')),
  primaryObject: z.string().min(1).max(50),
  valueAction: z.string().min(1).max(50),
  ttvMinutes: z.string().regex(/^\\d+$/),
  activationRules: z.array(ActivationRuleSchema).min(1),
  coreEvents: z.array(CoreEventSchema).min(1),
})`}</pre>
              </div>

              {/* Validation Callout */}
              <Alert className="border-primary/20 bg-primary/5">
                <Shield className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Failure Modes</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Step validation:</strong> Progressive form validation with Step1Schema, Step2Schema, Step3Schema</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Share URL decode:</strong> Returns null on failure, renders InvalidShareLink component</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Malformed data:</strong> Type coercion fails gracefully; defaults used where safe</span>
                  </div>
                </AlertDescription>
              </Alert>
            </section>

            {/* Testing Section */}
            <section id="testing" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <TestTube2 className="h-5 w-5 text-primary" />
                Testing
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Tests run via Vitest (<code className="text-primary text-sm">pnpm test</code>).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-medium text-sm mb-3">Unit Tests</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>pluralize() - singular/plural/custom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Encoding/decoding round-trips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Schema validation edge cases</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-medium text-sm mb-3">Route Tests</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>All static routes return 200</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>/s with invalid param shows error</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>/s with valid param renders spec</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                The deterministic generator design means integration tests are effectively unit tests—no external dependencies to mock.
              </p>
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Future Roadmap
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-primary font-mono text-sm shrink-0">01</span>
                  <div>
                    <div className="font-medium text-sm">Export formats</div>
                    <div className="text-sm text-muted-foreground">PDF export, Notion/Confluence integration via API</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-primary font-mono text-sm shrink-0">02</span>
                  <div>
                    <div className="font-medium text-sm">Template library</div>
                    <div className="text-sm text-muted-foreground">Pre-built specs for PLG SaaS, marketplaces, devtools</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-primary font-mono text-sm shrink-0">03</span>
                  <div>
                    <div className="font-medium text-sm">Diff view</div>
                    <div className="text-sm text-muted-foreground">Compare two specs side-by-side for A/B testing variations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-primary font-mono text-sm shrink-0">04</span>
                  <div>
                    <div className="font-medium text-sm">Analytics integration</div>
                    <div className="text-sm text-muted-foreground">Generate Amplitude/Mixpanel tracking plan code directly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <span className="text-primary font-mono text-sm shrink-0">05</span>
                  <div>
                    <div className="font-medium text-sm">Team collaboration</div>
                    <div className="text-sm text-muted-foreground">Optional authenticated mode with revision history</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Engineering Notes Section */}
            <section id="engineering-notes" className="scroll-mt-24 pb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Engineering Notes
              </h2>
              <p className="text-base text-muted-foreground leading-7 mb-6">
                Key technical decisions that make this codebase recruiter-ready.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Deterministic output</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>No backend required</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>SSR share pages</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Route tests</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Encode/decode tests</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Zod schema validation</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href="/guides">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Guides
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/builder">
                    Open Builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/library">
                    View Examples
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
