# 74 - Create Certificate Table

## Priority: LOW

## Dependencies: 29-create-classroom-module-table.md

## Estimated Complexity: Low

## Estimated Time: 1 hour

## Description

Create database table to store certificates issued to students.

## User Story

As a developer, I need a table to store certificate information so students can receive completion certificates.

## Database Schema

### Migration

Create `certificate` table:

```sql
CREATE TABLE certificate (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  module_id TEXT REFERENCES classroom_module(id) ON DELETE SET NULL,
  certificate_type TEXT NOT NULL, -- 'module-completion', 'course-completion', 'achievement'
  title TEXT NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW() NOT NULL,
  certificate_url TEXT, -- URL to certificate PDF/image
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_certificate_user_id ON certificate(user_id);
CREATE INDEX idx_certificate_module_id ON certificate(module_id);
CREATE INDEX idx_certificate_type ON certificate(certificate_type);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `certificate` table definition
  - Add relations to `user` and `classroomModule`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `certificate` table created
- [ ] Foreign keys to user and classroom_module
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
