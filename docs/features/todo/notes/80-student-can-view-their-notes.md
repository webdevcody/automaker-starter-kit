# 80 - Student Can View Their Notes

## Priority: LOW

## Dependencies: 79-student-can-create-note-on-content.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Display notes to students so they can review their notes.

## User Story

As a student, I want to view my notes so I can review what I've written.

## Database Schema

Uses existing `user_note` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/notes.ts`
  - `getUserNotes(userId)` - Get all user's notes
  - `getNoteById(noteId)` - Get single note
  - Include content/module info

### Server Functions

- [ ] `src/fn/notes.ts`
  - `getNotesFn` - GET endpoint
  - Filter by userId
  - Middleware: authenticated user

### Queries

- [ ] `src/queries/notes.ts`
  - `notesQuery` - Query for user notes

### Hooks

- [ ] `src/hooks/useNotes.ts`
  - `useNotes()` - Hook for getting notes

### Components

- [ ] `src/components/NoteCard.tsx` - Card showing note
- [ ] `src/components/NoteList.tsx` - List of notes
- [ ] `src/components/NotesPanel.tsx` - Sidebar panel for notes
- [ ] Add notes view to dashboard or profile

## UI/UX Requirements

- List of notes
- Show content/module context
- Note text displayed
- Created/updated timestamps
- Filter by module or content

## Acceptance Criteria

- [ ] Notes displayed to student
- [ ] Notes grouped by content/module
- [ ] Can see note context
- [ ] Only student can view their own notes
- [ ] Notes listed clearly
