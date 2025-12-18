# 107 - Create Search Index/Data Structure

## Priority: MEDIUM

## Dependencies: None

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Set up search infrastructure using PostgreSQL full-text search or external service.

## User Story

As a developer, I need search infrastructure so users can search across platform content.

## Database Schema

### Migration

Add full-text search indexes or create search table:

```sql
-- Option 1: PostgreSQL full-text search
CREATE INDEX idx_module_content_search ON module_content USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, '')));
CREATE INDEX idx_community_post_search ON community_post USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || content));
CREATE INDEX idx_user_search ON user USING gin(to_tsvector('english', name || ' ' || COALESCE(email, '')));
```

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/search.ts`
  - `searchContent(query)` - Search modules and content
  - `searchPosts(query)` - Search community posts
  - `searchMembers(query)` - Search members
  - `searchAll(query)` - Search everything

### Server Functions

- [ ] `src/fn/search.ts`
  - `searchFn` - GET endpoint
  - Accept query parameter
  - Return search results

## Acceptance Criteria

- [ ] Search indexes created
- [ ] Search functions work
- [ ] Fast search performance
- [ ] Results ranked by relevance
