# 102 - Send Welcome Email on Signup

## Priority: MEDIUM

## Dependencies: 101-set-up-email-service-integration.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Send welcome email when new user signs up.

## User Story

As a new user, I want to receive a welcome email so I know how to get started.

## Implementation Tasks

### Integration

- [ ] Update signup flow to send welcome email
- [ ] `src/fn/users.ts` or auth handler
  - After user creation, call `sendWelcomeEmail(user)`
- [ ] Use email template from feature 101

### Email Content

- [ ] Welcome message
- [ ] Getting started guide
- [ ] Links to dashboard, classroom, community
- [ ] Support contact info

## Acceptance Criteria

- [ ] Welcome email sent on signup
- [ ] Email contains helpful information
- [ ] Links work correctly
- [ ] Email formatted nicely
- [ ] Error handling (don't fail signup if email fails)
