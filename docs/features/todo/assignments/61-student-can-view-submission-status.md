# 61 - Student Can View Submission Status

## Priority: MEDIUM

## Dependencies: 60-student-can-submit-assignment.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display submission status and details to students.

## User Story

As a student, I want to see the status of my submission so I know if it's been graded.

## Database Schema

Uses existing `assignment_submission` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `getUserSubmission(userId, assignmentId)` - Get submission with status
  - Already exists from feature 60, extend if needed

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `getSubmissionFn` - GET endpoint
  - Returns submission with status, score, feedback

### Queries

- [ ] `src/queries/assignments.ts`
  - `submissionQuery(assignmentId)` - Query for submission

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useSubmission(assignmentId)` - Hook for getting submission

### Components

- [ ] `src/components/SubmissionStatusCard.tsx` - Card showing status
- [ ] Update assignment card to show submission status
- [ ] Show "Submitted", "Graded", "Returned" statuses

## UI/UX Requirements

- Status badge (Submitted/Graded/Returned)
- Submitted timestamp
- Show score if graded
- Link to view full submission
- Visual distinction between statuses

## Acceptance Criteria

- [ ] Submission status displayed
- [ ] Status updates when graded
- [ ] Timestamp shown
- [ ] Score visible when graded
- [ ] Clear visual indicators
