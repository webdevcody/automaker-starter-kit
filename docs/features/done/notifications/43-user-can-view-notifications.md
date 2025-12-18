# 43 - User Can View Notifications

## Priority: MEDIUM
## Dependencies: 40-create-notification-table.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Display notifications in header dropdown and full notifications page.

## User Story
As a community member, I want to view my notifications so that I can see alerts for new messages, replies, and other activity.

## Database Schema
Uses existing `notification` table from feature 40.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/notifications.ts`
  - `getUserNotifications(userId, limit, offset)` - Fetch notifications
  - `getUnreadCount(userId)` - Count unread notifications

### Server Functions
- [ ] `src/fn/notifications.ts`
  - `getNotificationsFn` - GET endpoint
  - `getUnreadCountFn` - GET unread count

### Queries
- [ ] `src/queries/notifications.ts`
  - `getNotificationsQuery(userId, pagination)` - Fetch notifications
  - `getUnreadCountQuery(userId)` - Fetch unread count

### Hooks
- [ ] `src/hooks/useNotifications.ts`
  - `useNotifications(pagination)` - Hook for fetching notifications
  - `useUnreadCount()` - Hook for unread count

### Components
- [ ] `src/components/NotificationBell.tsx` - Bell icon with badge
- [ ] `src/components/NotificationDropdown.tsx` - Dropdown menu
- [ ] `src/components/NotificationItem.tsx` - Single notification
- [ ] Update `Header.tsx` to include notification bell

### Routes
- [ ] `src/routes/notifications.tsx` - Full notifications page

## UI/UX Requirements
- Bell icon in header with unread count badge
- Dropdown shows recent notifications
- Click notification navigates to related content
- Full notifications page with all notifications
- Mark as read functionality (next feature)

## Acceptance Criteria
- [ ] Notification bell appears in header
- [ ] Unread count displays correctly
- [ ] Dropdown shows recent notifications
- [ ] Full notifications page works
- [ ] Notifications ordered by newest first
- [ ] Clicking notification navigates correctly

