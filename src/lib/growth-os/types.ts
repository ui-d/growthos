// Growth OS Type Definitions

export type ProductType = 'B2B SaaS' | 'Devtool';

export type PricingModel = 'Subscription' | 'Usage-based' | 'Hybrid' | 'One-time';

export type ActivationRule =
  | 'created_primary_object'
  | 'invited_teammate'
  | 'used_key_feature'
  | 'connected_integration';

export type CoreEvent =
  | 'user_signup'
  | 'user_login'
  | 'object_created'
  | 'object_updated'
  | 'object_deleted'
  | 'feature_used'
  | 'integration_connected'
  | 'team_member_invited';

export interface BuilderWizardState {
  // Step 1: Product Basics
  productType: ProductType | '';
  primaryObject: string;
  valueAction: string;
  pricingModel: PricingModel | '';
  ttvMinutes: string;

  // Step 2: Activation
  activationEventName: string;
  activationRules: ActivationRule[];

  // Step 3: Tracking
  coreEvents: CoreEvent[];
  customEvents: string[];
}

export interface StepProps {
  data: BuilderWizardState;
  updateData: (data: Partial<BuilderWizardState>) => void;
}

// For persisting builder specs
export interface SavedSpec {
  id: string;
  name: string;
  createdAt: number;
  input: BuilderWizardState;
}