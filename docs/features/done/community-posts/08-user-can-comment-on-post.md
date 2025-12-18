# 08 - User Can Comment on Post

## Priority: HIGH
## Dependencies: 01-create-community-post-table.md, 07-create-post-comment-table.md, 04-user-can-view-single-post.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-5 hours

## Description
Allow authenticated users to add comments to posts.

## User Story
As a community member, I want to comment on posts so that I can participate in discussions and ask questions.

## Database Schema
Uses existing `post_comment` table from feature 07.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/comments.ts`
  - `createComment(postId, userId, content)` - Insert new comment
  - `getPostComments(postId, limit, offset)` - Fetch comments for a post

### Server Functions
- [ ] `src/fn/comments.ts`
  - `createCommentFn` - POST endpoint
  - Input validation: content (required, min 1 char), postId (required)

### Queries
- [ ] `src/queries/comments.ts`
  - `createCommentMutation` - TanStack Query mutation
  - `getPostCommentsQuery(postId, limit, offset)` - Fetch comments

### Hooks
- [ ] `src/hooks/useComments.ts`
  - `useCreateComment()` - Hook for creating comments
  - `usePostComments(postId)` - Hook for fetching comments

### Components
- [ ] `src/components/CommentForm.tsx` - Form for adding comment
- [ ] `src/components/CommentList.tsx` - List of comments
- [ ] `src/components/CommentItem.tsx` - Single comment display
- [ ] Update `PostDetail.tsx` to include comments section

## UI/UX Requirements
- Comment input field at bottom of post
- Submit button
- Comments display below post
- Show comment author, content, timestamp
- Loading state during submission
- Success feedback
- Comments ordered by newest first

## Acceptance Criteria
- [ ] User can enter comment text
- [ ] Comment is saved to database
- [ ] Comment appears in comments list
- [ ] Comment shows author and timestamp
- [ ] Success message appears
- [ ] Only authenticated users can comment
- [ ] Comments ordered chronologically

