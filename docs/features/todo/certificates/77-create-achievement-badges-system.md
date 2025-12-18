# 77 - Create Achievement Badges System

## Priority: LOW

## Dependencies: 74-create-certificate-table.md

## Estimated Complexity: Medium

## Estimated Time: 2 hours

## Description

Create system for achievement badges that students can earn for various milestones.

## User Story

As a student, I want to earn badges for achievements so I feel motivated and recognized.

## Database Schema

### Migration

Extend `certificate` table or create `badge` table:

```sql
CREATE TABLE badge (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL, -- 'first-module', 'perfect-quiz', 'helpful-student', etc.
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  earned_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_badge_user_id ON badge(user_id);
CREATE INDEX idx_badge_type ON badge(badge_type);
```

## Implementation Tasks

### Database Schema

- [ ] `src/db/schema.ts`
  - Add `badge` table definition
  - Add relations to `user`
  - Add TypeScript types

### Data Access Layer

- [ ] `src/data-access/badges.ts`
  - `awardBadge(userId, badgeType)` - Award badge to user
  - `getUserBadges(userId)` - Get user's badges
  - `checkBadgeEligibility(userId, badgeType)` - Check if user qualifies

### Server Functions

- [ ] `src/fn/badges.ts`
  - `awardBadgeFn` - POST endpoint (admin or automated)
  - `getBadgesFn` - GET endpoint

### Business Logic

- [ ] `src/utils/badge-rules.ts`
  - Define badge types and rules
  - Check eligibility for badges
  - Auto-award badges based on achievements

### Queries

- [ ] `src/queries/badges.ts`
  - `badgesQuery` - Query for user badges
  - `awardBadgeMutation` - Mutation for awarding

### Hooks

- [ ] `src/hooks/useBadges.ts`
  - `useBadges()` - Hook for getting badges
  - `useAwardBadge()` - Hook for awarding (admin)

### Components

- [ ] `src/components/BadgeCard.tsx` - Display badge
- [ ] `src/components/BadgeList.tsx` - List of badges
- [ ] `src/components/BadgeDisplay.tsx` - Show badges on profile
- [ ] Add badges to user profile

## UI/UX Requirements

- Badge icons/images
- Badge titles and descriptions
- Earned date
- Display on profile
- Visual celebration when earned

## Acceptance Criteria

- [ ] Badge table created
- [ ] Badges can be awarded
- [ ] Badges displayed on profile
- [ ] Auto-awarding works for achievements
- [ ] Badges are visually appealing
