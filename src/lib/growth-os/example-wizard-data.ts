import type { BuilderWizardState } from './types'

export interface ExampleWizardData {
  id: string
  wizardData: BuilderWizardState
}

export const exampleWizardData: Record<string, BuilderWizardState> = {
  'saas-startup': {
    productType: 'B2B SaaS',
    primaryObject: 'Project',
    valueAction: 'Manage',
    pricingModel: 'Subscription',
    ttvMinutes: '10',
    activationEventName: 'First Project Created',
    activationRules: ['created_primary_object', 'invited_teammate', 'used_key_feature'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'object_updated', 'team_member_invited'],
    customEvents: ['project_shared', 'integration_enabled', 'workflow_automated']
  },
  'ecommerce-brand': {
    productType: 'B2B SaaS',
    primaryObject: 'Product',
    valueAction: 'Purchase',
    pricingModel: 'One-time',
    ttvMinutes: '5',
    activationEventName: 'First Purchase',
    activationRules: ['created_primary_object', 'used_key_feature'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used'],
    customEvents: ['product_added_to_cart', 'checkout_completed', 'payment_processed', 'review_submitted']
  },
  'content-creator': {
    productType: 'B2B SaaS',
    primaryObject: 'Course',
    valueAction: 'Learn',
    pricingModel: 'Subscription',
    ttvMinutes: '15',
    activationEventName: 'First Lesson Completed',
    activationRules: ['created_primary_object', 'used_key_feature'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used'],
    customEvents: ['course_enrolled', 'video_watched', 'quiz_completed', 'certificate_earned']
  },
  'marketing-agency': {
    productType: 'B2B SaaS',
    primaryObject: 'Campaign',
    valueAction: 'Launch',
    pricingModel: 'Subscription',
    ttvMinutes: '30',
    activationEventName: 'First Campaign Launched',
    activationRules: ['created_primary_object', 'invited_teammate', 'connected_integration'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'object_updated', 'team_member_invited', 'integration_connected'],
    customEvents: ['campaign_scheduled', 'report_generated', 'client_invited', 'budget_allocated']
  },
  'b2b-marketplace': {
    productType: 'B2B SaaS',
    primaryObject: 'Listing',
    valueAction: 'Connect',
    pricingModel: 'Usage-based',
    ttvMinutes: '20',
    activationEventName: 'First Transaction',
    activationRules: ['created_primary_object', 'used_key_feature', 'connected_integration'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'object_updated', 'integration_connected'],
    customEvents: ['listing_published', 'inquiry_received', 'deal_closed', 'payment_settled']
  },
  'mobile-app': {
    productType: 'B2B SaaS',
    primaryObject: 'Session',
    valueAction: 'Meditate',
    pricingModel: 'Subscription',
    ttvMinutes: '5',
    activationEventName: 'First Session Completed',
    activationRules: ['created_primary_object', 'used_key_feature'],
    coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used'],
    customEvents: ['session_started', 'session_completed', 'streak_maintained', 'achievement_unlocked']
  }
}

export function getExampleWizardData(id: string): BuilderWizardState | undefined {
  return exampleWizardData[id]
}