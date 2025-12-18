# 72 - Student Can Take Quiz

## Priority: MEDIUM

## Dependencies: 71-admin-can-add-questions-to-quiz.md, 69-create-quiz-attempt-table.md

## Estimated Complexity: Medium-High

## Estimated Time: 3-4 hours

## Description

Allow students to take quizzes and submit their answers.

## User Story

As a student, I want to take quizzes so I can test my knowledge.

## Database Schema

Uses existing `quiz_attempt` and `quiz_attempt_answer` tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/quizzes.ts`
  - `startQuizAttempt(userId, quizId)` - Create attempt record
  - `submitAnswer(attemptId, questionId, answerData)` - Save answer
  - `completeQuizAttempt(attemptId)` - Mark attempt as completed
  - `getQuizForAttempt(quizId)` - Get quiz with questions and answers

### Server Functions

- [ ] `src/fn/quizzes.ts`
  - `startQuizAttemptFn` - POST endpoint
  - `submitAnswerFn` - POST endpoint
  - `completeQuizAttemptFn` - POST endpoint
  - Middleware: authenticated user
  - Validation: check max attempts, time limit

### Queries

- [ ] `src/queries/quizzes.ts`
  - `startQuizAttemptMutation` - TanStack Query mutation
  - `submitAnswerMutation` - TanStack Query mutation
  - `completeQuizAttemptMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useQuizzes.ts`
  - `useStartQuizAttempt()` - Hook for starting quiz
  - `useSubmitAnswer()` - Hook for submitting answers
  - `useCompleteQuizAttempt()` - Hook for completing quiz

### Components

- [ ] `src/components/QuizView.tsx` - Main quiz taking interface
- [ ] `src/components/QuizQuestion.tsx` - Display question and answer options
- [ ] `src/components/QuizTimer.tsx` - Timer component if time limit exists
- [ ] `src/components/QuizProgress.tsx` - Progress indicator
- [ ] Quiz taking page/route

## UI/UX Requirements

- Display questions one at a time or all at once
- Radio buttons for multiple choice
- Checkboxes for multiple select (if supported)
- Text input for short answer
- Timer if time limit exists
- Progress indicator
- Submit quiz button
- Confirmation before submitting

## Acceptance Criteria

- [ ] Student can start quiz attempt
- [ ] Questions displayed correctly
- [ ] Answers can be selected/entered
- [ ] Timer works if time limit exists
- [ ] Quiz can be submitted
- [ ] Attempt saved to database
- [ ] Max attempts enforced
