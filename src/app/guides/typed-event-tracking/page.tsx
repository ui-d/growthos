import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Code, CheckCircle2, AlertTriangle, Server, Monitor, FileType } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Typed Event Tracking with TypeScript - Implementation Guide - Growth OS",
  description: "Build type-safe analytics with TypeScript. Learn naming conventions, required properties, typed event wrappers, and server vs client tracking patterns.",
  openGraph: {
    title: "Typed Event Tracking with TypeScript - Implementation Guide",
    description: "Build type-safe analytics with TypeScript for Mixpanel or PostHog.",
    url: `${baseUrl}/guides/typed-event-tracking`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typed Event Tracking with TypeScript - Implementation Guide",
    description: "Build type-safe analytics with TypeScript for Mixpanel or PostHog.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/guides/typed-event-tracking`,
  },
}

export default function TypedEventTrackingPage() {
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
                    Typed Event Tracking
                  </span>
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                Intermediate
              </span>
              <span className="text-sm text-muted-foreground">18 min read</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Typed Event Tracking with TypeScript
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Eliminate tracking bugs at compile time. This guide shows you how to build a type-safe
              analytics layer for Mixpanel, PostHog, or any analytics provider using TypeScript.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-start gap-4">
              <FileType className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Why This Matters</h2>
                <p className="text-muted-foreground">
                  Untyped analytics calls are the #1 source of data quality issues. A typo in an event name
                  (<code className="text-primary">user_signedup</code> vs <code className="text-primary">user_signed_up</code>)
                  creates a silent failure that only surfaces weeks later when a dashboard shows unexpected drops.
                  Type-safe tracking catches these errors instantly in your IDE.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Naming Conventions */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Naming Conventions
          </h2>

          <p className="text-muted-foreground mb-6">
            Consistent naming enables filtering, grouping, and automated documentation.
            Pick one convention and enforce it with types.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Recommended: Object-Action Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Pattern</th>
                      <th className="text-left py-2 pr-4 font-medium">Examples</th>
                      <th className="text-left py-2 font-medium">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">{`{object}_{action}`}</td>
                      <td className="py-2 pr-4"><code>dashboard_created</code>, <code>report_exported</code></td>
                      <td className="py-2">Core product events</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">{`{object}_{action}_{result}`}</td>
                      <td className="py-2 pr-4"><code>payment_submitted_success</code></td>
                      <td className="py-2">Events with outcomes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">{`page_viewed`}</td>
                      <td className="py-2 pr-4"><code>page_viewed</code> + page property</td>
                      <td className="py-2">Page views (single event type)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary">{`feature_{action}`}</td>
                      <td className="py-2 pr-4"><code>feature_enabled</code>, <code>feature_disabled</code></td>
                      <td className="py-2">Feature flags and toggles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-600 mb-1">Avoid These Anti-Patterns</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <code className="text-destructive">Click_Dashboard_Create</code> — mixing cases, action-first</li>
                  <li>• <code className="text-destructive">createDashboard</code> — camelCase breaks analytics tools</li>
                  <li>• <code className="text-destructive">Dashboard Created</code> — spaces cause query issues</li>
                  <li>• <code className="text-destructive">event_1</code>, <code className="text-destructive">cta_click</code> — vague, non-descriptive names</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Required Properties */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FileType className="h-5 w-5 text-primary" />
            Required Properties
          </h2>

          <p className="text-muted-foreground mb-6">
            Every event should include base context. Define these once in your types and
            include them automatically in your tracking wrapper.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Standard Event Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Property</th>
                      <th className="text-left py-2 pr-4 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">timestamp</td>
                      <td className="py-2 pr-4">ISO8601</td>
                      <td className="py-2">When the event occurred (auto-filled)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">user_id</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Authenticated user identifier</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">anonymous_id</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Pre-auth device identifier</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">session_id</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Current session identifier</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">page_url</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Full URL where event fired</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary">app_version</td>
                      <td className="py-2 pr-4">string</td>
                      <td className="py-2">Deployed app version for debugging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TypeScript Types */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            TypeScript Event Types
          </h2>

          <p className="text-muted-foreground mb-6">
            Define your event schema as TypeScript types. This gives you autocomplete, compile-time
            validation, and self-documenting code.
          </p>

          <Card className="p-6 bg-muted/30 mb-6">
            <h3 className="font-semibold mb-3 font-mono text-sm">lib/analytics/events.ts</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`// Base context included with every event
interface BaseEventContext {
  timestamp: string;
  user_id?: string;
  anonymous_id: string;
  session_id: string;
  page_url: string;
  app_version: string;
}

// Define each event with its specific properties
interface EventSchemas {
  // Lifecycle Events
  user_signed_up: {
    signup_method: 'email' | 'google' | 'github';
    referral_source?: string;
  };
  user_logged_in: {
    login_method: 'email' | 'google' | 'github' | 'sso';
  };
  user_logged_out: Record<string, never>; // No additional props

  // Engagement Events
  dashboard_created: {
    dashboard_id: string;
    template_used: string | null;
    widget_count: number;
  };
  dashboard_shared: {
    dashboard_id: string;
    share_method: 'link' | 'email' | 'embed';
    recipient_count: number;
  };
  report_exported: {
    report_id: string;
    format: 'pdf' | 'csv' | 'xlsx';
    row_count: number;
  };

  // Conversion Events
  subscription_started: {
    plan_id: string;
    plan_name: string;
    billing_cycle: 'monthly' | 'annual';
    trial: boolean;
  };
  payment_completed: {
    amount_cents: number;
    currency: string;
    payment_method: 'card' | 'invoice';
  };

  // Feature Events
  feature_enabled: {
    feature_name: string;
    feature_variant?: string;
  };
}

// Union type of all event names
type EventName = keyof EventSchemas;

// Full event type including context
type TrackedEvent<T extends EventName> = BaseEventContext & {
  event: T;
  properties: EventSchemas[T];
};

export type { EventName, EventSchemas, TrackedEvent, BaseEventContext };`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Tracking Wrapper */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Type-Safe Tracking Wrapper
          </h2>

          <p className="text-muted-foreground mb-6">
            Create a wrapper function that enforces types and adds context automatically.
            This becomes your single entry point for all tracking calls.
          </p>

          <Card className="p-6 bg-muted/30 mb-6">
            <h3 className="font-semibold mb-3 font-mono text-sm">lib/analytics/tracker.ts</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`import type { EventName, EventSchemas } from './events';
import posthog from 'posthog-js'; // or mixpanel, segment, etc.

// Context provider (implement based on your app)
function getBaseContext() {
  return {
    timestamp: new Date().toISOString(),
    user_id: getCurrentUserId(), // from auth context
    anonymous_id: getAnonymousId(), // from cookie/localStorage
    session_id: getSessionId(),
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    app_version: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
  };
}

/**
 * Type-safe event tracking function
 *
 * @example
 * track('dashboard_created', {
 *   dashboard_id: 'dash_123',
 *   template_used: null,
 *   widget_count: 5
 * });
 */
export function track<T extends EventName>(
  event: T,
  properties: EventSchemas[T]
): void {
  const context = getBaseContext();

  // Development: log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, { ...context, ...properties });
  }

  // Skip tracking in test environment
  if (process.env.NODE_ENV === 'test') return;

  // Send to analytics provider
  posthog.capture(event, {
    ...properties,
    // Spread context properties for easy filtering
    $set: {
      last_seen: context.timestamp,
      app_version: context.app_version,
    },
  });
}

// Convenience function for page views
export function trackPageView(pageName: string, properties?: Record<string, unknown>) {
  track('page_viewed' as EventName, {
    page_name: pageName,
    ...properties,
  } as EventSchemas[EventName]);
}`}
            </pre>
          </Card>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3 font-mono text-sm">Usage in Components</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`import { track } from '@/lib/analytics/tracker';

