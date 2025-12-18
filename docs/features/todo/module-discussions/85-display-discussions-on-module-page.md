# 85 - Display Discussions on Module Page

## Priority: LOW

## Dependencies: 84-student-can-reply-to-discussion.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display module discussions on the module page.

## User Story

As a student, I want to see discussions on the module page so I can find questions and answers.

## Database Schema

Uses existing tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/module-discussions.ts`
  - `getDiscussionsByModule(moduleId)` - Get discussions with replies
  - Include user info, reply counts

### Server Functions

- [ ] `src/fn/module-discussions.ts`
  - `getDiscussionsFn` - GET endpoint
  - Filter by moduleId

### Queries

- [ ] `src/queries/module-discussions.ts`
  - `discussionsQuery(moduleId)` - Query for discussions

### Hooks

- [ ] `src/hooks/useModuleDiscussions.ts`
  - `useModuleDiscussions(moduleId)` - Hook for getting discussions

### Components

- [ ] `src/components/ModuleDiscussions.tsx` - Discussions section
- [ ] `src/components/DiscussionCard.tsx` - Card for each discussion
- [ ] Add discussions tab/section to module detail page

## UI/UX Requirements

- List of discussions
- Show question indicator
- Reply count
- Link to content item if applicable
- Filter by questions vs general discussions

## Acceptance Criteria

- [ ] Discussions displayed on module page
- [ ] Discussions listed clearly
- [ ] Can see reply counts
- [ ] Can navigate to discussion detail
- [ ] Filtering works
