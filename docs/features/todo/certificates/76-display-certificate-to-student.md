# 76 - Display Certificate to Student

## Priority: LOW

## Dependencies: 75-generate-certificate-when-module-completed.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display certificates to students so they can view and download them.

## User Story

As a student, I want to view my certificates so I can see my achievements and share them.

## Database Schema

Uses existing `certificate` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/certificates.ts`
  - `getCertificatesByUser(userId)` - Get user's certificates
  - Already exists from feature 75

### Server Functions

- [ ] `src/fn/certificates.ts`
  - `getCertificatesFn` - GET endpoint
  - Returns user's certificates

### Queries

- [ ] `src/queries/certificates.ts`
  - `certificatesQuery` - Query for user certificates

### Hooks

- [ ] `src/hooks/useCertificates.ts`
  - `useCertificates()` - Hook for getting certificates

### Components

- [ ] `src/components/CertificateCard.tsx` - Card showing certificate
- [ ] `src/components/CertificateList.tsx` - List of certificates
- [ ] `src/components/CertificateView.tsx` - View certificate PDF/image
- [ ] Add certificates section to profile or dashboard

## UI/UX Requirements

- List of certificates
- Certificate preview/image
- Download button
- Share button (future feature)
- Certificate details (title, date issued)

## Acceptance Criteria

- [ ] Certificates displayed to student
- [ ] Can view certificate
- [ ] Can download certificate
- [ ] Only student can view their own certificates
- [ ] Certificates listed clearly
