# Data Quality Audit Checklist

Use this checklist to audit your analytics data quality. Run this audit quarterly or when onboarding new data sources.

---

## Event Volume & Coverage

### Volume Checks
- [ ] **Total event volume** - Is it within expected range?
- [ ] **Volume trends** - Any unexpected drops or spikes?
- [ ] **Volume by event type** - Are all expected events firing?
- [ ] **Volume by platform** - Web, iOS, Android balanced as expected?
- [ ] **Volume by geography** - Any regional gaps?

### Coverage Checks
- [ ] **All documented events implemented** - Cross-check tracking plan
- [ ] **No orphan events** - Events firing that aren't documented
- [ ] **All user touchpoints covered** - Key pages/features tracked
- [ ] **Funnel completeness** - All funnel steps have events

### Volume Queries to Run
```sql
-- Daily event volume trend
SELECT DATE(timestamp) as date, event_name, COUNT(*) as count
FROM events
WHERE timestamp >= CURRENT_DATE - 30
GROUP BY 1, 2
ORDER BY 1, 2;

-- Compare to previous period
-- Flag: >20% drop or >50% spike
```

---

## Property Quality

### Completeness
- [ ] **Required properties populated** - No nulls in required fields
- [ ] **Optional properties** - Reasonable fill rates
- [ ] **User IDs** - Present for authenticated events
- [ ] **Session IDs** - Present for all events
- [ ] **Timestamps** - Present and valid for all events

### Accuracy
- [ ] **Data types correct** - Numbers are numbers, strings are strings
- [ ] **Values in expected ranges** - Amounts positive, rates 0-100
- [ ] **Enum values valid** - Only expected values appear
- [ ] **No placeholder values** - No "test", "undefined", "null" strings
- [ ] **Dates properly formatted** - ISO 8601 or consistent format

### Consistency
- [ ] **Same property = same format** - Consistent across events
- [ ] **Naming conventions followed** - snake_case, no typos
- [ ] **Units consistent** - All amounts in cents, all durations in seconds

### Property Queries to Run
```sql
-- Null rate by property
SELECT
  'property_name' as property,
  COUNT(*) as total,
  SUM(CASE WHEN property_name IS NULL THEN 1 ELSE 0 END) as nulls,
  ROUND(100.0 * SUM(CASE WHEN property_name IS NULL THEN 1 ELSE 0 END) / COUNT(*), 2) as null_pct
FROM events
WHERE timestamp >= CURRENT_DATE - 7;

-- Unexpected values
SELECT property_name, COUNT(*)
FROM events
WHERE property_name NOT IN ('expected', 'values', 'list')
GROUP BY 1;
```

---

## Identity & Session Quality

### User Identity
- [ ] **User ID format consistent** - Same format across all sources
- [ ] **Anonymous to known stitching** - IDs merge correctly on login
- [ ] **No duplicate user IDs** - One ID per actual user
- [ ] **User properties up to date** - Traits reflect current state

### Session Quality
- [ ] **Session IDs unique** - No collisions
- [ ] **Session duration reasonable** - Not unrealistically long
- [ ] **Events per session normal** - Not too few or too many
- [ ] **Session start events present** - Sessions properly initialized

### Identity Queries
```sql
-- Users with multiple IDs (potential stitching issue)
SELECT email, COUNT(DISTINCT user_id) as id_count
FROM users
GROUP BY email
HAVING COUNT(DISTINCT user_id) > 1;

-- Session sanity check
SELECT
  AVG(event_count) as avg_events,
  PERCENTILE(event_count, 0.5) as median_events,
  PERCENTILE(event_count, 0.99) as p99_events
FROM (
  SELECT session_id, COUNT(*) as event_count
  FROM events
  WHERE timestamp >= CURRENT_DATE - 7
  GROUP BY session_id
);
```

---

## Timing & Freshness

### Latency
- [ ] **Event delivery time** - Events arrive within expected window
- [ ] **No future timestamps** - All timestamps in the past
- [ ] **No very old events** - Events aren't delayed by days
- [ ] **Time zones correct** - UTC or consistent handling

### Freshness
- [ ] **Most recent event** - Data is current
- [ ] **Processing delays** - Data available in BI tools on time
- [ ] **Backfill handling** - Historical data correctly loaded

