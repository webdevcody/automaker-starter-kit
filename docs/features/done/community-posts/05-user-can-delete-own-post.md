# 05 - User Can Delete Own Post

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 02-user-can-create-text-post.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow users to delete their own posts (soft delete using deletedAt timestamp).

## User Story
As a community member, I want to delete my own posts so that I can remove content I no longer want visible.

## Database Schema
Uses existing `community_post` table from feature 01 (deletedAt column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `deletePost(postId, userId)` - Soft delete by setting deletedAt
  - Verify userId matches post owner before deleting

### Server Functions
- [ ] `src/fn/posts.ts`
  - `deletePostFn` - DELETE endpoint
  - Middleware: authenticated user
  - Verify user owns the post
  - Return 403 if user doesn't own post

### Queries
- [ ] `src/queries/posts.ts`
  - `deletePostMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `useDeletePost()` - Hook for deleting posts

### Components
- [ ] Add delete button to `PostCard.tsx` (only show if user owns post)
- [ ] Add delete button to `PostDetail.tsx` (only show if user owns post)
- [ ] `src/components/DeletePostDialog.tsx` - Confirmation dialog

## UI/UX Requirements
- Delete button/icon on own posts only
- Confirmation dialog before deleting
- Success toast notification
- Post removed from list after deletion
- Loading state during deletion

## Acceptance Criteria
- [ ] Delete button appears only on user's own posts
- [ ] Confirmation dialog appears before deletion
- [ ] Post is soft deleted (deletedAt set)
- [ ] Post disappears from feed
- [ ] Success message appears
- [ ] Users cannot delete other users' posts
- [ ] Deleted posts don't appear in queries

