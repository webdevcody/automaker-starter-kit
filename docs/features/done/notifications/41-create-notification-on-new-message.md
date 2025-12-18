# 41 - Create Notification on New Message

## Priority: MEDIUM
## Dependencies: 40-create-notification-table.md, 37-user-can-send-message.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Automatically create a notification when a user receives a new message.

## User Story
As a community member, I want to receive a notification when someone sends me a message so that I know when to check my messages.

## Database Schema
Uses existing `notification` table from feature 40.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/notifications.ts`
  - `createNotification(userId, data)` - Insert notification

### Integration Point
- [ ] Update `sendMessageFn` in `src/fn/messages.ts`
  - After creating message, create notification for recipient
  - Notification type: 'new-message'
  - RelatedId: messageId
  - RelatedType: 'message'

## Acceptance Criteria
- [ ] Notification created when message sent
- [ ] Notification goes to message recipient (not sender)
- [ ] Notification has correct type and related data
- [ ] Notification appears in user's notification list (after next feature)

