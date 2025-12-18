# 79 - Student Can Create Note on Content

## Priority: LOW

## Dependencies: 78-create-user-note-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Allow students to create notes on content items.

## User Story

As a student, I want to take notes on content items so I can remember important information.

## Database Schema

Uses existing `user_note` table.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/notes.ts`
  - `createNote(userId, contentId, noteText)` - Insert note
  - `getNotesByContent(userId, contentId)` - Get notes for content

### Server Functions

- [ ] `src/fn/notes.ts`
  - `createNoteFn` - POST endpoint
  - Middleware: authenticated user
  - Validation: noteText required

### Queries

- [ ] `src/queries/notes.ts`
  - `createNoteMutation` - TanStack Query mutation

### Hooks

- [ ] `src/hooks/useNotes.ts`
  - `useCreateNote()` - Hook for creating notes

### Components

- [ ] `src/components/NoteEditor.tsx` - Component for creating/editing notes
- [ ] `src/components/NoteButton.tsx` - Button to open note editor
- [ ] Add note button to content items in classroom view

## UI/UX Requirements

- Textarea for note text
- Save button
- Note indicator on content items
- Success feedback

## Acceptance Criteria

- [ ] Student can create note
- [ ] Note saved to database
- [ ] Note linked to content item
- [ ] Success feedback shown
- [ ] Only authenticated users can create notes