### Timing Queries
```sql
-- Event latency (requires received_at timestamp)
SELECT
  event_name,
  AVG(TIMESTAMPDIFF(SECOND, timestamp, received_at)) as avg_latency_seconds,
  MAX(TIMESTAMPDIFF(SECOND, timestamp, received_at)) as max_latency_seconds
FROM events
WHERE timestamp >= CURRENT_DATE - 1
GROUP BY event_name;

-- Future timestamps (should be zero)
SELECT COUNT(*) as future_events
FROM events
WHERE timestamp > CURRENT_TIMESTAMP;
```

---

## Deduplication

### Duplicate Detection
- [ ] **Duplicate events** - Same event_id appearing multiple times
- [ ] **Near-duplicate events** - Same user/event/timestamp
- [ ] **Idempotency** - Retries don't create duplicates

### Deduplication Queries
```sql
-- Exact duplicates by event_id
SELECT event_id, COUNT(*) as occurrences
FROM events
WHERE timestamp >= CURRENT_DATE - 7
GROUP BY event_id
HAVING COUNT(*) > 1;

-- Near duplicates (same user, event, within 1 second)
SELECT user_id, event_name, COUNT(*)
FROM events
WHERE timestamp >= CURRENT_DATE - 1
GROUP BY user_id, event_name, DATE_TRUNC('second', timestamp)
HAVING COUNT(*) > 1;
```

---

## Schema Compliance

### Schema Validation
- [ ] **Known events only** - No unrecognized event names
- [ ] **Known properties only** - No unexpected properties
- [ ] **Required properties present** - Per event schema
- [ ] **Property types match schema** - String vs number vs boolean

### Schema Governance
- [ ] **Tracking plan up to date** - Reflects current implementation
- [ ] **Change process exists** - How are schema changes managed?
- [ ] **Versioning** - Schema versions tracked

### Compliance Queries
```sql
-- Unrecognized events
SELECT event_name, COUNT(*)
FROM events
WHERE event_name NOT IN (
  SELECT event_name FROM tracking_plan_events
)
GROUP BY 1;

-- Schema version distribution
SELECT schema_version, COUNT(*)
FROM events
WHERE timestamp >= CURRENT_DATE - 7
GROUP BY 1;
```

---

## Cross-Platform Consistency

### Platform Parity
- [ ] **Same events on all platforms** - Web, iOS, Android aligned
- [ ] **Same properties on all platforms** - Consistent schema
- [ ] **Same naming on all platforms** - No platform-specific variations
- [ ] **Same values on all platforms** - Enum values aligned

### Platform Queries
```sql
-- Event coverage by platform
SELECT event_name, platform, COUNT(*)
FROM events
WHERE timestamp >= CURRENT_DATE - 7
GROUP BY 1, 2
ORDER BY 1, 2;

-- Property availability by platform
SELECT platform,
  SUM(CASE WHEN property_x IS NOT NULL THEN 1 ELSE 0 END) as has_property_x
FROM events
GROUP BY 1;
```

---

## Funnel & Metric Integrity

### Funnel Checks
- [ ] **Funnel order logical** - Events happen in expected sequence
- [ ] **No leaky funnels** - Downstream steps <= upstream steps
- [ ] **Conversion rates sensible** - Within expected ranges

### Metric Validation
- [ ] **Metrics match source of truth** - Compare to billing, CRM
- [ ] **Metric definitions documented** - Clear calculation logic
- [ ] **Metric values reasonable** - No impossible values

---

## Action Items Template

### Critical Issues (Fix Immediately)
| Issue | Impact | Owner | Due Date |
|-------|--------|-------|----------|
| | | | |

### High Priority (Fix This Week)
| Issue | Impact | Owner | Due Date |
|-------|--------|-------|----------|
| | | | |

### Improvements (Backlog)
| Issue | Impact | Owner | Due Date |
|-------|--------|-------|----------|
| | | | |

---

## Audit Schedule

| Audit Type | Frequency | Owner |
|------------|-----------|-------|
| Volume monitoring | Daily (automated) | Analytics |
| Property completeness | Weekly | Analytics |
| Full audit | Quarterly | Data Team |
| Post-release check | After each release | Engineering |

---

*Adapt this checklist to your data stack and team structure. Automate checks where possible.*
