# 28 - User Can View Calendar Events

## Priority: MEDIUM
## Dependencies: 26-create-event-table.md, 27-admin-can-create-event.md
## Estimated Complexity: Medium-High
## Estimated Time: 6-8 hours

## Description
Display events on a calendar view. Users can see events and click to view details in a modal.

## User Story
As a community member, I want to view events on a calendar so that I can see upcoming sessions and important dates.

## Database Schema
Uses existing `event` table from feature 26.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/events.ts`
  - `getEvents(dateRange)` - Fetch events for date range
  - `getEventById(eventId)` - Fetch single event
  - `getUpcomingEvents(limit)` - Fetch next N upcoming events

### Server Functions
- [ ] `src/fn/events.ts`
  - `getEventsFn` - GET endpoint with date range filters
  - `getEventByIdFn` - GET single event

### Queries
- [ ] `src/queries/events.ts`
  - `getEventsQuery(dateRange)` - Fetch events
  - `getEventByIdQuery(eventId)` - Fetch single event

### Hooks
- [ ] `src/hooks/useEvents.ts`
  - `useEvents(dateRange)` - Hook for fetching events

### Components
- [ ] `src/components/Calendar.tsx` - Calendar grid component
- [ ] `src/components/CalendarEvent.tsx` - Event marker on calendar
- [ ] `src/components/EventModal.tsx` - Modal showing event details
- [ ] `src/components/EventList.tsx` - List view of events (optional)

### Routes
- [ ] `src/routes/calendar.tsx` - Calendar page

## Calendar Library
Consider using:
- `react-calendar` (simple)
- `@fullcalendar/react` (feature-rich)
- Custom implementation

## UI/UX Requirements
- Monthly calendar grid
- Events displayed on dates
- Click event to open modal
- Modal shows: title, date/time, description, join link button
- Navigation between months
- Today highlighted
- Responsive design

## Acceptance Criteria
- [ ] Calendar displays current month
- [ ] Events appear on correct dates
- [ ] Clicking event opens modal
- [ ] Modal shows all event details
- [ ] Join link button works
- [ ] Calendar navigation works
- [ ] Responsive design works

