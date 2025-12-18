# 19 - User Can Filter Posts by Category

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 03-user-can-view-posts-list.md
## Estimated Complexity: Low-Medium
## Estimated Time: 3-4 hours

## Description
Allow users to filter the community feed by post category.

## User Story
As a community member, I want to filter posts by category so that I can focus on specific topics like "Interview Assignments" or "General Discussion".

## Database Schema
Uses existing `community_post` table from feature 01 (category column already exists).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `getPostsByCategory(category, limit, offset)` - Filter posts by category
  - Update `getPosts` to accept category filter

### Server Functions
- [ ] `src/fn/posts.ts`
  - Update `getPostsFn` to accept category query parameter

### Queries
- [ ] `src/queries/posts.ts`
  - Update `getPostsQuery` to accept category parameter

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - Update `usePosts` to accept category filter

### Components
- [ ] `src/components/CategoryFilter.tsx` - Category filter buttons/chips
- [ ] Update `PostList.tsx` to use category filter
- [ ] Update `src/routes/community.tsx` to handle category filter

## UI/UX Requirements
- Category filter chips/buttons (All, General Discussion, Interview Assignments, etc.)
- Active category highlighted
- "All" option shows all posts
- Filter persists in URL (optional)
- Posts update when category changes

## Acceptance Criteria
- [ ] Category filter buttons display
- [ ] Clicking category filters posts
- [ ] "All" shows all posts
- [ ] Active category is highlighted
- [ ] Posts update correctly when filter changes
- [ ] Empty state shows when no posts in category

