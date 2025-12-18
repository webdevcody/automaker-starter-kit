# 91 - Display Drop-Off Points

## Priority: MEDIUM

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Identify and display where students drop off in modules.

## User Story

As an admin, I want to see where students stop progressing so I can improve those areas.

## Database Schema

Uses existing progress tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/analytics.ts`
  - `getDropOffPoints(moduleId)` - Find content items where students stop
  - Compare started vs completed for each content item
  - Calculate drop-off percentage

### Components

- [ ] `src/components/DropOffPoints.tsx` - Component showing drop-off data
- [ ] `src/components/DropOffChart.tsx` - Visual chart showing drop-offs
- [ ] Display:
  - Content items with highest drop-off rates
  - Module-level drop-off points
  - Visual funnel chart

## UI/UX Requirements

- List of drop-off points
- Percentage drop-off for each content item
- Visual funnel chart
- Highlight problematic content

## Acceptance Criteria

- [ ] Drop-off points identified
- [ ] Drop-off percentages calculated
- [ ] Visual presentation clear
- [ ] Can identify problem areas
- [ ] Admin-only access
