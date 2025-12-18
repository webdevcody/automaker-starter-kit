# 111 - Advanced Search Filters and Saved Searches

## Priority: LOW

## Dependencies: 108-search-across-content-and-modules.md, 109-search-across-community-posts.md, 110-search-across-members.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Add filters to search and allow users to save searches.

## User Story

As a student, I want to filter search results and save searches so I can find exactly what I need.

## Database Schema

### Migration

Create saved_search table:

```sql
CREATE TABLE saved_search (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  query TEXT NOT NULL,
  filters JSONB,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_saved_search_user_id ON saved_search(user_id);
```

## Implementation Tasks

### Database Schema

- [ ] Add `savedSearch` table
- [ ] Add TypeScript types

### Components

- [ ] `src/components/SearchFilters.tsx` - Filter options
- [ ] `src/components/SavedSearches.tsx` - List of saved searches
- [ ] Filters:
  - Content type
  - Module
  - Date range
  - Author
- [ ] Save search button

## UI/UX Requirements

- Filter sidebar
- Filter options
- Save search button
- List of saved searches
- Load saved search

## Acceptance Criteria

- [ ] Filters work correctly
- [ ] Can save searches
- [ ] Can load saved searches
- [ ] Filters persist in URL
- [ ] UI clear and usable
