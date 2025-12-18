# 03 - User Can View Posts List

## Priority: HIGH
## Dependencies: 01-create-community-post-table.md, 02-user-can-create-text-post.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-6 hours

## Description
Display a list of all community posts in chronological order (newest first).

## User Story
As a community member, I want to see all posts in the community feed so that I can stay updated with community activity.

## Database Schema
Uses existing `community_post` table from feature 01.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `getPosts(limit, offset)` - Fetch posts ordered by createdAt DESC
  - `getPostsCount()` - Get total count for pagination

### Server Functions
- [ ] `src/fn/posts.ts`
  - `getPostsFn` - GET endpoint with pagination
  - Query params: limit, offset, category (optional filter)

### Queries
- [ ] `src/queries/posts.ts`
  - `getPostsQuery(limit, offset, category)` - TanStack Query

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `usePosts(limit, offset, category)` - Hook for fetching posts

### Components
- [ ] `src/components/PostCard.tsx` - Card component displaying post preview
- [ ] `src/components/PostList.tsx` - List container for posts
- [ ] `src/components/PostSkeleton.tsx` - Loading skeleton

### Routes
- [ ] `src/routes/community.tsx` - Community feed page displaying posts

## UI/UX Requirements
- Posts displayed in cards/list format
- Show: author name/avatar, post title (if exists), content preview, category, timestamp
- Loading skeleton while fetching
- Empty state when no posts
- Pagination or "Load More" button
- Responsive grid/list layout

## Acceptance Criteria
- [ ] Posts list displays on community page
- [ ] Posts ordered by newest first
- [ ] Each post shows author, content, timestamp
- [ ] Loading states work correctly
- [ ] Empty state displays when no posts
- [ ] Pagination works (if implemented)
- [ ] Only non-deleted posts shown (deletedAt IS NULL)

