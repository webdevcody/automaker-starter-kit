# 30 - Create Module Content Table

## Priority: MEDIUM (Foundation)
## Dependencies: 29-create-classroom-module-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for module content items (videos, tasks, PDFs, images, text).

## User Story
As a developer, I need a database table to store content items within modules so that admins can add videos, tasks, PDFs, and other content to modules.

## Database Schema

### `module_content` table
```sql
CREATE TABLE module_content (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES classroom_module(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'video', 'task', 'image', 'pdf', 'text'
  title TEXT NOT NULL,
  description TEXT,
  file_key TEXT, -- R2 storage key
  url TEXT, -- External link or presigned URL
  content TEXT, -- For text content
  position INTEGER NOT NULL, -- For ordering within module
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_module_content_module_id ON module_content(module_id);
CREATE INDEX idx_module_content_position ON module_content(module_id, position);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `module_content` table to schema.ts
- [ ] Add foreign key to classroom_module
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `moduleContent` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `ModuleContent`, `CreateModuleContentData`, `UpdateModuleContentData`
- [ ] Add relations to classroomModule table

## Acceptance Criteria
- [ ] `module_content` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to classroom_module works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

