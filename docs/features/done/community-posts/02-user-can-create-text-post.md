# 02 - User Can Create Text Post

## Priority: HIGH
## Dependencies: 01-create-community-post-table.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-6 hours

## Description
Allow authenticated users to create a text post in the community feed.

## User Story
As a community member, I want to create a text post so that I can share my thoughts and questions with the community.

## Database Schema
Uses existing `community_post` table from feature 01.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/posts.ts`
  - `createPost(userId, data)` - Insert new post into database

### Server Functions
- [ ] `src/fn/posts.ts`
  - `createPostFn` - POST endpoint with validation
  - Input validation: content (required, min 1 char), title (optional), category (optional)

### Queries
- [ ] `src/queries/posts.ts`
  - `createPostMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/usePosts.ts`
  - `useCreatePost()` - Hook for creating posts

### Components
- [ ] `src/components/CreatePostDialog.tsx` - Modal dialog for creating post
- [ ] `src/components/PostForm.tsx` - Form with title, content, category fields
- [ ] `src/components/CategorySelect.tsx` - Category dropdown/select

### Routes
- [ ] `src/routes/community.tsx` - Community page with "Create Post" button

## UI/UX Requirements
- "Write something" input field or button that opens modal
- Form fields: Content (required), Title (optional), Category (optional)
- Submit button
- Success toast notification
- Error handling
- Loading state during submission

## Acceptance Criteria
- [ ] User can click "Create Post" or "Write something"
- [ ] Modal/form opens
- [ ] User can enter post content
- [ ] User can optionally add title and category
- [ ] Post is saved to database
- [ ] Success message appears
- [ ] Post appears in feed (after refresh or refetch)
- [ ] Only authenticated users can create posts

