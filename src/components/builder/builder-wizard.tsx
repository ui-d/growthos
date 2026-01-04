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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BuilderWizardState, ProductType, PricingModel, ActivationRule, CoreEvent, SavedSpec } from "@/lib/growth-os/types"
import { Step1Schema, Step2Schema, Step3Schema } from "@/lib/growth-os/schema"
import { GROWTH_PRESETS } from "@/lib/growth-os/presets"
import { OutputPreview } from "./output-preview"
import { RecentsPanel } from "./recents-panel"
import { SaveSpecDialog } from "./save-spec-dialog"
import { ShareLinkDialog } from "./share-link-dialog"
import { getDraftInput, saveDraftInputDebounced, clearDraft } from "@/lib/growth-os/storage"
import { decodeShareableInput } from "@/lib/growth-os/share"
import { getExampleWizardData } from "@/lib/growth-os/example-wizard-data"
import { RotateCcw, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { analytics } from "@/lib/analytics"

const ACTIVATION_RULES: { value: ActivationRule; label: string }[] = [
  { value: 'created_primary_object', label: 'Created Primary Object' },
  { value: 'invited_teammate', label: 'Invited Teammate' },
  { value: 'used_key_feature', label: 'Used Key Feature' },
  { value: 'connected_integration', label: 'Connected Integration' },
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

export function BuilderWizard() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [recentsPanelKey, setRecentsPanelKey] = useState(0)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)
  const isInitialLoad = useRef(true)

  const getInitialState = (): BuilderWizardState => {
    // First check if we're loading an example
    const exampleParam = searchParams.get('example')
    if (exampleParam) {
      const exampleWizardState = getExampleWizardData(exampleParam)
      if (exampleWizardState) {
        // Save as draft so it persists
        saveDraftInputDebounced(exampleWizardState)
        toast.success('Example loaded successfully')
        return exampleWizardState
      }
    }

    // Then try to load from URL parameters (shared link)
    const loadParam = searchParams.get('load')
    if (loadParam) {
      try {
        const decoded = decodeShareableInput(loadParam)
        if (decoded) {
          return decoded
        }
      } catch (error) {
        console.error('Failed to load from URL:', error)
        toast.error('Failed to load shared configuration')
      }
    }

    // Then try to load draft from localStorage
    const draft = getDraftInput()
    if (draft) {
      return draft
    }

    // Default state
    return {
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
  }

  const [wizardData, setWizardData] = useState<BuilderWizardState>(getInitialState)

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

  // Clear the initial load flag after component mounts
  useEffect(() => {
    isInitialLoad.current = false
  }, [])

  const handleLoadSpec = (spec: SavedSpec) => {
    setWizardData(spec.input)
    setCurrentStep(1)
    // Also save as draft so it persists
    saveDraftInputDebounced(spec.input)
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

  const handleSaveComplete = () => {
    // Force recents panel to reload
    setRecentsPanelKey(prev => prev + 1)
  }

  const handleLoadPreset = (presetInput: BuilderWizardState) => {
    setWizardData(presetInput)
    setCurrentStep(1)
    // Save as draft so it persists
    saveDraftInputDebounced(presetInput)
  }

  const renderFieldError = (fieldPath: string) => {
    if (showValidation && validationErrors[fieldPath]) {
      return (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {validationErrors[fieldPath]}
          </AlertDescription>
        </Alert>
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

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SaveSpecDialog wizardData={wizardData} onSaved={handleSaveComplete} />
          <ShareLinkDialog wizardData={wizardData} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
        </div>
        {getDraftInput() && (
          <p className="text-sm text-muted-foreground">
            Draft saved automatically
          </p>
        )}
      </div>

      {/* Load example section */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium">Load Example</h3>
            <p className="text-xs text-muted-foreground">Start with a preset to see instant value</p>
          </div>
        </div>
        <div className="flex gap-2">
          {GROWTH_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => handleLoadPreset(preset.input)}
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wizard Card */}
        <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Builder Wizard</CardTitle>
          <CardDescription>Step {currentStep} of 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-type">Product Type</Label>
                <Select value={wizardData.productType} onValueChange={(value: ProductType) => updateData({ productType: value })}>
                  <SelectTrigger id="product-type" className={showValidation && validationErrors.productType ? "border-destructive" : ""}>
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
                <Label htmlFor="primary-object">Primary Object</Label>
                <Input
                  id="primary-object"
                  placeholder="e.g., Project, Workspace, Dashboard"
                  value={wizardData.primaryObject}
                  onChange={(e) => updateData({ primaryObject: e.target.value })}
                  className={showValidation && validationErrors.primaryObject ? "border-destructive" : ""}
                />
                {renderFieldError('primaryObject')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value-action">Value Action</Label>
                <Input
                  id="value-action"
                  placeholder="e.g., Deploy, Analyze, Send"
                  value={wizardData.valueAction}
                  onChange={(e) => updateData({ valueAction: e.target.value })}
                  className={showValidation && validationErrors.valueAction ? "border-destructive" : ""}
                />
                {renderFieldError('valueAction')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricing-model">Pricing Model</Label>
                <Select value={wizardData.pricingModel} onValueChange={(value: PricingModel) => updateData({ pricingModel: value })}>
                  <SelectTrigger id="pricing-model" className={showValidation && validationErrors.pricingModel ? "border-destructive" : ""}>
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
                <Label htmlFor="ttv-minutes">Time to Value (minutes)</Label>
                <Input
                  id="ttv-minutes"
                  type="number"
                  placeholder="e.g., 5, 10, 30"
                  value={wizardData.ttvMinutes}
                  onChange={(e) => updateData({ ttvMinutes: e.target.value })}
                  className={showValidation && validationErrors.ttvMinutes ? "border-destructive" : ""}
                />
                {renderFieldError('ttvMinutes')}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activation-event">Activation Event Name</Label>
                <Input
                  id="activation-event"
                  placeholder="e.g., First Deployment, Setup Complete"
                  value={wizardData.activationEventName}
                  onChange={(e) => updateData({ activationEventName: e.target.value })}
                  className={showValidation && validationErrors.activationEventName ? "border-destructive" : ""}
                />
                {renderFieldError('activationEventName')}
              </div>

              <div className="space-y-2">
                <Label>Activation Rules</Label>
                <div className="space-y-3">
                  {ACTIVATION_RULES.map((rule) => (
                    <div key={rule.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={rule.value}
                        checked={wizardData.activationRules.includes(rule.value)}
                        onCheckedChange={(checked) => handleActivationRuleToggle(rule.value, checked as boolean)}
                      />
                      <Label
                        htmlFor={rule.value}
                        className="text-sm font-normal cursor-pointer"
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Core Events</Label>
                <div className="space-y-3">
                  {CORE_EVENTS.map((event) => (
                    <div key={event.value} className="flex items-center space-x-2">
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
                <Label htmlFor="custom-events">Custom Events (one per line)</Label>
                <Textarea
                  id="custom-events"
                  placeholder="payment_completed&#10;subscription_upgraded&#10;feature_enabled"
                  rows={4}
                  value={wizardData.customEvents.join('\n')}
                  onChange={(e) => handleCustomEventsChange(e.target.value)}
                  className={showValidation && validationErrors.customEvents ? "border-destructive" : ""}
                />
                {renderFieldError('customEvents')}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
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
          >
            {currentStep === 3 ? 'Complete' : 'Next'}
          </Button>
        </CardFooter>
        </Card>

        {/* Right sidebar */}
        <div className="col-span-1 space-y-6">
          <RecentsPanel key={recentsPanelKey} onLoadSpec={handleLoadSpec} />
          <OutputPreview data={wizardData} />
        </div>
      </div>
    </div>
  )
}