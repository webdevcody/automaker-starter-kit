# 75 - Generate Certificate When Module Completed

## Priority: LOW

## Dependencies: 74-create-certificate-table.md, 50-track-module-completion-status.md

## Estimated Complexity: Medium-High

## Estimated Time: 2-3 hours

## Description

Automatically generate certificate when student completes a module.

## User Story

As a student, I want to receive a certificate when I complete a module so I have proof of my achievement.

## Database Schema

Uses existing `certificate` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/certificates.ts`
  - `createCertificate(userId, moduleId, type)` - Create certificate record
  - `getCertificatesByUser(userId)` - Get user's certificates

### Server Functions

- [ ] `src/fn/certificates.ts`
  - `generateCertificateFn` - POST endpoint
  - Called when module is completed (hook into progress tracking)

### Business Logic

- [ ] `src/utils/certificate-generation.ts`
  - `generateCertificatePDF(userId, moduleId)` - Generate PDF certificate
  - Use PDF library (e.g., pdfkit, puppeteer)
  - Include student name, module title, completion date
  - Upload to R2 storage
  - Return certificate URL

### Hooks Integration

- [ ] Update `src/hooks/useProgress.ts`
  - When module marked complete, trigger certificate generation
  - Or use server-side trigger/event

### Components

- [ ] Certificate generation happens server-side
- [ ] Notification to student when certificate ready

## UI/UX Requirements

- Certificate generated automatically
- PDF format
- Professional design
- Includes student name, module name, date

## Acceptance Criteria

- [ ] Certificate generated when module completed
- [ ] Certificate saved to database
- [ ] PDF generated and uploaded
- [ ] Certificate URL stored
- [ ] Student notified of certificate
