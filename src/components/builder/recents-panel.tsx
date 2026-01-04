"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Trash2, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SavedSpec } from "@/lib/growth-os/types"
import { getRecentSpecs, deleteRecentSpec } from "@/lib/growth-os/storage"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RecentsPanelProps {
  onLoadSpec: (spec: SavedSpec) => void;
}

export function RecentsPanel({ onLoadSpec }: RecentsPanelProps) {
  const [recentSpecs, setRecentSpecs] = useState<SavedSpec[]>([])
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Load recent specs on mount and when they change
  const loadRecentSpecs = () => {
    setRecentSpecs(getRecentSpecs())
  }

  useEffect(() => {
    // Initial load
    const initialLoad = () => {
      setRecentSpecs(getRecentSpecs())
    }
    initialLoad()

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'growth-os-recent-specs') {
        setRecentSpecs(getRecentSpecs())
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleDelete = (id: string) => {
    deleteRecentSpec(id)
    loadRecentSpecs()
    setDeleteConfirmId(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Specs</CardTitle>
          <CardDescription>
            Your recently saved configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentSpecs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No saved specs yet. Save your current configuration to see it here.
            </p>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {recentSpecs.map((spec) => (
                  <div
                    key={spec.id}
                    className="group flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{spec.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(spec.createdAt), 'MMM d, yyyy h:mm a')}
                        </p>
                        {spec.input.productType && (
                          <p className="text-xs text-muted-foreground">
                            {spec.input.productType} • {spec.input.primaryObject || 'No object'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLoadSpec(spec)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setDeleteConfirmId(spec.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete saved spec?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The saved configuration will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}