# 21 - User Can Edit Profile Bio

## Priority: MEDIUM
## Dependencies: 20-create-user-profile-table.md
## Estimated Complexity: Low
## Estimated Time: 3-4 hours

## Description
Allow users to add and edit their profile bio/about section.

## User Story
As a community member, I want to add a bio to my profile so that others can learn more about me.

## Database Schema
Uses existing `user_profile` table from feature 20.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/profiles.ts`
  - `getUserProfile(userId)` - Fetch user profile
  - `updateUserProfile(userId, data)` - Update profile bio

### Server Functions
- [ ] `src/fn/profiles.ts`
  - `getProfileFn` - GET current user's profile
  - `updateProfileFn` - PUT/PATCH endpoint for updating bio
  - Input validation: bio (optional, max length)

### Queries
- [ ] `src/queries/profiles.ts`
  - `getProfileQuery(userId)` - Fetch profile
  - `updateProfileMutation` - Update profile mutation

### Hooks
- [ ] `src/hooks/useProfile.ts` (may exist, extend)
  - `useUpdateProfile()` - Hook for updating profile

### Components
- [ ] `src/components/ProfileForm.tsx` - Form for editing profile
- [ ] `src/components/BioInput.tsx` - Textarea for bio
- [ ] Update `src/routes/settings/profile.tsx` or create profile settings page

## UI/UX Requirements
- Bio textarea in profile settings
- Character count (optional)
- Save button
- Success toast notification
- Bio displays on public profile

## Acceptance Criteria
- [ ] User can enter/edit bio text
- [ ] Bio is saved to database
- [ ] Bio displays on profile page
- [ ] Success message appears
- [ ] UpdatedAt timestamp updates
- [ ] Only user can edit their own bio

