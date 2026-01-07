"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSource, setShowSource] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          fontFamily: "inherit",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 15,
          },
        })

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)

        if (isMounted) {
          setSvg(renderedSvg)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to render diagram")
          setSvg(null)
          setShowSource(true)
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [chart])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chart)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-xl border border-border/40 overflow-hidden", className)}>
      {/* Rendered Diagram */}
      {svg && (
        <div
          ref={containerRef}
          className="p-6 bg-muted/20 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20">
          <div className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="text-sm">
              <span className="font-medium">Diagram rendering failed.</span>
              <span className="text-amber-600 dark:text-amber-400 ml-1">
                Showing source code below.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsible Source Code */}
      <div className="border-t border-border/40">
        <button
          onClick={() => setShowSource(!showSource)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <span>{showSource ? "Hide" : "Show"} Mermaid source</span>
          {showSource ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showSource && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="absolute top-2 right-2 h-8 px-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <pre className="p-4 bg-muted/50 overflow-x-auto text-sm font-mono text-muted-foreground">
              <code>{chart}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
