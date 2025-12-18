# 10 - User Can Delete Own Comment

## Priority: MEDIUM
## Dependencies: 07-create-post-comment-table.md, 08-user-can-comment-on-post.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow users to delete their own comments (soft delete).

## User Story
As a community member, I want to delete my own comments so that I can remove comments I no longer want visible.

## Database Schema
Uses existing `post_comment` table from feature 07 (deletedAt column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/comments.ts`
  - `deleteComment(commentId, userId)` - Soft delete comment
  - Verify userId matches comment owner

### Server Functions
- [ ] `src/fn/comments.ts`
  - `deleteCommentFn` - DELETE endpoint
  - Verify user owns the comment
  - Return 403 if user doesn't own comment

### Queries
- [ ] `src/queries/comments.ts`
  - `deleteCommentMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useComments.ts`
  - `useDeleteComment()` - Hook for deleting comments

### Components
- [ ] Add delete button to `CommentItem.tsx` (only show if user owns comment)
- [ ] `src/components/DeleteCommentDialog.tsx` - Confirmation dialog

## UI/UX Requirements
- Delete button/icon on own comments only
- Confirmation dialog before deleting
- Success toast notification
- Comment removed from list after deletion
- Loading state during deletion

## Acceptance Criteria
- [ ] Delete button appears only on user's own comments
- [ ] Confirmation dialog appears before deletion
- [ ] Comment is soft deleted (deletedAt set)
- [ ] Comment disappears from view
- [ ] Success message appears
- [ ] Users cannot delete other users' comments
- [ ] Deleted comments don't appear in queries

