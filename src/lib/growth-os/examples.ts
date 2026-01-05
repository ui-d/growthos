import type { BaseGrowthOSInput } from './model'
import type { BuilderWizardState } from './types'
import { encodeShareableInput } from './share'

export interface GrowthOSExample {
  id: string
  name: string
  description: string
  category: 'SaaS' | 'E-commerce' | 'Creator' | 'Agency' | 'B2B' | 'General'
  input: BaseGrowthOSInput
}

export const examples: GrowthOSExample[] = [
  // B2B Examples
  {
    id: 'devtool-first-deploy',
    name: 'Devtool: First Deploy',
    description: 'PLG activation for developer tools focused on first successful deployment',
    category: 'B2B',
    input: {
      product: 'Cloud deployment platform for web applications with automated CI/CD pipelines',
      target_market: 'Frontend developers and small development teams at startups and agencies',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: app, Value action: deploy, Activation rules: created app + deployed successfully + invited teammate',
      goals: 'Increase activation rate from 35% to 55% by improving onboarding flow to first deploy',
      constraints: 'Complex technical setup, competitive market with established players like Vercel and Netlify'
    }
  },
  {
    id: 'devtool-github-connect',
    name: 'Devtool: Connect GitHub',
    description: 'PLG activation through GitHub integration and feature adoption',
    category: 'B2B',
    input: {
      product: 'Code review automation tool with AI-powered suggestions and team collaboration features',
      target_market: 'Development teams at tech companies with 5-50 developers',
      growth_stage: 'early',
      current_metrics: 'Primary object: repository, Value action: analyze, Activation rules: connected GitHub + created repository + used analysis feature',
      goals: 'Achieve 45% activation rate within 7 days of signup by optimizing GitHub integration flow',
      constraints: 'Requires GitHub permissions, competitive AI code tools market, need developer trust'
    }
  },
  {
    id: 'api-platform-first-request',
    name: 'API Platform: First Successful Request',
    description: 'PLG activation through successful API integration and key feature usage',
    category: 'B2B',
    input: {
      product: 'Payment processing API with fraud detection and international payment support',
      target_market: 'Backend developers and fintech companies building payment solutions',
      growth_stage: 'early',
      current_metrics: 'Primary object: api_key, Value action: process_payment, Activation rules: created API key + made successful payment request',
      goals: 'Achieve 65% API integration success rate within 48 hours of signup through improved documentation',
      constraints: 'Technical integration complexity, strict compliance requirements, trust and security concerns'
    }
  },
  {
    id: 'hr-software-first-employee',
    name: 'HR Software: First Employee Added',
    description: 'B2B HR platform activation through employee onboarding workflow',
    category: 'B2B',
    input: {
      product: 'All-in-one HR management platform with payroll, benefits administration, and employee self-service',
      target_market: 'HR managers and operations leaders at SMBs with 20-200 employees',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: employee, Value action: onboard, Activation rules: added first employee + completed payroll setup + sent first offer letter',
      goals: 'Improve trial-to-paid conversion from 18% to 35% by demonstrating ROI during trial period',
      constraints: 'Long sales cycles, data migration complexity, compliance requirements vary by region'
    }
  },

  // SaaS Examples
  {
    id: 'b2b-saas-invite-share',
    name: 'B2B SaaS: Invite & Share',
    description: 'PLG activation through collaborative project sharing and team invitations',
    category: 'SaaS',
    input: {
      product: 'Design collaboration platform for product teams with version control and feedback tools',
      target_market: 'Product managers and UX designers at tech companies and design agencies',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: project, Value action: share, Activation rules: created project + invited teammate + shared design',
      goals: 'Improve team activation from 28% to 50% by enhancing collaboration onboarding experience',
      constraints: 'Need to demonstrate value quickly, competitive design tools market, user adoption resistance'
    }
  },
  {
    id: 'analytics-publish-dashboard',
    name: 'Analytics: Publish Dashboard',
    description: 'PLG activation through dashboard creation and publishing workflows',
    category: 'SaaS',
    input: {
      product: 'Business intelligence platform with drag-and-drop dashboard builder and data visualization tools',
      target_market: 'Data analysts and business stakeholders at SMBs and growth-stage companies',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: dashboard, Value action: publish, Activation rules: created dashboard + published insights + optional teammate invitation',
      goals: 'Increase dashboard publishing rate from 22% to 40% within first week of trial',
      constraints: 'Data integration complexity, established competitors like Tableau, technical learning curve'
    }
  },
  {
    id: 'collaboration-team-message',
    name: 'Collaboration: First Team Message',
    description: 'PLG activation through workspace creation and team communication features',
    category: 'SaaS',
    input: {
      product: 'Team communication platform with channels, file sharing, and project management integration',
      target_market: 'Remote teams and distributed organizations across various industries',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: workspace, Value action: send_message, Activation rules: invited teammate + sent first message in channel',
      goals: 'Increase team messaging activation from 38% to 60% by optimizing team onboarding flow',
      constraints: 'Established competitors like Slack and Teams, need critical mass for value, user behavior change'
    }
  },
  {
    id: 'project-management-first-task',
    name: 'Project Management: First Task Completed',
    description: 'SaaS activation through task creation and completion workflow',
    category: 'SaaS',
    input: {
      product: 'Project management tool with kanban boards, timeline views, and automation features',
      target_market: 'Project managers and team leads at startups and SMBs',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: task, Value action: complete, Activation rules: created project + added task + completed first task + invited team member',
      goals: 'Increase trial activation from 32% to 55% by guiding users to first task completion',
      constraints: 'Crowded market with Asana/Monday/ClickUp, high feature parity, switching costs'
    }
  },
  {
    id: 'email-marketing-first-campaign',
    name: 'Email Marketing: First Campaign Sent',
    description: 'SaaS email platform activation through campaign creation and sending',
    category: 'SaaS',
    input: {
      product: 'Email marketing automation platform with drag-and-drop editor, segmentation, and analytics',
      target_market: 'Marketing managers and small business owners focused on email growth',
      growth_stage: 'early',
      current_metrics: 'Primary object: campaign, Value action: send, Activation rules: imported contacts + created campaign + sent to audience',
      goals: 'Achieve 40% first campaign sent rate within 7 days by simplifying campaign creation',
      constraints: 'Deliverability concerns, list import friction, competitive with Mailchimp/ConvertKit'
    }
  },
  {
    id: 'crm-first-deal',
    name: 'CRM: First Deal Created',
    description: 'Sales CRM activation through pipeline setup and deal management',
    category: 'SaaS',
    input: {
      product: 'Sales CRM with pipeline management, email integration, and forecasting tools',
      target_market: 'Sales teams and account executives at B2B companies',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: deal, Value action: create, Activation rules: connected email + created pipeline + added first deal',
      goals: 'Improve activation rate from 25% to 45% by streamlining CRM setup process',
      constraints: 'Data migration complexity, integration requirements, established competitors like Salesforce'
    }
  },

  // E-commerce Examples
  {
    id: 'ecommerce-first-order',
    name: 'E-commerce: First Order Shipped',
    description: 'E-commerce platform activation through store setup and first sale',
    category: 'E-commerce',
    input: {
      product: 'E-commerce platform with storefront builder, payment processing, and inventory management',
      target_market: 'Small business owners and entrepreneurs launching online stores',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: order, Value action: ship, Activation rules: added products + connected payment + received first order + shipped order',
      goals: 'Increase merchant activation from 15% to 35% by reducing time to first sale',
      constraints: 'Complex setup process, payment provider integration, shipping logistics'
    }
  },
  {
    id: 'dropshipping-first-product',
    name: 'Dropshipping: First Product Listed',
    description: 'Dropshipping platform activation through product import and listing',
    category: 'E-commerce',
    input: {
      product: 'Dropshipping marketplace connecting sellers with suppliers and automated fulfillment',
      target_market: 'New entrepreneurs and side-hustlers looking to start online businesses',
      growth_stage: 'early',
      current_metrics: 'Primary object: product, Value action: list, Activation rules: connected store + imported products + listed first product',
      goals: 'Achieve 50% product listing rate within first 48 hours of signup',
      constraints: 'Product quality concerns, supplier reliability, competitive dropshipping market'
    }
  },
  {
    id: 'marketplace-first-listing',
    name: 'Marketplace: First Listing Created',
    description: 'Two-sided marketplace activation for sellers creating first listing',
    category: 'E-commerce',
    input: {
      product: 'Peer-to-peer marketplace for handmade and vintage goods with built-in payment processing',
      target_market: 'Artisans, crafters, and vintage collectors looking to sell online',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: listing, Value action: publish, Activation rules: created shop + added listing + published to marketplace',
      goals: 'Improve seller activation from 22% to 45% by simplifying listing creation process',
      constraints: 'Two-sided marketplace challenges, quality control, category saturation'
    }
  },
  {
    id: 'subscription-box-first-subscriber',
    name: 'Subscription Box: First Subscriber',
    description: 'Subscription commerce activation through box curation and first subscriber',
    category: 'E-commerce',
    input: {
      product: 'Subscription box platform for curated product experiences with recurring billing',
      target_market: 'DTC brands and entrepreneurs creating subscription box businesses',
      growth_stage: 'early',
      current_metrics: 'Primary object: subscription, Value action: activate, Activation rules: created box + added products + acquired first subscriber',
      goals: 'Achieve 30% first subscriber rate within 14 days by improving box creation flow',
      constraints: 'High customer acquisition cost, churn management, logistics complexity'
    }
  },
  {
    id: 'pos-first-transaction',
    name: 'POS: First Transaction',
    description: 'Point-of-sale system activation through hardware setup and first sale',
    category: 'E-commerce',
    input: {
      product: 'Point-of-sale system with inventory management, customer tracking, and multi-location support',
      target_market: 'Retail store owners and restaurant operators',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: transaction, Value action: complete, Activation rules: setup hardware + added inventory + completed first sale',
      goals: 'Improve merchant activation from 60% to 85% by streamlining hardware setup',
      constraints: 'Hardware dependencies, staff training requirements, integration with existing systems'
    }
  },

  // Creator Examples
  {
    id: 'creator-first-course',
    name: 'Creator: First Course Published',
    description: 'Creator platform activation through course creation and publishing',
    category: 'Creator',
    input: {
      product: 'Online course platform with video hosting, community features, and payment processing',
      target_market: 'Content creators, educators, and subject matter experts monetizing knowledge',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: course, Value action: publish, Activation rules: created course + uploaded content + published to students',
      goals: 'Increase course publishing rate from 18% to 40% by simplifying course creation workflow',
      constraints: 'Content creation time investment, competitive creator economy, monetization expectations'
    }
  },
  {
    id: 'newsletter-first-subscriber',
    name: 'Newsletter: First Paid Subscriber',
    description: 'Newsletter platform activation through content creation and monetization',
    category: 'Creator',
    input: {
      product: 'Newsletter platform with paid subscriptions, analytics, and audience management tools',
      target_market: 'Writers, journalists, and thought leaders building paid newsletter businesses',
      growth_stage: 'early',
      current_metrics: 'Primary object: newsletter, Value action: monetize, Activation rules: created newsletter + published posts + acquired paid subscriber',
      goals: 'Achieve 25% paid subscriber conversion within 30 days of first publication',
      constraints: 'Content quality expectations, competitive newsletter market, audience building time'
    }
  },
  {
    id: 'podcast-first-episode',
    name: 'Podcast: First Episode Published',
    description: 'Podcast hosting platform activation through recording and distribution',
    category: 'Creator',
    input: {
      product: 'Podcast hosting platform with recording tools, distribution, and monetization features',
      target_market: 'Aspiring podcasters and content creators expanding into audio',
      growth_stage: 'early',
      current_metrics: 'Primary object: episode, Value action: publish, Activation rules: created show + recorded episode + distributed to platforms',
      goals: 'Improve episode publishing rate from 35% to 60% by simplifying recording workflow',
      constraints: 'Audio quality barriers, distribution complexity, saturated podcast market'
    }
  },
  {
    id: 'membership-first-member',
    name: 'Membership: First Member Joined',
    description: 'Membership platform activation through community setup and first member',
    category: 'Creator',
    input: {
      product: 'Membership platform with community features, exclusive content, and tiered access',
      target_market: 'Creators and influencers building recurring revenue through memberships',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: membership, Value action: join, Activation rules: created community + set up tiers + acquired first paying member',
      goals: 'Increase membership launch rate from 20% to 45% by streamlining community setup',
      constraints: 'Content commitment requirements, community management overhead, pricing optimization'
    }
  },
  {
    id: 'digital-products-first-sale',
    name: 'Digital Products: First Sale',
    description: 'Digital product platform activation through product creation and first sale',
    category: 'Creator',
    input: {
      product: 'Digital product storefront for ebooks, templates, and digital downloads',
      target_market: 'Creators, designers, and educators selling digital products',
      growth_stage: 'early',
      current_metrics: 'Primary object: product, Value action: sell, Activation rules: created product + set pricing + made first sale',
      goals: 'Achieve 35% first sale rate within 14 days by improving product setup flow',
      constraints: 'Product quality expectations, pricing strategy, competitive digital goods market'
    }
  },

  // Agency Examples
  {
    id: 'agency-first-client',
    name: 'Agency: First Client Onboarded',
    description: 'Agency management platform activation through client onboarding workflow',
    category: 'Agency',
    input: {
      product: 'Agency management platform with client portals, project tracking, and billing automation',
      target_market: 'Digital marketing agencies and creative studios managing multiple clients',
      growth_stage: 'early',
      current_metrics: 'Primary object: client, Value action: onboard, Activation rules: created workspace + added client + sent first invoice',
      goals: 'Improve agency activation from 22% to 50% by streamlining client onboarding',
      constraints: 'Complex agency workflows, integration with existing tools, white-label requirements'
    }
  },
  {
    id: 'agency-first-report',
    name: 'Agency: First Client Report',
    description: 'Reporting platform activation through automated client reporting',
    category: 'Agency',
    input: {
      product: 'Automated reporting platform with white-label dashboards and scheduled delivery',
      target_market: 'Marketing agencies and consultants providing performance reporting to clients',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: report, Value action: deliver, Activation rules: connected data sources + created report template + sent to client',
      goals: 'Increase report creation rate from 30% to 60% by simplifying data connection flow',
      constraints: 'Data source integration complexity, report customization needs, white-label requirements'
    }
  },
  {
    id: 'agency-first-proposal',
    name: 'Agency: First Proposal Sent',
    description: 'Proposal software activation through template creation and sending',
    category: 'Agency',
    input: {
      product: 'Proposal and contract management software with templates, e-signatures, and CRM integration',
      target_market: 'Sales teams at agencies and professional services firms',
      growth_stage: 'early',
      current_metrics: 'Primary object: proposal, Value action: send, Activation rules: created template + customized proposal + sent to prospect',
      goals: 'Achieve 55% first proposal sent rate within 7 days by improving template library',
      constraints: 'Template customization needs, integration requirements, competitive proposal tools'
    }
  },
  {
    id: 'agency-client-portal',
    name: 'Agency: Client Portal Setup',
    description: 'Client portal platform activation through portal creation and client access',
    category: 'Agency',
    input: {
      product: 'White-label client portal with project visibility, file sharing, and communication tools',
      target_market: 'Service businesses and agencies improving client communication and transparency',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: portal, Value action: activate, Activation rules: branded portal + invited client + shared first deliverable',
      goals: 'Improve portal activation from 35% to 65% by simplifying branding setup',
      constraints: 'Customization complexity, client adoption challenges, integration with project tools'
    }
  },

  // General Examples
  {
    id: 'productivity-first-workflow',
    name: 'Productivity: First Workflow Created',
    description: 'Automation platform activation through workflow building and execution',
    category: 'General',
    input: {
      product: 'No-code automation platform connecting apps and automating repetitive tasks',
      target_market: 'Operations teams and power users automating business processes',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: workflow, Value action: run, Activation rules: connected apps + built workflow + ran successfully',
      goals: 'Increase workflow activation from 28% to 50% by improving app connection flow',
      constraints: 'App integration reliability, workflow complexity, competitive with Zapier/Make'
    }
  },
  {
    id: 'scheduling-first-meeting',
    name: 'Scheduling: First Meeting Booked',
    description: 'Scheduling tool activation through calendar setup and first booking',
    category: 'General',
    input: {
      product: 'Meeting scheduling tool with calendar integration, time zone handling, and team scheduling',
      target_market: 'Professionals and teams managing external meeting scheduling',
      growth_stage: 'scaling',
      current_metrics: 'Primary object: meeting, Value action: book, Activation rules: connected calendar + created booking page + received first booking',
      goals: 'Achieve 65% first booking rate within 3 days by simplifying calendar connection',
      constraints: 'Calendar integration complexity, competitive with Calendly, trust concerns'
    }
  },
  {
    id: 'survey-first-response',
    name: 'Survey: First Response Collected',
    description: 'Survey platform activation through form creation and response collection',
    category: 'General',
    input: {
      product: 'Survey and form builder with logic branching, integrations, and analytics',
      target_market: 'Researchers, marketers, and product teams collecting user feedback',
      growth_stage: 'early',
      current_metrics: 'Primary object: survey, Value action: collect, Activation rules: created survey + distributed link + collected first response',
      goals: 'Improve response collection rate from 40% to 70% by enhancing distribution features',
      constraints: 'Survey fatigue, competitive with Typeform/SurveyMonkey, response rate challenges'
    }
  },
  {
    id: 'documentation-first-doc',
    name: 'Documentation: First Doc Published',
    description: 'Knowledge base platform activation through documentation creation',
    category: 'General',
    input: {
      product: 'Documentation platform with version control, search, and team collaboration',
      target_market: 'Product teams and developers creating internal and external documentation',
      growth_stage: 'early',
      current_metrics: 'Primary object: document, Value action: publish, Activation rules: created workspace + wrote first doc + published to team',
      goals: 'Achieve 45% document publishing rate within 7 days by improving editor experience',
      constraints: 'Migration from existing tools, content creation investment, competitive market'
    }
  },
  {
    id: 'feedback-first-insight',
    name: 'Feedback: First Insight Captured',
    description: 'User feedback platform activation through feedback collection and analysis',
    category: 'General',
    input: {
      product: 'User feedback management platform with feature voting, roadmap, and changelog',
      target_market: 'Product managers and customer success teams managing user feedback',
      growth_stage: 'early',
      current_metrics: 'Primary object: feedback, Value action: capture, Activation rules: embedded widget + collected feedback + tagged insight',
      goals: 'Improve feedback collection rate from 25% to 50% by simplifying widget installation',
      constraints: 'Integration complexity, feedback volume management, competitive feedback tools'
    }
  }
]

