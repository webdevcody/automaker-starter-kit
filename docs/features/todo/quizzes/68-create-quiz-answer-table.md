# 68 - Create Quiz Answer Table

## Priority: MEDIUM

## Dependencies: 67-create-quiz-question-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Create database table to store answer options and correct answers for quiz questions.

## User Story

As a developer, I need a table to store answer options so questions can have multiple choice options and correct answers.

## Database Schema

### Migration

Create `quiz_answer` table:

```sql
CREATE TABLE quiz_answer (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL REFERENCES quiz_question(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_quiz_answer_question_id ON quiz_answer(question_id);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `quizAnswer` table definition
  - Add relations to `quizQuestion`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `quiz_answer` table created
- [ ] Foreign key to quiz_question
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
