# Experiment Card Template

Use this template to document every experiment before, during, and after execution.

---

## Experiment Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | [Clear, descriptive name] |
| **Experiment ID** | [Unique identifier, e.g., EXP-2024-042] |
| **Owner** | [Name and team] |
| **Status** | Draft / Running / Analyzing / Completed |
| **Start Date** | [YYYY-MM-DD] |
| **End Date** | [YYYY-MM-DD or TBD] |
| **Duration** | [X days/weeks] |

---

## Hypothesis

### Problem Statement
[What problem are we trying to solve? What did we observe that led to this experiment?]

### Hypothesis
**We believe that** [change/intervention]
**for** [target users]
**will result in** [expected outcome]
**because** [rationale/insight].

### Example:
> We believe that simplifying the signup form from 5 fields to 3 fields for new visitors will result in a 15% increase in signup completion rate because user testing showed form length as the primary friction point.

---

## Experiment Design

### Variants

| Variant | Description | Traffic Allocation |
|---------|-------------|-------------------|
| Control | [Current experience] | 50% |
| Treatment A | [Changed experience] | 50% |
| Treatment B | [Alternative change, if applicable] | 0% |

### Target Audience
- **Who:** [User segment to include]
- **Exclusions:** [Who to exclude]
- **Sample size required:** [Number per variant]

### Randomization
- **Unit:** [User, session, account]
- **Sticky:** [Yes/No - do users stay in same variant?]

---

## Metrics

### Primary Metric (OEC - Overall Evaluation Criterion)
| Metric | Definition | Current Baseline | MDE |
|--------|------------|-----------------|-----|
| [Metric name] | [How it's calculated] | [X%] | [Y%] |

**MDE (Minimum Detectable Effect):** The smallest improvement we want to detect.

### Secondary Metrics
| Metric | Definition | Guardrail? |
|--------|------------|-----------|
| [Metric 1] | [Definition] | No |
| [Metric 2] | [Definition] | Yes - should not decrease >5% |

### Guardrail Metrics
Metrics that should not be negatively impacted:
- [ ] [Metric] - should not decrease more than [X%]
- [ ] [Metric] - should not increase more than [X%]

---

## Statistical Parameters

| Parameter | Value |
|-----------|-------|
| **Significance Level (α)** | 0.05 (95% confidence) |
| **Statistical Power (1-β)** | 0.80 (80% power) |
| **Test Type** | Two-tailed / One-tailed |
| **Required Sample Size** | [N per variant] |
| **Estimated Duration** | [X days/weeks] |

### Sample Size Calculation
```
Baseline conversion: X%
MDE: Y% relative (Z% absolute)
α: 0.05
Power: 0.80
Required sample: N per variant
```

---

## Implementation

### Technical Requirements
- [ ] Feature flag created: [Flag name]
- [ ] Tracking events added: [List events]
- [ ] QA completed
- [ ] Monitoring set up

### Tracking Events
| Event | Description | Properties |
|-------|-------------|------------|
| experiment_viewed | User assigned to variant | experiment_id, variant_id |
| [conversion_event] | Primary conversion | experiment_id, variant_id |

### Rollout Plan
1. [ ] Internal testing (X%)
2. [ ] Beta rollout (Y%)
3. [ ] Full rollout (100%)

---

## Results

### Summary
| Variant | Users | Conversions | Rate | Lift | P-value | Significant? |
|---------|-------|-------------|------|------|---------|--------------|
| Control | | | | - | - | - |
| Treatment A | | | | | | |

### Primary Metric Result
- **Winner:** [Control / Treatment / Inconclusive]
- **Observed Lift:** [X% ± Y%]
- **Confidence:** [Z%]
- **P-value:** [0.XXX]

### Secondary Metrics
| Metric | Control | Treatment | Lift | Significant? |
|--------|---------|-----------|------|--------------|
| | | | | |

### Guardrail Check
- [ ] All guardrails passed
- [ ] [Details of any guardrail concerns]

---

## Analysis & Learnings

### Key Insights
[What did we learn? Were there any surprises?]

### Segment Analysis
[Did results differ by user segment, platform, or other dimensions?]

### Unexpected Observations
[Anything unexpected that warrants further investigation?]

---

## Decision & Next Steps

### Decision
- [ ] **Ship Treatment** - Roll out to 100%
- [ ] **Keep Control** - Do not ship
- [ ] **Iterate** - Run follow-up experiment
- [ ] **Inconclusive** - Need more data

### Rationale
[Why did we make this decision?]

### Follow-up Actions
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Document in knowledge base]

---

## Appendix

### Links
- Experiment dashboard: [URL]
- Feature flag: [URL]
- Design mocks: [URL]
- Related experiments: [IDs]

### Changelog
| Date | Change | Author |
|------|--------|--------|
| | Experiment created | |
| | Experiment started | |
| | Experiment ended | |
| | Results documented | |

---

*Copy this template for each new experiment. Adapt sections as needed for your team's process.*
