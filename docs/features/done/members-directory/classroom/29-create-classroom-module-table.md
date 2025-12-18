# 29 - Create Classroom Module Table

## Priority: MEDIUM (Foundation)
## Dependencies: None
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for classroom modules (e.g., "Week 5").

## User Story
As a developer, I need a database table to store classroom modules so that admins can create educational content organized by weeks or modules.

## Database Schema

### `classroom_module` table
```sql
CREATE TABLE classroom_module (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL, -- e.g., "Week 5"
  description TEXT,
  order INTEGER NOT NULL, -- For chronological ordering
  is_published BOOLEAN DEFAULT false,
  created_by TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_classroom_module_order ON classroom_module(order DESC);
CREATE INDEX idx_classroom_module_is_published ON classroom_module(is_published);
CREATE INDEX idx_classroom_module_created_by ON classroom_module(created_by);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `classroom_module` table to schema.ts
- [ ] Add foreign key to user table
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `classroomModule` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `ClassroomModule`, `CreateClassroomModuleData`, `UpdateClassroomModuleData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `classroom_module` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

