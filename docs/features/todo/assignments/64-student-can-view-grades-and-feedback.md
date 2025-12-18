# 64 - Student Can View Grades and Feedback

## Priority: MEDIUM

## Dependencies: 63-admin-can-grade-submission.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display grades and feedback to students after admin grades their submission.

## User Story

As a student, I want to see my grade and feedback so I can learn from the assessment.

## Database Schema

Uses existing `assignment_submission` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `getSubmissionWithGrade(userId, assignmentId)` - Get submission with grade info
  - Already exists, ensure it returns score and feedback

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `getSubmissionFn` - GET endpoint (already exists)
  - Returns score and feedback when graded

### Queries

- [ ] `src/queries/assignments.ts`
  - `submissionQuery(assignmentId)` - Query (already exists)

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useSubmission(assignmentId)` - Hook (already exists)

### Components

- [ ] `src/components/GradeDisplay.tsx` - Component showing grade and feedback
- [ ] `src/components/FeedbackView.tsx` - View for reading feedback
- [ ] Update submission status card to show grade when available
- [ ] Highlight graded submissions

## UI/UX Requirements

- Score displayed prominently (e.g., "85/100")
- Feedback text displayed clearly
- Grade date shown
- Visual distinction for graded vs pending
- Percentage calculation shown

## Acceptance Criteria

- [ ] Grade displayed when available
- [ ] Feedback visible
- [ ] Score formatted correctly
- [ ] Only student can view their own grade
- [ ] Clear visual presentation
