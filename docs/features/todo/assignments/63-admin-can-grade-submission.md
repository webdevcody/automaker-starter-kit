# 63 - Admin Can Grade Submission

## Priority: HIGH

## Dependencies: 62-admin-can-view-submissions.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Allow admins to grade submissions with score and feedback.

## User Story

As an admin, I want to grade student submissions so I can provide feedback and scores.

## Database Schema

Uses existing `assignment_submission` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `gradeSubmission(submissionId, graderId, score, feedback)` - Update submission
  - Update status to 'graded', set score, feedback, graded_by, graded_at

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `gradeSubmissionFn` - PUT/PATCH endpoint
  - Middleware: authenticated user + admin check
  - Validation: score within points_possible range

### Queries

- [ ] `src/queries/assignments.ts`
  - `gradeSubmissionMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useGradeSubmission()` - Hook for grading

### Components

- [ ] `src/components/GradeSubmissionDialog.tsx` - Modal for grading
- [ ] `src/components/GradingForm.tsx` - Form with score input and feedback textarea
- [ ] Show submission content in grading view
- [ ] Download/view submitted files

## UI/UX Requirements

- Score input (number, max = points_possible)
- Feedback textarea
- Display submission content
- Save grade button
- Success notification
- Option to return for revision

## Acceptance Criteria

- [ ] Admin can grade submission
- [ ] Score saved correctly
- [ ] Feedback saved
- [ ] Status updated to 'graded'
- [ ] Notification sent to student (future feature)
- [ ] Score validation works
