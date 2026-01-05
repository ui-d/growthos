import type { BaseGrowthOSInput } from './model'

export interface GrowthOSExample {
  id: string
  name: string
  description: string
  category: 'SaaS' | 'E-commerce' | 'Creator' | 'Agency' | 'B2B' | 'General'
  input: BaseGrowthOSInput
}

export const examples: GrowthOSExample[] = [
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
  }
]

export function generateShareUrl(example: GrowthOSExample): string {
  const data = {
    product: example.input.product,
    target_market: example.input.target_market,
    growth_stage: example.input.growth_stage,
    current_metrics: example.input.current_metrics,
    goals: example.input.goals,
    constraints: example.input.constraints
  }

  const encoded = btoa(JSON.stringify(data))
  return `/s?d=${encoded}`
}

export function getExampleById(id: string): GrowthOSExample | undefined {
  return examples.find(ex => ex.id === id)
}