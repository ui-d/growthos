# Dashboard Pack Checklist

Use this checklist to build a comprehensive analytics dashboard suite for your product. Each dashboard serves a specific purpose and audience.

## Executive Dashboard

**Purpose:** High-level business health metrics for leadership.

**Frequency:** Weekly review

### Metrics to Include
- [ ] **Monthly Active Users (MAU)** - Total and trend
- [ ] **Weekly Active Users (WAU)** - Total and trend
- [ ] **Daily Active Users (DAU)** - Total and trend
- [ ] **DAU/MAU Ratio** - Stickiness metric
- [ ] **New Users** - Weekly/monthly signups
- [ ] **Revenue** - MRR/ARR and growth rate
- [ ] **Churn Rate** - Monthly customer churn
- [ ] **Net Revenue Retention** - Expansion vs contraction

### Dimensions
- [ ] Time period selector (7d, 30d, 90d, YTD)
- [ ] Comparison to previous period
- [ ] Target/goal lines where applicable

---

## Acquisition Dashboard

**Purpose:** Track user acquisition performance and sources.

**Frequency:** Daily/weekly review

### Metrics to Include
- [ ] **New Signups** - Daily and cumulative
- [ ] **Signup Conversion Rate** - Visitors to signups
- [ ] **Cost per Acquisition (CPA)** - By channel
- [ ] **Signups by Source** - Breakdown by channel
- [ ] **Landing Page Conversion** - By page
- [ ] **Campaign Performance** - By campaign

### Dimensions
- [ ] Channel (organic, paid, referral, direct)
- [ ] Campaign (UTM parameters)
- [ ] Geography
- [ ] Device type

### Filters
- [ ] Date range
- [ ] Channel
- [ ] Campaign

---

## Activation Dashboard

**Purpose:** Monitor onboarding and activation funnel.

**Frequency:** Daily review

### Metrics to Include
- [ ] **Activation Rate** - Signups that activate
- [ ] **Time to Activation** - Median and distribution
- [ ] **Onboarding Funnel** - Step-by-step completion
- [ ] **Drop-off Points** - Where users abandon
- [ ] **Feature Adoption** - Key features tried
- [ ] **Activation by Cohort** - Weekly cohort trends

### Funnel Steps to Track
- [ ] Signup completed
- [ ] Email verified (if applicable)
- [ ] Onboarding started
- [ ] Profile completed
- [ ] First core action
- [ ] Activation milestone

### Dimensions
- [ ] Signup source
- [ ] User segment
- [ ] Device/platform

---

## Engagement Dashboard

**Purpose:** Understand how users interact with the product.

**Frequency:** Weekly review

### Metrics to Include
- [ ] **Session Count** - Per user per period
- [ ] **Session Duration** - Average and distribution
- [ ] **Pages/Features per Session**
- [ ] **Feature Usage** - By feature
- [ ] **Power User Percentage** - Highly engaged users
- [ ] **Engagement Score** - Composite metric

### Dimensions
- [ ] User segment
- [ ] Plan type
- [ ] Account age

---

## Retention Dashboard

**Purpose:** Track user retention and identify churn risk.

**Frequency:** Weekly review

### Metrics to Include
- [ ] **Retention Curves** - D1, D7, D14, D30, D60, D90
- [ ] **Cohort Retention Table** - Week-over-week
- [ ] **Churn Rate** - By period
- [ ] **Resurrection Rate** - Returning dormant users
- [ ] **At-Risk Users** - Declining engagement

### Cohort Views
- [ ] Signup week cohorts
- [ ] Activation week cohorts
- [ ] Plan type cohorts

### Segments to Compare
- [ ] Activated vs non-activated
- [ ] Free vs paid
- [ ] By acquisition source

---

## Revenue Dashboard

**Purpose:** Track revenue metrics and monetization.

**Frequency:** Weekly/monthly review

### Metrics to Include
- [ ] **MRR/ARR** - Current and trend
- [ ] **New MRR** - From new customers
- [ ] **Expansion MRR** - Upgrades
- [ ] **Churned MRR** - Lost revenue
- [ ] **Net MRR Movement**
- [ ] **ARPU** - Average revenue per user
- [ ] **LTV** - Customer lifetime value
- [ ] **LTV:CAC Ratio**

### Dimensions
- [ ] Plan type
- [ ] Customer segment
- [ ] Acquisition source
- [ ] Geography

---

## Experimentation Dashboard

**Purpose:** Track A/B test results and experiment velocity.

**Frequency:** Per-experiment and weekly rollup

### Metrics to Include
- [ ] **Active Experiments** - Currently running
- [ ] **Experiment Results** - Win/loss/inconclusive
- [ ] **Statistical Significance** - Per experiment
- [ ] **Sample Size Progress** - Actual vs required
- [ ] **Impact Tracking** - Cumulative wins

### Per-Experiment View
- [ ] Variant comparison
- [ ] Conversion rates
- [ ] Confidence intervals
- [ ] Sample sizes

---

## Data Quality Dashboard

**Purpose:** Monitor analytics data health.

**Frequency:** Daily automated alerts

### Metrics to Include
- [ ] **Event Volume** - By event type
- [ ] **Missing Properties** - Null/undefined rates
- [ ] **Schema Violations** - Type mismatches
- [ ] **Duplicate Events** - Deduplication needed
- [ ] **Latency** - Event delivery time
- [ ] **Error Rates** - Failed tracking

### Alerts to Configure
- [ ] Volume drops >20%
- [ ] Missing property rate >5%
- [ ] Schema errors >1%
- [ ] New unrecognized events

---

## Dashboard Best Practices

### Design Principles
- [ ] Start with the most important metric (top-left)
- [ ] Use consistent color coding
- [ ] Include comparison periods
- [ ] Add target/goal lines
- [ ] Make filters prominent
- [ ] Include last-updated timestamp

### Maintenance
- [ ] Document each metric definition
- [ ] Assign dashboard owners
- [ ] Schedule regular reviews
- [ ] Archive unused dashboards
- [ ] Version control SQL/queries

### Access
- [ ] Define who sees what
- [ ] Use appropriate aggregation for different audiences
- [ ] Consider embedding in product for relevant users

---

*These are starter templates. Adapt metrics, dimensions, and structure to your specific product and business model.*
