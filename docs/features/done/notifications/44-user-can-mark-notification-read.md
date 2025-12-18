# 44 - User Can Mark Notification Read

## Priority: MEDIUM
## Dependencies: 40-create-notification-table.md, 43-user-can-view-notifications.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Allow users to mark notifications as read.

## User Story
As a community member, I want to mark notifications as read so that I can track which notifications I've already seen.

## Database Schema
Uses existing `notification` table from feature 40 (isRead, readAt columns).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/notifications.ts`
  - `markAsRead(notificationId, userId)` - Update isRead and readAt
  - `markAllAsRead(userId)` - Mark all user's notifications as read

### Server Functions
- [ ] `src/fn/notifications.ts`
  - `markAsReadFn` - PUT endpoint
  - `markAllAsReadFn` - PUT endpoint

### Queries
- [ ] `src/queries/notifications.ts`
  - `markAsReadMutation` - TanStack Query mutation
  - `markAllAsReadMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useNotifications.ts`
  - `useMarkAsRead()` - Hook for marking read
  - `useMarkAllAsRead()` - Hook for marking all read

### Components
- [ ] Update `NotificationItem.tsx` to include mark as read
- [ ] Add "Mark all as read" button to notifications page

## Acceptance Criteria
- [ ] User can mark individual notification as read
- [ ] User can mark all notifications as read
- [ ] Unread count updates
- [ ] Read notifications visually distinct
- [ ] Only user can mark their own notifications

