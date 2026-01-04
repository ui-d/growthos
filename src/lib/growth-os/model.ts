export interface BaseGrowthOSInput {
  product: string
  target_market: string
  growth_stage: 'launch' | 'early' | 'scaling' | 'maturity'
  current_metrics: string
  goals: string
  constraints: string
}