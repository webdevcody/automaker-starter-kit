# 83 - Student Can Create Discussion Post in Module

## Priority: LOW

## Dependencies: 82-create-module-discussion-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow students to create discussion posts in modules.

## User Story

As a student, I want to ask questions in module discussions so I can get help with specific content.

## Database Schema

Uses existing `module_discussion` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/module-discussions.ts`
  - `createDiscussion(userId, moduleId, contentId, data)` - Insert discussion
  - `getDiscussionsByModule(moduleId)` - Get discussions for module

### Server Functions

- [ ] `src/fn/module-discussions.ts`
  - `createDiscussionFn` - POST endpoint
  - Middleware: authenticated user
  - Validation: content required, moduleId required

### Queries

- [ ] `src/queries/module-discussions.ts`
  - `createDiscussionMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useModuleDiscussions.ts`
  - `useCreateDiscussion()` - Hook for creating

### Components

- [ ] `src/components/CreateModuleDiscussionDialog.tsx` - Modal for creating
- [ ] `src/components/ModuleDiscussionForm.tsx` - Form with title, content, question checkbox
- [ ] Add "Ask Question" button to module page

## UI/UX Requirements

- Form with title and content
- Checkbox for "This is a question"
- Link to specific content item (optional)
- Submit button
- Success notification

## Acceptance Criteria

- [ ] Student can create discussion post
- [ ] Post saved to database
- [ ] Post linked to module
- [ ] Can optionally link to content item
- [ ] Success feedback shown
