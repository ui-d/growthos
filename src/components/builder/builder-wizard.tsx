"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BuilderWizardState, ProductType, PricingModel, ActivationRule, CoreEvent, SavedSpec } from "@/lib/growth-os/types"
import { Step1Schema, Step2Schema, Step3Schema } from "@/lib/growth-os/schema"
import { QUICK_START_EXAMPLES } from "@/lib/growth-os/quick-start"
import { OutputPreview } from "./output-preview"
import { ActionBar } from "./action-bar"
import { getDraftInput, saveDraftInputDebounced, clearDraft } from "@/lib/growth-os/storage"
import { decodeShareableInput } from "@/lib/growth-os/share"
import { getExampleWizardData } from "@/lib/growth-os/example-wizard-data"
import { RotateCcw, AlertCircle, Check, ChevronRight, ChevronDown, Zap } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { analytics } from "@/lib/analytics"

const ACTIVATION_RULES: { value: ActivationRule; label: string }[] = [
  { value: 'created_primary_object', label: 'Created primary object' },
  { value: 'invited_teammate', label: 'Invited teammate' },
  { value: 'used_key_feature', label: 'Used key feature' },
  { value: 'connected_integration', label: 'Connected integration' },
]

const CORE_EVENTS: { value: CoreEvent; label: string }[] = [
  { value: 'user_signup', label: 'User Signup' },
  { value: 'user_login', label: 'User Login' },
  { value: 'object_created', label: 'Object Created' },
  { value: 'object_updated', label: 'Object Updated' },
  { value: 'object_deleted', label: 'Object Deleted' },
  { value: 'feature_used', label: 'Feature Used' },
  { value: 'integration_connected', label: 'Integration Connected' },
  { value: 'team_member_invited', label: 'Team Member Invited' },
]

const STEPS = [
  { id: 1, name: "Product", description: "Define your product basics" },
  { id: 2, name: "Activation", description: "Set activation rules" },
  { id: 3, name: "Tracking", description: "Choose events to track" },
]

