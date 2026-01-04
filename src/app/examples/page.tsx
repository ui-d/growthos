'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, Hammer, Rocket, Package, Briefcase, Building2, Sparkles, ArrowRight } from 'lucide-react'
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
          Edit in Builder
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          title="Copy link"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50/50 via-background to-blue-50/50 dark:from-background dark:via-background dark:to-background border-b">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="mr-2 h-3 w-3" />
              Pre-built Templates
            </span>
            <h1 className="heading-primary mb-4">Examples</h1>
            <p className="text-lg text-muted-foreground">
              Open a ready-made spec or load it into the builder.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {Object.keys(categoryIcons).map((category) => (
                <Badge key={category} variant="secondary" className={categoryColors[category as keyof typeof categoryColors]}>
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="container-wide section-spacing">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            {examples.length} example{examples.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container-narrow section-spacing">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <Hammer className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="heading-tertiary mb-4">
                Build Your Custom Growth OS
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our interactive builder to create a growth system tailored to your product and business model.
              </p>
              <Button size="lg" asChild className="group">
                <Link href="/builder">
                  <Hammer className="mr-2 h-5 w-5" />
                  Open Builder
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}