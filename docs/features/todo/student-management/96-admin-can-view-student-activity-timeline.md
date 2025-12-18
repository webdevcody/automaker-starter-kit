# 96 - Admin Can View Student Activity Timeline

## Priority: MEDIUM

## Dependencies: 95-admin-can-view-individual-student-progress.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display chronological timeline of student activity.

## User Story

As an admin, I want to see a timeline of student activity so I understand their engagement patterns.

## Database Schema

Uses existing tables (progress, submissions, quiz attempts, etc.).

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/student-management.ts`
  - `getStudentActivityTimeline(userId, days)` - Get activity events
  - Combine events from:
    - Module completions
    - Content completions
    - Assignment submissions
    - Quiz attempts
    - Login dates

### Components

- [ ] `src/components/ActivityTimeline.tsx` - Timeline component
- [ ] `src/components/ActivityEvent.tsx` - Individual event display
- [ ] Display events chronologically
- [ ] Group by date

## UI/UX Requirements

- Timeline view
- Events with timestamps
- Event types clearly labeled
- Filter by event type
- Date grouping

## Acceptance Criteria

- [ ] Activity timeline displayed
- [ ] Events from all sources included
- [ ] Chronological order correct
- [ ] Filtering works
- [ ] Admin-only access
