# 94 - Export Analytics Data

## Priority: LOW

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow admins to export analytics data to CSV/Excel.

## User Story

As an admin, I want to export analytics data so I can analyze it in external tools.

## Database Schema

Uses existing tables.

## Implementation Tasks

### Server Functions

- [ ] `src/fn/analytics.ts`
  - `exportAnalyticsFn` - GET endpoint
  - Generate CSV/Excel file
  - Include selected metrics
  - Middleware: authenticated user + admin check

### Components

- [ ] `src/components/ExportAnalyticsButton.tsx` - Button to export
- [ ] Export options:
  - Date range selector
  - Metrics selector
  - Format selector (CSV/Excel)

## UI/UX Requirements

- Export button
- Options dialog
- Download file
- Success notification

## Acceptance Criteria

- [ ] Analytics can be exported
- [ ] CSV/Excel format supported
- [ ] Data formatted correctly
- [ ] File downloads successfully
- [ ] Admin-only access
