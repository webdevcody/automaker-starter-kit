# 34 - Create Conversation Table

## Priority: MEDIUM (Foundation)
## Dependencies: None
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for private message conversations between two users.

## User Story
As a developer, I need a database table to store conversations between users so that members can have private messaging.

## Database Schema

### `conversation` table
```sql
CREATE TABLE conversation (
  id TEXT PRIMARY KEY,
  participant1_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  participant2_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_conversation UNIQUE (
    LEAST(participant1_id, participant2_id),
    GREATEST(participant1_id, participant2_id)
  )
);

CREATE INDEX idx_conversation_participant1 ON conversation(participant1_id);
CREATE INDEX idx_conversation_participant2 ON conversation(participant2_id);
CREATE INDEX idx_conversation_last_message_at ON conversation(last_message_at DESC);
```

Note: The unique constraint ensures one conversation per pair of users regardless of order.

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `conversation` table to schema.ts
- [ ] Add foreign keys to user table (twice)
- [ ] Add unique constraint for conversation pairs
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `conversation` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `Conversation`, `CreateConversationData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `conversation` table exists in database
- [ ] Table has all required columns
- [ ] Foreign keys to user table work
- [ ] Unique constraint prevents duplicate conversations
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

