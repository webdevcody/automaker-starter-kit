# 20 - Create User Profile Table

## Priority: HIGH (Foundation)
## Dependencies: None (user table exists)
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for extended user profile information (bio, skills, portfolio).

## User Story
As a developer, I need a database table to store extended user profile information so that users can add bios, skills, and portfolio items.

## Database Schema

### `user_profile` table
```sql
CREATE TABLE user_profile (
  id TEXT PRIMARY KEY REFERENCES user(id) ON DELETE CASCADE,
  bio TEXT,
  skills TEXT[], -- Array of skills
  looking_for TEXT,
  contact_info JSONB, -- Social links, email preferences
  is_public BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_profile_is_public ON user_profile(is_public);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `user_profile` table to schema.ts
- [ ] Add foreign key to user table
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `userProfile` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `UserProfile`, `CreateUserProfileData`, `UpdateUserProfileData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `user_profile` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

