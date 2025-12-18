# 14 - User Can Like Comment

## Priority: LOW
## Dependencies: 07-create-post-comment-table.md, 12-create-post-reaction-table.md, 13-user-can-like-post.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow users to like/unlike comments. Similar to post likes but for comments.

## User Story
As a community member, I want to like comments so that I can show appreciation for helpful or insightful comments.

## Database Schema
Uses existing `post_reaction` table from feature 12 (commentId column).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/reactions.ts`
  - `toggleCommentReaction(commentId, userId)` - Add or remove reaction
  - `getCommentReactionCount(commentId)` - Count reactions for a comment
  - `hasUserReactedToComment(commentId, userId)` - Check if user has reacted

### Server Functions
- [ ] `src/fn/reactions.ts`
  - `toggleCommentReactionFn` - POST/DELETE endpoint (toggle)

### Queries
- [ ] `src/queries/reactions.ts`
  - `toggleCommentReactionMutation` - TanStack Query mutation
  - `getCommentReactionCountQuery(commentId)` - Fetch reaction count

### Hooks
- [ ] `src/hooks/useReactions.ts`
  - `useToggleCommentReaction()` - Hook for toggling comment reactions

### Components
- [ ] Update `CommentItem.tsx` to include like button
- [ ] Reuse `PostReactions.tsx` component or create `CommentReactions.tsx`

## UI/UX Requirements
- Small like button on each comment
- Shows reaction count
- Visual feedback when user has reacted
- Click toggles reaction

## Acceptance Criteria
- [ ] Like button appears on comments
- [ ] Clicking like adds reaction
- [ ] Clicking again removes reaction
- [ ] Reaction count displays correctly
- [ ] Visual feedback shows if user has reacted
- [ ] Only one reaction per user per comment

