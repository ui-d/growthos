# Event Naming Conventions

A consistent naming convention is essential for maintainable analytics. This guide establishes patterns for naming events and properties across your product.

## Core Pattern

Use the **object_action** pattern for all events:

```
[object]_[action]
```

**Examples:**
- `user_signed_up`
- `page_viewed`
- `button_clicked`
- `subscription_started`

## Naming Rules

### Events

1. **Use snake_case** - All lowercase with underscores
2. **Start with the object** - What is being acted upon
3. **End with past tense action** - What happened
4. **Be specific but not too granular** - Find the right balance

**Good:**
- `checkout_completed`
- `feature_activated`
- `onboarding_step_completed`

**Avoid:**
- `CheckoutCompleted` (wrong case)
- `completed_checkout` (wrong order)
- `checkout` (no action)
- `user_clicked_blue_button_on_pricing_page` (too specific)

### Properties

1. **Use snake_case** for property names
2. **Be descriptive** - Property names should be self-explanatory
3. **Use consistent types** - Same property = same type everywhere
4. **Prefix related properties** - Group with common prefixes

**Good:**
- `plan_name`, `plan_interval`, `plan_price`
- `utm_source`, `utm_medium`, `utm_campaign`
- `error_type`, `error_message`, `error_code`

### Common Objects

| Object | Use For |
|--------|---------|
| `user` | User account actions |
| `page` | Page/screen views |
| `button` | Button interactions |
| `form` | Form submissions |
| `feature` | Feature usage |
| `subscription` | Billing events |
| `experiment` | A/B test events |
| `search` | Search actions |
| `notification` | Notification events |
| `error` | Error tracking |

### Common Actions

| Action | Use For |
|--------|---------|
| `viewed` | Something was seen |
| `clicked` | Something was clicked |
| `submitted` | Form/data was submitted |
| `started` | Process began |
| `completed` | Process finished |
| `activated` | Feature first used |
| `updated` | Something was changed |
| `deleted` | Something was removed |
| `sent` | Something was sent |
| `received` | Something was received |

## Event Categories

Organize events into these categories:

### Acquisition
Events related to user signup and initial conversion.
- `user_signed_up`
- `signup_started`
- `signup_step_completed`

### Activation
Events related to users reaching their "aha moment."
- `onboarding_started`
- `onboarding_completed`
- `feature_activated`
- `core_action_completed`

### Engagement
Events related to ongoing product usage.
- `page_viewed`
- `feature_used`
- `session_started`
- `search_performed`

### Revenue
Events related to monetization.
- `subscription_started`
- `subscription_cancelled`
- `checkout_started`
- `checkout_completed`
- `payment_failed`

### Referral
Events related to viral/referral loops.
- `invite_sent`
- `invite_accepted`
- `share_clicked`

### Retention
Events used to measure retention.
- `session_started` (with is_returning_user)
- `feature_used` (repeat usage)

## Property Standards

### Required Properties (All Events)
- `event_id` - Unique event identifier
- `timestamp` - ISO 8601 format
- `user_id` - If user is identified
- `session_id` - Current session

### User Properties
Set once, persist across events:
- `user_id`
- `email` (hash if storing)
- `created_at`
- `plan_name`
- `user_segment`

### Event Properties
Specific to each event:
- Relevant context
- Measurements
- References

## Examples

### Good Event Schema

```javascript
// Signup completed
{
  event: 'user_signed_up',
  properties: {
    signup_method: 'email',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'brand_2024',
    referrer: 'https://google.com'
  }
}

// Feature activated
{
  event: 'feature_activated',
  properties: {
    feature_name: 'ai_assistant',
    feature_category: 'productivity',
    time_to_activation_seconds: 3600,
    activation_path: 'onboarding'
  }
}

// Subscription started
{
  event: 'subscription_started',
  properties: {
    plan_name: 'pro',
    plan_interval: 'monthly',
    amount_cents: 2900,
    currency: 'USD',
    trial_period_days: 14
  }
}
```

## Checklist Before Adding New Events

- [ ] Does this event follow the object_action pattern?
- [ ] Is the event name in snake_case?
- [ ] Is there an existing event that could be reused?
- [ ] Are all properties documented?
- [ ] Are property types consistent with existing usage?
- [ ] Is this event needed, or is it too granular?
- [ ] Who owns this event?

---

*Adapt these conventions to your team and stack. Consistency matters more than the specific pattern you choose.*
