# 73 - Auto-Grade Quiz and Display Results

## Priority: MEDIUM

## Dependencies: 72-student-can-take-quiz.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Automatically grade quiz attempts and display results to students.

## User Story

As a student, I want to see my quiz results immediately after submitting so I know how I did.

## Database Schema

Uses existing `quiz_attempt` and `quiz_attempt_answer` tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/quizzes.ts`
  - `gradeQuizAttempt(attemptId)` - Calculate score and grade
  - Compare student answers to correct answers
  - Update `is_correct` and `points_earned` for each answer
  - Calculate total score
  - Determine if passed (score >= passing_score)
  - Update attempt record

### Server Functions

- [ ] `src/fn/quizzes.ts`
  - `gradeQuizAttemptFn` - POST endpoint (called after submission)
  - Auto-grading logic
  - Middleware: authenticated user

### Business Logic

- [ ] `src/utils/quiz-grading.ts`
  - `gradeMultipleChoice(question, answer)` - Grade multiple choice
  - `gradeTrueFalse(question, answer)` - Grade true/false
  - `gradeShortAnswer(question, answer)` - Grade short answer (exact match or keyword matching)
  - `calculateTotalScore(attempt)` - Calculate total points

### Queries

- [ ] `src/queries/quizzes.ts`
  - `gradeQuizAttemptMutation` - TanStack Query mutation
  - `quizAttemptQuery(attemptId)` - Query for attempt with results

### Hooks

- [ ] `src/hooks/useQuizzes.ts`
  - `useGradeQuizAttempt()` - Hook for grading
  - `useQuizAttempt(attemptId)` - Hook for getting attempt results

### Components

- [ ] `src/components/QuizResults.tsx` - Display quiz results
- [ ] `src/components/QuestionResult.tsx` - Show question, answer, correct/incorrect
- [ ] `src/components/QuizScore.tsx` - Display score and pass/fail
- [ ] Show results after quiz submission

## UI/UX Requirements

- Score displayed prominently
- Pass/fail indicator
- Show each question with correct/incorrect status
- Highlight correct answers
- Show student's answers
- Percentage score
- Link to retake if allowed

## Acceptance Criteria

- [ ] Quiz auto-graded on submission
- [ ] Score calculated correctly
- [ ] Pass/fail determined correctly
- [ ] Results displayed clearly
- [ ] Each question shows correct/incorrect
- [ ] Student can see what they got wrong
