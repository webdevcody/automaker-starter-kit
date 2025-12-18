# 66 - Create Quiz Table

## Priority: MEDIUM

## Dependencies: 29-create-classroom-module-table.md

## Estimated Complexity: Low

## Estimated Time: 1 hour

## Description

Create database table to store quizzes linked to modules.

## User Story

As a developer, I need a table to store quiz information so students can take assessments.

## Database Schema

### Migration

Create `quiz` table:

```sql
CREATE TABLE quiz (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES classroom_module(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 70 NOT NULL,
  max_attempts INTEGER DEFAULT 1 NOT NULL,
  created_by TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_quiz_module_id ON quiz(module_id);
CREATE INDEX idx_quiz_created_by ON quiz(created_by);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `quiz` table definition
  - Add relations to `classroomModule` and `user`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `quiz` table created
- [ ] Foreign keys to classroom_module and user
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
