import { BuilderWizardState } from './types';
import { GrowthSpecInput } from './generate';

export function convertToSpecInput(wizardData: BuilderWizardState): GrowthSpecInput {
  const input: GrowthSpecInput = {}

  // Company and basic info
  if (wizardData.productType) {
    input.companyName = `${wizardData.productType} Product`
  }

  // North Star Metric
  if (wizardData.primaryObject && wizardData.valueAction) {
    input.northStarMetric = {
      name: `Weekly Active ${wizardData.primaryObject}s`,
      description: `Number of ${wizardData.primaryObject}s that perform ${wizardData.valueAction} action weekly`,
      formula: `COUNT(DISTINCT ${wizardData.primaryObject}_id WHERE action = '${wizardData.valueAction}' AND week = current_week)`
    }
  }

  // Activation Rate
  if (wizardData.activationEventName) {
    input.activationRate = {
      name: 'New User Activation Rate',
      description: `Percentage of new users who complete ${wizardData.activationEventName}`,
      formula: `(Users with ${wizardData.activationEventName}) / (Total New Users) * 100`
    }
  }

  // Time to Value
  if (wizardData.ttvMinutes) {
    input.timeToValue = {
      value: wizardData.ttvMinutes,
      unit: 'minutes',
      description: `Time for new users to experience core value through ${wizardData.valueAction}`
    }
  }

  // Guardrails
  input.guardrails = [
    {
      name: 'Customer Churn Rate',
      threshold: '< 5% monthly',
      description: 'Monthly customer churn should remain below 5%'
    },
    {
      name: 'Support Ticket Volume',
      threshold: '< 10% of DAU',
      description: 'Support tickets should be less than 10% of daily active users'
    },
    {
      name: 'Page Load Time',
      threshold: '< 2 seconds',
      description: 'P95 page load time should be under 2 seconds'
    }
  ]

  // Activation Definition
  if (wizardData.activationEventName && wizardData.activationRules.length > 0) {
    const rules = wizardData.activationRules.map(rule => {
      switch(rule) {
        case 'created_primary_object':
          return `User has created at least one ${wizardData.primaryObject}`
        case 'invited_teammate':
          return 'User has invited at least one team member'
        case 'used_key_feature':
          return `User has used the ${wizardData.valueAction} feature`
        case 'connected_integration':
          return 'User has connected at least one integration'
        default:
          return (rule as string).split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }
    })

    input.activationDefinition = {
      event: wizardData.activationEventName,
      rules,
      formula: rules.map((_, i) => `Rule${i + 1}`).join(' AND ')
    }
  }

  // Core Events
  if (wizardData.coreEvents.length > 0) {
    input.coreEvents = wizardData.coreEvents.map(event => {
      const eventName = event.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      let description = ''
      let trigger = ''

      switch(event) {
        case 'user_signup':
          description = 'New user creates an account'
          trigger = 'On successful account creation'
          break
        case 'user_login':
          description = 'User authenticates into the application'
          trigger = 'On successful authentication'
          break
        case 'object_created':
          description = `User creates a new ${wizardData.primaryObject || 'object'}`
          trigger = 'On successful object creation'
          break
        case 'object_updated':
          description = `User modifies an existing ${wizardData.primaryObject || 'object'}`
          trigger = 'On successful object update'
          break
        case 'object_deleted':
          description = `User removes a ${wizardData.primaryObject || 'object'}`
          trigger = 'On successful object deletion'
          break
        case 'feature_used':
          description = `User interacts with ${wizardData.valueAction || 'key feature'}`
          trigger = 'On feature interaction'
          break
        case 'integration_connected':
          description = 'User connects an external service'
          trigger = 'On successful integration'
          break
        case 'team_member_invited':
          description = 'User invites a colleague to the workspace'
          trigger = 'On invitation sent'
          break
        default:
          description = `User performs ${eventName.toLowerCase()}`
          trigger = 'On action completion'
      }

      return { name: eventName, description, trigger }
    })

    // Add custom events
    if (wizardData.customEvents.length > 0) {
      const customEvents = wizardData.customEvents.map(event => ({
        name: event.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: `Custom event: ${event}`,
        trigger: 'Based on business logic'
      }))
      input.coreEvents = [...input.coreEvents, ...customEvents]
    }
  }

  // Property Dictionary
  input.propertyDictionary = [
    {
      property: 'user_id',
      type: 'string',
      description: 'Unique identifier for the user',
      example: 'usr_1234567890'
    },
    {
      property: `${wizardData.primaryObject?.toLowerCase() || 'object'}_id`,
      type: 'string',
      description: `Unique identifier for the ${wizardData.primaryObject || 'object'}`,
      example: 'obj_abc123'
    },
    {
      property: 'timestamp',
      type: 'datetime',
      description: 'Time when the event occurred',
      example: '2024-01-01T12:00:00Z'
    },
    {
      property: 'session_id',
      type: 'string',
      description: 'Current user session identifier',
      example: 'sess_xyz789'
    },
    {
      property: 'plan_type',
      type: 'string',
      description: 'User subscription plan',
      example: wizardData.pricingModel === 'Subscription' ? 'pro' : 'usage_based'
    }
  ]

  // Dashboard Pack
  input.dashboardPack = [
    'User Acquisition Funnel (Signup → Activation → Retention)',
    `${wizardData.primaryObject || 'Object'} Creation Trends (Daily/Weekly/Monthly)`,
    'Feature Adoption Matrix (Core features usage by cohort)',
    'Time to Value Distribution (Histogram of TTV by user segment)',
    'Activation Rate by Source (Organic, Paid, Referral)',
    'Retention Curves (Day 1, 7, 30, 90 retention by cohort)'
  ]

  // Experiment Card Example
  input.experimentExample = {
    hypothesis: `Reducing the number of steps to create a ${wizardData.primaryObject || 'object'} will increase activation rate by 15%`,
    metric: 'New User Activation Rate',
    duration: '14 days',
    audience: 'New users signing up after experiment start',
    variants: [
      'Control: Current onboarding flow (5 steps)',
      'Variant A: Simplified flow (3 steps)',
      'Variant B: One-click template creation'
    ],
    successCriteria: 'Activation rate increase of 10% or more with 95% statistical significance'
  }

  return input
}