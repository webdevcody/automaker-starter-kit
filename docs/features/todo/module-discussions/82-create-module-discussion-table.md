# 82 - Create Module Discussion Table

## Priority: LOW

## Dependencies: 29-create-classroom-module-table.md, 30-create-module-content-table.md

## Estimated Complexity: Low

## Estimated Time: 1 hour

## Description

Create database table to store module-specific discussion posts.

## User Story

As a developer, I need a table to store module discussions so students can ask questions about specific content.

## Database Schema

### Migration

Create `module_discussion` table:

```sql
CREATE TABLE module_discussion (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES classroom_module(id) ON DELETE CASCADE,
  content_id TEXT REFERENCES module_content(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  is_question BOOLEAN DEFAULT false NOT NULL,
  is_resolved BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE module_discussion_reply (
  id TEXT PRIMARY KEY,
  discussion_id TEXT NOT NULL REFERENCES module_discussion(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_reply_id TEXT REFERENCES module_discussion_reply(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_module_discussion_module_id ON module_discussion(module_id);
CREATE INDEX idx_module_discussion_content_id ON module_discussion(content_id);
CREATE INDEX idx_module_discussion_user_id ON module_discussion(user_id);
CREATE INDEX idx_module_discussion_reply_discussion_id ON module_discussion_reply(discussion_id);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `moduleDiscussion` table definition
  - Add `moduleDiscussionReply` table definition
  - Add relations
  - Add TypeScript types

### Migration

- [ ] Create migration file in `drizzle/`
- [ ] Run migration

## Acceptance Criteria

- [ ] `module_discussion` table created
- [ ] `module_discussion_reply` table created
- [ ] Foreign keys set up correctly
- [ ] Indexes created
- [ ] TypeScript types exported
- [ ] Migration runs successfully
