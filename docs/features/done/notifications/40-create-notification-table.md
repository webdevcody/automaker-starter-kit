# 40 - Create Notification Table

## Priority: MEDIUM (Foundation)
## Dependencies: None
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for user notifications.

## User Story
As a developer, I need a database table to store notifications so that users can receive alerts for new messages, post replies, etc.

## Database Schema

### `notification` table
```sql
CREATE TABLE notification (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'new-message', 'post-reply', 'post-like', 'new-lesson', 'event-reminder', 'admin-post'
  title TEXT NOT NULL,
  content TEXT,
  related_id TEXT, -- postId, messageId, moduleId, etc.
  related_type TEXT, -- 'post', 'message', 'module', 'event'
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notification_user_id ON notification(user_id);
CREATE INDEX idx_notification_is_read ON notification(user_id, is_read);
CREATE INDEX idx_notification_created_at ON notification(user_id, created_at DESC);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `notification` table to schema.ts
- [ ] Add foreign key to user table
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `notification` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `Notification`, `CreateNotificationData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `notification` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

