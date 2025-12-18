# 23 - Create Portfolio Item Table

## Priority: MEDIUM (Foundation)
## Dependencies: 20-create-user-profile-table.md
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for user portfolio items (projects they're building).

## User Story
As a developer, I need a database table to store portfolio items so that users can showcase projects they're working on.

## Database Schema

### `portfolio_item` table
```sql
CREATE TABLE portfolio_item (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_key TEXT, -- R2 storage key
  url TEXT, -- Link to project
  technologies TEXT[], -- Array of tech used
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_item_user_id ON portfolio_item(user_id);
CREATE INDEX idx_portfolio_item_created_at ON portfolio_item(created_at DESC);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `portfolio_item` table to schema.ts
- [ ] Add foreign key to user table
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `portfolioItem` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `PortfolioItem`, `CreatePortfolioItemData`, `UpdatePortfolioItemData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `portfolio_item` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

