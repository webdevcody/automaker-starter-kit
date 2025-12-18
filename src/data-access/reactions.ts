import { eq, and, count, isNotNull } from "drizzle-orm";
import { database } from "~/db";
import { postReaction, type CreatePostReactionData } from "~/db/schema";

// Post reactions
export async function createPostReaction(data: CreatePostReactionData) {
  const [newReaction] = await database
    .insert(postReaction)
    .values(data)
    .returning();
  return newReaction;
}

export async function deletePostReaction(userId: string, postId: string) {
  const [deletedReaction] = await database
    .delete(postReaction)
    .where(
      and(eq(postReaction.userId, userId), eq(postReaction.postId, postId))
    )
    .returning();
  return deletedReaction;
}

export async function findPostReactionByUserAndPost(
  userId: string,
  postId: string
) {
  const [existingReaction] = await database
    .select()
    .from(postReaction)
    .where(
      and(eq(postReaction.userId, userId), eq(postReaction.postId, postId))
    )
    .limit(1);
  return existingReaction;
}

export async function getPostReactionCount(postId: string) {
  const [result] = await database
    .select({ count: count() })
    .from(postReaction)
    .where(
      and(eq(postReaction.postId, postId), isNotNull(postReaction.postId))
    );
  return result?.count || 0;
}

// Comment reactions
export async function createCommentReaction(data: CreatePostReactionData) {
  const [newReaction] = await database
    .insert(postReaction)
    .values(data)
    .returning();
  return newReaction;
}

export async function deleteCommentReaction(userId: string, commentId: string) {
  const [deletedReaction] = await database
    .delete(postReaction)
    .where(
      and(
        eq(postReaction.userId, userId),
        eq(postReaction.commentId, commentId)
      )
    )
    .returning();
  return deletedReaction;
}

export async function findCommentReactionByUserAndComment(
  userId: string,
  commentId: string
) {
  const [existingReaction] = await database
    .select()
    .from(postReaction)
    .where(
      and(
        eq(postReaction.userId, userId),
        eq(postReaction.commentId, commentId)
      )
    )
    .limit(1);
  return existingReaction;
}

export async function getCommentReactionCount(commentId: string) {
  const [result] = await database
    .select({ count: count() })
    .from(postReaction)
    .where(
      and(
        eq(postReaction.commentId, commentId),
        isNotNull(postReaction.commentId)
      )
    );
  return result?.count || 0;
}
