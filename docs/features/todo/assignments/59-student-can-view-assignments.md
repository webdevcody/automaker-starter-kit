# 59 - Student Can View Assignments

## Priority: HIGH

## Dependencies: 56-create-assignment-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display assignments to students in the classroom view.

## User Story

As a student, I want to see assignments for each module so I know what work I need to complete.

## Database Schema

Uses existing `assignment` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `getAssignmentsByModule(moduleId)` - Fetch assignments for module
  - `getAssignmentsForUser(userId)` - Fetch all assignments for student
  - Include due date, submission status if exists

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `getAssignmentsFn` - GET endpoint
  - Filter by moduleId or userId
  - Middleware: authenticated user

### Queries

- [ ] `src/queries/assignments.ts`
  - `assignmentsQuery(moduleId)` - Query for module assignments
  - `userAssignmentsQuery()` - Query for user's assignments

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useModuleAssignments(moduleId)` - Hook for module assignments
  - `useUserAssignments()` - Hook for user assignments

### Components

- [ ] `src/components/AssignmentCard.tsx` - Card showing assignment details
- [ ] `src/components/AssignmentList.tsx` - List of assignments
- [ ] Update classroom module view to show assignments section

## UI/UX Requirements

- Assignment cards showing title, description, due date, points
- Visual indicator for overdue assignments
- Show submission status if submitted
- Link to submit/view submission

## Acceptance Criteria

- [ ] Assignments displayed in module view
- [ ] Due dates shown clearly
- [ ] Overdue assignments highlighted
- [ ] Submission status visible
- [ ] Only authenticated users can view
