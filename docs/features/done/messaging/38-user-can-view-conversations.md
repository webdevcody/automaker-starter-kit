# 38 - User Can View Conversations

## Priority: MEDIUM
## Dependencies: 34-create-conversation-table.md, 35-create-message-table.md, 37-user-can-send-message.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Display list of user's conversations with last message preview.

## User Story
As a community member, I want to see all my conversations so that I can navigate between different message threads.

## Database Schema
Uses existing `conversation` table from feature 34.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/conversations.ts`
  - `getUserConversations(userId)` - Fetch all conversations for user
  - Include last message preview
  - Order by lastMessageAt DESC

### Server Functions
- [ ] `src/fn/conversations.ts`
  - `getConversationsFn` - GET endpoint
  - Returns conversations with last message preview

### Queries
- [ ] `src/queries/conversations.ts`
  - `getConversationsQuery(userId)` - Fetch conversations

### Hooks
- [ ] `src/hooks/useConversations.ts`
  - `useConversations()` - Hook for fetching conversations

### Components
- [ ] `src/components/ConversationList.tsx` - Sidebar with conversations
- [ ] `src/components/ConversationItem.tsx` - Single conversation preview
- [ ] Update messages page to show conversation list

## UI/UX Requirements
- List of conversations in sidebar
- Show other participant's name/avatar
- Show last message preview
- Show timestamp
- Show unread indicator (future feature)
- Click conversation to open chat
- Responsive: mobile shows list or chat, not both

## Acceptance Criteria
- [ ] User sees all their conversations
- [ ] Conversations ordered by last message time
- [ ] Last message preview displays
- [ ] Clicking conversation opens chat
- [ ] Other participant's info displays correctly
- [ ] Empty state when no conversations

