import { database } from "~/db";
import {
  postAttachment,
  type PostAttachment,
  type CreatePostAttachmentData,
} from "~/db/schema";
import { eq, and, asc, inArray } from "drizzle-orm";

export async function createAttachment(
  data: CreatePostAttachmentData
): Promise<PostAttachment> {
  const [attachment] = await database
    .insert(postAttachment)
    .values(data)
    .returning();
  return attachment;
}

export async function createAttachments(
  attachments: CreatePostAttachmentData[]
): Promise<PostAttachment[]> {
  if (attachments.length === 0) return [];
  const result = await database
    .insert(postAttachment)
    .values(attachments)
    .returning();
  return result;
}

export async function findPostAttachments(
  postId: string
): Promise<PostAttachment[]> {
  return await database
    .select()
    .from(postAttachment)
    .where(eq(postAttachment.postId, postId))
    .orderBy(asc(postAttachment.position));
}

export async function findCommentAttachments(
  commentId: string
): Promise<PostAttachment[]> {
  return await database
    .select()
    .from(postAttachment)
    .where(eq(postAttachment.commentId, commentId))
    .orderBy(asc(postAttachment.position));
}

export async function findAttachmentsByPostIds(
  postIds: string[]
): Promise<PostAttachment[]> {
  if (postIds.length === 0) return [];
  return await database
    .select()
    .from(postAttachment)
    .where(inArray(postAttachment.postId, postIds))
    .orderBy(asc(postAttachment.position));
}

export async function findAttachmentsByCommentIds(
  commentIds: string[]
): Promise<PostAttachment[]> {
  if (commentIds.length === 0) return [];
  return await database
    .select()
    .from(postAttachment)
    .where(inArray(postAttachment.commentId, commentIds))
    .orderBy(asc(postAttachment.position));
}

export async function deleteAttachment(id: string): Promise<boolean> {
  const result = await database
    .delete(postAttachment)
    .where(eq(postAttachment.id, id))
    .returning();
  return result.length > 0;
}

export async function deletePostAttachments(postId: string): Promise<number> {
  const result = await database
    .delete(postAttachment)
    .where(eq(postAttachment.postId, postId))
    .returning();
  return result.length;
}

export async function deleteCommentAttachments(
  commentId: string
): Promise<number> {
  const result = await database
    .delete(postAttachment)
    .where(eq(postAttachment.commentId, commentId))
    .returning();
  return result.length;
}

export async function findAttachmentById(
  id: string
): Promise<PostAttachment | undefined> {
  const [attachment] = await database
    .select()
    .from(postAttachment)
    .where(eq(postAttachment.id, id))
    .limit(1);
  return attachment;
}
