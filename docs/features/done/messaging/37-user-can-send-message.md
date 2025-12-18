# 37 - User Can Send Message

## Priority: MEDIUM
## Dependencies: 34-create-conversation-table.md, 35-create-message-table.md, 36-user-can-start-conversation.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Allow users to send messages within a conversation.

## User Story
As a community member, I want to send messages in a conversation so that I can communicate privately with other members.

## Database Schema
Uses existing `message` table from feature 35.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/messages.ts`
  - `createMessage(conversationId, senderId, content)` - Insert new message
  - `updateConversationLastMessage(conversationId)` - Update lastMessageAt

### Server Functions
- [ ] `src/fn/messages.ts`
  - `sendMessageFn` - POST endpoint
  - Middleware: authenticated user
  - Verify user is participant in conversation
  - Input validation: content (required, min 1 char)

### Queries
- [ ] `src/queries/messages.ts`
  - `sendMessageMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useMessages.ts`
  - `useSendMessage()` - Hook for sending messages

### Components
- [ ] `src/components/MessageInput.tsx` - Input field for typing message
- [ ] `src/components/ChatView.tsx` - Chat interface
- [ ] Update messages page to include chat view

## UI/UX Requirements
- Message input at bottom of chat
- Send button or Enter to send
- Messages display in chat view
- Show sender, content, timestamp
- Scroll to bottom on new message
- Loading state during send
- Optimistic UI update

## Acceptance Criteria
- [ ] User can type message
- [ ] Message is saved to database
- [ ] Message appears in chat immediately
- [ ] Conversation lastMessageAt updates
- [ ] Only conversation participants can send messages
- [ ] Message shows sender and timestamp
- [ ] Enter key sends message

