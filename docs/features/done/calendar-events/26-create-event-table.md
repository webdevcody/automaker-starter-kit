# 26 - Create Event Table

## Priority: MEDIUM (Foundation)
## Dependencies: None
## Estimated Complexity: Low
## Estimated Time: 2-3 hours

## Description
Create the database table for community events/calendar.

## User Story
As a developer, I need a database table to store community events so that admins can create events and members can view them on a calendar.

## Database Schema

### `event` table
```sql
CREATE TABLE event (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  event_link TEXT, -- Zoom, Google Meet, etc.
  event_type TEXT DEFAULT 'live-session', -- 'live-session', 'workshop', 'meetup', 'assignment-due'
  created_by TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_event_start_time ON event(start_time);
CREATE INDEX idx_event_created_by ON event(created_by);
CREATE INDEX idx_event_event_type ON event(event_type);
```

## Implementation Tasks

### Database Migration
- [ ] Create migration file in `drizzle/` folder
- [ ] Add `event` table to schema.ts
- [ ] Add foreign key to user table
- [ ] Add indexes
- [ ] Run migration
- [ ] Add Drizzle relations

### Schema File Updates
- [ ] Add `event` table definition to `src/db/schema.ts`
- [ ] Add TypeScript types: `Event`, `CreateEventData`, `UpdateEventData`
- [ ] Add relations to user table

## Acceptance Criteria
- [ ] `event` table exists in database
- [ ] Table has all required columns
- [ ] Foreign key to user table works
- [ ] Indexes are created
- [ ] TypeScript types are generated
- [ ] Migration runs successfully

