# 60 - Student Can Submit Assignment

## Priority: HIGH

## Dependencies: 57-create-assignment-submission-table.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Allow students to submit assignments with text content and file uploads.

## User Story

As a student, I want to submit my assignment so I can complete the requirements.

## Database Schema

Uses existing `assignment_submission` table from feature 57.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `createSubmission(userId, assignmentId, data)` - Create submission
  - `getSubmission(userId, assignmentId)` - Get user's submission
  - Handle file uploads to R2 storage

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `submitAssignmentFn` - POST endpoint
  - Handle file uploads (presigned URLs)
  - Middleware: authenticated user
  - Validation: assignment exists, not past due (optional check)

### Queries

- [ ] `src/queries/assignments.ts`
  - `submitAssignmentMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useSubmitAssignment()` - Hook for submitting

### Components

- [ ] `src/components/SubmitAssignmentDialog.tsx` - Modal for submission
- [ ] `src/components/AssignmentSubmissionForm.tsx` - Form with text area and file upload
- [ ] File upload component (reuse existing upload components)
- [ ] Add "Submit Assignment" button to assignment card

## UI/UX Requirements

- Text area for written content
- File upload for code/PDFs/images
- Show file size limits
- Submit button
- Success notification
- Prevent duplicate submissions (or allow resubmission)

## Acceptance Criteria

- [ ] Student can submit assignment
- [ ] Text content saved
- [ ] Files uploaded successfully
- [ ] Submission saved to database
- [ ] Success message appears
- [ ] Submission status updated
