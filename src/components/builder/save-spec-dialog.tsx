"use client"

import { useState } from "react"
import { Save } from "lucide-react"
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
import { BuilderWizardState, SavedSpec } from "@/lib/growth-os/types"
import { saveRecentSpec } from "@/lib/growth-os/storage"

interface SaveSpecDialogProps {
  wizardData: BuilderWizardState;
  onSaved?: () => void;
}

export function SaveSpecDialog({ wizardData, onSaved }: SaveSpecDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  const handleSave = () => {
    if (!name.trim()) return

    const spec: SavedSpec = {
      id: `spec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      createdAt: Date.now(),
      input: wizardData,
    }

    saveRecentSpec(spec)
    setOpen(false)
    setName("")
    onSaved?.()
  }

  const isValid = () => {
    // Check if there's meaningful data to save
    return wizardData.productType && wizardData.primaryObject && name.trim()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Save className="h-4 w-4 mr-2" />
          Save to Recents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Configuration</DialogTitle>
          <DialogDescription>
            Give your configuration a name to save it for later use
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="spec-name">Name</Label>
            <Input
              id="spec-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Production Config v2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isValid()) {
                  handleSave()
                }
              }}
            />
          </div>
          {wizardData.productType && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Type:</span> {wizardData.productType}</p>
              {wizardData.primaryObject && (
                <p><span className="font-medium">Object:</span> {wizardData.primaryObject}</p>
              )}
              {wizardData.pricingModel && (
                <p><span className="font-medium">Pricing:</span> {wizardData.pricingModel}</p>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isValid()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}