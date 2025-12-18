# 93 - Display Revenue Metrics

## Priority: MEDIUM

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display revenue and subscription metrics to admins.

## User Story

As an admin, I want to see revenue metrics so I understand the business performance.

## Database Schema

Uses existing user table with subscription data.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/analytics.ts`
  - `getRevenueMetrics()` - Calculate revenue stats
  - Monthly recurring revenue (MRR)
  - Total revenue
  - Subscription counts by plan
  - Churn rate

### Components

- [ ] `src/components/RevenueMetrics.tsx` - Component showing revenue
- [ ] Display:
  - MRR
  - Total revenue
  - Subscriptions by plan
  - Churn rate
  - Revenue trends

## UI/UX Requirements

- Revenue numbers displayed
- Charts showing trends
- Plan breakdown
- Time period selector

## Acceptance Criteria

- [ ] Revenue metrics displayed
- [ ] Metrics calculated correctly
- [ ] Visual charts clear
- [ ] Plan breakdown shown
- [ ] Admin-only access
