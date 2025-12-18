# 105 - Send Weekly Digest Emails

## Priority: LOW

## Dependencies: 101-set-up-email-service-integration.md

## Estimated Complexity: Medium

## Estimated Time: 2-3 hours

## Description

Send weekly digest emails summarizing student activity and platform updates.

## User Story

As a student, I want to receive weekly digest emails so I stay informed about my progress and community activity.

## Implementation Tasks

### Scheduled Task

- [ ] `src/utils/digest-email.ts`
  - `sendWeeklyDigests()` - Send to all active users
  - Aggregate data:
    - Progress made this week
    - Upcoming assignments
    - Community activity
    - New content/announcements
- [ ] Set up cron job to run weekly

### Email Content

- [ ] Progress summary
- [ ] Upcoming assignments
- [ ] Community highlights
- [ ] Platform updates
- [ ] Call to action

## Acceptance Criteria

- [ ] Weekly digest sent
- [ ] Contains relevant information
- [ ] Only sent to active users
- [ ] Email formatted nicely
- [ ] Scheduled task works
