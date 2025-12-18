import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  createComment,
  findCommentById,
  findCommentByIdWithUser,
  findPostComments,
  findCommentReplies,
  updateComment,
  deleteComment,
  countPostComments,
} from "~/data-access/comments";
import { findPostById } from "~/data-access/posts";
import { createNotification } from "~/data-access/notifications";

export const createCommentFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      postId: z.string().min(1, "Post ID is required"),
      content: z
        .string()
        .min(1, "Comment content is required")
        .max(5000, "Comment must be less than 5000 characters"),
      parentCommentId: z.string().optional(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify the post exists and is not deleted
    const post = await findPostById(data.postId);
    if (!post || post.deletedAt) {
      throw new Error("Post not found");
    }

    // If replying to a comment, verify the parent exists
    if (data.parentCommentId) {
      const parentComment = await findCommentById(data.parentCommentId);
      if (!parentComment || parentComment.deletedAt) {
        throw new Error("Parent comment not found");
      }
    }

    const commentData = {
      id: crypto.randomUUID(),
      postId: data.postId,
      userId: context.userId,
      content: data.content,
      parentCommentId: data.parentCommentId || null,
    };

    const newComment = await createComment(commentData);

    // Create notifications
    try {
      if (data.parentCommentId) {
        // Replying to a comment - notify the comment author
        const parentComment = await findCommentByIdWithUser(
          data.parentCommentId
        );
        if (parentComment && parentComment.userId !== context.userId) {
          const contentPreview =
            data.content.length > 100
              ? data.content.substring(0, 100) + "..."
              : data.content;

          await createNotification({
            id: crypto.randomUUID(),
            userId: parentComment.userId,
            type: "comment-reply",
            title: "Someone replied to your comment",
            content: contentPreview,
            relatedId: data.postId,
            relatedType: "post",
            isRead: false,
            readAt: null,
          });
        }
      } else {
        // Replying to a post - notify the post author
        if (post.userId !== context.userId) {
          const contentPreview =
            data.content.length > 100
              ? data.content.substring(0, 100) + "..."
              : data.content;

          await createNotification({
            id: crypto.randomUUID(),
            userId: post.userId,
            type: "post-reply",
            title: "Someone commented on your post",
            content: contentPreview,
            relatedId: data.postId,
            relatedType: "post",
            isRead: false,
            readAt: null,
          });
        }
      }
    } catch (error) {
      // Don't fail the comment creation if notification fails
      console.error("Failed to create notification:", error);
    }

    return newComment;
  });

export const getPostCommentsFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      postId: z.string(),
      limit: z.number().optional().default(50),
      offset: z.number().optional().default(0),
    })
  )
  .handler(async ({ data }) => {
    return await findPostComments(data.postId, data.limit, data.offset);
  });

export const getCommentRepliesFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      commentId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return await findCommentReplies(data.commentId);
  });

export const updateCommentFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      id: z.string(),
      content: z
        .string()
        .min(1, "Comment content is required")
        .max(5000, "Comment must be less than 5000 characters"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { id, content } = data;

    // Verify the comment exists
    const existingComment = await findCommentById(id);
    if (!existingComment) {
      throw new Error("Comment not found");
    }

    // Verify user owns the comment
    if (existingComment.userId !== context.userId) {
      throw new Error("Unauthorized: You can only edit your own comments");
    }

    // Verify comment is not deleted
    if (existingComment.deletedAt) {
      throw new Error("Cannot edit a deleted comment");
    }

    const updatedComment = await updateComment(id, content);
    if (!updatedComment) {
      throw new Error("Failed to update comment");
    }

    return updatedComment;
  });

export const deleteCommentFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { id } = data;

    // Verify the comment exists
    const existingComment = await findCommentById(id);
    if (!existingComment) {
      throw new Error("Comment not found");
    }

    // Verify user owns the comment
    if (existingComment.userId !== context.userId) {
      throw new Error("Unauthorized: You can only delete your own comments");
    }

    // Soft delete the comment
    const deleted = await deleteComment(id);
    if (!deleted) {
      throw new Error("Failed to delete comment");
    }

    return { success: true };
  });

export const getPostCommentCountFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    return await countPostComments(data.postId);
  });
