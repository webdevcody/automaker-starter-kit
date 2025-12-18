# 22 - User Can Add Skills to Profile

## Priority: MEDIUM
## Dependencies: 20-create-user-profile-table.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-5 hours

## Description
Allow users to add and manage skills on their profile (tags/chips).

## User Story
As a community member, I want to add skills to my profile so that others can see what technologies and skills I have.

## Database Schema
Uses existing `user_profile` table from feature 20 (skills array column).

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/profiles.ts`
  - `updateUserSkills(userId, skills)` - Update skills array

### Server Functions
- [ ] `src/fn/profiles.ts`
  - `updateSkillsFn` - PUT/PATCH endpoint for skills
  - Input validation: skills (array of strings)

### Queries
- [ ] `src/queries/profiles.ts`
  - `updateSkillsMutation` - Update skills mutation

### Hooks
- [ ] `src/hooks/useProfile.ts`
  - `useUpdateSkills()` - Hook for updating skills

### Components
- [ ] `src/components/SkillsInput.tsx` - Tag input component for skills
- [ ] `src/components/SkillTag.tsx` - Display skill as chip/tag
- [ ] `src/components/SkillsList.tsx` - List of skills with remove
- [ ] Update `ProfileForm.tsx` to include skills input

## UI/UX Requirements
- Tag input field for adding skills
- Skills displayed as chips/tags
- Remove button on each skill
- Autocomplete suggestions (optional)
- Max number of skills (optional, e.g., 10)

## Acceptance Criteria
- [ ] User can add skills
- [ ] Skills display as tags/chips
- [ ] User can remove skills
- [ ] Skills saved to database as array
- [ ] Skills display on public profile
- [ ] Duplicate skills prevented (optional)

