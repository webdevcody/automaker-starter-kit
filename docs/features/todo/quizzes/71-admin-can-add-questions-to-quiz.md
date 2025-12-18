# 71 - Admin Can Add Questions to Quiz

## Priority: MEDIUM

## Dependencies: 70-admin-can-create-quiz.md, 67-create-quiz-question-table.md, 68-create-quiz-answer-table.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Allow admins to add questions and answer options to quizzes.

## User Story

As an admin, I want to add questions to quizzes so students can be assessed.

## Database Schema

Uses existing `quiz_question` and `quiz_answer` tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/quizzes.ts`
  - `addQuestion(quizId, questionData)` - Insert question
  - `addAnswer(questionId, answerData)` - Insert answer option
  - `getQuizWithQuestions(quizId)` - Get quiz with all questions and answers

### Server Functions

- [ ] `src/fn/quizzes.ts`
  - `addQuestionFn` - POST endpoint
  - `addAnswerFn` - POST endpoint
  - Middleware: authenticated user + admin check

### Queries

- [ ] `src/queries/quizzes.ts`
  - `addQuestionMutation` - TanStack Query mutation
  - `addAnswerMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useQuizzes.ts`
  - `useAddQuestion()` - Hook for adding questions
  - `useAddAnswer()` - Hook for adding answers

### Components

- [ ] `src/components/AddQuestionDialog.tsx` - Modal for adding question
- [ ] `src/components/QuestionForm.tsx` - Form with question text, type, points
- [ ] `src/components/AnswerForm.tsx` - Form for adding answer options
- [ ] `src/components/QuestionList.tsx` - List of questions in quiz
- [ ] Admin view on quiz detail page

## UI/UX Requirements

- Question form with text, type selector, points
- Answer form for multiple choice options
- Mark correct answer checkbox
- Reorder questions (drag and drop)
- Delete questions/answers

## Acceptance Criteria

- [ ] Admin can add questions to quiz
- [ ] Admin can add answer options
- [ ] Can mark correct answers
- [ ] Questions saved to database
- [ ] Answers saved correctly
- [ ] Questions displayed in list
