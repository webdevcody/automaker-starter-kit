# 81 - Student Can Edit and Delete Notes

## Priority: LOW

## Dependencies: 80-student-can-view-their-notes.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Allow students to edit and delete their notes.

## User Story

As a student, I want to edit and delete my notes so I can keep them up to date.

## Database Schema

Uses existing `user_note` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/notes.ts`
  - `updateNote(noteId, userId, noteText)` - Update note
  - `deleteNote(noteId, userId)` - Delete note
  - Verify ownership before update/delete

### Server Functions

- [ ] `src/fn/notes.ts`
  - `updateNoteFn` - PUT/PATCH endpoint
  - `deleteNoteFn` - DELETE endpoint
  - Middleware: authenticated user
  - Verify user owns note

### Queries

- [ ] `src/queries/notes.ts`
  - `updateNoteMutation` - TanStack Query mutation
  - `deleteNoteMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useNotes.ts`
  - `useUpdateNote()` - Hook for updating
  - `useDeleteNote()` - Hook for deleting

### Components

- [ ] Update `src/components/NoteEditor.tsx` to support editing
- [ ] Add edit button to note cards
- [ ] Add delete button with confirmation
- [ ] Update note list after edit/delete

## UI/UX Requirements

- Edit button on notes
- Delete button with confirmation dialog
- Update note text
- Success feedback
- Error handling

## Acceptance Criteria

- [ ] Student can edit notes
- [ ] Student can delete notes
- [ ] Only owner can edit/delete
- [ ] Changes saved correctly
- [ ] Confirmation for delete
- [ ] UI updates after changes
