# 78 - Create User Note Table

## Priority: LOW

## Dependencies: 30-create-module-content-table.md

## Estimated Complexity: Low

## Estimated Time: 1 hour

## Description

Create database table to store user notes on content items.

## User Story

As a developer, I need a table to store notes so students can take notes on content.

## Database Schema

### Migration

Create `user_note` table:

```sql
CREATE TABLE user_note (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content_id TEXT REFERENCES module_content(id) ON DELETE CASCADE,
  module_id TEXT REFERENCES classroom_module(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_user_note_user_id ON user_note(user_id);
CREATE INDEX idx_user_note_content_id ON user_note(content_id);
CREATE INDEX idx_user_note_module_id ON user_note(module_id);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `userNote` table definition
  - Add relations to `user`, `moduleContent`, `classroomModule`
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `user_note` table created
- [ ] Foreign keys to user, module_content, classroom_module
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
