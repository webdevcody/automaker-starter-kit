# 92 - Display Active vs Inactive Students

## Priority: MEDIUM

## Dependencies: 87-create-analytics-data-aggregation-functions.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Display counts and lists of active vs inactive students.

## User Story

As an admin, I want to see which students are active and which are inactive so I can re-engage inactive users.

## Database Schema

Uses existing user and progress tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/analytics.ts`
  - `getActiveInactiveStudents(daysThreshold)` - Categorize students
  - Active: logged in within X days
  - Inactive: not logged in for X days

### Components

- [ ] `src/components/ActiveInactiveStudents.tsx` - Component showing counts
- [ ] `src/components/StudentList.tsx` - List of active/inactive students
- [ ] Display:
  - Count of active students
  - Count of inactive students
  - List of inactive students (for outreach)

## UI/UX Requirements

- Count cards for active/inactive
- List of inactive students
- Filter by days threshold
- Export inactive student list

## Acceptance Criteria

- [ ] Active/inactive counts displayed
- [ ] Students categorized correctly
- [ ] Can filter by threshold
- [ ] List of inactive students shown
- [ ] Admin-only access
