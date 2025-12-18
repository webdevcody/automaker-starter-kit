# 53 - Track Time Spent on Content

## Priority: MEDIUM

## Dependencies: 49-create-content-completion-table.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Track how much time students spend viewing content items (especially videos).

## User Story

As a student, I want the system to track how long I've spent on each content item so I can see my learning time.

## Database Schema

Uses existing `content_completion` table with `time_spent_seconds` field.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `updateTimeSpent(userId, contentId, seconds)` - Update time spent
  - `getTimeSpent(userId, contentId)` - Get total time spent
  - Increment `time_spent_seconds` field

### Server Functions

- [ ] `src/fn/progress.ts`
  - `updateTimeSpentFn` - POST/PUT endpoint
  - Accepts seconds to add to existing time
  - Middleware: authenticated user

### Queries

- [ ] `src/queries/progress.ts`
  - `updateTimeSpentMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useUpdateTimeSpent()` - Hook for updating time
  - `useContentTimeSpent(contentId)` - Hook for getting time spent

### Components

- [ ] `src/components/VideoTimeTracker.tsx` - Track video watch time
  - Use video player events (play, pause, ended)
  - Send periodic updates (every 30 seconds)
- [ ] `src/components/ContentTimeDisplay.tsx` - Display time spent
- [ ] Add time tracking to video content items

## UI/UX Requirements

- Track video playback time automatically
- Display time spent on content items
- Format time nicely (e.g., "2h 15m" or "45 minutes")
- Update time periodically, not on every second

## Acceptance Criteria

- [ ] Video watch time is tracked
- [ ] Time spent updates in database
- [ ] Time displayed on content items
- [ ] Time tracking doesn't impact performance
- [ ] Accurate time tracking
