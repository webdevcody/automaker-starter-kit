import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  createPostReaction,
  deletePostReaction,
  findPostReactionByUserAndPost,
  getPostReactionCount,
  createCommentReaction,
  deleteCommentReaction,
  findCommentReactionByUserAndComment,
  getCommentReactionCount,
} from "~/data-access/reactions";

// Post Reactions

export const togglePostReactionFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ postId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { postId } = data;
    const userId = context.userId;

    // Check if reaction already exists
    const existingReaction = await findPostReactionByUserAndPost(
      userId,
      postId
    );

    if (existingReaction) {
      // Remove reaction
      await deletePostReaction(userId, postId);
      const reactionCount = await getPostReactionCount(postId);
      return { isLiked: false, likeCount: reactionCount };
    } else {
      // Add reaction
      await createPostReaction({
        id: crypto.randomUUID(),
        userId,
        postId,
        type: "like",
      });
      const reactionCount = await getPostReactionCount(postId);
      return { isLiked: true, likeCount: reactionCount };
    }
  });

export const getPostReactionStatusFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ postId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { postId } = data;
    const userId = context.userId;

    const existingReaction = await findPostReactionByUserAndPost(
      userId,
      postId
    );
    const reactionCount = await getPostReactionCount(postId);

    return {
      isLiked: !!existingReaction,
      likeCount: reactionCount,
    };
  });

export const getPostLikeCountFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    const { postId } = data;
    const likeCount = await getPostReactionCount(postId);
    return { likeCount };
  });

// Comment Reactions

export const toggleCommentReactionFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ commentId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { commentId } = data;
    const userId = context.userId;

    // Check if reaction already exists
    const existingReaction = await findCommentReactionByUserAndComment(
      userId,
      commentId
    );

    if (existingReaction) {
      // Remove reaction
      await deleteCommentReaction(userId, commentId);
      const reactionCount = await getCommentReactionCount(commentId);
      return { isLiked: false, likeCount: reactionCount };
    } else {
      // Add reaction
      await createCommentReaction({
        id: crypto.randomUUID(),
        userId,
        commentId,
        type: "like",
      });
      const reactionCount = await getCommentReactionCount(commentId);
      return { isLiked: true, likeCount: reactionCount };
    }
  });

export const getCommentReactionStatusFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ commentId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { commentId } = data;
    const userId = context.userId;

    const existingReaction = await findCommentReactionByUserAndComment(
      userId,
      commentId
    );
    const reactionCount = await getCommentReactionCount(commentId);

    return {
      isLiked: !!existingReaction,
      likeCount: reactionCount,
    };
  });

export const getCommentLikeCountFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ commentId: z.string() }))
  .handler(async ({ data }) => {
    const { commentId } = data;
    const likeCount = await getCommentReactionCount(commentId);
    return { likeCount };
  });
