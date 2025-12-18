# 15 - Create Post Attachment Table

## Priority: MEDIUM (Foundation)
## Dependencies: 01-create-community-post-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for post attachments (images, videos, PDFs).

## User Story
As a developer, I need a database table to store file attachments for posts so that users can upload images, videos, and other files with their posts.

## Database Schema

### `post_attachment` table
```sql
CREATE TABLE post_attachment (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES community_post(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'image', 'video', 'pdf', 'link'
  file_key TEXT, -- R2 storage key
  url TEXT, -- Presigned URL or direct link
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  position INTEGER DEFAULT 0, -- For ordering multiple attachments
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_post_attachment_post_id ON post_attachment(post_id);
CREATE INDEX idx_post_attachment_position ON post_attachment(post_id, position);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `post_attachment` table to schema.ts
- [ ] Add foreign key to community_post
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `postAttachment` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `PostAttachment`, `CreatePostAttachmentData`
- [ ] Add relations to communityPost table

## Acceptance Criteria
- [ ] `post_attachment` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to community_post works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

