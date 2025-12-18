# 09 - User Can Reply to Comment

## Priority: MEDIUM
## Dependencies: 07-create-post-comment-table.md, 08-user-can-comment-on-post.md
## Estimated Complexity: Medium
## Estimated Time: 4-5 hours

## Description
Allow users to reply to existing comments, creating nested comment threads.

## User Story
As a community member, I want to reply to comments so that I can have threaded conversations and respond to specific comments.

## Database Schema
Uses existing `post_comment` table from feature 07 (parentCommentId column already exists for nested replies).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/comments.ts`
  - `createReply(parentCommentId, userId, content, postId)` - Create reply with parent reference
  - `getCommentReplies(commentId)` - Fetch replies to a comment
  - `getNestedComments(postId)` - Fetch all comments with nested structure

### Server Functions
- [ ] `src/fn/comments.ts`
  - `createReplyFn` - POST endpoint for replies
  - Input validation: content, parentCommentId, postId

### Queries
- [ ] `src/queries/comments.ts`
  - `createReplyMutation` - TanStack Query mutation
  - `getCommentRepliesQuery(commentId)` - Fetch replies

### Hooks
- [ ] `src/hooks/useComments.ts`
  - `useCreateReply()` - Hook for creating replies
  - `useCommentReplies(commentId)` - Hook for fetching replies

### Components
- [ ] `src/components/ReplyForm.tsx` - Form for replying to comment
- [ ] Update `CommentItem.tsx` to show reply button
- [ ] Update `CommentList.tsx` to display nested structure
- [ ] Add indentation/styling for nested replies

## UI/UX Requirements
- "Reply" button on each comment
- Reply form appears inline or in modal
- Nested replies indented visually
- Show parent comment context (optional)
- Thread depth limit (optional, e.g., max 3 levels)
- Collapse/expand threads (optional)

## Acceptance Criteria
- [ ] Reply button appears on comments
- [ ] Clicking reply opens reply form
- [ ] Reply is saved with parentCommentId reference
- [ ] Replies display nested under parent comment
- [ ] Visual indentation shows thread structure
- [ ] Replies show author and timestamp
- [ ] Nested structure works correctly

