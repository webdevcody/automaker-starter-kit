# 58 - Admin Can Create Assignment

## Priority: HIGH

## Dependencies: 56-create-assignment-table.md, 47-add-admin-role-to-user.md

## Estimated Complexity: Medium

## Estimated Time: 2-3 hours

## Description

Allow admins to create assignments linked to modules.

## User Story

As an admin, I want to create assignments for modules so students have tasks to complete.

## Database Schema

Uses existing `assignment` table from feature 56.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/assignments.ts`
  - `createAssignment(userId, data)` - Insert new assignment
  - `getAssignmentById(assignmentId)` - Get assignment with module info

### Server Functions

- [ ] `src/fn/assignments.ts`
  - `createAssignmentFn` - POST endpoint
  - Middleware: authenticated user + admin check
  - Input validation: title (required), moduleId (required), dueDate (optional)

### Queries

- [ ] `src/queries/assignments.ts`
  - `createAssignmentMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useAssignments.ts`
  - `useCreateAssignment()` - Hook for creating assignments

### Components

- [ ] `src/components/CreateAssignmentDialog.tsx` - Modal for creating assignment
- [ ] `src/components/AssignmentForm.tsx` - Form with title, description, instructions, due date, points
- [ ] Add "Create Assignment" button to module detail page (admin only)

## UI/UX Requirements

- Form with title, description, instructions, due date, points fields
- Date/time picker for due date
- Module selector
- Save button
- Success notification
- Validation for required fields

## Acceptance Criteria

- [ ] Admin can access create assignment form
- [ ] Form validates required fields
- [ ] Assignment is saved to database
- [ ] Success message appears
- [ ] Non-admins cannot create assignments
- [ ] Assignment linked to module correctly
