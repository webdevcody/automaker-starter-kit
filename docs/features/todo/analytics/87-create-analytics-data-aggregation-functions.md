# 87 - Create Analytics Data Aggregation Functions

## Priority: HIGH

## Dependencies: 48-create-user-progress-table.md, 47-add-admin-role-to-user.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Create backend functions to aggregate analytics data from various tables.

## User Story

As a developer, I need aggregation functions to calculate analytics metrics so admins can see platform insights.

## Database Schema

Uses existing tables (user_progress, content_completion, user, etc.).

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/analytics.ts`
  - `getStudentEngagementMetrics()` - Calculate engagement stats
  - `getModuleCompletionRates()` - Calculate completion percentages
  - `getTimeSpentAnalytics()` - Aggregate time spent data
  - `getDropOffPoints()` - Find where students stop
  - `getActiveInactiveStudents()` - Count active vs inactive
  - `getRevenueMetrics()` - Calculate revenue stats

### Server Functions

- [ ] `src/fn/analytics.ts`
  - `getAnalyticsFn` - GET endpoint
  - Middleware: authenticated user + admin check
  - Return aggregated metrics

### Queries

- [ ] `src/queries/analytics.ts`
  - `analyticsQuery` - Query for analytics data

### Hooks

- [ ] `src/hooks/useAnalytics.ts`
  - `useAnalytics()` - Hook for getting analytics

## Acceptance Criteria

- [ ] Analytics functions created
- [ ] Data aggregated correctly
- [ ] Functions performant (use indexes)
- [ ] Admin-only access
- [ ] Returns structured data
