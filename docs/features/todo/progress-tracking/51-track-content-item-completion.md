# 51 - Track Content Item Completion

## Priority: HIGH

## Dependencies: 49-create-content-completion-table.md

## Estimated Complexity: Medium

## Estimated Time: 2-3 hours

## Description

Allow system to mark individual content items (videos, tasks, PDFs) as completed.

## User Story

As a student, I want to mark individual content items as completed so I can track my progress through each module.

## Database Schema

Uses existing `content_completion` table from feature 49.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `markContentCompleted(userId, contentId)` - Mark content item as completed
  - `getContentCompletion(userId, contentId)` - Get completion status
  - `getModuleContentCompletions(userId, moduleId)` - Get all completions for module

### Server Functions

- [ ] `src/fn/progress.ts`
  - `markContentCompletedFn` - POST endpoint
  - Middleware: authenticated user
  - Validation: content exists, user has access

### Queries

- [ ] `src/queries/progress.ts`
  - `markContentCompletedMutation` - TanStack Query mutation
  - `contentCompletionQuery(contentId)` - Query for completion status

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useMarkContentCompleted()` - Hook for marking content complete
  - `useContentCompletion(contentId)` - Hook for getting completion status

### Components

- [ ] `src/components/ContentCompletionButton.tsx` - Button to mark content complete
- [ ] Add completion checkbox/button to content items in classroom view

## UI/UX Requirements

- Checkbox or button on each content item
- Visual indicator when content is completed
- Success feedback when marking complete

## Acceptance Criteria

- [ ] Content items can be marked as completed
- [ ] Completion status persists
- [ ] Visual feedback when completing
- [ ] Only authenticated users can update their own progress
- [ ] Completion triggers module progress update
