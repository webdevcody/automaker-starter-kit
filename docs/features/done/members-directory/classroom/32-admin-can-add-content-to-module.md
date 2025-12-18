# 32 - Admin Can Add Content to Module

## Priority: MEDIUM
## Dependencies: 29-create-classroom-module-table.md, 30-create-module-content-table.md, 31-admin-can-create-module.md
## Estimated Complexity: Medium-High
## Estimated Time: 6-8 hours

## Description
Allow admins to add content items (videos, tasks, PDFs, images, text) to modules.

## User Story
As an admin, I want to add content items to modules so that I can create comprehensive learning materials with videos, tasks, and resources.

## Database Schema
Uses existing `module_content` table from feature 30.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/modules.ts`
  - `createModuleContent(moduleId, data)` - Insert content item
  - `getNextPosition(moduleId)` - Get next position for ordering
  - `getModuleContent(moduleId)` - Fetch all content for a module

### Server Functions
- [ ] `src/fn/modules.ts`
  - `createModuleContentFn` - POST endpoint
  - Middleware: authenticated user + admin check
  - Input validation: type, title (required), file upload handling
  - Handle file uploads for videos, PDFs, images

### Queries
- [ ] `src/queries/modules.ts`
  - `createModuleContentMutation` - TanStack Query mutation
  - `getModuleContentQuery(moduleId)` - Fetch module content

### Hooks
- [ ] `src/hooks/useModules.ts`
  - `useCreateModuleContent()` - Hook for creating content
  - `useModuleContent(moduleId)` - Hook for fetching content

### Components
- [ ] `src/components/AddContentDialog.tsx` - Modal for adding content
- [ ] `src/components/ContentForm.tsx` - Form with type selector, title, description, file upload
- [ ] `src/components/ContentTypeSelect.tsx` - Selector for content type
- [ ] Update module detail page to show "Add Content" button

## File Upload Integration
- Use R2 storage for videos, PDFs, images
- Generate presigned URLs
- Support multiple file types

## UI/UX Requirements
- Content type selector (video, task, image, PDF, text)
- Form fields based on type
- File upload for applicable types
- Position/order management
- Success notification

## Acceptance Criteria
- [ ] Admin can add content to modules
- [ ] Different content types supported
- [ ] File uploads work correctly
- [ ] Content items saved with correct position
- [ ] Content displays in module (after next feature)
- [ ] Success message appears

