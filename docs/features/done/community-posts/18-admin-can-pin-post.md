# 18 - Admin Can Pin Post

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 10-admin-features.md (or basic admin check)
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow admins to pin/unpin posts so they appear at the top of the feed.

## User Story
As an admin, I want to pin important posts so that they stay visible at the top of the community feed.

## Database Schema
Uses existing `community_post` table from feature 01 (isPinned column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `pinPost(postId, isPinned)` - Update isPinned flag
  - Verify user is admin (or add admin check in server function)

### Server Functions
- [ ] `src/fn/posts.ts`
  - `pinPostFn` - PUT/PATCH endpoint
  - Middleware: authenticated user + admin check
  - Input: postId, isPinned (boolean)

### Queries
- [ ] `src/queries/posts.ts`
  - `pinPostMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `usePinPost()` - Hook for pinning posts

### Components
- [ ] Add pin button to `PostCard.tsx` (admin only)
- [ ] Add pin button to `PostDetail.tsx` (admin only)
- [ ] Update `PostList.tsx` to sort pinned posts first

## UI/UX Requirements
- Pin icon/button on posts (admin only)
- Visual indicator for pinned posts (pin icon, different styling)
- Pinned posts appear at top of feed
- Toggle pin/unpin functionality

## Acceptance Criteria
- [ ] Pin button appears only for admins
- [ ] Clicking pin sets isPinned to true
- [ ] Clicking unpin sets isPinned to false
- [ ] Pinned posts appear at top of feed
- [ ] Visual indicator shows pinned status
- [ ] Non-admins cannot pin posts

