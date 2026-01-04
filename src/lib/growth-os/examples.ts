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
    id: 'saas-startup',
    name: 'SaaS Startup Growth Plan',
    description: 'Complete growth operating system for a B2B SaaS startup looking to scale from $1M to $10M ARR',
    category: 'SaaS',
    input: {
      product: 'Project management software for remote teams',
      target_market: 'Small to medium-sized tech companies (10-500 employees)',
      growth_stage: 'scaling',
      current_metrics: 'Current: $1M ARR, 100 customers, $833 MRR per customer, 5% monthly churn',
      goals: 'Reach $10M ARR within 24 months while maintaining unit economics',
      constraints: 'Limited budget ($50K/month), small team (5 people), competitive market'
    }
  },
  {
    id: 'ecommerce-brand',
    name: 'E-commerce Brand Expansion',
    description: 'Growth strategy for a D2C brand expanding into new markets and channels',
    category: 'E-commerce',
    input: {
      product: 'Sustainable fashion brand specializing in eco-friendly activewear',
      target_market: 'Health-conscious millennials and Gen Z consumers in the US and Europe',
      growth_stage: 'scaling',
      current_metrics: 'Current: $5M annual revenue, 20K customers, $250 AOV, 30% repeat purchase rate',
      goals: 'Double revenue to $10M in 12 months through market expansion and product line extension',
      constraints: 'Supply chain limitations, maintaining brand values while scaling, CAC increasing'
    }
  },
  {
    id: 'content-creator',
    name: 'Creator Economy Monetization',
    description: 'Monetization and audience growth strategy for content creators and influencers',
    category: 'Creator',
    input: {
      product: 'Educational content about personal finance and investing',
      target_market: 'Young professionals aged 25-40 interested in building wealth',
      growth_stage: 'early',
      current_metrics: 'Current: 50K YouTube subscribers, 30K email list, $5K/month from ads and affiliates',
      goals: 'Build to $50K MRR through course sales and premium community within 6 months',
      constraints: 'Limited time (part-time creator), no team, needs to maintain authenticity'
    }
  },
  {
    id: 'marketing-agency',
    name: 'Marketing Agency Scale-Up',
    description: 'Growth system for a digital marketing agency looking to productize services',
    category: 'Agency',
    input: {
      product: 'Full-service digital marketing agency specializing in paid media',
      target_market: 'E-commerce brands doing $1M-$50M in annual revenue',
      growth_stage: 'maturity',
      current_metrics: 'Current: $2M annual revenue, 15 retainer clients, $11K average monthly retainer',
      goals: 'Scale to $5M revenue through productization and team expansion',
      constraints: 'Client concentration risk, talent acquisition challenges, margin pressure'
    }
  },
  {
    id: 'b2b-marketplace',
    name: 'B2B Marketplace Launch',
    description: 'Go-to-market strategy for a two-sided B2B marketplace platform',
    category: 'B2B',
    input: {
      product: 'B2B marketplace connecting manufacturers with distributors in the industrial sector',
      target_market: 'Mid-market manufacturers ($10M-$500M revenue) and regional distributors',
      growth_stage: 'launch',
      current_metrics: 'Pre-launch: 50 supplier LOIs, 200 buyer waitlist, $2M seed funding',
      goals: 'Achieve $1M GMV in first 6 months, 500 active buyers, 100 active suppliers',
      constraints: 'Classic chicken-and-egg problem, long B2B sales cycles, need for trust building'
    }
  },
  {
    id: 'mobile-app',
    name: 'Mobile App User Acquisition',
    description: 'User acquisition and retention strategy for a consumer mobile application',
    category: 'General',
    input: {
      product: 'Meditation and mindfulness app with AI-personalized sessions',
      target_market: 'Stressed professionals and students aged 22-45 in English-speaking markets',
      growth_stage: 'early',
      current_metrics: 'Current: 10K downloads, 2K MAU, 15% day-7 retention, $9.99/month subscription',
      goals: 'Reach 100K downloads and 10K paid subscribers in 6 months',
      constraints: 'Crowded market with big competitors, high CAC on paid channels, app store dependency'
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