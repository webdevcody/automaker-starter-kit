# 90 - Display Time Spent Analytics

## Priority: MEDIUM

## Dependencies: 87-create-analytics-data-aggregation-functions.md, 53-track-time-spent-on-content.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display time spent analytics to admins.

## User Story

As an admin, I want to see how much time students spend on content so I understand engagement levels.

## Database Schema

Uses existing time tracking tables.

## Implementation Tasks

### Components

- [ ] `src/components/TimeSpentAnalytics.tsx` - Component showing time metrics
- [ ] Display:
  - Average time per module
  - Average time per content type
  - Total time spent across platform
  - Time distribution charts

## UI/UX Requirements

- Time metrics displayed
- Charts showing distribution
- Comparison between content types
- Format time nicely (hours, minutes)

## Acceptance Criteria

- [ ] Time spent analytics displayed
- [ ] Metrics calculated correctly
- [ ] Visual charts clear
- [ ] Time formatting correct
- [ ] Admin-only access
