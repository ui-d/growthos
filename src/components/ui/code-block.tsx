"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <Card className={cn("overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <span className="text-xs font-mono text-primary font-semibold">{filename}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
      <div className="p-4 overflow-x-auto bg-muted/30">
        <pre className="text-sm font-mono">
          <code>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted-foreground mr-4 select-none">
                    {String(i + 1).padStart(3, ' ')}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line, language) }} />
                </div>
              ))
            ) : (
              <span dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }} />
            )}
          </code>
        </pre>
      </div>
    </Card>
  )
}

function highlightSyntax(code: string, language: string): string {
  // Simple syntax highlighting
  if (language === 'html' || language === 'jsx' || language === 'tsx') {
    return code
      .replace(/(&lt;\/?)(\w+)/g, '<span class="text-purple-600">$1$2</span>')
      .replace(/(\w+)=/g, '<span class="text-blue-600">$1</span>=')
      .replace(/"([^"]*)"/g, '"<span class="text-green-600">$1</span>"')
  }

  return code
}