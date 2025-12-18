# 04 - User Can View Single Post

## Priority: HIGH
## Dependencies: 01-create-community-post-table.md, 03-user-can-view-posts-list.md
## Estimated Complexity: Low
## Estimated Time: 3-4 hours

## Description
Allow users to click on a post and view its full details on a dedicated page.

## User Story
As a community member, I want to click on a post to see its full content and details so that I can read complete posts.

## Database Schema
Uses existing `community_post` table from feature 01.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `getPostById(postId)` - Fetch single post by ID

### Server Functions
- [ ] `src/fn/posts.ts`
  - `getPostByIdFn` - GET endpoint for single post
  - Return 404 if post not found or deleted

### Queries
- [ ] `src/queries/posts.ts`
  - `getPostByIdQuery(postId)` - TanStack Query

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `usePost(postId)` - Hook for fetching single post

### Components
- [ ] `src/components/PostDetail.tsx` - Full post view component
- [ ] `src/components/PostHeader.tsx` - Post author, timestamp, category

### Routes
- [ ] `src/routes/community/post/$postId.tsx` - Post detail page route

## UI/UX Requirements
- Click post card to navigate to detail page
- Display full post content
- Show author, timestamp, category
- Back button or breadcrumb
- Loading state
- 404 page if post not found

## Acceptance Criteria
- [ ] Clicking post navigates to detail page
- [ ] Full post content displays
- [ ] Post metadata displays correctly
- [ ] Loading state works
- [ ] 404 shown for non-existent posts
- [ ] Deleted posts return 404