function CreateDashboardButton() {
  const handleCreate = async () => {
    const dashboard = await createDashboard({ template: 'blank' });

    // TypeScript ensures correct properties
    track('dashboard_created', {
      dashboard_id: dashboard.id,
      template_used: null,
      widget_count: 0,
    });

    // TypeScript ERROR: Property 'widgets' does not exist
    // track('dashboard_created', { dashboard_id: '123', widgets: 0 });

    // TypeScript ERROR: Argument of type '"dashboard_made"' not assignable
    // track('dashboard_made', { ... });
  };

  return <button onClick={handleCreate}>Create Dashboard</button>;
}`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Server vs Client Tracking */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Server vs Client Tracking
          </h2>

          <p className="text-muted-foreground mb-6">
            Different events belong in different places. Here&apos;s how to decide where to track.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Client-Side Tracking</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• UI interactions (clicks, hovers, scrolls)</li>
                <li>• Page views and navigation</li>
                <li>• Form field interactions</li>
                <li>• Feature discovery events</li>
                <li>• Error UI displays</li>
              </ul>
              <div className="p-3 bg-muted/50 rounded-lg text-xs">
                <strong>Pros:</strong> Rich context (viewport, referrer, UTM params)
                <br />
                <strong>Cons:</strong> Can be blocked by ad blockers
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Server-Side Tracking</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Conversion events (purchases, signups)</li>
                <li>• Backend state changes</li>
                <li>• API usage and errors</li>
                <li>• Webhook receipts</li>
                <li>• Background job completions</li>
              </ul>
              <div className="p-3 bg-muted/50 rounded-lg text-xs">
                <strong>Pros:</strong> 100% reliable, can&apos;t be blocked
                <br />
                <strong>Cons:</strong> Less browser context available
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3 font-mono text-sm">Server-Side Tracking Example (Next.js API Route)</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`// app/api/dashboard/create/route.ts
import { trackServerEvent } from '@/lib/analytics/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = await getSession(request);
  const body = await request.json();

  const dashboard = await db.dashboard.create({
    data: { ...body, userId },
  });

  // Server-side tracking - always fires
  await trackServerEvent('dashboard_created', userId, {
    dashboard_id: dashboard.id,
    template_used: body.template || null,
    widget_count: 0,
  });

  return NextResponse.json(dashboard);
}