export function generateShareUrl(example: GrowthOSExample): string {
  // Convert BaseGrowthOSInput to BuilderWizardState format for sharing
  const wizardState = convertExampleToWizardState(example)
  const encoded = encodeShareableInput(wizardState)
  return `/s?d=${encoded}`
}

// Convert example input to BuilderWizardState for sharing and editing
export function convertExampleToWizardState(example: GrowthOSExample): BuilderWizardState {
  // Parse current_metrics to extract primary object, value action, and activation rules
  const metricsLower = (example.input.current_metrics || '').toLowerCase()

  // Extract primary object from metrics (e.g., "Primary object: app" -> "App")
  let primaryObject = ''
  const primaryMatch = example.input.current_metrics?.match(/Primary object:\s*(\w+)/i)
  if (primaryMatch) {
    primaryObject = primaryMatch[1].charAt(0).toUpperCase() + primaryMatch[1].slice(1)
  }

  // Extract value action from metrics (e.g., "Value action: deploy" -> "Deploy")
  let valueAction = ''
  const actionMatch = example.input.current_metrics?.match(/Value action:\s*(\w+)/i)
  if (actionMatch) {
    valueAction = actionMatch[1].charAt(0).toUpperCase() + actionMatch[1].slice(1)
  }

  // Determine activation rules from metrics
  const activationRules: BuilderWizardState['activationRules'] = []
  if (metricsLower.includes('created') && primaryObject) {
    activationRules.push('created_primary_object')
  }
  if (metricsLower.includes('invite') || metricsLower.includes('teammate')) {
    activationRules.push('invited_teammate')
  }
  if (metricsLower.includes('feature') || metricsLower.includes('used')) {
    activationRules.push('used_key_feature')
  }
  if (metricsLower.includes('integration') || metricsLower.includes('connect')) {
    activationRules.push('connected_integration')
  }

  // Determine product type based on category
  const productType: BuilderWizardState['productType'] =
    example.category === 'B2B' ? 'Devtool' : 'B2B SaaS'

  // Determine pricing model based on description and category
  let pricingModel: BuilderWizardState['pricingModel'] = 'Subscription'
  const descLower = example.description.toLowerCase()
  if (descLower.includes('usage') || example.input.current_metrics?.toLowerCase().includes('usage')) {
    pricingModel = 'Usage-based'
  }

  // Generate activation event name from example name
  const activationEventName = example.name.split(':')[1]?.trim() || valueAction + ' Completed'

  return {
    productType,
    primaryObject: primaryObject || 'Object',
    valueAction: valueAction || 'Use',
    pricingModel,
    ttvMinutes: example.input.growth_stage === 'early' ? '10' : '15',
    activationEventName,
    activationRules,
    coreEvents: ['user_signup', 'user_login', 'object_created', 'feature_used'],
    customEvents: []
  }
}

export function getExampleById(id: string): GrowthOSExample | undefined {
  return examples.find(ex => ex.id === id)
}

export function getExamplesByCategory(category: GrowthOSExample['category']): GrowthOSExample[] {
  return examples.filter(ex => ex.category === category)
}

export function getAllCategories(): GrowthOSExample['category'][] {
  return ['SaaS', 'B2B', 'E-commerce', 'Creator', 'Agency', 'General']
}
