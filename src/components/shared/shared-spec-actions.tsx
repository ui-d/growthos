"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Download, ExternalLink, Check } from "lucide-react"
import { PrintButton } from "@/components/ui/print-button"
import { copyToClipboard } from "@/lib/growth-os/share"
import { BuilderWizardState } from "@/lib/growth-os/types"

interface SharedSpecActionsProps {
  initialData: BuilderWizardState
  markdown: string
  dataParam: string
}

export function SharedSpecActions({ initialData, markdown, dataParam }: SharedSpecActionsProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

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

  return (
    <div className="flex flex-wrap gap-2 mb-6 print:hidden">
      <Button asChild>
        <Link href={`/builder?d=${dataParam}`}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Edit in Builder
        </Link>
      </Button>
      <Button variant="outline" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download .md
      </Button>
      <Button
        variant="outline"
        onClick={handleCopyMarkdown}
      >
        {copiedToClipboard ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Markdown
          </>
        )}
      </Button>
      <PrintButton />
    </div>
  )
}
