# 108 - Search Across Content and Modules

## Priority: MEDIUM

## Dependencies: 107-create-search-index-data-structure.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow users to search for modules and content items.

## User Story

As a student, I want to search for content so I can quickly find what I'm looking for.

## Database Schema

Uses existing tables with search indexes.

## Implementation Tasks

### Components

- [ ] `src/components/SearchBar.tsx` - Global search bar
- [ ] `src/components/SearchResults.tsx` - Display search results
- [ ] `src/components/ContentSearchResult.tsx` - Result card for content
- [ ] Add search bar to header
- [ ] Search results page

## UI/UX Requirements

- Search bar in header
- Results page with tabs (Content, Posts, Members)
- Highlight search terms
- Link to content items
- Show module context

## Acceptance Criteria

- [ ] Can search content and modules
- [ ] Results displayed clearly
- [ ] Search terms highlighted
- [ ] Links work correctly
- [ ] Fast search performance
