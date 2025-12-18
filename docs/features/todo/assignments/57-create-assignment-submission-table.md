# 57 - Create Assignment Submission Table

## Priority: HIGH

## Dependencies: 56-create-assignment-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Create database table to store student submissions for assignments.

## User Story

As a developer, I need a table to store student submissions so they can submit assignments and admins can grade them.

## Database Schema

### Migration

Create `assignment_submission` table:

```sql
CREATE TABLE assignment_submission (
  id TEXT PRIMARY KEY,
  assignment_id TEXT NOT NULL REFERENCES assignment(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content TEXT,
  file_key TEXT, -- R2 storage key for uploaded files
  file_name TEXT,
  status TEXT DEFAULT 'submitted' NOT NULL, -- 'submitted', 'graded', 'returned'
  score INTEGER,
  feedback TEXT,
  graded_by TEXT REFERENCES user(id),
  graded_at TIMESTAMP,
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(assignment_id, user_id)
);

CREATE INDEX idx_assignment_submission_assignment_id ON assignment_submission(assignment_id);
CREATE INDEX idx_assignment_submission_user_id ON assignment_submission(user_id);
CREATE INDEX idx_assignment_submission_status ON assignment_submission(status);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `assignmentSubmission` table definition
  - Add relations to `assignment` and `user`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `assignment_submission` table created
- [ ] Foreign keys to assignment and user
- [ ] Unique constraint on (assignment_id, user_id)
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
