'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, Hammer, Rocket, Package, Briefcase, Building2, Sparkles, ArrowRight, Filter, Grid } from 'lucide-react'
import { examples, generateShareUrl, convertExampleToWizardState, type GrowthOSExample, getAllCategories } from '@/lib/growth-os/examples'
import { encodeShareableInput } from '@/lib/growth-os/share'
import { toast } from 'sonner'
import { pluralize } from '@/lib/utils'

const categoryIcons = {
  'SaaS': <Rocket className="h-4 w-4" />,
  'E-commerce': <Package className="h-4 w-4" />,
  'Creator': <Sparkles className="h-4 w-4" />,
  'Agency': <Briefcase className="h-4 w-4" />,
  'B2B': <Building2 className="h-4 w-4" />,
  'General': <Hammer className="h-4 w-4" />
}

const categoryColors = {
  'SaaS': 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400',
  'E-commerce': 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 dark:text-purple-400',
  'Creator': 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:text-pink-400',
  'Agency': 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 dark:text-orange-400',
  'B2B': 'bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400',
  'General': 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 dark:text-gray-400'
}

const categoryDescriptions = {
  'SaaS': 'Software as a Service products with subscription models',
  'E-commerce': 'Online stores, marketplaces, and retail platforms',
  'Creator': 'Content creators, educators, and digital product sellers',
  'Agency': 'Service businesses managing clients and projects',
  'B2B': 'Business-to-business software and developer tools',
  'General': 'Productivity and utility tools for various use cases'
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
    const wizardState = convertExampleToWizardState(example)
    const encoded = encodeShareableInput(wizardState)
    router.push('/builder?load=' + encoded)
  }

  const shareUrl = generateShareUrl(example)

  return (
    <Card className="h-full flex flex-col group hover:shadow-md transition-shadow">
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
          <Badge variant="outline" className="capitalize text-xs">
            {example.input.growth_stage}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{example.name}</CardTitle>
        <CardDescription className="text-sm">
          {example.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="line-clamp-2">
            <span className="font-medium text-foreground">Product:</span>{' '}
            {example.input.product}
          </div>
          <div className="line-clamp-2">
            <span className="font-medium text-foreground">Target:</span>{' '}
            {example.input.target_market}
          </div>
          <div className="line-clamp-2">
            <span className="font-medium text-foreground">Goal:</span>{' '}
            {example.input.goals}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
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
          Edit
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

function CategoryFilter({
  categories,
  selected,
  onChange
}: {
  categories: GrowthOSExample['category'][]
  selected: GrowthOSExample['category'] | 'all'
  onChange: (category: GrowthOSExample['category'] | 'all') => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('all')}
        className="transition-all"
      >
        <Grid className="mr-2 h-4 w-4" />
        All ({examples.length})
      </Button>
      {categories.map((category) => {
        const count = examples.filter(e => e.category === category).length
        return (
          <Button
            key={category}
            variant={selected === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(category)}
            className={`transition-all ${selected === category ? '' : categoryColors[category]}`}
          >
            {categoryIcons[category]}
            <span className="ml-2">{category}</span>
            <span className="ml-1 text-xs opacity-70">({count})</span>
          </Button>
        )
      })}
    </div>
  )
}

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<GrowthOSExample['category'] | 'all'>('all')
  const categories = getAllCategories()

  const filteredExamples = selectedCategory === 'all'
    ? examples
    : examples.filter(e => e.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50/50 via-background to-blue-50/50 dark:from-background dark:via-background dark:to-background">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="mr-2 h-3 w-3" />
              {examples.length} Pre-built Templates
            </span>
            <h1 className="heading-primary mb-4">Growth OS Examples</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Browse real-world growth system examples across different industries. Open any example to view the full spec, or load it into the builder to customize.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
              {categories.map((category) => {
                const count = examples.filter(e => e.category === category).length
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-xl text-left transition-all hover:shadow-md ${
                      selectedCategory === category
                        ? 'ring-2 ring-primary bg-primary/5 shadow-sm'
                        : 'bg-card shadow-sm hover:shadow-md ring-1 ring-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={categoryColors[category].split(' ')[1]}>{categoryIcons[category]}</span>
                      <span className="font-medium text-sm">{category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{count} {pluralize(count, 'example')}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-background/80 backdrop-blur-sm sticky top-16 z-10 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by category:</span>
            </div>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="container-wide section-spacing">
        {selectedCategory !== 'all' && (
          <div className="mb-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-lg ${categoryColors[selectedCategory]}`}>
                {categoryIcons[selectedCategory]}
              </span>
              <div>
                <h2 className="font-semibold">{selectedCategory} Examples</h2>
                <p className="text-sm text-muted-foreground">
                  {categoryDescriptions[selectedCategory]}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredExamples.length} {pluralize(filteredExamples.length, 'example')}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
          {selectedCategory !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Clear filter
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>

        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No examples found for this category.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30">
        <div className="container-narrow section-spacing">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 shadow-lg">
            <CardContent className="p-12 text-center">
              <Hammer className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="heading-tertiary mb-4">
                Build Your Custom Growth OS
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can&apos;t find an example that fits your product? Use our interactive builder to create a growth system tailored to your specific business model and goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="group">
                  <Link href="/builder">
                    <Hammer className="mr-2 h-5 w-5" />
                    Open Builder
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/library">
                    Browse Resources
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
