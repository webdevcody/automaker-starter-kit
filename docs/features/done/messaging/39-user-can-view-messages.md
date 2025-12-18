# 39 - User Can View Messages

## Priority: MEDIUM
## Dependencies: 35-create-message-table.md, 37-user-can-send-message.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Display messages within a conversation in a chat interface.

## User Story
As a community member, I want to view messages in a conversation so that I can read the conversation history.

## Database Schema
Uses existing `message` table from feature 35.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/messages.ts`
  - `getMessages(conversationId, limit, offset)` - Fetch messages ordered by createdAt DESC
  - `getMessagesCount(conversationId)` - Get total count

### Server Functions
- [ ] `src/fn/messages.ts`
  - `getMessagesFn` - GET endpoint with pagination
  - Verify user is participant in conversation

### Queries
- [ ] `src/queries/messages.ts`
  - `getMessagesQuery(conversationId, pagination)` - Fetch messages

### Hooks
- [ ] `src/hooks/useMessages.ts`
  - `useMessages(conversationId, pagination)` - Hook for fetching messages

### Components
- [ ] `src/components/MessageList.tsx` - List of messages
- [ ] `src/components/MessageItem.tsx` - Single message bubble
- [ ] Update `ChatView.tsx` to display messages

## UI/UX Requirements
- Messages displayed in chronological order
- Distinguish own messages vs received (different styling)
- Show sender avatar, content, timestamp
- Scroll to bottom on load
- Load more messages (pagination)
- Group messages by date (optional)

## Acceptance Criteria
- [ ] Messages display in conversation
- [ ] Messages ordered correctly
- [ ] Own messages styled differently
- [ ] Timestamps display correctly
- [ ] Pagination works
- [ ] Only conversation participants can view messages

