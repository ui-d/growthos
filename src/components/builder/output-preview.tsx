"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BuilderWizardState } from "@/lib/growth-os/types"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { Copy, Download, Check } from "lucide-react"
import { PrintButton } from "@/components/ui/print-button"
import { analytics } from "@/lib/analytics"

interface OutputPreviewProps {
  data: BuilderWizardState
}

export function OutputPreview({ data }: OutputPreviewProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)


  const generateMarkdown = () => {
    const lines: string[] = []

    lines.push("# Growth OS Configuration")
    lines.push("")

    // Product Basics
    if (data.productType || data.primaryObject || data.valueAction) {
      lines.push("## Product Overview")
      if (data.productType) lines.push(`- **Product Type:** ${data.productType}`)
      if (data.primaryObject) lines.push(`- **Primary Object:** ${data.primaryObject}`)
      if (data.valueAction) lines.push(`- **Value Action:** ${data.valueAction}`)
      if (data.pricingModel) lines.push(`- **Pricing Model:** ${data.pricingModel}`)
      if (data.ttvMinutes) lines.push(`- **Time to Value:** ${data.ttvMinutes} minutes`)
      lines.push("")
    }

    // Activation
    if (data.activationEventName || data.activationRules.length > 0) {
      lines.push("## Activation Configuration")
      if (data.activationEventName) {
        lines.push(`### Event: ${data.activationEventName}`)
        lines.push("")
      }
      if (data.activationRules.length > 0) {
        lines.push("### Rules")
        data.activationRules.forEach(rule => {
          const label = rule.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
          lines.push(`- ${label}`)
        })
        lines.push("")
      }
    }

    // Tracking
    if (data.coreEvents.length > 0 || data.customEvents.length > 0) {
      lines.push("## Event Tracking")

      if (data.coreEvents.length > 0) {
        lines.push("### Core Events")
        data.coreEvents.forEach(event => {
          const label = event.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
          lines.push(`- ${label}`)
        })
        lines.push("")
      }

      if (data.customEvents.length > 0) {
        lines.push("### Custom Events")
        data.customEvents.forEach(event => {
          lines.push(`- ${event}`)
        })
        lines.push("")
      }
    }

    // Implementation Guide
    if (data.productType && data.primaryObject && data.valueAction) {
      lines.push("## Implementation Guide")
      lines.push("")
      lines.push("### 1. Setup Analytics")
      lines.push("```javascript")
      lines.push("// Initialize your analytics SDK")
      lines.push("import { analytics } from '@/lib/analytics'")
      lines.push("")
      lines.push("// Track core events")
      data.coreEvents.forEach(event => {
        lines.push(`analytics.track('${event}', { /* properties */ })`)
      })
      lines.push("```")
      lines.push("")

      if (data.activationEventName && data.activationRules.length > 0) {
        lines.push("### 2. Track Activation")
        lines.push("```javascript")
        lines.push(`// Check activation criteria`)
        lines.push(`const isActivated = checkActivation({`)
        data.activationRules.forEach(rule => {
          lines.push(`  ${rule}: true,`)
        })
        lines.push(`})`)
        lines.push("")
        lines.push(`if (isActivated) {`)
        lines.push(`  analytics.track('${data.activationEventName}')`)
        lines.push(`}`)
        lines.push("```")
        lines.push("")
      }

      lines.push("### 3. Monitor Metrics")
      lines.push("- Set up dashboards to track:")
      lines.push(`  - ${data.primaryObject} creation rate`)
      lines.push(`  - ${data.valueAction} completion rate`)
      lines.push(`  - Time to value (target: ${data.ttvMinutes} minutes)`)
      if (data.activationEventName) {
        lines.push(`  - Activation rate (${data.activationEventName})`)
      }
    }

    // Use the new generator instead
    const specInput = convertToSpecInput(data)
    const { markdown } = generateGrowthSpec(specInput)
    return markdown
  }

  const handleCopyToClipboard = async () => {
    const markdown = generateMarkdown()
    try {
      await navigator.clipboard.writeText(markdown)
      setCopiedToClipboard(true)
      setTimeout(() => setCopiedToClipboard(false), 2000)

      analytics.trackBuilderCopyMarkdown({
        has_activation: Boolean(data.activationEventName),
        core_events_count: data.coreEvents.length,
        custom_events_count: data.customEvents.length,
        product_type: data.productType
      })
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleDownload = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `growth-os-spec-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    analytics.trackBuilderDownloadMd({
      has_activation: Boolean(data.activationEventName),
      core_events_count: data.coreEvents.length,
      custom_events_count: data.customEvents.length,
      product_type: data.productType
    })
  }

  const hasContent = data.productType || data.primaryObject || data.valueAction

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Output Preview</CardTitle>
        {hasContent && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyToClipboard}
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
                  Copy
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
              Download
            </Button>
            <PrintButton />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-auto printable">
          <pre className="text-sm whitespace-pre-wrap font-mono">
            {generateMarkdown() || "Fill in the wizard to see the generated configuration..."}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}