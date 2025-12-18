# 55 - Show Last Accessed Content

## Priority: LOW

## Dependencies: 49-create-content-completion-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Track and display the last content item a student accessed for quick resume.

## User Story

As a student, I want to see where I left off so I can quickly resume my learning.

## Database Schema

Uses existing `content_completion` table with `last_accessed_at` field.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `updateLastAccessed(userId, contentId)` - Update last accessed timestamp
  - `getLastAccessedContent(userId)` - Get most recently accessed content

### Server Functions

- [ ] `src/fn/progress.ts`
  - `updateLastAccessedFn` - POST endpoint
  - Called when user views content
  - Middleware: authenticated user

### Queries

- [ ] `src/queries/progress.ts`
  - `updateLastAccessedMutation` - TanStack Query mutation
  - `lastAccessedContentQuery` - Query for last accessed

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useUpdateLastAccessed()` - Hook for updating last accessed
  - `useLastAccessedContent()` - Hook for getting last accessed

### Components

- [ ] `src/components/ResumeLearningCard.tsx` - Card showing "Continue Learning"
- [ ] Update content view to call updateLastAccessed when content is opened
- [ ] Add "Resume" button on dashboard

## UI/UX Requirements

- "Continue Learning" card on dashboard
- Shows module and content title
- Link to resume from that content
- "Last accessed X time ago" text

## Acceptance Criteria

- [ ] Last accessed timestamp updates when viewing content
- [ ] Last accessed content displayed on dashboard
- [ ] Quick link to resume learning
- [ ] Timestamp formatted nicely
- [ ] Works for all content types
