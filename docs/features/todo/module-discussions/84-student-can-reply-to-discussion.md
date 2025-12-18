# 84 - Student Can Reply to Discussion

## Priority: LOW

## Dependencies: 83-student-can-create-discussion-post-in-module.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow students to reply to discussion posts.

## User Story

As a student, I want to reply to discussions so I can help others and participate in conversations.

## Database Schema

Uses existing `module_discussion_reply` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/module-discussions.ts`
  - `createReply(discussionId, userId, content, parentReplyId)` - Insert reply
  - `getRepliesByDiscussion(discussionId)` - Get replies for discussion

### Server Functions

- [ ] `src/fn/module-discussions.ts`
  - `createReplyFn` - POST endpoint
  - Middleware: authenticated user

### Queries

- [ ] `src/queries/module-discussions.ts`
  - `createReplyMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useModuleDiscussions.ts`
  - `useCreateReply()` - Hook for creating replies

### Components

- [ ] `src/components/DiscussionReplyForm.tsx` - Form for replying
- [ ] `src/components/DiscussionReply.tsx` - Display reply
- [ ] Support nested replies (reply to reply)

## UI/UX Requirements

- Reply form below discussion post
- Nested reply display
- User avatars and names
- Timestamps
- Edit/delete own replies

## Acceptance Criteria

- [ ] Student can reply to discussion
- [ ] Can reply to replies (nested)
- [ ] Replies displayed correctly
- [ ] Success feedback shown
- [ ] Only authenticated users can reply
