# 98 - Admin Can Export Student Data

## Priority: LOW

## Dependencies: 95-admin-can-view-individual-student-progress.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow admins to export student data to CSV/Excel.

## User Story

As an admin, I want to export student data so I can analyze it externally.

## Database Schema

Uses existing tables.

## Implementation Tasks

### Server Functions

- [ ] `src/fn/student-management.ts`
  - `exportStudentDataFn` - GET endpoint
  - Generate CSV/Excel with student data
  - Include: progress, submissions, quiz results, activity

### Components

- [ ] `src/components/ExportStudentDataButton.tsx` - Export button
- [ ] Options: single student or bulk export

## UI/UX Requirements

- Export button
- Format selector
- Data fields selector
- Download file

## Acceptance Criteria

- [ ] Student data can be exported
- [ ] CSV/Excel format supported
- [ ] Data formatted correctly
- [ ] Admin-only access
