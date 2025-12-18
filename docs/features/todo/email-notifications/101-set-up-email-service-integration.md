# 101 - Set Up Email Service Integration

## Priority: MEDIUM

## Dependencies: None

## Estimated Complexity: Medium

## Estimated Time: 2-3 hours

## Description

Set up email service (SendGrid, Resend, etc.) for sending transactional emails.

## User Story

As a developer, I need an email service integrated so the platform can send emails to users.

## Implementation Tasks

### Configuration

- [ ] Add email service API key to environment variables
- [ ] Choose service (Resend recommended for simplicity)
- [ ] Set up email templates directory

### Email Service

- [ ] `src/utils/email.ts`
  - `sendEmail(to, subject, html, text)` - Send email function
  - `sendWelcomeEmail(user)` - Welcome email template
  - `sendAssignmentReminder(user, assignment)` - Reminder template
  - `sendCompletionEmail(user, module)` - Completion template
  - `sendDigestEmail(user, data)` - Digest template

### Templates

- [ ] `src/templates/email/welcome.html` - Welcome email template
- [ ] `src/templates/email/assignment-reminder.html` - Reminder template
- [ ] `src/templates/email/completion.html` - Completion template
- [ ] `src/templates/email/digest.html` - Digest template

## Acceptance Criteria

- [ ] Email service configured
- [ ] Can send test email
- [ ] Templates created
- [ ] Email sending function works
- [ ] Error handling in place
