# 42 - Create Notification on Post Reply

## Priority: MEDIUM
## Dependencies: 40-create-notification-table.md, 08-user-can-comment-on-post.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Automatically create a notification when someone replies to a user's post.

## User Story
As a community member, I want to receive a notification when someone comments on my post so that I can see and respond to replies.

## Database Schema
Uses existing `notification` table from feature 40.

## Implementation Tasks

### Integration Point
- [ ] Update `createCommentFn` in `src/fn/comments.ts`
  - After creating comment, get post author
  - Create notification for post author (if not the commenter)
  - Notification type: 'post-reply'
  - RelatedId: postId
  - RelatedType: 'post'

## Acceptance Criteria
- [ ] Notification created when comment added to post
- [ ] Notification goes to post author (not commenter)
- [ ] No notification if user comments on own post
- [ ] Notification has correct type and related data

