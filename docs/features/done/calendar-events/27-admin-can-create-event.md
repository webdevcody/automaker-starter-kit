# 27 - Admin Can Create Event

## Priority: MEDIUM
## Dependencies: 26-create-event-table.md
## Estimated Complexity: Medium
## Estimated Time: 4-5 hours

## Description
Allow admins to create events for the community calendar.

## User Story
As an admin, I want to create events so that community members can see upcoming sessions, workshops, and important dates.

## Database Schema
Uses existing `event` table from feature 26.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/events.ts`
  - `createEvent(userId, data)` - Insert new event

### Server Functions
- [ ] `src/fn/events.ts`
  - `createEventFn` - POST endpoint
  - Middleware: authenticated user + admin check
  - Input validation: title (required), startTime (required), endTime (optional), eventLink (optional)

### Queries
- [ ] `src/queries/events.ts`
  - `createEventMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useEvents.ts`
  - `useCreateEvent()` - Hook for creating events

### Components
- [ ] `src/components/CreateEventDialog.tsx` - Modal for creating event
- [ ] `src/components/EventForm.tsx` - Form with title, description, date/time, link fields
- [ ] Add "Create Event" button to calendar page (admin only)

## UI/UX Requirements
- Form with title, description, start time, end time, event link fields
- Date/time picker
- Event type selector
- Save button
- Success notification
- Validation for required fields

## Acceptance Criteria
- [ ] Admin can access create event form
- [ ] Form validates required fields
- [ ] Event is saved to database
- [ ] Success message appears
- [ ] Non-admins cannot create events
- [ ] Event appears in calendar (after next feature)

