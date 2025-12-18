# 17 - User Can Upload Videos to Post

## Priority: LOW
## Dependencies: 15-create-post-attachment-table.md, 16-user-can-upload-images-to-post.md
## Estimated Complexity: Medium
## Estimated Time: 5-6 hours

## Description
Allow users to upload videos when creating or editing posts.

## User Story
As a community member, I want to upload videos with my posts so that I can share video content, tutorials, and demonstrations.

## Database Schema
Uses existing `post_attachment` table from feature 15.

## Implementation Tasks

### Data Access Layer
- [ ] `src/data-access/attachments.ts`
  - Reuse `createAttachment` from feature 16
  - Add video-specific handling

### Server Functions
- [ ] `src/fn/attachments.ts`
  - `uploadVideoFn` - POST endpoint for video upload
  - Generate presigned URL for R2 upload
  - File validation: video types (mp4, webm), max size

### Queries
- [ ] `src/queries/attachments.ts`
  - `uploadVideoMutation` - TanStack Query mutation

### Hooks
- [ ] `src/hooks/useAttachments.ts`
  - `useUploadVideo()` - Hook for uploading videos

### Components
- [ ] `src/components/VideoUpload.tsx` - Video upload component
- [ ] `src/components/VideoPlayer.tsx` - Video player component
- [ ] Update `PostForm.tsx` to include video upload
- [ ] Update `PostAttachments.tsx` to display videos
- [ ] Update `PostCard.tsx` to show video thumbnail
- [ ] Update `PostDetail.tsx` to display video player

## File Upload Integration
- Use existing R2 storage utilities
- Generate presigned URLs for upload
- Support: mp4, webm
- Max file size: 100MB (configurable)
- Video player for playback
- Video thumbnail generation (optional)

## UI/UX Requirements
- Upload button/area in post form
- Video preview/thumbnail after selection
- Video player in post detail view
- Loading state during upload
- Progress indicator for large files
- Error handling for failed uploads

## Acceptance Criteria
- [ ] User can select video files
- [ ] Videos upload to R2 storage
- [ ] Attachment records saved to database
- [ ] Videos display with player in posts
- [ ] Video player works correctly
- [ ] File size validation works
- [ ] File type validation works
- [ ] Error handling works

