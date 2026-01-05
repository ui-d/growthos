"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Trash2, FileText, Clock } from "lucide-react"
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
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Recent Specs
          </CardTitle>
          <CardDescription className="text-xs">
            Your saved configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentSpecs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No saved specs yet
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Save your first configuration to see it here
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[280px] pr-2">
              <div className="space-y-2">
                {recentSpecs.map((spec) => (
                  <div
                    key={spec.id}
                    className="group flex items-center justify-between p-2.5 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-medium text-sm truncate">{spec.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(spec.createdAt), 'MMM d, h:mm a')}
                        </p>
                        {spec.input.productType && (
                          <p className="text-xs text-muted-foreground truncate">
                            {spec.input.productType}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLoadSpec(spec)}
                        className="h-7 px-2 text-xs"
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setDeleteConfirmId(spec.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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