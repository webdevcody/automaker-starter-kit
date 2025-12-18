# 70 - Admin Can Create Quiz

## Priority: MEDIUM

## Dependencies: 66-create-quiz-table.md, 47-add-admin-role-to-user.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow admins to create quizzes linked to modules.

## User Story

As an admin, I want to create quizzes for modules so students can be assessed on their learning.

## Database Schema

Uses existing `quiz` table from feature 66.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/quizzes.ts`
  - `createQuiz(userId, data)` - Insert new quiz
  - `getQuizById(quizId)` - Get quiz with module info

### Server Functions

- [ ] `src/fn/quizzes.ts`
  - `createQuizFn` - POST endpoint
  - Middleware: authenticated user + admin check
  - Input validation: title (required), moduleId (required)

### Queries

- [ ] `src/queries/quizzes.ts`
  - `createQuizMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useQuizzes.ts`
  - `useCreateQuiz()` - Hook for creating quizzes

### Components

- [ ] `src/components/CreateQuizDialog.tsx` - Modal for creating quiz
- [ ] `src/components/QuizForm.tsx` - Form with title, description, time limit, passing score, max attempts
- [ ] Add "Create Quiz" button to module detail page (admin only)

## UI/UX Requirements

- Form with title, description, time limit, passing score, max attempts fields
- Number inputs for numeric fields
- Save button
- Success notification
- Validation for required fields

## Acceptance Criteria

- [ ] Admin can access create quiz form
- [ ] Form validates required fields
- [ ] Quiz is saved to database
- [ ] Success message appears
- [ ] Non-admins cannot create quizzes
- [ ] Quiz linked to module correctly
