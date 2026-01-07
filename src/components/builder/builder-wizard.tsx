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
        {/* Quick start skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-36 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
        </div>

        {/* Step indicator skeleton - Modern Pill Style with Gradient */}
        <nav aria-label="Progress" className="mb-10">
          <div className="flex items-center justify-center">
            <div className="inline-flex bg-background dark:bg-muted/30 rounded-full p-1 border border-border/50 dark:border-border/30 shadow-lg">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                    step.id === 1
                      ? 'bg-gradient-to-r from-primary to-orange-400 text-white shadow-md'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    step.id === 1
                      ? 'bg-white text-primary'
                      : 'bg-muted dark:bg-muted/50 text-muted-foreground'
                  }`}>
                    {step.id}
                  </span>
                  <span className="hidden sm:inline">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Card Container skeleton */}
        <div className="bg-background dark:bg-muted/10 rounded-2xl shadow-xl border border-border/50 dark:border-border/30 overflow-hidden flex flex-col min-h-[600px]">
          {/* Top Toolbar skeleton */}
          <div className="border-b border-border/50 dark:border-border/30 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/50 dark:bg-muted/30">
            <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-muted rounded animate-pulse"></div>
            </div>
          </div>

          {/* Two-pane Layout skeleton */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Form skeleton */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border/50 dark:border-border/30">
              <div className="mb-6">
                <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-56 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="space-y-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
                    <div className="h-11 w-full bg-muted rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Preview skeleton */}
            <div className="bg-muted/50 dark:bg-muted/20 hidden lg:flex items-center justify-center min-h-[400px] p-8">
              <div className="w-full h-full border-2 border-dashed border-border/50 dark:border-border/30 rounded-xl flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-muted rounded-full animate-pulse mb-4"></div>
                <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
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
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Quick start:
            </span>
            {QUICK_START_EXAMPLES.map((example) => (
              <button
                key={example.id}
                onClick={() => handleLoadQuickStart(example.input)}
                className="px-3 py-1.5 bg-background dark:bg-muted/30 border border-border/60 dark:border-border/40 rounded-md text-foreground/80 hover:border-border hover:bg-muted/50 dark:hover:bg-muted/50 transition font-medium shadow-sm"
              >
                {example.name}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="ml-2 text-muted-foreground hover:text-foreground flex items-center gap-1 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Step Indicator - Modern Pill Style with Gradient */}
        <nav aria-label="Progress" className="mb-10">
          <div className="flex items-center justify-center">
            <div className="inline-flex bg-background dark:bg-muted/30 rounded-full p-1 border border-border/50 dark:border-border/30 shadow-lg">
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
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-primary to-orange-400 text-white shadow-md ring-1 ring-orange-200 dark:ring-primary/50'
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
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                      currentStep === step.id
                        ? 'bg-white text-primary'
                        : 'bg-muted dark:bg-muted/50 text-muted-foreground'
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

        {/* Main Card Container */}
        <div className="bg-background dark:bg-muted/10 rounded-2xl shadow-xl border border-border/50 dark:border-border/30 overflow-hidden flex flex-col min-h-[600px]">
          {/* Top Toolbar */}
          <div className="border-b border-border/50 dark:border-border/30 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/50 dark:bg-muted/30">
            <div className="text-xs text-muted-foreground font-medium">
              No signup required. Export your spec anytime.
            </div>
            <div className="flex items-center gap-2">
              <ActionBar wizardData={wizardData} variant="inline" />
            </div>
          </div>

          {/* Two-pane Layout */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Wizard Form */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border/50 dark:border-border/30 flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground">
                  {currentStep === 1 && "Core Product"}
                  {currentStep === 2 && "Activation Rules"}
                  {currentStep === 3 && "Event Tracking"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStep === 1 && "Define your core product and value moment"}
                  {currentStep === 2 && "Set what must happen within the time-to-value window"}
                  {currentStep === 3 && "Choose events to track user behavior and growth metrics"}
                </p>
              </div>
              <div className="flex-1">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="product-type" className="text-xs font-semibold text-foreground">Product Type</Label>
                      <Select value={wizardData.productType} onValueChange={(value: ProductType) => updateData({ productType: value })}>
                        <SelectTrigger id="product-type" className={`w-full h-11 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.productType ? "border-destructive ring-destructive/20 ring-2" : ""}`}>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B2B SaaS">B2B SaaS</SelectItem>
                          <SelectItem value="Devtool">Devtool</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderFieldError('productType')}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="primary-object" className="text-xs font-semibold text-foreground">Primary Object</Label>
                      <Input
                        id="primary-object"
                        placeholder="e.g., Project, Workspace, Dashboard"
                        value={wizardData.primaryObject}
                        onChange={(e) => updateData({ primaryObject: e.target.value })}
                        className={`h-11 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.primaryObject ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('primaryObject')}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="value-action" className="text-xs font-semibold text-foreground">Value Action</Label>
                      <Input
                        id="value-action"
                        placeholder="e.g., Deploy, Analyze, Send"
                        value={wizardData.valueAction}
                        onChange={(e) => updateData({ valueAction: e.target.value })}
                        className={`h-11 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.valueAction ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('valueAction')}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="pricing-model" className="text-xs font-semibold text-foreground">Pricing Model</Label>
                      <Select value={wizardData.pricingModel} onValueChange={(value: PricingModel) => updateData({ pricingModel: value })}>
                        <SelectTrigger id="pricing-model" className={`w-full h-11 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.pricingModel ? "border-destructive ring-destructive/20 ring-2" : ""}`}>
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

                    <div className="space-y-1.5">
                      <Label htmlFor="ttv-minutes" className="text-xs font-semibold text-foreground">Time-to-Value (TTV)</Label>
                      <div className="relative">
                        <Input
                          id="ttv-minutes"
                          type="number"
                          placeholder="e.g., 5, 10, 30"
                          value={wizardData.ttvMinutes}
                          onChange={(e) => updateData({ ttvMinutes: e.target.value })}
                          className={`h-11 pr-16 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.ttvMinutes ? "border-destructive ring-destructive/20 ring-2" : ""}`}
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
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="activation-event" className="text-xs font-semibold text-foreground">Activation Event Name</Label>
                      <Input
                        id="activation-event"
                        placeholder="e.g., First Deployment, Setup Complete"
                        value={wizardData.activationEventName}
                        onChange={(e) => updateData({ activationEventName: e.target.value })}
                        className={`h-11 bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.activationEventName ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('activationEventName')}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-semibold text-foreground">Activation Rules</Label>
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
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-semibold text-foreground">Core Events</Label>
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

                    <div className="space-y-1.5">
                      <Label htmlFor="custom-events" className="text-xs font-semibold text-foreground">Custom Events</Label>
                      <p className="text-xs text-muted-foreground">Add custom events, one per line</p>
                      <Textarea
                        id="custom-events"
                        placeholder="payment_completed&#10;subscription_upgraded&#10;feature_enabled"
                        rows={4}
                        value={wizardData.customEvents.join('\n')}
                        onChange={(e) => handleCustomEventsChange(e.target.value)}
                        className={`resize-none bg-muted/30 dark:bg-muted/20 rounded-lg ${showValidation && validationErrors.customEvents ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                      />
                      {renderFieldError('customEvents')}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Navigation */}
              <div className="mt-8 pt-6 border-t border-border/30 flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`text-sm font-medium transition ${currentStep === 1 ? 'text-muted-foreground/40 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Previous
                </button>
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !isStep1Valid()) ||
                    (currentStep === 2 && !isStep2Valid()) ||
                    currentStep === 3
                  }
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition flex items-center gap-1"
                >
                  {currentStep === 3 ? 'Complete' : 'Next'}
                  {currentStep < 3 && <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Right - Preview Pane */}
            <div className="bg-muted/50 dark:bg-muted/20 hidden lg:block min-h-[400px] max-h-[600px] overflow-hidden">
              <OutputPreview data={wizardData} variant="embedded" />
            </div>
          </div>
        </div>

        {/* Mobile Preview - Collapsible */}
        <div className="lg:hidden mt-6">
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

      {/* Sticky Action Bar for Mobile */}
      <ActionBar wizardData={wizardData} variant="fixed" />
    </>
  )
}
