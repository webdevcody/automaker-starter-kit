# 24 - User Can Add Portfolio Item

## Priority: MEDIUM
## Dependencies: 23-create-portfolio-item-table.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Allow users to add portfolio items to showcase projects they're building.

## User Story
As a community member, I want to add portfolio items to my profile so that I can showcase projects I'm working on.

## Database Schema
Uses existing `portfolio_item` table from feature 23.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/portfolio.ts`
  - `createPortfolioItem(userId, data)` - Insert portfolio item
  - `getUserPortfolioItems(userId)` - Fetch user's portfolio items

### Server Functions
- [ ] `src/fn/portfolio.ts`
  - `createPortfolioItemFn` - POST endpoint
  - Input validation: title (required), description, url, technologies
  - Handle image upload if included

### Queries
- [ ] `src/queries/portfolio.ts`
  - `createPortfolioItemMutation` - TanStack Query mutation
  - `getUserPortfolioItemsQuery(userId)` - Fetch portfolio items

### Hooks
- [ ] `src/hooks/usePortfolio.ts`
  - `useCreatePortfolioItem()` - Hook for creating items
  - `useUserPortfolioItems(userId)` - Hook for fetching items

### Components
- [ ] `src/components/PortfolioItemForm.tsx` - Form for adding portfolio item
- [ ] `src/components/PortfolioItemCard.tsx` - Display portfolio item
- [ ] `src/components/PortfolioGrid.tsx` - Grid of portfolio items
- [ ] Update profile page to include portfolio section

## File Upload Integration
- Image upload for portfolio item (use R2)
- Image preview
- Optional image

## UI/UX Requirements
- Form with title, description, URL, technologies fields
- Image upload (optional)
- Technologies as tags
- Save button
- Success notification
- Portfolio items display in grid on profile

## Acceptance Criteria
- [ ] User can create portfolio item
- [ ] Form validates required fields
- [ ] Image uploads work (if provided)
- [ ] Portfolio item saved to database
- [ ] Portfolio items display on profile
- [ ] Success message appears

