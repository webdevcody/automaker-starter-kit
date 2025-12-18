# 49 - Create Content Completion Table

## Priority: HIGH

## Dependencies: 30-create-module-content-table.md

## Estimated Complexity: Low

## Estimated Time: 1-2 hours

## Description

Create database table to track completion of individual content items within modules.

## User Story

As a developer, I need a table to track which content items students have completed so we can calculate detailed progress.

## Database Schema

### Migration

Create `content_completion` table:

```sql
CREATE TABLE content_completion (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL REFERENCES module_content(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  completed_at TIMESTAMP,
  time_spent_seconds INTEGER DEFAULT 0 NOT NULL,
  last_accessed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, content_id)
);

CREATE INDEX idx_content_completion_user_id ON content_completion(user_id);
CREATE INDEX idx_content_completion_content_id ON content_completion(content_id);
CREATE INDEX idx_content_completion_is_completed ON content_completion(user_id, is_completed);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `contentCompletion` table definition
  - Add relations to `user` and `moduleContent`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `content_completion` table created
- [ ] Foreign keys to user and module_content
- [ ] Unique constraint on (user_id, content_id)
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
