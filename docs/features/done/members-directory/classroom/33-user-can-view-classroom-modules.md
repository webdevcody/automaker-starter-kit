# 33 - User Can View Classroom Modules

## Priority: MEDIUM
## Dependencies: 29-create-classroom-module-table.md, 30-create-module-content-table.md, 31-admin-can-create-module.md, 32-admin-can-add-content-to-module.md
## Estimated Complexity: Medium-High
## Estimated Time: 6-8 hours

## Description
Display classroom modules in descending chronological order with their content.

## User Story
As a community member, I want to view classroom modules so that I can access educational content organized by weeks or topics.

## Database Schema
Uses existing tables from features 29 and 30.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/modules.ts`
  - `getPublishedModules()` - Fetch published modules ordered by order DESC
  - `getModuleById(moduleId)` - Fetch module with content
  - `getModuleContent(moduleId)` - Fetch content items ordered by position

### Server Functions
- [ ] `src/fn/modules.ts`
  - `getModulesFn` - GET endpoint (published only for non-admins)
  - `getModuleByIdFn` - GET single module with content

### Queries
- [ ] `src/queries/modules.ts`
  - `getModulesQuery(publishedOnly)` - Fetch modules
  - `getModuleByIdQuery(moduleId)` - Fetch single module

### Hooks
- [ ] `src/hooks/useModules.ts`
  - `useModules(publishedOnly)` - Hook for fetching modules
  - `useModule(moduleId)` - Hook for fetching single module

### Components
- [ ] `src/components/ModuleCard.tsx` - Module preview card
- [ ] `src/components/ModuleDetail.tsx` - Expanded module view
- [ ] `src/components/ModuleContentList.tsx` - List of content items
- [ ] `src/components/VideoContent.tsx` - Video player component
- [ ] `src/components/PDFContent.tsx` - PDF viewer component
- [ ] `src/components/ImageContent.tsx` - Image display
- [ ] `src/components/TaskContent.tsx` - Task display

### Routes
- [ ] `src/routes/classroom.tsx` - Classroom page

## UI/UX Requirements
- Modules listed newest first (descending order)
- Expandable/collapsible modules
- Content items displayed in order
- Video player for videos
- PDF viewer for PDFs
- Images displayed inline
- Responsive layout

## Acceptance Criteria
- [ ] Modules display in descending chronological order
- [ ] Only published modules visible to non-admins
- [ ] Content items display in correct order
- [ ] Videos play correctly
- [ ] PDFs display correctly
- [ ] Images display correctly
- [ ] Responsive design works

