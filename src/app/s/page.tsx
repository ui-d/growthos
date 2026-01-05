import { Metadata } from "next"
import { decodeShareableInput } from "@/lib/growth-os/share"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { SharedSpecActions } from "@/components/shared/shared-spec-actions"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const dataParam = params.d

  if (!dataParam || typeof dataParam !== 'string') {
    return {
      title: "Shared Growth Spec - Growth OS",
      description: "View a shared Growth OS configuration",
      robots: {
        index: false,
        follow: true,
      },
      openGraph: {
        title: "Shared Growth Spec - Growth OS",
        description: "View a shared Growth OS configuration",
        url: `${baseUrl}/s`,
        images: ["/og.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Shared Growth Spec - Growth OS",
        description: "View a shared Growth OS configuration",
        images: ["/og.png"],
      },
    }
  }

  try {
    const decoded = decodeShareableInput(dataParam)
    if (decoded) {
      const title = decoded.productType && decoded.primaryObject
        ? `${decoded.productType} - ${decoded.primaryObject} Growth Spec`
        : "Shared Growth Spec"
      const description = decoded.valueAction
        ? `Growth specification for ${decoded.productType || 'product'} focused on ${decoded.valueAction}`
        : "A shared Growth OS configuration with KPIs, activation metrics, and tracking setup"

      return {
        title: `${title} - Growth OS`,
        description,
        robots: {
          index: false,
          follow: true,
        },
        openGraph: {
          title: `${title} - Growth OS`,
          description,
          url: `${baseUrl}/s?d=${dataParam}`,
          images: ["/og.png"],
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: `${title} - Growth OS`,
          description,
          images: ["/og.png"],
        },
        alternates: {
          canonical: `${baseUrl}/s?d=${dataParam}`,
        },
      }
    }
  } catch {
    // Fall through to default metadata
  }

  return {
    title: "Shared Growth Spec - Growth OS",
    description: "View a shared Growth OS configuration",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "Shared Growth Spec - Growth OS",
      description: "View a shared Growth OS configuration",
      url: `${baseUrl}/s`,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shared Growth Spec - Growth OS",
      description: "View a shared Growth OS configuration",
      images: ["/og.png"],
    },
  }
}

