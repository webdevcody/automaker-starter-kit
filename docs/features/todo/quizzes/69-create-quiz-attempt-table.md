# 69 - Create Quiz Attempt Table

## Priority: MEDIUM

## Dependencies: 66-create-quiz-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Create database table to store student quiz attempts and answers.

## User Story

As a developer, I need a table to store quiz attempts so students can take quizzes and we can track their answers.

## Database Schema

### Migration

Create `quiz_attempt` table:

```sql
CREATE TABLE quiz_attempt (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  started_at TIMESTAMP DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP,
  score INTEGER,
  is_passed BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE quiz_attempt_answer (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL REFERENCES quiz_attempt(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES quiz_question(id) ON DELETE CASCADE,
  answer_id TEXT REFERENCES quiz_answer(id),
  answer_text TEXT, -- For short-answer questions
  is_correct BOOLEAN,
  points_earned INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_quiz_attempt_quiz_id ON quiz_attempt(quiz_id);
CREATE INDEX idx_quiz_attempt_user_id ON quiz_attempt(user_id);
CREATE INDEX idx_quiz_attempt_answer_attempt_id ON quiz_attempt_answer(attempt_id);
CREATE INDEX idx_quiz_attempt_answer_question_id ON quiz_attempt_answer(question_id);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `quizAttempt` table definition
  - Add `quizAttemptAnswer` table definition
  - Add relations to `quiz`, `user`, `quizQuestion`, `quizAnswer`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `quiz_attempt` table created
- [ ] `quiz_attempt_answer` table created
- [ ] Foreign keys set up correctly
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
