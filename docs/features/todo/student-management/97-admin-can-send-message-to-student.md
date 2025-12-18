# 97 - Admin Can Send Message to Student

## Priority: MEDIUM

## Dependencies: 95-admin-can-view-individual-student-progress.md, 34-create-conversation-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Allow admins to send direct messages to students.

## User Story

As an admin, I want to send messages to students so I can provide support and guidance.

## Database Schema

Uses existing conversation and message tables.

## Implementation Tasks

### Components

- [ ] `src/components/SendMessageToStudent.tsx` - Button/form to send message
- [ ] Reuse existing messaging system
- [ ] Add "Send Message" button on student profile page
- [ ] Pre-populate conversation with student

## UI/UX Requirements

- Send message button
- Opens messaging interface
- Pre-filled recipient
- Success feedback

## Acceptance Criteria

- [ ] Admin can send message to student
- [ ] Uses existing messaging system
- [ ] Message sent successfully
- [ ] Student receives notification
- [ ] Admin-only feature
