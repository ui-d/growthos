import type { BuilderWizardState } from './types'

export interface QuickStartExample {
  id: string
  name: string
  description: string
  input: BuilderWizardState
}

export const QUICK_START_EXAMPLES: QuickStartExample[] = [
  {
    id: 'devtool-first-deploy',
    name: 'Devtool: First Deploy',
    description: 'PLG activation for developer tools focused on first successful deployment',
    input: {
      productType: 'Devtool',
      primaryObject: 'App',
      valueAction: 'Deploy',
      pricingModel: 'Usage-based',
      ttvMinutes: '5',
      activationEventName: 'First Deployment',
      activationRules: ['created_primary_object', 'invited_teammate'],
      coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used'],
      customEvents: ['deployment_completed', 'environment_configured']
    }
  },
  {
    id: 'b2b-saas-invite-share',
    name: 'B2B SaaS: Invite & Share',
    description: 'Team collaboration activation through project sharing and invitations',
    input: {
      productType: 'B2B SaaS',
      primaryObject: 'Project',
      valueAction: 'Share',
      pricingModel: 'Subscription',
      ttvMinutes: '10',
      activationEventName: 'Setup Complete',
      activationRules: ['created_primary_object', 'invited_teammate', 'used_key_feature'],
      coreEvents: ['user_signup', 'user_login', 'object_created', 'team_member_invited'],
      customEvents: ['project_shared', 'collaboration_started']
    }
  },
  {
    id: 'analytics-publish-dashboard',
    name: 'Analytics: Publish Dashboard',
    description: 'BI tool activation through dashboard creation and publishing',
    input: {
      productType: 'B2B SaaS',
      primaryObject: 'Dashboard',
      valueAction: 'Publish',
      pricingModel: 'Hybrid',
      ttvMinutes: '15',
      activationEventName: 'First Publish',
      activationRules: ['created_primary_object', 'used_key_feature', 'connected_integration'],
      coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used', 'integration_connected'],
      customEvents: ['dashboard_published', 'report_generated']
    }
  }
]

export function getQuickStartById(id: string): QuickStartExample | undefined {
  return QUICK_START_EXAMPLES.find(ex => ex.id === id)
}
