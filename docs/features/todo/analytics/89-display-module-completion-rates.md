# 89 - Display Module Completion Rates

## Priority: HIGH

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display module completion rates to admins.

## User Story

As an admin, I want to see completion rates for each module so I know which content is most/least effective.

## Database Schema

Uses existing progress tables.

## Implementation Tasks

### Components

- [ ] `src/components/CompletionRates.tsx` - Component showing completion rates
- [ ] `src/components/ModuleCompletionChart.tsx` - Chart showing rates per module
- [ ] Display:
  - Completion percentage per module
  - Number of students completed
  - Average time to complete
  - Comparison between modules

## UI/UX Requirements

- Bar chart or table showing rates
- Sortable by completion rate
- Color coding (high/low completion)
- Module names displayed

## Acceptance Criteria

- [ ] Completion rates displayed
- [ ] Rates calculated correctly
- [ ] Visual chart/table clear
- [ ] Can compare modules
- [ ] Admin-only access
