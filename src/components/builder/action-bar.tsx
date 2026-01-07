"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BuilderWizardState } from "@/lib/growth-os/types"
import { generateShareUrl, copyToClipboard } from "@/lib/growth-os/share"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { Copy, Download, Share2, FileJson, Printer, Check } from "lucide-react"
import { toast } from "sonner"
import { analytics } from "@/lib/analytics"

interface ActionBarProps {
  wizardData: BuilderWizardState
  variant?: "fixed" | "inline"
}

export function ActionBar({ wizardData, variant = "fixed" }: ActionBarProps) {
  const [copiedMd, setCopiedMd] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const isValid = wizardData.productType && wizardData.primaryObject

  const generateMarkdown = () => {
    const specInput = convertToSpecInput(wizardData)
    const { markdown } = generateGrowthSpec(specInput)
    return markdown
  }

  const handleCopyMarkdown = async () => {
    if (!isValid) {
      toast.error("Fill required fields first")
      return
    }
    const markdown = generateMarkdown()
    try {
      await navigator.clipboard.writeText(markdown)
      setCopiedMd(true)
      toast.success("Markdown copied to clipboard")
      setTimeout(() => setCopiedMd(false), 2000)
      analytics.trackBuilderCopyMarkdown({
        has_activation: Boolean(wizardData.activationEventName),
        core_events_count: wizardData.coreEvents.length,
        custom_events_count: wizardData.customEvents.length,
        product_type: wizardData.productType
      })
    } catch {
      toast.error("Failed to copy")
    }
  }

  const handleDownloadMd = () => {
    if (!isValid) {
      toast.error("Fill required fields first")
      return
    }
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `growth-spec-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Downloaded growth-spec.md")
    analytics.trackBuilderDownloadMd({
      has_activation: Boolean(wizardData.activationEventName),
      core_events_count: wizardData.coreEvents.length,
      custom_events_count: wizardData.customEvents.length,
      product_type: wizardData.productType
    })
  }

  const handleDownloadJson = () => {
    if (!isValid) {
      toast.error("Fill required fields first")
      return
    }
    const specInput = convertToSpecInput(wizardData)
    const blob = new Blob([JSON.stringify(specInput, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `growth-spec-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Downloaded growth-spec.json")
  }

  const handleShareLink = async () => {
    if (!isValid) {
      toast.error("Fill required fields first")
      return
    }
    try {
      const url = generateShareUrl(wizardData)
      const success = await copyToClipboard(url)
      if (success) {
        setCopiedLink(true)
        toast.success("Share link copied to clipboard")
        setTimeout(() => setCopiedLink(false), 2000)
        analytics.trackShareCopyLink({
          has_activation: Boolean(wizardData.activationEventName),
          core_events_count: wizardData.coreEvents.length,
          custom_events_count: wizardData.customEvents.length,
          product_type: wizardData.productType
        })
      }
    } catch {
      toast.error("Failed to generate share link")
    }
  }

  const handlePrint = () => {
    if (!isValid) {
      toast.error("Fill required fields first")
      return
    }
    window.print()
  }

  const buttons = (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyMarkdown}
        disabled={!isValid}
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        title={isValid ? "Copy Markdown" : "Fill required fields first"}
      >
        {copiedMd ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        <span className={variant === "inline" ? "text-xs" : "hidden sm:inline text-xs"}>Copy</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownloadMd}
        disabled={!isValid}
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        title={isValid ? "Download Markdown" : "Fill required fields first"}
      >
        <Download className="h-4 w-4" />
        <span className={variant === "inline" ? "text-xs" : "hidden sm:inline text-xs"}>Download MD</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownloadJson}
        disabled={!isValid}
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        title={isValid ? "Download JSON" : "Fill required fields first"}
      >
        <FileJson className="h-4 w-4" />
        <span className={variant === "inline" ? "text-xs" : "hidden sm:inline text-xs"}>Download JSON</span>
      </Button>
      <div className="h-4 w-px bg-border/50 mx-1 hidden sm:block" />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShareLink}
        disabled={!isValid}
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        title={isValid ? "Copy share link" : "Fill required fields first"}
      >
        {copiedLink ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
        <span className={variant === "inline" ? "text-xs" : "hidden sm:inline text-xs"}>Share</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrint}
        disabled={!isValid}
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        title={isValid ? "Print to PDF" : "Fill required fields first"}
      >
        <Printer className="h-4 w-4" />
        <span className={variant === "inline" ? "text-xs" : "hidden sm:inline text-xs"}>Print</span>
      </Button>
    </>
  )

  // Inline variant - just render buttons directly
  if (variant === "inline") {
    return <div className="flex items-center gap-1">{buttons}</div>
  }

  // Fixed variant - show only on mobile (lg:hidden)
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-t border-border/40 shadow-lg print:hidden">
      <div className="container-full py-3">
        <div className="flex items-center justify-center gap-1.5">
          {buttons}
        </div>
      </div>
    </div>
  )
}
