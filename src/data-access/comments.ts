import { eq, desc, isNull, and } from "drizzle-orm";
import { database } from "~/db";
import {
  postComment,
  user,
  type PostComment,
  type CreatePostCommentData,
  type User,
} from "~/db/schema";

export type CommentWithUser = PostComment & {
  user: Pick<User, "id" | "name" | "image">;
};

export async function createComment(
  commentData: CreatePostCommentData
): Promise<PostComment> {
  const [newComment] = await database
    .insert(postComment)
    .values({
      ...commentData,
      updatedAt: new Date(),
    })
    .returning();

  return newComment;
}

export async function findCommentById(id: string): Promise<PostComment | null> {
  const [result] = await database
    .select()
    .from(postComment)
    .where(eq(postComment.id, id))
    .limit(1);

  return result || null;
}

export async function findCommentByIdWithUser(
  id: string
): Promise<CommentWithUser | null> {
  const [result] = await database
    .select({
      id: postComment.id,
      postId: postComment.postId,
      userId: postComment.userId,
      content: postComment.content,
      parentCommentId: postComment.parentCommentId,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
      deletedAt: postComment.deletedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(postComment)
    .innerJoin(user, eq(postComment.userId, user.id))
    .where(eq(postComment.id, id))
    .limit(1);

  return result || null;
}

export async function findPostComments(
  postId: string,
  limit: number = 50,
  offset: number = 0
): Promise<CommentWithUser[]> {
  const results = await database
    .select({
      id: postComment.id,
      postId: postComment.postId,
      userId: postComment.userId,
      content: postComment.content,
      parentCommentId: postComment.parentCommentId,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
      deletedAt: postComment.deletedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(postComment)
    .innerJoin(user, eq(postComment.userId, user.id))
    .where(
      and(
        eq(postComment.postId, postId),
        isNull(postComment.deletedAt),
        isNull(postComment.parentCommentId)
      )
    )
    .orderBy(desc(postComment.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

export async function findCommentReplies(
  parentCommentId: string
): Promise<CommentWithUser[]> {
  const results = await database
    .select({
      id: postComment.id,
      postId: postComment.postId,
      userId: postComment.userId,
      content: postComment.content,
      parentCommentId: postComment.parentCommentId,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
      deletedAt: postComment.deletedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(postComment)
    .innerJoin(user, eq(postComment.userId, user.id))
    .where(
      and(
        eq(postComment.parentCommentId, parentCommentId),
        isNull(postComment.deletedAt)
      )
    )
    .orderBy(desc(postComment.createdAt));

  return results;
}

export async function updateComment(
  commentId: string,
  content: string
): Promise<PostComment | null> {
  const [updated] = await database
    .update(postComment)
    .set({
      content,
      updatedAt: new Date(),
    })
    .where(eq(postComment.id, commentId))
    .returning();

  return updated || null;
}

export async function deleteComment(commentId: string): Promise<boolean> {
  const [updated] = await database
    .update(postComment)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(postComment.id, commentId))
    .returning();

  return updated !== undefined;
}

export async function countPostComments(postId: string): Promise<number> {
  const results = await database
    .select({ id: postComment.id })
    .from(postComment)
    .where(
      and(
        eq(postComment.postId, postId),
        isNull(postComment.deletedAt)
      )
    );

  return results.length;
}
