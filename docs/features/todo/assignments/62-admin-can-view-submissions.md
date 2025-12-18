# 62 - Admin Can View Submissions

## Priority: HIGH

## Dependencies: 60-student-can-submit-assignment.md, 47-add-admin-role-to-user.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow admins to view all submissions for an assignment.

## User Story

As an admin, I want to see all submissions for an assignment so I can grade them.

## Database Schema

Uses existing `assignment_submission` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `getSubmissionsByAssignment(assignmentId)` - Get all submissions
  - Include user info, submission details, status

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `getSubmissionsFn` - GET endpoint
  - Filter by assignmentId
  - Middleware: authenticated user + admin check

### Queries

- [ ] `src/queries/assignments.ts`
  - `submissionsQuery(assignmentId)` - Query for submissions

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useSubmissions(assignmentId)` - Hook for getting submissions

### Components

- [ ] `src/components/SubmissionsList.tsx` - List of submissions
- [ ] `src/components/SubmissionCard.tsx` - Card for each submission
- [ ] Admin view on assignment detail page
- [ ] Show student name, submission date, status

## UI/UX Requirements

- List of all submissions
- Filter by status (submitted/graded)
- Sort by date or student name
- Link to grade each submission
- Show submission count

## Acceptance Criteria

- [ ] Admin can view all submissions
- [ ] Submissions listed with student info
- [ ] Status visible for each
- [ ] Can navigate to grade submission
- [ ] Non-admins cannot access
