# 35 - Create Message Table

## Priority: MEDIUM (Foundation)
## Dependencies: 34-create-conversation-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for messages within conversations.

## User Story
As a developer, I need a database table to store individual messages so that users can send and receive private messages.

## Database Schema

### `message` table
```sql
CREATE TABLE message (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversation(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_message_conversation_id ON message(conversation_id);
CREATE INDEX idx_message_sender_id ON message(sender_id);
CREATE INDEX idx_message_created_at ON message(conversation_id, created_at DESC);
CREATE INDEX idx_message_is_read ON message(is_read) WHERE is_read = false;
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `message` table to schema.ts
- [ ] Add foreign keys to conversation and user tables
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `message` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `Message`, `CreateMessageData`
- [ ] Add relations to conversation and user tables

## Acceptance Criteria
- [ ] `message` table exists in database
- [ ] Table has all required columns
- [ ] Foreign keys work correctly
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

