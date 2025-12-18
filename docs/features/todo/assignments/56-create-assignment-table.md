# 56 - Create Assignment Table

## Priority: HIGH

## Dependencies: 29-create-classroom-module-table.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Create database table to store assignments linked to modules.

## User Story

As a developer, I need a table to store assignment information so students can complete assignments.

## Database Schema

### Migration

Create `assignment` table:

```sql
CREATE TABLE assignment (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES classroom_module(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  due_date TIMESTAMP,
  points_possible INTEGER DEFAULT 100 NOT NULL,
  created_by TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_assignment_module_id ON assignment(module_id);
CREATE INDEX idx_assignment_due_date ON assignment(due_date);
CREATE INDEX idx_assignment_created_by ON assignment(created_by);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `assignment` table definition
  - Add relations to `classroomModule` and `user`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `assignment` table created
- [ ] Foreign keys to classroom_module and user
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
