'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, Hammer, Rocket, Package, Briefcase, Building2, Sparkles } from 'lucide-react'
import { examples, generateShareUrl, type GrowthOSExample } from '@/lib/growth-os/examples'
import { toast } from 'sonner'

const categoryIcons = {
  'SaaS': <Rocket className="h-4 w-4" />,
  'E-commerce': <Package className="h-4 w-4" />,
  'Creator': <Sparkles className="h-4 w-4" />,
  'Agency': <Briefcase className="h-4 w-4" />,
  'B2B': <Building2 className="h-4 w-4" />,
  'General': <Hammer className="h-4 w-4" />
}

const categoryColors = {
  'SaaS': 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  'E-commerce': 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
  'Creator': 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20',
  'Agency': 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20',
  'B2B': 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
  'General': 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20'
}

function ExampleCard({ example }: { example: GrowthOSExample }) {
  const router = useRouter()

  const handleCopyLink = async () => {
    const shareUrl = generateShareUrl(example)
    const fullUrl = `${window.location.origin}${shareUrl}`

    try {
      await navigator.clipboard.writeText(fullUrl)
      toast.success('Share link has been copied to clipboard')
    } catch {
      toast.error('Failed to copy link. Please try again.')
    }
  }

  const handleOpenInBuilder = () => {
    router.push('/builder?example=' + example.id)
  }

  const shareUrl = generateShareUrl(example)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className={`${categoryColors[example.category]} border-0`}
          >
            <span className="flex items-center gap-1">
              {categoryIcons[example.category]}
              {example.category}
            </span>
          </Badge>
        </div>
        <CardTitle className="text-xl">{example.name}</CardTitle>
        <CardDescription className="text-sm">
          {example.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Stage:</span>{' '}
            <span className="capitalize">{example.input.growth_stage}</span>
          </div>
          <div className="line-clamp-2">
            <span className="font-medium">Product:</span>{' '}
            {example.input.product}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          asChild
          className="flex-1"
        >
          <Link href={shareUrl}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInBuilder}
          className="flex-1"
        >
          <Hammer className="mr-2 h-4 w-4" />
          Open in Builder
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          title="Copy share link"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ExamplesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Growth OS Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore ready-to-use growth operating systems for different business models.
            Open them to see the full spec or customize them in the builder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to create your own custom Growth OS?
          </p>
          <Button size="lg" asChild>
            <Link href="/builder">
              <Hammer className="mr-2 h-5 w-5" />
              Open Builder
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}