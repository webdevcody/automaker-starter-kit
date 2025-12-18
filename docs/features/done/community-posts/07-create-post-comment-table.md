# 07 - Create Post Comment Table

## Priority: HIGH (Foundation)
## Dependencies: 01-create-community-post-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for post comments. This enables users to comment on posts.

## User Story
As a developer, I need a database table to store comments on posts so that users can discuss and reply to posts.

## Database Schema

### `post_comment` table
```sql
CREATE TABLE post_comment (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES community_post(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id TEXT REFERENCES post_comment(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_post_comment_post_id ON post_comment(post_id);
CREATE INDEX idx_post_comment_user_id ON post_comment(user_id);
CREATE INDEX idx_post_comment_parent_comment_id ON post_comment(parent_comment_id);
CREATE INDEX idx_post_comment_created_at ON post_comment(created_at DESC);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `post_comment` table to schema.ts
- [ ] Add indexes for performance
- [ ] Add foreign key to community_post
- [ ] Add self-referencing foreign key for parent_comment_id (nested replies)
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `postComment` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `PostComment`, `CreatePostCommentData`, `UpdatePostCommentData`
- [ ] Add relations to communityPost and user tables

## Acceptance Criteria
- [ ] `post_comment` table exists in database
- [ ] Table has all required columns
- [ ] Foreign keys work correctly
- [ ] Self-referencing foreign key works for nested replies
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

