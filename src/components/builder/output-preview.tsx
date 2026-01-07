"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BuilderWizardState } from "@/lib/growth-os/types"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { FileCode, Eye, Code, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface OutputPreviewProps {
  data: BuilderWizardState
  variant?: "card" | "embedded"
}

export function OutputPreview({ data, variant = "card" }: OutputPreviewProps) {
  const [viewMode, setViewMode] = useState<"rendered" | "markdown">("rendered")

  const markdown = useMemo(() => {
    const specInput = convertToSpecInput(data)
    const { markdown } = generateGrowthSpec(specInput)
    return markdown
  }, [data])

  const hasContent = data.productType || data.primaryObject || data.valueAction

  // Generate summary line from form state
  const summaryParts: string[] = []
  if (data.productType) summaryParts.push(data.productType)
  if (data.primaryObject) summaryParts.push(`Primary: ${data.primaryObject}`)
  if (data.valueAction) summaryParts.push(`Action: ${data.valueAction}`)
  if (data.ttvMinutes) summaryParts.push(`TTV: ${data.ttvMinutes} min`)
  const summaryLine = summaryParts.join(" • ")

  // Simple markdown to HTML renderer
  const renderMarkdown = (md: string) => {
    if (!md) return null

    const lines = md.split("\n")
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLang = ""

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          elements.push(
            <pre key={`code-${index}`} className="bg-muted/70 rounded-md p-3 overflow-x-auto text-xs my-3">
              <code className="text-foreground/90">{codeBlockContent.join("\n")}</code>
            </pre>
          )
          codeBlockContent = []
          inCodeBlock = false
        } else {
          // Start of code block
          inCodeBlock = true
          codeBlockLang = line.slice(3)
        }
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-lg font-bold mt-4 mb-2 text-foreground">{line.slice(2)}</h1>
        )
        return
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-base font-semibold mt-4 mb-2 text-foreground border-b pb-1">{line.slice(3)}</h2>
        )
        return
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-sm font-semibold mt-3 mb-1 text-foreground">{line.slice(4)}</h3>
        )
        return
      }

      // List items
      if (line.startsWith("- ")) {
        const content = line.slice(2)
        // Parse bold text
        const parts = content.split(/(\*\*[^*]+\*\*)/)
        const parsedContent = parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="font-medium">{part.slice(2, -2)}</strong>
          }
          return part
        })
        elements.push(
          <li key={index} className="text-sm text-muted-foreground ml-4 my-0.5 list-disc">{parsedContent}</li>
        )
        return
      }

      // Empty lines
      if (line.trim() === "") {
        elements.push(<div key={index} className="h-2" />)
        return
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="text-sm text-muted-foreground my-1">{line}</p>
      )
    })

    return elements
  }

  // Embedded variant - placeholder style when no content
  if (variant === "embedded") {
    if (!hasContent) {
      return (
        <div className="w-full h-full p-8">
          <div className="w-full h-full border-2 border-dashed border-border/50 dark:border-border/30 rounded-xl flex flex-col items-center justify-center text-center p-12">
            <div className="w-16 h-16 bg-background dark:bg-muted/30 rounded-full flex items-center justify-center shadow-lg mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground italic font-medium">
              Fill in the wizard to see your generated Growth OS configuration...
            </p>
          </div>
        </div>
      )
    }

    // Embedded with content
    return (
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileCode className="h-4 w-4 text-primary" />
            Spec Preview
          </div>
          <div className="flex items-center bg-muted/50 rounded-full p-0.5">
            <button
              onClick={() => setViewMode("rendered")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all",
                viewMode === "rendered"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3 w-3" />
              Rendered
            </button>
            <button
              onClick={() => setViewMode("markdown")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all",
                viewMode === "markdown"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="h-3 w-3" />
              Markdown
            </button>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4 flex-1 overflow-auto border border-border/30 max-h-[500px]">
          {viewMode === "markdown" ? (
            <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap">
              {markdown}
            </pre>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {renderMarkdown(markdown)}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Card variant (default)
  return (
    <Card className="h-full border border-border/40 shadow-md rounded-2xl bg-background">
      <CardHeader className="border-b border-border/30 bg-muted/20 pb-3 rounded-t-2xl">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileCode className="h-4 w-4 text-primary" />
            Spec Preview
          </CardTitle>
          {/* Rendered / Markdown toggle */}
          <div className="flex items-center bg-muted/50 rounded-full p-0.5">
            <button
              onClick={() => setViewMode("rendered")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all",
                viewMode === "rendered"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3 w-3" />
              Rendered
            </button>
            <button
              onClick={() => setViewMode("markdown")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all",
                viewMode === "markdown"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="h-3 w-3" />
              Markdown
            </button>
          </div>
        </div>
        {/* Spec summary line */}
        {hasContent && summaryLine && (
          <p className="text-xs text-muted-foreground mt-2 truncate">
            {summaryLine}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-muted/50 min-h-[400px] lg:min-h-[500px] max-h-[60vh] lg:max-h-[70vh] overflow-auto printable">
          {viewMode === "markdown" ? (
            <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap">
              {markdown || (
                <span className="text-muted-foreground italic">
                  Fill in the wizard to see your generated Growth OS configuration...
                </span>
              )}
            </pre>
          ) : (
            <div className="p-4">
              {hasContent ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {renderMarkdown(markdown)}
                </div>
              ) : (
                <p className="text-muted-foreground italic text-sm">
                  Fill in the wizard to see your generated Growth OS configuration...
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
