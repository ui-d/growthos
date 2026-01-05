"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, ExternalLink, Check } from "lucide-react"
import { PrintButton } from "@/components/ui/print-button"
import { encodeShareableInput, copyToClipboard } from "@/lib/growth-os/share"
import { convertToSpecInput } from "@/lib/growth-os/converter"
import { generateGrowthSpec } from "@/lib/growth-os/generate"
import { BuilderWizardState } from "@/lib/growth-os/types"

interface SharedSpecContentProps {
  initialData: BuilderWizardState
}

export function SharedSpecContent({ initialData }: SharedSpecContentProps) {
  const router = useRouter()
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  // Generate markdown from the decoded data
  const specInput = convertToSpecInput(initialData)
  const { markdown } = generateGrowthSpec(specInput)

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

  const handleOpenInBuilder = () => {
    const encoded = encodeShareableInput(initialData)
    router.push(`/builder?load=${encoded}`)
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button onClick={handleOpenInBuilder}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Edit in Builder
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Export .md
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

      {/* Generated Specification */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generated Specification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-6 min-h-[400px] max-h-[800px] overflow-auto printable">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {markdown}
            </pre>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
