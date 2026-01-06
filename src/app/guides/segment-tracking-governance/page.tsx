import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Database, CheckCircle2, AlertTriangle, FileCode, GitBranch, Shield } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Segment Tracking & Governance - Implementation Guide - Growth OS",
  description: "A comprehensive guide to implementing Segment tracking with proper governance, event dictionaries, environment management, and spec review workflows.",
  openGraph: {
    title: "Segment Tracking & Governance - Implementation Guide",
    description: "A comprehensive guide to implementing Segment tracking with proper governance.",
    url: `${baseUrl}/guides/segment-tracking-governance`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segment Tracking & Governance - Implementation Guide",
    description: "A comprehensive guide to implementing Segment tracking with proper governance.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/guides/segment-tracking-governance`,
  },
}

export default function SegmentTrackingGovernancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex mb-6">
              <ol className="flex items-center space-x-2 border border-primary/20 rounded-full px-4 py-1.5 w-fit bg-primary/5">
                <li>
                  <Link
                    href="/guides"
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-primary w-3 h-3 mx-1" />
                  <span className="text-xs font-medium text-primary">
                    Segment Tracking & Governance
                  </span>
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                Intermediate
              </span>
              <span className="text-sm text-muted-foreground">20 min read</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Segment Tracking & Governance
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Build a scalable, maintainable tracking implementation with proper governance.
              This guide covers event dictionaries, environment management, spec reviews, and common pitfalls.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Why This Matters</h2>
                <p className="text-muted-foreground">
                  Poor tracking governance leads to data debt: inconsistent event names, missing properties,
                  broken dashboards, and analytics teams spending 60%+ of their time cleaning data instead of
                  generating insights. A well-governed tracking plan reduces data quality issues by 80% and
                  cuts onboarding time for new engineers by half.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Event & Property Dictionary */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Event & Property Dictionary
          </h2>

          <p className="text-muted-foreground mb-6">
            Your event dictionary is the single source of truth. Every tracked event must be documented
            before implementation. Here&apos;s the structure:
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Event Dictionary Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Field</th>
                      <th className="text-left py-2 pr-4 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">event_name</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Snake_case, verb_noun format (e.g., <code className="text-primary">dashboard_created</code>)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">category</td>
                      <td className="py-2 pr-4">enum</td>
                      <td className="py-2">lifecycle | engagement | conversion | system</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">description</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">When this event fires and what it represents</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">properties</td>
                      <td className="py-2 pr-4">object[]</td>
                      <td className="py-2">Array of property definitions with name, type, required flag</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">owner</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Team or person responsible for this event</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary">destinations</td>
                      <td className="py-2 pr-4">string[]</td>
                      <td className="py-2">Which Segment destinations receive this event</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Example Event Definition</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`{
  "event_name": "dashboard_created",
  "category": "engagement",
  "description": "Fires when user successfully creates a new dashboard",
  "properties": [
    { "name": "dashboard_id", "type": "string", "required": true },
    { "name": "template_used", "type": "string", "required": false },
    { "name": "widget_count", "type": "integer", "required": true },
    { "name": "creation_method", "type": "enum", "values": ["scratch", "template", "duplicate"], "required": true }
  ],
  "owner": "product-analytics",
  "destinations": ["amplitude", "bigquery", "intercom"]
}`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Environment Management */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Environment Management (Prod vs Stage)
          </h2>

          <p className="text-muted-foreground mb-6">
            Segment supports multiple write keys for environment separation. The goal: never pollute
            production data with test events.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Production
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write key: <code className="text-primary">prod_xxx</code></li>
                <li>• Real user data only</li>
                <li>• All destinations enabled</li>
                <li>• Strict schema enforcement</li>
                <li>• Violations logged and alerted</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                Staging / Development
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write key: <code className="text-primary">stage_xxx</code></li>
                <li>• Test and QA data</li>
                <li>• Limited destinations (dev warehouse only)</li>
                <li>• Schema validation in warning mode</li>
                <li>• Safe for experimentation</li>
              </ul>
            </Card>
          </div>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Environment Configuration</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`// lib/analytics/config.ts
const SEGMENT_KEYS = {
  production: process.env.SEGMENT_WRITE_KEY_PROD,
  staging: process.env.SEGMENT_WRITE_KEY_STAGE,
  development: process.env.SEGMENT_WRITE_KEY_DEV,
} as const;

export function getSegmentWriteKey(): string {
  const env = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === 'production') return SEGMENT_KEYS.production!;
  if (vercelEnv === 'preview') return SEGMENT_KEYS.staging!;
  return SEGMENT_KEYS.development!;
}`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Spec Review Workflow */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Spec Review Workflow
          </h2>

          <p className="text-muted-foreground mb-6">
            Every new event or property change should go through review. This prevents naming collisions,
            ensures consistency, and maintains data quality.
          </p>

          <div className="space-y-4 mb-6">
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">1</span>
                <div>
                  <h4 className="font-medium mb-1">Propose Event in Tracking Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Add new event to your tracking plan document (Notion, Confluence, or YAML file in repo).
                    Include all required fields from the dictionary schema.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">2</span>
                <div>
                  <h4 className="font-medium mb-1">Review Checklist</h4>
                  <p className="text-sm text-muted-foreground">
                    Reviewer checks: naming convention compliance, property completeness, no duplicate events,
                    correct category assignment, destination configuration.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">3</span>
                <div>
                  <h4 className="font-medium mb-1">Add to Segment Protocol Schema</h4>
                  <p className="text-sm text-muted-foreground">
                    Once approved, add the event to your Segment Protocols tracking plan. This enables
                    schema enforcement and violation alerts.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">4</span>
                <div>
                  <h4 className="font-medium mb-1">Implement and QA in Staging</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement the tracking call, verify in staging Segment debugger, check property values
                    are populating correctly.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">5</span>
                <div>
                  <h4 className="font-medium mb-1">Merge and Monitor</h4>
                  <p className="text-sm text-muted-foreground">
                    Deploy to production, monitor Segment debugger for first events, verify data flows
                    to all configured destinations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Failure Modes */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Common Failure Modes
          </h2>

          <div className="space-y-4">
            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">1.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Inconsistent Naming</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <code className="text-destructive">DashboardCreated</code> vs <code className="text-destructive">dashboard_created</code> vs <code className="text-destructive">dashboard-created</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Enforce snake_case with linting. Add pre-commit hooks that validate event names.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">2.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Missing Required Properties</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Events fire without critical context (user_id, timestamp, object_id).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Use typed wrappers that require properties. Enable Segment Protocol violations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">3.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Test Data in Production</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Developer forgets to switch write key, polluting prod with test events.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Environment-based configuration (not manual). CI checks for hardcoded keys.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">4.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Property Type Drift</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Same property sent as string sometimes, number other times (<code className="text-destructive">&quot;5&quot;</code> vs <code className="text-destructive">5</code>).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> TypeScript types for all events. Runtime validation before track calls.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">5.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Orphaned Events</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Events that fire but no one uses—cluttering dashboards and costing storage.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Quarterly audit. Add &quot;last_used&quot; metadata. Archive events with no queries for 90 days.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Checklist */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Implementation Checklist
          </h2>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Setup</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Create event dictionary document with schema</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up separate Segment sources for prod/staging/dev</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Configure environment-based write key selection</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Enable Segment Protocols for schema enforcement</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Process</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Document spec review workflow with RACI</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Create PR template for tracking changes</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up Slack alerts for schema violations</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Schedule quarterly tracking plan audits</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Quality</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add TypeScript types for all events</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Implement pre-commit hooks for naming validation</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add integration tests for critical tracking flows</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Create dashboard for tracking health metrics</span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Navigation */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center pt-8 border-t">
            <Button variant="outline" asChild>
              <Link href="/guides">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guides
              </Link>
            </Button>
            <Button asChild>
              <Link href="/guides/typed-event-tracking">
                Next: Typed Event Tracking
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
