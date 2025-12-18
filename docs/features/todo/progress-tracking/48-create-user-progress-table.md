# 48 - Create User Progress Table

## Priority: HIGH

## Dependencies: 29-create-classroom-module-table.md

## Estimated Complexity: Low

## Estimated Time: 1-2 hours

## Description

Create database table to track user progress through classroom modules.

## User Story

As a developer, I need a table to store user progress data so that students can track their completion status.

## Database Schema

### Migration

Create `user_progress` table:

```sql
CREATE TABLE user_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL REFERENCES classroom_module(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  completed_at TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0 NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0 NOT NULL,
  last_accessed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX idx_user_progress_is_completed ON user_progress(user_id, is_completed);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `userProgress` table definition
  - Add relations to `user` and `classroomModule`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `user_progress` table created
- [ ] Foreign keys to user and classroom_module
- [ ] Unique constraint on (user_id, module_id)
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
