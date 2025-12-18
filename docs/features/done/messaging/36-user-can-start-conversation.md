# 36 - User Can Start Conversation

## Priority: MEDIUM
## Dependencies: 34-create-conversation-table.md, 35-create-message-table.md, 25-user-can-view-public-profile.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-5 hours

## Description
Allow users to start a new conversation with another member (typically from their profile).

## User Story
As a community member, I want to start a conversation with another member so that I can send them private messages.

## Database Schema
Uses existing `conversation` table from feature 34.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/conversations.ts`
  - `getOrCreateConversation(userId1, userId2)` - Get existing or create new conversation
  - Check if conversation exists between two users
  - Create if doesn't exist

### Server Functions
- [ ] `src/fn/conversations.ts`
  - `getOrCreateConversationFn` - POST endpoint
  - Middleware: authenticated user
  - Input: otherUserId
  - Returns conversation ID

### Queries
- [ ] `src/queries/conversations.ts`
  - `getOrCreateConversationMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useConversations.ts`
  - `useStartConversation()` - Hook for starting conversation

### Components
- [ ] `src/components/StartConversationButton.tsx` - Button on profile to start chat
- [ ] Update `ProfileView.tsx` to include "Send Message" button

## UI/UX Requirements
- "Send Message" button on user profiles
- Clicking button creates/finds conversation
- Navigate to messages page with conversation open
- Success feedback

## Acceptance Criteria
- [ ] User can click "Send Message" on profile
- [ ] Conversation is created if doesn't exist
- [ ] Existing conversation is found if exists
- [ ] User navigates to messages page
- [ ] Cannot start conversation with self
- [ ] Only authenticated users can start conversations

