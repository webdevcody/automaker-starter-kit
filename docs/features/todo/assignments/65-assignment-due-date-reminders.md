# 65 - Assignment Due Date Reminders

## Priority: LOW

## Dependencies: 56-create-assignment-table.md, 40-create-notification-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Send notifications to students when assignments are due soon or overdue.

## User Story

As a student, I want to receive reminders about upcoming assignment due dates so I don't miss deadlines.

## Database Schema

Uses existing `assignment` and `notification` tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `getUpcomingAssignments(userId, daysAhead)` - Get assignments due soon
  - `getOverdueAssignments(userId)` - Get overdue assignments

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `checkDueDatesFn` - Endpoint to check and create notifications
  - Can be called by cron job or scheduled task

### Business Logic

- [ ] `src/utils/assignment-reminders.ts`
  - `createDueDateNotifications()` - Create notifications for due dates
  - Check assignments due in 24 hours, 3 days, 7 days
  - Check overdue assignments
  - Create notification records

### Notifications

- [ ] Create notifications for:
  - Assignment due in 24 hours
  - Assignment due in 3 days
  - Assignment overdue
- [ ] Use existing notification system (feature 40)

## UI/UX Requirements

- Notifications appear in notification center
- Clear messaging about due dates
- Link to assignment from notification

## Acceptance Criteria

- [ ] Notifications created for upcoming due dates
- [ ] Overdue notifications created
- [ ] Notifications appear in notification center
- [ ] Links to assignments work
- [ ] No duplicate notifications
