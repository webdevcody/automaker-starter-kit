# 13 - User Can Like Post

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 12-create-post-reaction-table.md
## Estimated Complexity: Low
## Estimated Time: 3-4 hours

## Description
Allow users to like/unlike posts. Toggle reaction on click.

## User Story
As a community member, I want to like posts so that I can show appreciation for content I find valuable.

## Database Schema
Uses existing `post_reaction` table from feature 12.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/reactions.ts`
  - `togglePostReaction(postId, userId)` - Add or remove reaction
  - `getPostReactionCount(postId)` - Count reactions for a post
  - `hasUserReacted(postId, userId)` - Check if user has reacted

### Server Functions
- [ ] `src/fn/reactions.ts`
  - `togglePostReactionFn` - POST/DELETE endpoint (toggle)
  - Returns current reaction state

### Queries
- [ ] `src/queries/reactions.ts`
  - `togglePostReactionMutation` - TanStack Query mutation
  - `getPostReactionCountQuery(postId)` - Fetch reaction count
  - `hasUserReactedQuery(postId, userId)` - Check reaction status

### Hooks
- [ ] `src/hooks/useReactions.ts`
  - `useTogglePostReaction()` - Hook for toggling reactions
  - `usePostReactionCount(postId)` - Hook for reaction count

### Components
- [ ] `src/components/PostReactions.tsx` - Like button component
- [ ] Update `PostCard.tsx` to show like button and count
- [ ] Update `PostDetail.tsx` to show like button and count

## UI/UX Requirements
- Heart/thumbs-up icon button
- Shows reaction count next to icon
- Icon highlighted/filled when user has reacted
- Click toggles reaction
- Optimistic UI update
- Loading state during toggle

## Acceptance Criteria
- [ ] Like button appears on posts
- [ ] Clicking like adds reaction
- [ ] Clicking again removes reaction
- [ ] Reaction count displays correctly
- [ ] Visual feedback shows if user has reacted
- [ ] Only one reaction per user per post
- [ ] Optimistic updates work
- [ ] Only authenticated users can react

