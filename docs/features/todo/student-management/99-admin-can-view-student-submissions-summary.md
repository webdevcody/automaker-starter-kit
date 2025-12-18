# 99 - Admin Can View Student Submissions Summary

## Priority: MEDIUM

## Dependencies: 95-admin-can-view-individual-student-progress.md, 60-student-can-submit-assignment.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display summary of student's assignment submissions on their profile.

## User Story

As an admin, I want to see a student's submission history so I understand their work.

## Database Schema

Uses existing assignment_submission table.

## Implementation Tasks

### Components

- [ ] `src/components/StudentSubmissionsSummary.tsx` - Summary component
- [ ] Show:
  - Total submissions
  - Average score
  - Submission status breakdown
  - Recent submissions
- [ ] Add to student profile page

## UI/UX Requirements

- Summary cards with stats
- List of recent submissions
- Link to view all submissions

## Acceptance Criteria

- [ ] Submissions summary displayed
- [ ] Stats calculated correctly
- [ ] Recent submissions shown
- [ ] Links work correctly
- [ ] Admin-only access
