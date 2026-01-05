"use client"

import { useState } from "react"
import { Share2, Copy, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BuilderWizardState } from "@/lib/growth-os/types"
import { generateShareUrl, copyToClipboard } from "@/lib/growth-os/share"
import { toast } from "sonner"
import { analytics } from "@/lib/analytics"

interface ShareLinkDialogProps {
  wizardData: BuilderWizardState;
  disabled?: boolean;
}

export function ShareLinkDialog({ wizardData, disabled }: ShareLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerateLink = () => {
    try {
      const url = generateShareUrl(wizardData)
      setShareUrl(url)
      setOpen(true)
    } catch (error) {
      console.error('Failed to generate share link:', error)
      toast.error("Failed to generate share link")
    }
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      setCopied(true)
      toast.success("Share link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)

      analytics.trackShareCopyLink({
        has_activation: Boolean(wizardData.activationEventName),
        core_events_count: wizardData.coreEvents.length,
        custom_events_count: wizardData.customEvents.length,
        product_type: wizardData.productType
      })
    } else {
      toast.error("Failed to copy link to clipboard")
    }
  }

  const handleOpenInNewTab = () => {
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  const isValid = () => {
    // Check if there's meaningful data to share
    return wizardData.productType && wizardData.primaryObject
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateLink}
          disabled={disabled || !isValid()}
          className="w-full justify-start"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Configuration</DialogTitle>
          <DialogDescription>
            Generate a shareable link to this growth configuration. Anyone with the link can view the generated specification.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="share-url">Shareable URL</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
                placeholder="Generating link..."
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                disabled={!shareUrl}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              The link contains your configuration data compressed in the URL. No data is stored on servers.
            </p>
          </div>

          {wizardData && (
            <div className="text-sm bg-muted p-3 rounded space-y-1">
              <p className="font-medium">Configuration includes:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {wizardData.productType && <li>Product Type: {wizardData.productType}</li>}
                {wizardData.primaryObject && <li>Primary object: {wizardData.primaryObject}</li>}
                {wizardData.valueAction && <li>Value action: {wizardData.valueAction}</li>}
                {wizardData.activationEventName && <li>Activation event: {wizardData.activationEventName}</li>}
                {wizardData.coreEvents.length > 0 && <li>{wizardData.coreEvents.length} Core Events</li>}
                {wizardData.customEvents.length > 0 && <li>{wizardData.customEvents.length} Custom Events</li>}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleOpenInNewTab} disabled={!shareUrl}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Preview
          </Button>
          <Button onClick={() => setOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}