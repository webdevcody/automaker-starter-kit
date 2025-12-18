# 67 - Create Quiz Question Table

## Priority: MEDIUM

## Dependencies: 66-create-quiz-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Create database table to store quiz questions.

## User Story

As a developer, I need a table to store quiz questions so quizzes can have multiple questions.

## Database Schema

### Migration

Create `quiz_question` table:

```sql
CREATE TABLE quiz_question (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- 'multiple-choice', 'true-false', 'short-answer'
  points INTEGER DEFAULT 1 NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_quiz_question_quiz_id ON quiz_question(quiz_id);
CREATE INDEX idx_quiz_question_position ON quiz_question(quiz_id, position);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `quizQuestion` table definition
  - Add relations to `quiz`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `quiz_question` table created
- [ ] Foreign key to quiz
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
