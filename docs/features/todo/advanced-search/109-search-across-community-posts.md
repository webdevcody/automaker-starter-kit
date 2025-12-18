# 109 - Search Across Community Posts

## Priority: MEDIUM

## Dependencies: 107-create-search-index-data-structure.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow users to search community posts.

## User Story

As a student, I want to search community posts so I can find discussions and answers.

## Database Schema

Uses existing community_post table with search index.

## Implementation Tasks

### Components

- [ ] Update `src/components/SearchResults.tsx`
- [ ] `src/components/PostSearchResult.tsx` - Result card for posts
- [ ] Add posts tab to search results
- [ ] Show post preview with highlighted terms

## UI/UX Requirements

- Posts in search results
- Post preview with content snippet
- Author and date shown
- Link to post
- Highlight search terms

## Acceptance Criteria

- [ ] Can search posts
- [ ] Results displayed clearly
- [ ] Search terms highlighted
- [ ] Links work correctly
- [ ] Fast search performance
