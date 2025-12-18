# 100 - Admin Can View Student Quiz Results Summary

## Priority: MEDIUM

## Dependencies: 95-admin-can-view-individual-student-progress.md, 72-student-can-take-quiz.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display summary of student's quiz results on their profile.

## User Story

As an admin, I want to see a student's quiz performance so I understand their knowledge level.

## Database Schema

Uses existing quiz_attempt table.

## Implementation Tasks

### Components

- [ ] `src/components/StudentQuizResultsSummary.tsx` - Summary component
- [ ] Show:
  - Total quiz attempts
  - Average score
  - Pass rate
  - Recent quiz results
- [ ] Add to student profile page

## UI/UX Requirements

- Summary cards with stats
- List of recent quiz results
- Link to view all results

## Acceptance Criteria

- [ ] Quiz results summary displayed
- [ ] Stats calculated correctly
- [ ] Recent results shown
- [ ] Links work correctly
- [ ] Admin-only access
