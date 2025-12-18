# 95 - Admin Can View Individual Student Progress

## Priority: HIGH

## Dependencies: 48-create-user-progress-table.md, 47-add-admin-role-to-user.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow admins to view detailed progress for individual students.

## User Story

As an admin, I want to view a student's progress so I can help them and understand their learning journey.

## Database Schema

Uses existing progress tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/student-management.ts`
  - `getStudentProgress(userId)` - Get all progress for student
  - Include module completions, content completions, time spent

### Server Functions

- [ ] `src/fn/student-management.ts`
  - `getStudentProgressFn` - GET endpoint
  - Middleware: authenticated user + admin check

### Queries

- [ ] `src/queries/student-management.ts`
  - `studentProgressQuery(userId)` - Query for student progress

### Hooks

- [ ] `src/hooks/useStudentManagement.ts`
  - `useStudentProgress(userId)` - Hook for getting progress

### Components

- [ ] `src/components/StudentProgressView.tsx` - View showing student progress
- [ ] `src/components/StudentProgressCard.tsx` - Card for each module progress
- [ ] Admin page: `/dashboard/admin/students/$userId`

## UI/UX Requirements

- Student profile header
- List of modules with progress
- Progress bars for each module
- Completion dates
- Time spent

## Acceptance Criteria

- [ ] Admin can view student progress
- [ ] Progress displayed clearly
- [ ] All modules shown
- [ ] Progress percentages accurate
- [ ] Admin-only access
