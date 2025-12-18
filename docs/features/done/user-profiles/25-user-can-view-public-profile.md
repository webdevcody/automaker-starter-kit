# 25 - User Can View Public Profile

## Priority: MEDIUM
## Dependencies: 20-create-user-profile-table.md, 21-user-can-edit-profile-bio.md, 22-user-can-add-skills-to-profile.md, 24-user-can-add-portfolio-item.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-5 hours

## Description
Allow users to view other members' public profiles.

## User Story
As a community member, I want to view other members' profiles so that I can learn about them, see their skills, and view their portfolio.

## Database Schema
Uses existing `user_profile` table from feature 20.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/profiles.ts`
  - `getPublicProfile(userId)` - Fetch public profile
  - Check isPublic flag

### Server Functions
- [ ] `src/fn/profiles.ts`
  - `getPublicProfileFn` - GET endpoint for public profile
  - Return 404 if profile is private

### Queries
- [ ] `src/queries/profiles.ts`
  - `getPublicProfileQuery(userId)` - Fetch public profile

### Hooks
- [ ] `src/hooks/useProfile.ts`
  - `usePublicProfile(userId)` - Hook for fetching public profile

### Components
- [ ] `src/components/ProfileView.tsx` - Public profile view component
- [ ] `src/components/ProfileHeader.tsx` - Profile picture, name, bio
- [ ] `src/components/ProfileSkills.tsx` - Skills section
- [ ] `src/components/ProfilePortfolio.tsx` - Portfolio section

### Routes
- [ ] `src/routes/profile/$userId/index.tsx` - Public profile page route

## UI/UX Requirements
- Profile picture, name, bio
- Skills displayed as tags
- Portfolio items in grid
- Contact information (if public)
- Link to start conversation (future feature)
- Responsive layout

## Acceptance Criteria
- [ ] Public profiles are viewable
- [ ] Profile displays bio, skills, portfolio
- [ ] Private profiles return 404 or "Profile is private"
- [ ] Profile page loads correctly
- [ ] Clicking user name/avatar navigates to profile
- [ ] Responsive design works

