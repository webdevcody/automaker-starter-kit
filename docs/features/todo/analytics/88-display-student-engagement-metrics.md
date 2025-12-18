# 88 - Display Student Engagement Metrics

## Priority: HIGH

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display student engagement metrics on admin dashboard.

## User Story

As an admin, I want to see student engagement metrics so I can understand how active students are.

## Database Schema

Uses existing tables.

## Implementation Tasks

### Components

- [ ] `src/components/EngagementMetrics.tsx` - Component showing engagement stats
- [ ] `src/components/MetricCard.tsx` - Reusable metric card component
- [ ] Display metrics:
  - Daily active users
  - Weekly active users
  - Monthly active users
  - Average session duration
  - Content views per student
- [ ] Add to admin dashboard

## UI/UX Requirements

- Metric cards with numbers
- Trend indicators (up/down)
- Time period selector (7 days, 30 days, etc.)
- Visual charts/graphs

## Acceptance Criteria

- [ ] Engagement metrics displayed
- [ ] Metrics calculated correctly
- [ ] Visual presentation clear
- [ ] Time period filtering works
- [ ] Admin-only access
