import { z } from "zod"

export const ProductTypeSchema = z.enum(['B2B SaaS', 'Devtool'])

export const PricingModelSchema = z.enum(['Subscription', 'Usage-based', 'Hybrid', 'One-time'])

export const ActivationRuleSchema = z.enum([
  'created_primary_object',
  'invited_teammate',
  'used_key_feature',
  'connected_integration'
])

export const CoreEventSchema = z.enum([
  'user_signup',
  'user_login',
  'object_created',
  'object_updated',
  'object_deleted',
  'feature_used',
  'integration_connected',
  'team_member_invited'
])

export const GrowthSpecInputSchema = z.object({
  // Step 1: Product Basics
  productType: ProductTypeSchema.or(z.literal('')),
  primaryObject: z.string().min(1, "Primary object is required").max(50, "Primary object must be less than 50 characters"),
  valueAction: z.string().min(1, "Value action is required").max(50, "Value action must be less than 50 characters"),
  pricingModel: PricingModelSchema.or(z.literal('')),
  ttvMinutes: z.string().min(1, "Time to value is required").regex(/^\d+$/, "Must be a valid number"),

  // Step 2: Activation
  activationEventName: z.string().min(1, "Activation event name is required").max(100, "Activation event name must be less than 100 characters"),
  activationRules: z.array(ActivationRuleSchema).min(1, "At least one activation rule is required"),

  // Step 3: Tracking
  coreEvents: z.array(CoreEventSchema).min(1, "At least one core event is required"),
  customEvents: z.array(z.string().min(1).max(100)).max(20, "Maximum 20 custom events allowed")
})

export type GrowthSpecInput = z.infer<typeof GrowthSpecInputSchema>

// Step validation schemas for better UX
export const Step1Schema = GrowthSpecInputSchema.pick({
  productType: true,
  primaryObject: true,
  valueAction: true,
  pricingModel: true,
  ttvMinutes: true
}).refine(
  (data) => data.productType !== '' && data.pricingModel !== '',
  {
    message: "Product type and pricing model are required",
    path: ["productType"]
  }
)

export const Step2Schema = GrowthSpecInputSchema.pick({
  activationEventName: true,
  activationRules: true
})

export const Step3Schema = GrowthSpecInputSchema.pick({
  coreEvents: true,
  customEvents: true
})