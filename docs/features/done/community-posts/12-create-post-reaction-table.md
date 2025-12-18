# 12 - Create Post Reaction Table

## Priority: MEDIUM (Foundation)
## Dependencies: 01-create-community-post-table.md, 07-create-post-comment-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for post and comment reactions (likes).

## User Story
As a developer, I need a database table to store reactions (likes) on posts and comments so that users can express appreciation for content.

## Database Schema

### `post_reaction` table
```sql
CREATE TABLE post_reaction (
  id TEXT PRIMARY KEY,
  post_id TEXT REFERENCES community_post(id) ON DELETE CASCADE,
  comment_id TEXT REFERENCES post_comment(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'like',
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT check_target CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  ),
  CONSTRAINT unique_user_post UNIQUE (user_id, post_id) WHERE post_id IS NOT NULL,
  CONSTRAINT unique_user_comment UNIQUE (user_id, comment_id) WHERE comment_id IS NOT NULL
);

CREATE INDEX idx_post_reaction_post_id ON post_reaction(post_id);
CREATE INDEX idx_post_reaction_comment_id ON post_reaction(comment_id);
CREATE INDEX idx_post_reaction_user_id ON post_reaction(user_id);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `post_reaction` table to schema.ts
- [ ] Add check constraint (either postId or commentId must be set)
- [ ] Add unique constraints (user can only react once per post/comment)
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `postReaction` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `PostReaction`, `CreatePostReactionData`
- [ ] Add relations to communityPost and postComment tables

## Acceptance Criteria
- [ ] `post_reaction` table exists in database
- [ ] Table has all required columns
- [ ] Check constraint ensures either postId or commentId is set
- [ ] Unique constraints prevent duplicate reactions
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

