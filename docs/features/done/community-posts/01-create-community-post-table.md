# 01 - Create Community Post Table

## Priority: CRITICAL (Foundation)
## Dependencies: None
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for community posts. This is the foundation for all post-related features.

## User Story
As a developer, I need a database table to store community posts so that users can create and store posts in the system.

## Database Schema

### `community_post` table
```sql
CREATE TABLE community_post (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_pinned BOOLEAN DEFAULT false,
  is_question BOOLEAN DEFAULT false,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_community_post_user_id ON community_post(user_id);
CREATE INDEX idx_community_post_created_at ON community_post(created_at DESC);
CREATE INDEX idx_community_post_category ON community_post(category);
CREATE INDEX idx_community_post_is_pinned ON community_post(is_pinned);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `community_post` table to schema.ts
- [ ] Add indexes for performance
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `communityPost` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `CommunityPost`, `CreateCommunityPostData`, `UpdateCommunityPostData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `community_post` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

