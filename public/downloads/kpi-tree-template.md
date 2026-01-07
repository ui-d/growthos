# KPI Tree Template

Use this template to build a metrics hierarchy that connects team efforts to business outcomes.

---

## 1. Overview

| Field | Value |
|-------|-------|
| Company/Product | [Your Company] |
| North Star Metric | [Your NSM] |
| Date Created | [YYYY-MM-DD] |
| Owner | [Name / Team] |
| Review Cadence | [Weekly/Monthly/Quarterly] |

---

## 2. North Star Metric

### Definition

| Component | Description |
|-----------|-------------|
| **Metric Name** | [e.g., Weekly Active Users] |
| **Definition** | [Precise definition of how this is calculated] |
| **Why This Metric** | [Why this represents value delivered to customers] |
| **Target** | [Current target value] |
| **Current Value** | [Most recent measurement] |

### North Star Formula (if applicable)

```
North Star = [Input A] x [Input B] x [Input C]
```

---

## 3. KPI Tree Structure

```
                    [North Star Metric]
                           |
        ┌──────────────────┼──────────────────┐
        |                  |                  |
   [L1 Metric A]      [L1 Metric B]      [L1 Metric C]
        |                  |                  |
   ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
   |         |        |         |        |         |
[L2-A1]  [L2-A2]  [L2-B1]  [L2-B2]  [L2-C1]  [L2-C2]
```

---

## 4. Level 1 Metrics (Input Metrics)

These are the primary drivers of your North Star.

### L1 Metric A: [Name]

| Field | Value |
|-------|-------|
| Definition | [How is this calculated?] |
| Relationship to NSM | [How does this drive the North Star?] |
| Owner | [Team/Person responsible] |
| Target | [Current target] |
| Current Value | [Most recent value] |
| Trend | [Improving/Stable/Declining] |

### L1 Metric B: [Name]

| Field | Value |
|-------|-------|
| Definition | [How is this calculated?] |
| Relationship to NSM | [How does this drive the North Star?] |
| Owner | [Team/Person responsible] |
| Target | [Current target] |
| Current Value | [Most recent value] |
| Trend | [Improving/Stable/Declining] |

### L1 Metric C: [Name]

| Field | Value |
|-------|-------|
| Definition | [How is this calculated?] |
| Relationship to NSM | [How does this drive the North Star?] |
| Owner | [Team/Person responsible] |
| Target | [Current target] |
| Current Value | [Most recent value] |
| Trend | [Improving/Stable/Declining] |

---

## 5. Level 2 Metrics (Leading Indicators)

These are actionable metrics that teams can directly influence.

### For L1 Metric A

| Metric | Definition | Owner | Target | Status |
|--------|------------|-------|--------|--------|
| [L2-A1] | [Definition] | [Team] | [Target] | [On/Off Track] |
| [L2-A2] | [Definition] | [Team] | [Target] | [On/Off Track] |

### For L1 Metric B

| Metric | Definition | Owner | Target | Status |
|--------|------------|-------|--------|--------|
| [L2-B1] | [Definition] | [Team] | [Target] | [On/Off Track] |
| [L2-B2] | [Definition] | [Team] | [Target] | [On/Off Track] |

### For L1 Metric C

| Metric | Definition | Owner | Target | Status |
|--------|------------|-------|--------|--------|
| [L2-C1] | [Definition] | [Team] | [Target] | [On/Off Track] |
| [L2-C2] | [Definition] | [Team] | [Target] | [On/Off Track] |

---

## 6. Example: SaaS KPI Tree

Here's a worked example for a typical SaaS product:

```
                        MRR (Monthly Recurring Revenue)
                                    |
         ┌──────────────────────────┼──────────────────────────┐
         |                          |                          |
    New MRR                   Expansion MRR              Retained MRR
         |                          |                          |
    ┌────┴────┐                ┌────┴────┐                ┌────┴────┐
    |         |                |         |                |         |
Signups   Conv Rate        Upgrades  ARPU Growth      Churn Rate  NPS
```

### Level 1 Breakdown

| L1 Metric | Formula | Owner |
|-----------|---------|-------|
| New MRR | New Customers × ARPU | Growth Team |
| Expansion MRR | Upgrades + Add-ons | Product Team |
| Retained MRR | Previous MRR × (1 - Churn) | CS Team |

### Level 2 Breakdown

| L1 Parent | L2 Metric | Owner |
|-----------|-----------|-------|
| New MRR | Signups | Marketing |
| New MRR | Trial Conversion Rate | Growth |
| Expansion MRR | Feature Adoption | Product |
| Expansion MRR | Upgrade Rate | Sales |
| Retained MRR | Churn Rate | Customer Success |
| Retained MRR | NPS Score | Support |

---

## 7. Metric Definitions Table

Document all metrics in one place for reference:

| Metric Name | Level | Definition | Calculation | Data Source |
|-------------|-------|------------|-------------|-------------|
| [NSM] | 0 | [Definition] | [Formula] | [Source] |
| [L1-A] | 1 | [Definition] | [Formula] | [Source] |
| [L1-B] | 1 | [Definition] | [Formula] | [Source] |
| [L1-C] | 1 | [Definition] | [Formula] | [Source] |
| [L2-A1] | 2 | [Definition] | [Formula] | [Source] |
| [L2-A2] | 2 | [Definition] | [Formula] | [Source] |
| [L2-B1] | 2 | [Definition] | [Formula] | [Source] |
| [L2-B2] | 2 | [Definition] | [Formula] | [Source] |

---

## 8. Dashboard Mapping

Map each metric to where it's tracked:

| Metric | Dashboard | Chart Type | Update Frequency |
|--------|-----------|------------|------------------|
| North Star | Executive | Big Number + Trend | Daily |
| L1 Metrics | Executive | Line Chart | Daily |
| L2 Metrics | Team-specific | Various | Real-time |

---

## 9. Review Checklist

Use this checklist during KPI reviews:

### Weekly Review

- [ ] North Star trending in right direction?
- [ ] Any L1 metrics off track?
- [ ] Any anomalies requiring investigation?
- [ ] Team blockers identified?

### Monthly Review

- [ ] All L2 metrics reviewed by owners
- [ ] Targets still appropriate?
- [ ] Any new metrics needed?
- [ ] Any metrics to deprecate?

### Quarterly Review

- [ ] North Star definition still valid?
- [ ] KPI tree structure appropriate?
- [ ] Target recalibration needed?
- [ ] Documentation up to date?

---

## 10. Common KPI Tree Patterns

### E-commerce

```
Revenue
├── Traffic × Conversion Rate × AOV
├── L2: Sessions, Bounce Rate, Add-to-Cart Rate, Checkout Rate, Items/Order
```

### Marketplace

```
GMV (Gross Merchandise Value)
├── Active Buyers × Orders/Buyer × AOV
├── Active Sellers × Listings/Seller × Conversion Rate
```

### SaaS

```
ARR (Annual Recurring Revenue)
├── Customers × ARPU
├── New ARR + Expansion ARR - Churned ARR
```

### Consumer App

```
DAU (Daily Active Users)
├── New Users × Retention Rate
├── MAU × DAU/MAU Ratio
```

---

*Template version 1.0 | Adapt to your specific business model*
