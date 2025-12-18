# 45 - User Can View Members Directory

## Priority: MEDIUM
## Dependencies: 20-create-user-profile-table.md, 25-user-can-view-public-profile.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Display a page showing all community members with search and filter capabilities.

## User Story
As a community member, I want to view all members so that I can discover and connect with other community members.

## Database Schema
Uses existing `user` and `user_profile` tables.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/members.ts`
  - `getAllMembers(filters, pagination)` - Fetch all public profiles
  - `searchMembers(query, filters)` - Search by name/skills

### Server Functions
- [ ] `src/fn/members.ts`
  - `getMembersFn` - GET endpoint with search/filter
  - `searchMembersFn` - GET endpoint for search

### Queries
- [ ] `src/queries/members.ts`
  - `getMembersQuery(filters, pagination)` - Fetch members
  - `searchMembersQuery(query, filters)` - Search members

### Hooks
- [ ] `src/hooks/useMembers.ts`
  - `useMembers(filters, pagination)` - Hook for fetching members
  - `useSearchMembers(query)` - Hook for searching

### Components
- [ ] `src/components/MemberCard.tsx` - Member preview card
- [ ] `src/components/MemberGrid.tsx` - Grid layout
- [ ] `src/components/MemberSearch.tsx` - Search input
- [ ] `src/components/SkillFilter.tsx` - Skill filter chips

### Routes
- [ ] `src/routes/members.tsx` - Members directory page

## UI/UX Requirements
- Grid layout of member cards
- Search bar at top
- Filter by skills
- Click member card navigates to profile
- Pagination
- Empty states

## Acceptance Criteria
- [ ] All members displayed
- [ ] Search by name works
- [ ] Filter by skills works
- [ ] Click member navigates to profile
- [ ] Only public profiles shown
- [ ] Responsive grid layout

