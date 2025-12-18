# 31 - Admin Can Create Module

## Priority: MEDIUM
## Dependencies: 29-create-classroom-module-table.md
## Estimated Complexity: Low-Medium
## Estimated Time: 4-5 hours

## Description
Allow admins to create classroom modules (e.g., "Week 5").

## User Story
As an admin, I want to create modules so that I can organize educational content by weeks or topics.

## Database Schema
Uses existing `classroom_module` table from feature 29.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/modules.ts`
  - `createModule(userId, data)` - Insert new module
  - `getNextOrder()` - Get next order number for chronological ordering

### Server Functions
- [ ] `src/fn/modules.ts`
  - `createModuleFn` - POST endpoint
  - Middleware: authenticated user + admin check
  - Input validation: title (required), description (optional), order (auto-calculated or provided)

### Queries
- [ ] `src/queries/modules.ts`
  - `createModuleMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useModules.ts`
  - `useCreateModule()` - Hook for creating modules

### Components
- [ ] `src/components/CreateModuleDialog.tsx` - Modal for creating module
- [ ] `src/components/ModuleForm.tsx` - Form with title, description fields
- [ ] Add "Create Module" button to classroom page (admin only)

## UI/UX Requirements
- Form with title, description fields
- Order auto-calculated (newest = highest order)
- Save button
- Success notification
- Module appears in list (after next feature)

## Acceptance Criteria
- [ ] Admin can access create module form
- [ ] Form validates required fields
- [ ] Module is saved to database
- [ ] Order is set correctly (descending chronological)
- [ ] Success message appears
- [ ] Non-admins cannot create modules

