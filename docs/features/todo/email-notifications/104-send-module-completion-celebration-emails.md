# 104 - Send Module Completion Celebration Emails

## Priority: LOW

## Dependencies: 101-set-up-email-service-integration.md, 50-track-module-completion-status.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Send celebration email when student completes a module.

## User Story

As a student, I want to receive a celebration email when I complete a module so I feel recognized.

## Implementation Tasks

### Integration

- [ ] Update module completion handler
- [ ] When module marked complete, send email
- [ ] `src/hooks/useProgress.ts` or server function
  - After completion, call `sendCompletionEmail(user, module)`

### Email Content

- [ ] Congratulations message
- [ ] Module title
- [ ] Link to certificate (if available)
- [ ] Next steps/suggestions
- [ ] Link to next module

## Acceptance Criteria

- [ ] Email sent on module completion
- [ ] Celebration message included
- [ ] Links work correctly
- [ ] Email formatted nicely
- [ ] Sent at right time