// lib/analytics/server.ts
import { PostHog } from 'posthog-node';

const posthog = new PostHog(process.env.POSTHOG_API_KEY!);

export async function trackServerEvent<T extends EventName>(
  event: T,
  userId: string,
  properties: EventSchemas[T]
) {
  posthog.capture({
    distinctId: userId,
    event,
    properties: {
      ...properties,
      $set: { last_active: new Date().toISOString() },
    },
  });

  // Flush immediately in serverless environments
  await posthog.flush();
}`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Common Mistakes
          </h2>

          <div className="space-y-4">
            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">1.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Using `any` for Properties</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <code className="text-destructive">{`track(event: string, properties: any)`}</code> — defeats the entire purpose
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Use generics with strict event schemas. Accept the initial typing effort.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">2.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Tracking Too Early in the Funnel</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tracking button clicks instead of successful completions.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Track outcomes, not intents. <code className="text-primary">dashboard_created</code> not <code className="text-destructive">create_button_clicked</code>.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">3.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Inconsistent Property Types</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Same property as string sometimes, number other times.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> TypeScript enforces this. Define property types once; they&apos;re always consistent.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">4.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Not Handling Async Tracking</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Navigating away before track call completes.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Use <code className="text-primary">navigator.sendBeacon()</code> for client-side, or flush explicitly on server.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">5.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Duplicating Tracking Logic</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tracking same event in multiple components, risking double-counting.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Track at the data mutation layer (API routes, state actions), not UI components.
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
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Type System</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Define EventSchemas interface with all events</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Create BaseEventContext type for common properties</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Export EventName union type for autocomplete</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Use strict TypeScript (no any, strict null checks)</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Implementation</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Create type-safe track() wrapper function</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Implement context provider for base properties</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up server-side tracking for critical events</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add development logging for debugging</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Validation</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Verify TypeScript catches invalid event names</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Verify TypeScript catches missing required properties</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Test events appear correctly in analytics dashboard</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Document event schema for team reference</span>
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
              <Link href="/guides/segment-tracking-governance">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Segment Governance
              </Link>
            </Button>
            <Button asChild>
              <Link href="/guides/dashboard-pack-implementation">
                Next: Dashboard Packs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
