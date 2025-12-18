# 103 - Send Assignment Due Date Reminders

## Priority: MEDIUM

## Dependencies: 101-set-up-email-service-integration.md, 56-create-assignment-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Send email reminders to students when assignments are due soon.

## User Story

As a student, I want to receive email reminders about upcoming assignments so I don't miss deadlines.

## Implementation Tasks

### Scheduled Task

- [ ] `src/utils/assignment-reminders.ts`
  - `sendAssignmentReminders()` - Check and send reminders
  - Find assignments due in 24 hours, 3 days, 7 days
  - Send email to students who haven't submitted
- [ ] Set up cron job or scheduled task to run daily

### Email Content

- [ ] Assignment title and description
- [ ] Due date prominently displayed
- [ ] Link to assignment
- [ ] Submission status

## Acceptance Criteria

- [ ] Reminders sent for upcoming due dates
- [ ] Only sent to students who haven't submitted
- [ ] Email contains assignment details
- [ ] Links work correctly
- [ ] Scheduled task runs correctly
