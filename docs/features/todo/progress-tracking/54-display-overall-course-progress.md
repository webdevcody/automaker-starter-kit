# 54 - Display Overall Course Progress

## Priority: MEDIUM

## Dependencies: 52-display-progress-percentage-per-module.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Calculate and display overall progress across all modules in the course.

## User Story

As a student, I want to see my overall course progress so I know how far I've come in the entire program.

## Database Schema

Uses existing progress tables.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `calculateOverallProgress(userId)` - Calculate overall percentage
  - Formula: (completed modules / total modules) \* 100
  - Or: average of all module progress percentages

### Server Functions

- [ ] `src/fn/progress.ts`
  - `getOverallProgressFn` - GET endpoint
  - Returns overall percentage and statistics

### Queries

- [ ] `src/queries/progress.ts`
  - `overallProgressQuery` - Query for overall progress

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useOverallProgress()` - Hook returns overall progress

### Components

- [ ] `src/components/CourseProgressCard.tsx` - Card showing overall progress
- [ ] `src/components/CourseProgressStats.tsx` - Statistics (modules completed, total time, etc.)
- [ ] Add to dashboard home page (`src/routes/dashboard/index.tsx`)

## UI/UX Requirements

- Large progress bar/circle showing overall percentage
- Statistics: modules completed, total time spent, etc.
- Visual celebration when milestones reached (25%, 50%, 75%, 100%)
- Display on dashboard prominently

## Acceptance Criteria

- [ ] Overall progress calculated correctly
- [ ] Progress displayed on dashboard
- [ ] Statistics are accurate
- [ ] Visual indicators are clear
- [ ] Updates when modules are completed