function InvalidShareLink() {
  return (
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-2xl">
        <Card className="text-center py-12">
          <CardHeader>
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Invalid or Missing Share Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              This share link is either invalid, expired, or missing the configuration data.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h3 className="font-medium mb-2">How to generate a share link:</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Open the <Link href="/builder" className="text-primary hover:underline">Growth OS Builder</Link></li>
                <li>Configure your growth specification</li>
                <li>Click the &quot;Share&quot; button to generate a link</li>
                <li>Copy and share the generated URL</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild>
                <Link href="/builder">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Open Builder
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/examples">
                  <Share2 className="h-4 w-4 mr-2" />
                  Browse Examples
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function ServerRenderedSpec({ dataParam }: { dataParam: string }) {
  const decoded = decodeShareableInput(dataParam)

  if (!decoded) {
    return <InvalidShareLink />
  }

  // Generate the spec server-side
  const specInput = convertToSpecInput(decoded)
  const { markdown } = generateGrowthSpec(specInput)

  const specTitle = decoded.productType && decoded.primaryObject
    ? `${decoded.productType} - ${decoded.primaryObject} Growth Spec`
    : "Growth OS Specification"

  return (
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/builder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{specTitle}</h1>
          <p className="text-muted-foreground">
            Shared Growth OS configuration
          </p>
        </div>

        {/* Action Buttons - Client Component for interactivity */}
        <SharedSpecActions initialData={decoded} markdown={markdown} dataParam={dataParam} />

        {/* KPI Tree Section */}
        <Card className="mb-6 printable" id="kpi-tree">
          <CardHeader>
            <CardTitle>
              <h2 className="text-xl font-semibold">KPI Tree</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* North Star Metric */}
            {specInput.northStarMetric && (
              <div>
                <h3 className="text-lg font-medium mb-2">North Star Metric</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold text-primary">{specInput.northStarMetric.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{specInput.northStarMetric.description}</p>
                  {specInput.northStarMetric.formula && (
                    <code className="block mt-2 text-xs bg-background p-2 rounded border">{specInput.northStarMetric.formula}</code>
                  )}
                </div>
              </div>
            )}

            {/* Activation Rate */}
            {specInput.activationRate && (
              <div>
                <h3 className="text-lg font-medium mb-2">Activation Rate</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">{specInput.activationRate.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{specInput.activationRate.description}</p>
                  {specInput.activationRate.formula && (
                    <code className="block mt-2 text-xs bg-background p-2 rounded border">{specInput.activationRate.formula}</code>
                  )}
                </div>
              </div>
            )}

            {/* Time to Value */}
            {specInput.timeToValue && (
              <div>
                <h3 className="text-lg font-medium mb-2">Time to Value</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">{specInput.timeToValue.value} {specInput.timeToValue.unit}</p>
                  {specInput.timeToValue.description && (
                    <p className="text-sm text-muted-foreground mt-1">{specInput.timeToValue.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Guardrails */}
            {specInput.guardrails && specInput.guardrails.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Guardrails</h3>
                <div className="grid gap-2">
                  {specInput.guardrails.map((guardrail, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3 flex items-start gap-3">
                      <span className="font-medium">{guardrail.name}:</span>
                      <span className="text-muted-foreground">{guardrail.threshold}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activation Definition Section */}
        {specInput.activationDefinition && (
          <Card className="mb-6 printable" id="activation-definition">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-semibold">Activation Definition</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Event Name</p>
                <p className="font-semibold">{specInput.activationDefinition.event}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Activation Rules</p>
                <ul className="space-y-2">
                  {specInput.activationDefinition.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Formula</p>
                <code className="block mt-1 text-sm bg-muted p-2 rounded">{specInput.activationDefinition.formula}</code>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tracking Plan Section */}
        {specInput.coreEvents && specInput.coreEvents.length > 0 && (
          <Card className="mb-6 printable" id="tracking-plan">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-semibold">Tracking Plan</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specInput.coreEvents.map((event, idx) => (
                  <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    {event.trigger && (
                      <p className="text-xs text-muted-foreground mt-1">Trigger: {event.trigger}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Property Dictionary */}
              {specInput.propertyDictionary && specInput.propertyDictionary.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Property Dictionary</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Property</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                          <th className="text-left py-2 font-medium">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specInput.propertyDictionary.map((prop, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="py-2 pr-4 font-mono text-xs">{prop.property}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{prop.type}</td>
                            <td className="py-2 pr-4">{prop.description}</td>
                            <td className="py-2 font-mono text-xs text-muted-foreground">{prop.example || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dashboard Pack Section */}
        {specInput.dashboardPack && specInput.dashboardPack.length > 0 && (
          <Card className="mb-6 printable" id="dashboard-pack">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-semibold">Dashboard Pack</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {specInput.dashboardPack.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Experiment Card Example */}
        {specInput.experimentExample && (
          <Card className="mb-6 printable" id="experiment-card">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-semibold">Example Experiment</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Hypothesis</p>
                <p>{specInput.experimentExample.hypothesis}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Primary Metric</p>
                  <p className="font-medium">{specInput.experimentExample.metric}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{specInput.experimentExample.duration}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Audience</p>
                <p>{specInput.experimentExample.audience}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Variants</p>
                <ul className="space-y-1">
                  {specInput.experimentExample.variants.map((variant, idx) => (
                    <li key={idx} className="text-sm">• {variant}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Criteria</p>
                <p>{specInput.experimentExample.successCriteria}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Raw Markdown - collapsible */}
        <Card className="printable">
          <CardHeader>
            <CardTitle>
              <h2 className="text-xl font-semibold">Raw Markdown</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 max-h-[400px] overflow-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">{markdown}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function SharedSpecPage({ searchParams }: Props) {
  const params = await searchParams
  const dataParam = params.d

  if (!dataParam || typeof dataParam !== 'string') {
    return <InvalidShareLink />
  }

  return <ServerRenderedSpec dataParam={dataParam} />
}
