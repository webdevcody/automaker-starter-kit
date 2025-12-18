# 50 - Track Module Completion Status

## Priority: HIGH

## Dependencies: 48-create-user-progress-table.md

## Estimated Complexity: Medium

## Estimated Time: 2-3 hours

## Description

Allow system to mark modules as completed when user finishes all content items.

## User Story

As a student, I want my modules to be marked as completed automatically when I finish all the content, so I can track my progress.

## Database Schema

Uses existing `user_progress` table from feature 48.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `markModuleCompleted(userId, moduleId)` - Mark module as completed
  - `getUserProgress(userId, moduleId)` - Get user's progress for a module
  - `updateModuleProgress(userId, moduleId, progressData)` - Update progress

### Server Functions

- [ ] `src/fn/progress.ts`
  - `markModuleCompletedFn` - POST endpoint to mark module complete
  - Middleware: authenticated user
  - Validation: module exists, user has access

### Queries

- [ ] `src/queries/progress.ts`
  - `markModuleCompletedMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useMarkModuleCompleted()` - Hook for marking module complete
  - `useModuleProgress(moduleId)` - Hook for getting module progress

### Business Logic

- [ ] Auto-calculate completion when all content items are completed
- [ ] Update `is_completed` and `completed_at` fields
- [ ] Calculate `progress_percentage` based on content completion

## Acceptance Criteria

- [ ] Module can be marked as completed
- [ ] Completion status persists in database
- [ ] Auto-completion works when all content is done
- [ ] Only authenticated users can update their own progress
- [ ] Progress updates correctly
