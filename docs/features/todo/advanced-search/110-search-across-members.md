# 110 - Search Across Members

## Priority: MEDIUM

## Dependencies: 107-create-search-index-data-structure.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Allow users to search for members.

## User Story

As a student, I want to search for members so I can find and connect with people.

## Database Schema

Uses existing user table with search index.

## Implementation Tasks

### Components

- [ ] Update `src/components/SearchResults.tsx`
- [ ] `src/components/MemberSearchResult.tsx` - Result card for members
- [ ] Add members tab to search results
- [ ] Show member profile preview

## UI/UX Requirements

- Members in search results
- Member avatar and name
- Profile link
- Skills/bio preview

## Acceptance Criteria

- [ ] Can search members
- [ ] Results displayed clearly
- [ ] Member info shown
- [ ] Links work correctly
- [ ] Fast search performance
