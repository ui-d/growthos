# Activation Definition Template

Use this template to document your product's activation metrics and criteria.

---

## 1. Product Overview

| Field | Value |
|-------|-------|
| Product Name | [Your Product] |
| Product Type | [SaaS / Mobile App / Marketplace / etc.] |
| Target User | [Primary user persona] |
| Core Value Proposition | [What problem does your product solve?] |
| Date Documented | [YYYY-MM-DD] |
| Owner | [Name / Team] |

---

## 2. Activation Definition

### 2.1 Activation Event

| Component | Description |
|-----------|-------------|
| **Event Name** | [e.g., `user_activated`] |
| **Human Definition** | [Plain English description of what activation means] |
| **Technical Definition** | [Exact criteria for firing the event] |
| **Time Boundary** | [Within first X days/hours of signup] |

### 2.2 Activation Criteria

List all conditions that must be met for a user to be considered "activated":

| # | Criterion | Event/Property | Rationale |
|---|-----------|----------------|-----------|
| 1 | [e.g., Complete onboarding] | `onboarding_completed` | [Why this matters] |
| 2 | [e.g., Create first project] | `project_created` | [Why this matters] |
| 3 | [e.g., Invite team member] | `team_member_invited` | [Why this matters] |

### 2.3 Activation Formula

```
Activated = (Criterion 1) AND (Criterion 2) AND (Criterion 3)
           within [X] days of signup
```

---

## 3. Activation Funnel

Document the steps users take from signup to activation:

| Step | Event Name | Description | Typical Drop-off |
|------|------------|-------------|------------------|
| 1. Signup | `user_signed_up` | User creates account | 100% (baseline) |
| 2. [Step 2] | `[event_name]` | [Description] | [X%] |
| 3. [Step 3] | `[event_name]` | [Description] | [X%] |
| 4. [Step 4] | `[event_name]` | [Description] | [X%] |
| 5. Activation | `user_activated` | User reaches activation | [X%] |

---

## 4. Validation Checklist

Use this checklist to validate your activation definition:

### Correlation Analysis

- [ ] Activated users have higher Day 7 retention than non-activated users
- [ ] Activated users have higher Day 30 retention than non-activated users
- [ ] Activated users have higher LTV than non-activated users
- [ ] Correlation coefficient > 0.3 between activation and long-term retention

### Practical Considerations

- [ ] Activation can reasonably occur within the time boundary
- [ ] Activation criteria are technically trackable
- [ ] Activation is achievable by majority of target users
- [ ] Team agrees on the definition
- [ ] Definition is documented in analytics tool

### Statistical Validation (Optional)

| Metric | Activated Users | Non-Activated Users | Lift |
|--------|-----------------|---------------------|------|
| Day 7 Retention | [X%] | [Y%] | [Z%] |
| Day 30 Retention | [X%] | [Y%] | [Z%] |
| 90-Day LTV | [$X] | [$Y] | [Z%] |

---

## 5. Segment Breakdown

Consider tracking activation rates by key segments:

| Segment | Activation Rate | Notes |
|---------|-----------------|-------|
| Overall | [X%] | Baseline |
| By Acquisition Channel | | |
| - Organic | [X%] | |
| - Paid | [X%] | |
| - Referral | [X%] | |
| By Plan Type | | |
| - Free | [X%] | |
| - Trial | [X%] | |
| - Paid | [X%] | |
| By User Type | | |
| - [Persona A] | [X%] | |
| - [Persona B] | [X%] | |

---

## 6. Activation Improvement Ideas

Document hypotheses for improving activation:

| # | Hypothesis | Target Metric | Priority |
|---|------------|---------------|----------|
| 1 | [If we do X, then activation will increase because Y] | Activation Rate | High/Med/Low |
| 2 | [If we do X, then activation will increase because Y] | Activation Rate | High/Med/Low |
| 3 | [If we do X, then activation will increase because Y] | Activation Rate | High/Med/Low |

---

## 7. Review Schedule

| Review Type | Frequency | Next Review Date | Owner |
|-------------|-----------|------------------|-------|
| Activation rate check | Weekly | [Date] | [Name] |
| Definition validation | Quarterly | [Date] | [Name] |
| Full recalibration | Annually | [Date] | [Name] |

---

## Appendix: SQL Query Template

```sql
-- Calculate activation rate by signup cohort
WITH signups AS (
  SELECT
    user_id,
    DATE_TRUNC('week', created_at) AS signup_week
  FROM users
  WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
),
activations AS (
  SELECT DISTINCT
    user_id,
    MIN(timestamp) AS activated_at
  FROM events
  WHERE event_name = 'user_activated'
  GROUP BY user_id
)
SELECT
  s.signup_week,
  COUNT(DISTINCT s.user_id) AS total_signups,
  COUNT(DISTINCT a.user_id) AS activated_users,
  ROUND(100.0 * COUNT(DISTINCT a.user_id) / COUNT(DISTINCT s.user_id), 2) AS activation_rate
FROM signups s
LEFT JOIN activations a ON s.user_id = a.user_id
GROUP BY s.signup_week
ORDER BY s.signup_week DESC;
```

---

*Template version 1.0 | Adapt to your specific product and stack*
