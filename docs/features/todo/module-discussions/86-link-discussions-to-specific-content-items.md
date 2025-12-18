# 86 - Link Discussions to Specific Content Items

## Priority: LOW

## Dependencies: 85-display-discussions-on-module-page.md

## Estimated Complexity: Low-Medium

## Estimated Time: 1-2 hours

## Description

Allow discussions to be linked to specific content items for better context.

## User Story

As a student, I want to ask questions about specific content items so others know what I'm referring to.

## Database Schema

Uses existing `module_discussion` table with `content_id` field.

## Implementation Tasks

### Data Access Layer

- [ ] `src/data-access/module-discussions.ts`
  - `getDiscussionsByContent(contentId)` - Get discussions for content item
  - Already supports content_id from feature 82

### Components

- [ ] Update `src/components/CreateModuleDiscussionDialog.tsx`
  - Add content item selector
  - Pre-select content if creating from content page
- [ ] `src/components/ContentDiscussionLink.tsx` - Show discussions for content
- [ ] Add "Ask about this content" button to content items

## UI/UX Requirements

- Content selector in discussion form
- Show linked content in discussion display
- Link from content item to its discussions
- Clear indication of what content discussion is about

## Acceptance Criteria

- [ ] Discussions can be linked to content items
- [ ] Content selector works
- [ ] Linked content displayed in discussions
- [ ] Can filter discussions by content
- [ ] Links work correctly
