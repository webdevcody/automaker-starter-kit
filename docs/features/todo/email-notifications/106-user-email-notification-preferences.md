# 106 - User Email Notification Preferences

## Priority: LOW

## Dependencies: 101-set-up-email-service-integration.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow users to control which emails they receive.

## User Story

As a user, I want to control which emails I receive so I'm not overwhelmed.

## Database Schema

### Migration

Add email preferences to user_profile or create new table:

```sql
ALTER TABLE user_profile ADD COLUMN email_preferences JSONB DEFAULT '{"welcome": true, "assignments": true, "completions": true, "digest": true}'::jsonb;
```

## Implementation Tasks

### Database Schema

- [ ] Add email preferences field
- [ ] Update TypeScript types

### Components

- [ ] `src/components/EmailPreferences.tsx` - Settings component
- [ ] Checkboxes for each email type
- [ ] Add to settings page

### Email Service

- [ ] Update email functions to check preferences
- [ ] Skip sending if user opted out

## UI/UX Requirements

- Checkboxes for each email type
- Save button
- Success feedback
- Clear descriptions

## Acceptance Criteria

- [ ] Email preferences saved
- [ ] Preferences respected when sending emails
- [ ] UI clear and easy to use
- [ ] Defaults set appropriately