export function BuilderWizard() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [previewOpen, setPreviewOpen] = useState(false)
  const isInitialLoad = useRef(true)

  const getDefaultState = (): BuilderWizardState => ({
    productType: '',
    primaryObject: '',
    valueAction: '',
    pricingModel: '',
    ttvMinutes: '',
    activationEventName: '',
    activationRules: [],
    coreEvents: ['user_signup', 'user_login', 'object_created'],
    customEvents: []
  })

  const [wizardData, setWizardData] = useState<BuilderWizardState>(getDefaultState)

  const validateCurrentStep = () => {
    let schema: z.ZodSchema

    try {
      switch (currentStep) {
        case 1:
          schema = Step1Schema
          break
        case 2:
          schema = Step2Schema
          break
        case 3:
          schema = Step3Schema
          break
        default:
          return true
      }

      schema.parse(wizardData)
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.issues.forEach((err: z.ZodIssue) => {
          const path = err.path.join('.')
          errors[path] = err.message
        })
        setValidationErrors(errors)
      }
      return false
    }
  }


  const updateData = (data: Partial<BuilderWizardState>) => {
    setWizardData(prev => {
      const updated = { ...prev, ...data }
      // Autosave draft to localStorage (debounced)
      saveDraftInputDebounced(updated)

      // Clear validation errors for updated fields
      if (showValidation) {
        const newErrors = { ...validationErrors }
        Object.keys(data).forEach(key => {
          delete newErrors[key]
        })
        setValidationErrors(newErrors)
      }

      return updated
    })
  }

  // Initialize wizard data from various sources after component mounts
  useEffect(() => {
    const initializeWizardData = async () => {
      let initialState: BuilderWizardState | null = null

      // First check if we're loading an example
      const exampleParam = searchParams.get('example')
      if (exampleParam) {
        const exampleWizardState = getExampleWizardData(exampleParam)
        if (exampleWizardState) {
          initialState = exampleWizardState
          saveDraftInputDebounced(exampleWizardState)
          toast.success('Example loaded successfully')
        }
      }

      // Then try to load from URL parameters (shared link - supports both 'd' and 'load' params)
      if (!initialState) {
        const dataParam = searchParams.get('d') || searchParams.get('load')
        if (dataParam) {
          try {
            const decoded = decodeShareableInput(dataParam)
            if (decoded) {
              initialState = decoded
              toast.success('Configuration loaded from shared link')
            }
          } catch (error) {
            console.error('Failed to load from URL:', error)
            toast.error('Invalid share link')
          }
        }
      }

      // Then try to load draft from localStorage
      if (!initialState) {
        const draft = getDraftInput()
        if (draft) {
          initialState = draft
        }
      }

      // Update wizard data if we found something to load
      if (initialState) {
        setWizardData(initialState)
      }

      // Clear the initial load flag and initialization state
      isInitialLoad.current = false
      setIsInitializing(false)
    }

    initializeWizardData()
  }, [searchParams])

  const handleLoadQuickStart = (input: BuilderWizardState) => {
    setWizardData(input)
    setCurrentStep(1)
    saveDraftInputDebounced(input)
    toast.success('Example loaded')
  }

  const handleReset = () => {
    const defaultState: BuilderWizardState = {
      productType: '',
      primaryObject: '',
      valueAction: '',
      pricingModel: '',
      ttvMinutes: '',
      activationEventName: '',
      activationRules: [],
      coreEvents: ['user_signup', 'user_login', 'object_created'],
      customEvents: []
    }
    setWizardData(defaultState)
    setCurrentStep(1)
    clearDraft()
  }

  const renderFieldError = (fieldPath: string) => {
    if (showValidation && validationErrors[fieldPath]) {
      return (
        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validationErrors[fieldPath]}
        </p>
      )
    }
    return null
  }

  const handleNext = () => {
    setShowValidation(true)
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        setShowValidation(false)
      } else if (currentStep === 3) {
        analytics.trackBuilderGenerate({
          product_type: wizardData.productType,
          has_activation: Boolean(wizardData.activationEventName),
          activation_rules_count: wizardData.activationRules.length,
          core_events_count: wizardData.coreEvents.length,
          custom_events_count: wizardData.customEvents.length,
          ttv_minutes: parseInt(wizardData.ttvMinutes) || 0,
          pricing_model: wizardData.pricingModel
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleActivationRuleToggle = (rule: ActivationRule, checked: boolean) => {
    if (checked) {
      updateData({ activationRules: [...wizardData.activationRules, rule] })
    } else {
      updateData({ activationRules: wizardData.activationRules.filter(r => r !== rule) })
    }
  }

  const handleCoreEventToggle = (event: CoreEvent, checked: boolean) => {
    if (checked) {
      updateData({ coreEvents: [...wizardData.coreEvents, event] })
    } else {
      updateData({ coreEvents: wizardData.coreEvents.filter(e => e !== event) })
    }
  }

  const handleCustomEventsChange = (value: string) => {
    const events = value.split('\n').filter(e => e.trim())
    updateData({ customEvents: events })
  }

  const isStep1Valid = () => {
    try {
      Step1Schema.parse(wizardData)
      return true
    } catch {
      return false
    }
  }

  const isStep2Valid = () => {
    try {
      Step2Schema.parse(wizardData)
      return true
    } catch {
      return false
    }
  }

  if (isInitializing) {
    return (
      <div className="space-y-6">
        {/* Step indicator skeleton - Modern Pill Style */}
        <nav aria-label="Progress" className="mb-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center bg-muted/50 rounded-full p-1 gap-1">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    step.id === 1
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                    step.id === 1
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.id}
                  </span>
                  <span className="hidden sm:inline">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Two-pane skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/40 bg-background shadow-sm p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-28 bg-muted rounded animate-pulse"></div>
                <div className="h-11 w-full bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/40 bg-background shadow-md overflow-hidden">
              <div className="border-b border-border/30 bg-muted/20 p-4">
                <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="bg-muted/30 min-h-[400px] p-4 space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`h-4 bg-muted/50 rounded animate-pulse`} style={{ width: `${60 + Math.random() * 40}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Quick Start Examples */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Quick start:
            </span>
            {QUICK_START_EXAMPLES.map((example) => (
              <Button
                key={example.id}
                variant="outline"
                size="sm"
                onClick={() => handleLoadQuickStart(example.input)}
                className="text-xs"
              >
                {example.name}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Step Indicator - Modern Pill Style */}
        <nav aria-label="Progress" className="mb-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center bg-muted/50 rounded-full p-1 gap-1">
              {STEPS.map((step) => (
                <button
                  key={step.name}
                  onClick={() => {
                    if (step.id < currentStep) {
                      setCurrentStep(step.id)
                    } else if (step.id === currentStep + 1 && validateCurrentStep()) {
                      setCurrentStep(step.id)
                    }
                  }}
                  aria-current={currentStep === step.id ? "step" : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    currentStep === step.id
                      ? 'bg-background text-foreground shadow-sm'
                      : currentStep > step.id
                      ? 'text-foreground/70 hover:text-foreground'
                      : 'text-muted-foreground hover:text-foreground/70'
                  }`}
                >
                  {currentStep > step.id ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Wizard Form */}
          <div>
            <Card className="border border-border/40 shadow-sm rounded-2xl bg-background">
              <CardHeader className="border-b border-border/30 bg-muted/20 rounded-t-2xl">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground">
                    {currentStep === 1 && "Product Basics"}
                    {currentStep === 2 && "Activation Rules"}
                    {currentStep === 3 && "Event Tracking"}
                  </CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">
                    {currentStep === 1 && "Define your core product and value moment"}
                    {currentStep === 2 && "Set what must happen within the time-to-value window"}
                    {currentStep === 3 && "Choose events to track user behavior and growth metrics"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="product-type" className="text-sm font-medium text-foreground">Product Type</Label>
                      <Select value={wizardData.productType} onValueChange={(value: ProductType) => updateData({ productType: value })}>
                        <SelectTrigger id="product-type" className={`h-11 ${showValidation && validationErrors.productType ? "border-destructive ring-destructive/20 ring-2" : ""}`}>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B2B SaaS">B2B SaaS</SelectItem>
                          <SelectItem value="Devtool">Devtool</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderFieldError('productType')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primary-object" className="text-sm font-medium text-foreground">Primary Object</Label>
                      <Input
                        id="primary-object"
                        placeholder="e.g., Project, Workspace, Dashboard"
                        value={wizardData.primaryObject}
                        onChange={(e) => updateData({ primaryObject: e.target.value })}
                        className={`h-11 ${showValidation && validationErrors.primaryObject ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('primaryObject')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="value-action" className="text-sm font-medium text-foreground">Value Action</Label>
                      <Input
                        id="value-action"
                        placeholder="e.g., Deploy, Analyze, Send"
                        value={wizardData.valueAction}
                        onChange={(e) => updateData({ valueAction: e.target.value })}
                        className={`h-11 ${showValidation && validationErrors.valueAction ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('valueAction')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricing-model" className="text-sm font-medium text-foreground">Pricing Model</Label>
                      <Select value={wizardData.pricingModel} onValueChange={(value: PricingModel) => updateData({ pricingModel: value })}>
                        <SelectTrigger id="pricing-model" className={`h-11 ${showValidation && validationErrors.pricingModel ? "border-destructive ring-destructive/20 ring-2" : ""}`}>
                          <SelectValue placeholder="Select pricing model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Subscription">Subscription</SelectItem>
                          <SelectItem value="Usage-based">Usage-based</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="One-time">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderFieldError('pricingModel')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ttv-minutes" className="text-sm font-medium text-foreground">Time-to-Value (TTV)</Label>
                      <div className="relative">
                        <Input
                          id="ttv-minutes"
                          type="number"
                          placeholder="e.g., 5, 10, 30"
                          value={wizardData.ttvMinutes}
                          onChange={(e) => updateData({ ttvMinutes: e.target.value })}
                          className={`h-11 pr-16 ${showValidation && validationErrors.ttvMinutes ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          minutes
                        </span>
                      </div>
                      {renderFieldError('ttvMinutes')}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="activation-event" className="text-sm font-medium text-foreground">Activation Event Name</Label>
                      <Input
                        id="activation-event"
                        placeholder="e.g., First Deployment, Setup Complete"
                        value={wizardData.activationEventName}
                        onChange={(e) => updateData({ activationEventName: e.target.value })}
                        className={`h-11 ${showValidation && validationErrors.activationEventName ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('activationEventName')}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">Activation Rules</Label>
                      <div className="grid gap-3 pt-1">
                        {ACTIVATION_RULES.map((rule) => (
                          <div
                            key={rule.value}
                            className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                              wizardData.activationRules.includes(rule.value) ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleActivationRuleToggle(rule.value, !wizardData.activationRules.includes(rule.value))}
                          >
                            <Checkbox
                              id={rule.value}
                              checked={wizardData.activationRules.includes(rule.value)}
                              onCheckedChange={(checked) => handleActivationRuleToggle(rule.value, checked as boolean)}
                            />
                            <Label
                              htmlFor={rule.value}
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {rule.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {renderFieldError('activationRules')}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">Core Events</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {CORE_EVENTS.map((event) => (
                          <div
                            key={event.value}
                            className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                              wizardData.coreEvents.includes(event.value) ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleCoreEventToggle(event.value, !wizardData.coreEvents.includes(event.value))}
                          >
                            <Checkbox
                              id={event.value}
                              checked={wizardData.coreEvents.includes(event.value)}
                              onCheckedChange={(checked) => handleCoreEventToggle(event.value, checked as boolean)}
                            />
                            <Label
                              htmlFor={event.value}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {event.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {renderFieldError('coreEvents')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custom-events" className="text-sm font-medium text-foreground">Custom Events</Label>
                      <p className="text-xs text-muted-foreground">Add custom events, one per line</p>
                      <Textarea
                        id="custom-events"
                        placeholder="payment_completed&#10;subscription_upgraded&#10;feature_enabled"
                        rows={4}
                        value={wizardData.customEvents.join('\n')}
                        onChange={(e) => handleCustomEventsChange(e.target.value)}
                        className={`resize-none ${showValidation && validationErrors.customEvents ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('customEvents')}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border/30 bg-muted/20 mt-6 rounded-b-2xl">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !isStep1Valid()) ||
                    (currentStep === 2 && !isStep2Valid()) ||
                    currentStep === 3
                  }
                  className="gap-2"
                >
                  {currentStep === 3 ? 'Complete' : 'Next'}
                  {currentStep < 3 && <ChevronRight className="h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right - Live Preview (Desktop: sticky, Mobile: collapsible) */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-24">
              <OutputPreview data={wizardData} />
            </div>
          </div>

          {/* Mobile Preview - Collapsible */}
          <div className="lg:hidden">
            <Collapsible open={previewOpen} onOpenChange={setPreviewOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>Live Preview</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${previewOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <OutputPreview data={wizardData} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <ActionBar wizardData={wizardData} />
    </>
  )
}
