import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, ArrowRight, Code, Database, Share2, Server, Shield, TestTube2, Rocket } from "lucide-react"

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

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Layers className="mr-2 h-3 w-3" />
              Technical Architecture
            </span>
            <h1 className="heading-primary mb-4">System Architecture</h1>
            <p className="text-lg text-muted-foreground">
              Engineering decisions, tradeoffs, and implementation details behind Growth OS.
            </p>
          </div>
        </div>
      </section>

      {/* What is Growth OS */}
      <section className="container-wide section-spacing-sm">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            What is Growth OS
          </h2>
          <p className="text-muted-foreground">
            Growth OS is a deterministic specification generator for product-led growth teams. Users input product metadata
            (type, primary object, value action) and configuration choices (activation rules, tracking events), and the system
            outputs a complete growth specification including KPI trees, activation definitions, tracking plans, and experiment
            templates. The entire state is URL-encodable, enabling stateless sharing without a database. Built with Next.js 16
            App Router, React 19, TypeScript, and Zod for runtime validation.
          </p>
        </Card>
      </section>

      {/* System Flow Diagram */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          System Flow
        </h2>
        <Card className="p-6 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-muted-foreground whitespace-pre leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────────────────────┐
│                              GROWTH OS ARCHITECTURE                              │
└─────────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │   /builder  │     │   Schema    │     │  Generator  │     │   Preview   │
  │    Page     │────▶│  Validate   │────▶│   (Pure)    │────▶│   + Export  │
  │  (Client)   │     │   (Zod)     │     │             │     │             │
  └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
        │                   │                   │                   │
        │                   │                   │                   │
        ▼                   ▼                   ▼                   ▼
  ┌───────────────────────────────────────────────────────────────────────────┐
  │  BuilderWizardState                                                       │
  │  ├── productType: "B2B SaaS" | "Devtool"                                  │
  │  ├── primaryObject: string (e.g., "dashboard", "workflow")                │
  │  ├── valueAction: string (e.g., "share", "deploy")                        │
  │  ├── pricingModel: "Subscription" | "Usage-based" | "Hybrid" | "One-time" │
  │  ├── ttvMinutes: string (numeric)                                         │
  │  ├── activationEventName: string                                          │
  │  ├── activationRules: ActivationRule[]                                    │
  │  ├── coreEvents: CoreEvent[]                                              │
  │  └── customEvents: string[]                                               │
  └───────────────────────────────────────────────────────────────────────────┘
        │
        │ lz-string compress
        ▼
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │   Share     │     │  /s?d=...   │     │    SSR      │
  │   Button    │────▶│  Share URL  │────▶│   Render    │
  │             │     │  (base64)   │     │  + OG Meta  │
  └─────────────┘     └─────────────┘     └─────────────┘
                            │
                            │ decompressFromEncodedURIComponent
                            ▼
                      ┌─────────────┐
                      │  Decode +   │
                      │  Validate   │
                      │  + Generate │
                      └─────────────┘`}
          </pre>
        </Card>
      </section>

      {/* Data Model */}
      <section className="container-wide section-spacing">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Data Model
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>BuilderWizardState / GrowthSpecInput</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The core data structure captures everything needed to generate a complete growth specification.
              Each field exists for a specific reason:
            </p>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <code className="text-primary font-mono">productType</code>
                  <p className="text-muted-foreground mt-1">
                    B2B SaaS vs Devtool. Determines metric naming conventions and default guardrails.
                    Devtools emphasize API usage metrics; SaaS emphasizes user engagement.
                  </p>
                </div>
                <div>
                  <code className="text-primary font-mono">primaryObject</code>
                  <p className="text-muted-foreground mt-1">
                    The core entity users create (e.g., &quot;dashboard&quot;, &quot;workflow&quot;).
                    Used to generate North Star metric: &quot;Weekly Active {`{primaryObject}`}s&quot;.
                  </p>
                </div>
                <div>
                  <code className="text-primary font-mono">valueAction</code>
                  <p className="text-muted-foreground mt-1">
                    The action that delivers value (e.g., &quot;share&quot;, &quot;deploy&quot;).
                    Forms the basis of activation event naming and experiment hypotheses.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <code className="text-primary font-mono">ttvMinutes</code>
                  <p className="text-muted-foreground mt-1">
                    Time-to-value in minutes. Stored as string for form handling; validated as numeric.
                    Informs onboarding experiment design.
                  </p>
                </div>
                <div>
                  <code className="text-primary font-mono">activationRules</code>
                  <p className="text-muted-foreground mt-1">
                    Array of predefined rule types (created_primary_object, invited_teammate, etc.).
                    Converted to human-readable rules during generation.
                  </p>
                </div>
                <div>
                  <code className="text-primary font-mono">coreEvents</code>
                  <p className="text-muted-foreground mt-1">
                    Enum-based event selection (user_signup, object_created, etc.).
                    Ensures consistent event taxonomy across generated specs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Generator Design */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Generator Design
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Deterministic Output</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The generator (<code className="text-primary">generateGrowthSpec</code>) is a pure function:
            identical inputs always produce identical outputs. This enables:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Cacheability:</strong> Same URL always renders the same spec. CDN-friendly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Testability:</strong> No mocking required. Snapshot tests work reliably.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Debugging:</strong> Share a URL and reproduce exact output. No &quot;works on my machine&quot;.</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            The only non-deterministic element is the timestamp in the footer, which uses the generation date.
            This is intentional for versioning shared specs.
          </p>
        </Card>
      </section>

      {/* Share Links */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Share Links
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">URL-Encoded Payload Architecture</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Share URLs use <code className="text-primary">lz-string</code> compression with URI-safe encoding:
            </p>
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs font-mono">
{`/s?d=N4IgxgFg... (compressed BuilderWizardState)

encode: JSON.stringify → compressToEncodedURIComponent
decode: decompressFromEncodedURIComponent → JSON.parse`}
            </pre>

            <h4 className="font-semibold text-foreground mt-4">Why URL-encoded instead of database?</h4>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Zero infrastructure:</strong> No database, no auth, no API keys. Deploy anywhere.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Privacy by design:</strong> Data never touches our servers. Users own their URLs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Offline-capable:</strong> Bookmarked URLs work forever. No link rot.</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mt-4">Tradeoffs</h4>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-destructive">−</span>
                <span><strong>URL length:</strong> Complex specs produce long URLs (~2KB). Most browsers/services handle 8KB+.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">−</span>
                <span><strong>No analytics:</strong> We can&apos;t track which specs are popular (privacy tradeoff).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">−</span>
                <span><strong>No versioning:</strong> URL is the version. Editing creates a new URL.</span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* SSR Strategy */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          SSR Strategy
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-3">/builder (Client-Heavy)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Hero/layout: Server-rendered for fast first paint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Wizard form: Client component with <code className="text-primary">Suspense</code> boundary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Skeleton fallback during hydration (~200ms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>localStorage for draft persistence (no SSR)</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-3">/s?d=... (Server-Heavy)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Full SSR: decode → validate → generate on server</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Dynamic OG metadata from decoded spec (productType, primaryObject)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>robots: noindex (share URLs shouldn&apos;t pollute search)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Client components only for copy/print actions</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Validation Strategy */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Validation Strategy
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Zod Schema Validation</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Runtime validation using Zod ensures type safety at system boundaries:
            </p>
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs font-mono">
{`// schema.ts
export const GrowthSpecInputSchema = z.object({
  productType: ProductTypeSchema.or(z.literal('')),
  primaryObject: z.string().min(1).max(50),
  valueAction: z.string().min(1).max(50),
  ttvMinutes: z.string().regex(/^\\d+$/),
  activationRules: z.array(ActivationRuleSchema).min(1),
  coreEvents: z.array(CoreEventSchema).min(1),
  // ...
})`}
            </pre>

            <h4 className="font-semibold text-foreground mt-4">Failure Modes</h4>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Step validation:</strong> Step1Schema, Step2Schema, Step3Schema for progressive form validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Share URL decode failure:</strong> Returns null, renders InvalidShareLink component</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Malformed data:</strong> Type coercion fails gracefully; defaults used where safe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Empty enums:</strong> productType/pricingModel allow empty string for initial state</span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Testing */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <TestTube2 className="h-5 w-5 text-primary" />
          Testing
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Test Coverage</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Tests run via Vitest (<code className="text-primary">pnpm test</code>):</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Unit Tests</h4>
                <ul className="space-y-1">
                  <li>• <code>pluralize()</code> - singular/plural/custom forms</li>
                  <li>• Encoding/decoding round-trips</li>
                  <li>• Schema validation edge cases</li>
                </ul>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Route Tests</h4>
                <ul className="space-y-1">
                  <li>• All static routes return 200</li>
                  <li>• /s with invalid param shows error</li>
                  <li>• /s with valid param renders spec</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              The deterministic generator design means integration tests are effectively unit tests—no
              external dependencies to mock.
            </p>
          </div>
        </Card>
      </section>

      {/* Future Roadmap */}
      <section className="container-wide section-spacing-sm">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Future Roadmap
        </h2>
        <Card className="p-6">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-mono">1.</span>
              <span><strong>Export formats:</strong> PDF export, Notion/Confluence integration via API</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-mono">2.</span>
              <span><strong>Template library:</strong> Pre-built specs for common product types (PLG SaaS, marketplaces, devtools)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-mono">3.</span>
              <span><strong>Diff view:</strong> Compare two specs side-by-side (useful for A/B testing spec variations)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-mono">4.</span>
              <span><strong>Analytics integration:</strong> Generate Amplitude/Mixpanel tracking plan code directly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-mono">5.</span>
              <span><strong>Team collaboration:</strong> Optional authenticated mode with revision history (preserving URL-only mode as default)</span>
            </li>
          </ul>
        </Card>
      </section>

      {/* CTA */}
      <section className="container-wide section-spacing-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">View Source</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The codebase is open. See implementation details in the GitHub repository.
            </p>
            <Button variant="outline" asChild>
              <Link href="https://github.com/ui-d" target="_blank" rel="noopener noreferrer">
                GitHub
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Try the Builder</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              See the architecture in action. Build a spec and inspect the generated URL.
            </p>
            <Button asChild>
              <Link href="/builder">
                Open Builder
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
