# 11 - User Can Edit Own Comment

## Priority: MEDIUM
## Dependencies: 07-create-post-comment-table.md, 08-user-can-comment-on-post.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow users to edit their own comments after posting.

## User Story
As a community member, I want to edit my comments so that I can correct mistakes or update my responses.

## Database Schema
Uses existing `post_comment` table from feature 07 (updatedAt column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/comments.ts`
  - `updateComment(commentId, userId, content)` - Update comment content
  - Verify userId matches comment owner

### Server Functions
- [ ] `src/fn/comments.ts`
  - `updateCommentFn` - PUT/PATCH endpoint
  - Verify user owns the comment
  - Input validation: content (required)

### Queries
- [ ] `src/queries/comments.ts`
  - `updateCommentMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useComments.ts`
  - `useUpdateComment()` - Hook for updating comments

### Components
- [ ] Add edit button to `CommentItem.tsx` (only show if user owns comment)
- [ ] `src/components/EditCommentDialog.tsx` - Edit modal or inline edit
- [ ] Update `CommentItem.tsx` to support edit mode

## UI/UX Requirements
- Edit button/icon on own comments only
- Click edit opens form with existing content
- Save button updates comment
- Success toast notification
- Updated content reflects immediately
- "Edited" indicator (optional)

## Acceptance Criteria
- [ ] Edit button appears only on user's own comments
- [ ] Clicking edit allows editing comment content
- [ ] Comment updates in database
- [ ] UpdatedAt timestamp updates
- [ ] Success message appears
- [ ] Updated content displays immediately
- [ ] Users cannot edit other users' comments

