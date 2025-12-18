# 06 - User Can Edit Own Post

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 02-user-can-create-text-post.md, 04-user-can-view-single-post.md
## Estimated Complexity: Low-Medium
## Estimated Time: 3-4 hours

## Description
Allow users to edit their own posts after creation.

## User Story
As a community member, I want to edit my posts so that I can correct mistakes or update information.

## Database Schema
Uses existing `community_post` table from feature 01 (updatedAt column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `updatePost(postId, userId, data)` - Update post content/title/category
  - Verify userId matches post owner before updating

### Server Functions
- [ ] `src/fn/posts.ts`
  - `updatePostFn` - PUT/PATCH endpoint
  - Middleware: authenticated user
  - Verify user owns the post
  - Input validation: content, title, category

### Queries
- [ ] `src/queries/posts.ts`
  - `updatePostMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `useUpdatePost()` - Hook for updating posts

### Components
- [ ] Add edit button to `PostCard.tsx` (only show if user owns post)
- [ ] Add edit button to `PostDetail.tsx` (only show if user owns post)
- [ ] `src/components/EditPostDialog.tsx` - Edit modal (reuse PostForm)
- [ ] Update `PostForm.tsx` to support edit mode

## UI/UX Requirements
- Edit button/icon on own posts only
- Click edit opens form with existing values
- Save button updates post
- Success toast notification
- Updated content reflects immediately
- "Edited" indicator (optional)

## Acceptance Criteria
- [ ] Edit button appears only on user's own posts
- [ ] Clicking edit opens form with current values
- [ ] User can update content, title, category
- [ ] Post updates in database
- [ ] UpdatedAt timestamp updates
- [ ] Success message appears
- [ ] Updated content displays immediately
- [ ] Users cannot edit other users' posts

