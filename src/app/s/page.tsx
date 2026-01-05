import { Metadata } from "next"
import { Suspense } from "react"
import { SharedSpecContent } from "@/components/shared/shared-spec-content"
import { decodeShareableInput } from "@/lib/growth-os/share"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

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

function SharedSpecSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading specification...</p>
      </div>
    </div>
  )
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

  const specTitle = decoded.productType && decoded.primaryObject
    ? `${decoded.productType} - ${decoded.primaryObject} Growth Spec`
    : "Growth OS Specification"

  return (
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Header - Server Rendered */}
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

        {/* Configuration Summary - Server Rendered */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuration Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {decoded.productType && (
                <div>
                  <p className="font-medium">Product Type</p>
                  <p className="text-muted-foreground">{decoded.productType}</p>
                </div>
              )}
              {decoded.primaryObject && (
                <div>
                  <p className="font-medium">Primary Object</p>
                  <p className="text-muted-foreground">{decoded.primaryObject}</p>
                </div>
              )}
              {decoded.valueAction && (
                <div>
                  <p className="font-medium">Value Action</p>
                  <p className="text-muted-foreground">{decoded.valueAction}</p>
                </div>
              )}
              {decoded.ttvMinutes && (
                <div>
                  <p className="font-medium">Time-to-Value</p>
                  <p className="text-muted-foreground">{decoded.ttvMinutes} minutes</p>
                </div>
              )}
              {decoded.pricingModel && (
                <div>
                  <p className="font-medium">Pricing Model</p>
                  <p className="text-muted-foreground">{decoded.pricingModel}</p>
                </div>
              )}
              {decoded.activationEventName && (
                <div>
                  <p className="font-medium">Activation Event</p>
                  <p className="text-muted-foreground">{decoded.activationEventName}</p>
                </div>
              )}
            </div>

            {/* Activation Rules */}
            {decoded.activationRules && decoded.activationRules.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Activation Rules</p>
                <div className="flex flex-wrap gap-2">
                  {decoded.activationRules.map((rule) => (
                    <span key={rule} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {rule.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Core Events */}
            {decoded.coreEvents && decoded.coreEvents.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Tracked Events</p>
                <div className="flex flex-wrap gap-2">
                  {decoded.coreEvents.map((event) => (
                    <span key={event} className="px-2 py-1 text-xs bg-muted rounded">
                      {event.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interactive Content - Client Component */}
        <Suspense fallback={<SharedSpecSkeleton />}>
          <SharedSpecContent initialData={decoded} />
        </Suspense>
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
