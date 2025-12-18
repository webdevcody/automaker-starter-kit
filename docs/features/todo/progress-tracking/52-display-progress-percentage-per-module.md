# 52 - Display Progress Percentage Per Module

## Priority: MEDIUM

## Dependencies: 50-track-module-completion-status.md, 51-track-content-item-completion.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Calculate and display progress percentage for each module based on completed content items.

## User Story

As a student, I want to see what percentage of each module I've completed so I know how much work remains.

## Database Schema

Uses existing tables from features 48-51.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/progress.ts`
  - `calculateModuleProgress(userId, moduleId)` - Calculate percentage
  - Formula: (completed content items / total content items) \* 100
  - Update `progress_percentage` in `user_progress` table

### Server Functions

- [ ] `src/fn/progress.ts`
  - `getModuleProgressFn` - GET endpoint
  - Returns progress percentage and completion status

### Queries

- [ ] `src/queries/progress.ts`
  - `moduleProgressQuery(moduleId)` - Query for module progress

### Hooks

- [ ] `src/hooks/useProgress.ts`
  - `useModuleProgress(moduleId)` - Hook returns progress percentage

### Components

- [ ] `src/components/ModuleProgressBar.tsx` - Progress bar component
- [ ] `src/components/ModuleProgressBadge.tsx` - Badge showing percentage
- [ ] Update `src/routes/dashboard/classroom.tsx` to show progress on module cards

## UI/UX Requirements

- Progress bar showing percentage (0-100%)
- Percentage badge/text display
- Visual distinction between completed and in-progress modules
- Update in real-time when content is completed

## Acceptance Criteria

- [ ] Progress percentage calculated correctly
- [ ] Progress displayed on module cards
- [ ] Percentage updates when content is completed
- [ ] Visual progress indicators are clear
- [ ] 100% shows module as completed
