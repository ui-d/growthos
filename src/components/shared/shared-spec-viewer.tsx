"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, ArrowLeft, ExternalLink, AlertCircle, Check } from "lucide-react"
import { PrintButton } from "@/components/ui/print-button"
import { decodeShareableInput, copyToClipboard, encodeShareableInput } from "@/lib/growth-os/share"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { BuilderWizardState } from "@/lib/growth-os/types"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SharedSpecViewer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wizardData, setWizardData] = useState<BuilderWizardState | null>(null)
  const [markdown, setMarkdown] = useState("")
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  useEffect(() => {
    const processData = async () => {
      const dataParam = searchParams.get('d')

      if (!dataParam) {
        setError("Invalid share link")
        setLoading(false)
        return
      }

      try {
        const decoded = decodeShareableInput(dataParam)
        if (!decoded) {
          setError("Invalid or corrupted share link")
          setLoading(false)
          return
        }

        setWizardData(decoded)

        // Generate markdown from the decoded data
        const specInput = convertToSpecInput(decoded)
        const { markdown: generatedMarkdown } = generateGrowthSpec(specInput)
        setMarkdown(generatedMarkdown)
        setLoading(false)
      } catch (err) {
        console.error('Failed to decode shared data:', err)
        setError("Invalid share link")
        setLoading(false)
      }
    }

    processData()
  }, [searchParams])

  const handleCopyMarkdown = async () => {
    const success = await copyToClipboard(markdown)
    if (success) {
      setCopiedToClipboard(true)
      setTimeout(() => setCopiedToClipboard(false), 2000)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `growth-os-spec-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleBackToBuilder = () => {
    router.push('/builder')
  }

  const handleOpenInBuilder = () => {
    if (wizardData) {
      // Encode the data and redirect to builder with it
      const encoded = encodeShareableInput(wizardData)
      router.push(`/builder?load=${encoded}`)
    }
  }

  if (loading) {
    return (
      <div className="container py-8 md:py-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading shared configuration...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8 md:py-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex gap-4">
              <Button onClick={handleBackToBuilder} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const specTitle = wizardData?.productType && wizardData?.primaryObject
    ? `${wizardData.productType} - ${wizardData.primaryObject} Growth Spec`
    : "Growth OS Specification"

  return (
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button onClick={handleBackToBuilder} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
            <Button onClick={handleOpenInBuilder} variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Builder
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">{specTitle}</h1>
          <p className="text-muted-foreground">
            Shared Growth OS configuration
          </p>
        </div>

        {/* Configuration Summary */}
        {wizardData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {wizardData.productType && (
                  <div>
                    <p className="font-medium">Product Type</p>
                    <p className="text-muted-foreground">{wizardData.productType}</p>
                  </div>
                )}
                {wizardData.primaryObject && (
                  <div>
                    <p className="font-medium">Primary object</p>
                    <p className="text-muted-foreground">{wizardData.primaryObject}</p>
                  </div>
                )}
                {wizardData.valueAction && (
                  <div>
                    <p className="font-medium">Value action</p>
                    <p className="text-muted-foreground">{wizardData.valueAction}</p>
                  </div>
                )}
                {wizardData.ttvMinutes && (
                  <div>
                    <p className="font-medium">Time-to-Value (TTV)</p>
                    <p className="text-muted-foreground">{wizardData.ttvMinutes} minutes</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Specification */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Specification</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyMarkdown}
                className="gap-2"
              >
                {copiedToClipboard ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Markdown
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download .md
              </Button>
              <PrintButton />
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-6 min-h-[400px] max-h-[800px] overflow-auto printable">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {markdown}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}