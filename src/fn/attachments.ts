import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import { getStorage } from "~/utils/storage";
import {
  createAttachments,
  findPostAttachments,
  findCommentAttachments,
  deleteAttachment,
  findAttachmentById,
} from "~/data-access/attachments";
import { findPostById } from "~/data-access/posts";
import { findCommentById } from "~/data-access/comments";
import type { AttachmentType } from "~/db/schema";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

function getAttachmentType(mimeType: string): AttachmentType | null {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return "image";
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return "video";
  return null;
}

function getMaxSize(type: AttachmentType): number {
  return type === "image" ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
}

export const getMediaUploadUrlFn = createServerFn({ method: "POST" })
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      fileName: z.string(),
      contentType: z.string(),
      fileSize: z.number(),
    })
  )
  .handler(async ({ data, context }) => {
    const userId = context.userId;
    const { fileName, contentType, fileSize } = data;

    const attachmentType = getAttachmentType(contentType);
    if (!attachmentType) {
      throw new Error(
        `Invalid file type: ${contentType}. Allowed: images (jpg, png, gif, webp) and videos (mp4, webm)`
      );
    }

    const maxSize = getMaxSize(attachmentType);
    if (fileSize > maxSize) {
      const maxSizeMB = Math.round(maxSize / 1024 / 1024);
      throw new Error(
        `File too large. Maximum ${attachmentType} size is ${maxSizeMB}MB`
      );
    }

    const fileExtension = fileName.split(".").pop() || "";
    const attachmentId = crypto.randomUUID();
    const fileKey = `attachments/${userId}/${attachmentId}.${fileExtension}`;

    const { storage } = getStorage();
    const presignedUrl = await storage.getPresignedUploadUrl(
      fileKey,
      contentType
    );

    return {
      presignedUrl,
      fileKey,
      attachmentId,
      attachmentType,
    };
  });

export const getAttachmentUrlFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      fileKey: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const { storage } = getStorage();
    const url = await storage.getPresignedUrl(data.fileKey);
    return { url };
  });

export const getMultipleAttachmentUrlsFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      fileKeys: z.array(z.string()),
    })
  )
  .handler(async ({ data }) => {
    const { storage } = getStorage();
    const urls: Record<string, string> = {};

    await Promise.all(
      data.fileKeys.map(async (fileKey) => {
        urls[fileKey] = await storage.getPresignedUrl(fileKey);
      })
    );

    return { urls };
  });

export const savePostAttachmentsFn = createServerFn({ method: "POST" })
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      postId: z.string(),
      attachments: z.array(
        z.object({
          id: z.string(),
          fileKey: z.string(),
          fileName: z.string(),
          fileSize: z.number(),
          mimeType: z.string(),
          type: z.enum(["image", "video"]),
          position: z.number(),
        })
      ),
    })
  )
  .handler(async ({ data, context }) => {
    const { postId, attachments } = data;

    const post = await findPostById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== context.userId) {
      throw new Error("Unauthorized");
    }

    const attachmentRecords = attachments.map((att) => ({
      id: att.id,
      postId,
      commentId: null,
      type: att.type,
      fileKey: att.fileKey,
      fileName: att.fileName,
      fileSize: att.fileSize,
      mimeType: att.mimeType,
      position: att.position,
    }));

    const created = await createAttachments(attachmentRecords);
    return created;
  });

export const saveCommentAttachmentsFn = createServerFn({ method: "POST" })
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      commentId: z.string(),
      attachments: z.array(
        z.object({
          id: z.string(),
          fileKey: z.string(),
          fileName: z.string(),
          fileSize: z.number(),
          mimeType: z.string(),
          type: z.enum(["image", "video"]),
          position: z.number(),
        })
      ),
    })
  )
  .handler(async ({ data, context }) => {
    const { commentId, attachments } = data;

    const comment = await findCommentById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== context.userId) {
      throw new Error("Unauthorized");
    }

    const attachmentRecords = attachments.map((att) => ({
      id: att.id,
      postId: null,
      commentId,
      type: att.type,
      fileKey: att.fileKey,
      fileName: att.fileName,
      fileSize: att.fileSize,
      mimeType: att.mimeType,
      position: att.position,
    }));

    const created = await createAttachments(attachmentRecords);
    return created;
  });

export const getPostAttachmentsFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    return await findPostAttachments(data.postId);
  });

export const getCommentAttachmentsFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ commentId: z.string() }))
  .handler(async ({ data }) => {
    return await findCommentAttachments(data.commentId);
  });

export const deleteAttachmentFn = createServerFn({ method: "POST" })
  .middleware([authenticatedMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const attachment = await findAttachmentById(data.id);
    if (!attachment) {
      throw new Error("Attachment not found");
    }

    // Verify ownership through post or comment
    if (attachment.postId) {
      const post = await findPostById(attachment.postId);
      if (!post || post.userId !== context.userId) {
        throw new Error("Unauthorized");
      }
    } else if (attachment.commentId) {
      const comment = await findCommentById(attachment.commentId);
      if (!comment || comment.userId !== context.userId) {
        throw new Error("Unauthorized");
      }
    }

    // Delete from storage
    const { storage } = getStorage();
    try {
      await storage.delete(attachment.fileKey);
    } catch {
      // Continue even if storage deletion fails
    }

    await deleteAttachment(data.id);
    return { success: true };
  });
