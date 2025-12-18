# 47 - Add Admin Role to User

## Priority: MEDIUM (Foundation)
## Dependencies: None (user table exists)
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Add admin role/flag to user table for permission checks.

## User Story
As a developer, I need a way to identify admin users so that admin-only features can be protected.

## Database Schema

### Migration
Add `role` field to existing `user` table:
```sql
ALTER TABLE user ADD COLUMN role TEXT DEFAULT 'member';
-- Set some users as admin manually or via migration
```

Or add `is_admin` boolean:
```sql
ALTER TABLE user ADD COLUMN is_admin BOOLEAN DEFAULT false;
```

## Implementation Tasks

### Database Migration
- [ ] Create migration to add role/is_admin field
- [ ] Update schema.ts
- [ ] Add TypeScript types

### Guards/Middleware
- [ ] `src/fn/guards.ts` (may exist, extend)
  - `isAdmin(userId)` - Check if user is admin
  - `adminOnlyMiddleware` - Middleware for admin routes

## Acceptance Criteria
- [ ] Role/is_admin field added to user table
- [ ] Admin check function works
- [ ] Admin middleware works
- [ ] Migration runs successfully

