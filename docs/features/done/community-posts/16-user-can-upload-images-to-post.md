# 16 - User Can Upload Images to Post

## Priority: MEDIUM
## Dependencies: 01-create-community-post-table.md, 15-create-post-attachment-table.md, 02-user-can-create-text-post.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Allow users to upload images when creating or editing posts.

## User Story
As a community member, I want to upload images with my posts so that I can share screenshots, photos, and visual content.

## Database Schema
Uses existing `post_attachment` table from feature 15.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/attachments.ts`
  - `createAttachment(postId, attachmentData)` - Save attachment record
  - `getPostAttachments(postId)` - Fetch attachments for a post

### Server Functions
- [ ] `src/fn/attachments.ts`
  - `uploadImageFn` - POST endpoint for image upload
  - Generate presigned URL for R2 upload
  - Save attachment record after upload
  - File validation: image types (jpg, png, gif, webp), max size

### Queries
- [ ] `src/queries/attachments.ts`
  - `uploadImageMutation` - TanStack Query mutation
  - `getPostAttachmentsQuery(postId)` - Fetch attachments

### Hooks
- [ ] `src/hooks/useAttachments.ts`
  - `useUploadImage()` - Hook for uploading images

### Components
- [ ] `src/components/ImageUpload.tsx` - Image upload component
- [ ] `src/components/PostAttachments.tsx` - Display attachments
- [ ] Update `PostForm.tsx` to include image upload
- [ ] Update `PostCard.tsx` to display images
- [ ] Update `PostDetail.tsx` to display images

## File Upload Integration
- Use existing R2 storage utilities
- Generate presigned URLs for upload
- Support: jpg, png, gif, webp
- Max file size: 5MB (configurable)
- Display images in post cards and detail view
- Image preview before upload

## UI/UX Requirements
- Upload button/area in post form
- Image preview after selection
- Multiple images per post
- Remove image before posting
- Loading state during upload
- Error handling for failed uploads
- Images display inline in posts

## Acceptance Criteria
- [ ] User can select image files
- [ ] Images upload to R2 storage
- [ ] Attachment records saved to database
- [ ] Images display in post cards
- [ ] Images display in post detail view
- [ ] Multiple images supported
- [ ] File size validation works
- [ ] File type validation works
- [ ] Error handling works

