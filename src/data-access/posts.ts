import { eq, desc, isNull, and } from "drizzle-orm";
import { database } from "~/db";
import {
  communityPost,
  user,
  type CommunityPost,
  type CreateCommunityPostData,
  type User,
} from "~/db/schema";

export type PostWithUser = CommunityPost & {
  user: Pick<User, "id" | "name" | "image">;
};

export async function createPost(
  postData: CreateCommunityPostData
): Promise<CommunityPost> {
  const [newPost] = await database
    .insert(communityPost)
    .values({
      ...postData,
      updatedAt: new Date(),
    })
    .returning();

  return newPost;
}

export async function findPostById(id: string): Promise<CommunityPost | null> {
  const [result] = await database
    .select()
    .from(communityPost)
    .where(eq(communityPost.id, id))
    .limit(1);

  return result || null;
}

export async function findPostByIdWithUser(
  id: string
): Promise<PostWithUser | null> {
  const [result] = await database
    .select({
      id: communityPost.id,
      title: communityPost.title,
      content: communityPost.content,
      category: communityPost.category,
      isPinned: communityPost.isPinned,
      isQuestion: communityPost.isQuestion,
      userId: communityPost.userId,
      createdAt: communityPost.createdAt,
      updatedAt: communityPost.updatedAt,
      deletedAt: communityPost.deletedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(communityPost)
    .innerJoin(user, eq(communityPost.userId, user.id))
    .where(eq(communityPost.id, id))
    .limit(1);

  return result || null;
}

export async function findRecentPosts(
  limit: number = 20,
  category?: string
): Promise<PostWithUser[]> {
  const whereConditions = category
    ? and(isNull(communityPost.deletedAt), eq(communityPost.category, category))
    : isNull(communityPost.deletedAt);

  const results = await database
    .select({
      id: communityPost.id,
      title: communityPost.title,
      content: communityPost.content,
      category: communityPost.category,
      isPinned: communityPost.isPinned,
      isQuestion: communityPost.isQuestion,
      userId: communityPost.userId,
      createdAt: communityPost.createdAt,
      updatedAt: communityPost.updatedAt,
      deletedAt: communityPost.deletedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(communityPost)
    .innerJoin(user, eq(communityPost.userId, user.id))
    .where(whereConditions)
    .orderBy(desc(communityPost.isPinned), desc(communityPost.createdAt))
    .limit(limit);

  return results;
}

export async function findPostsByUserId(
  userId: string
): Promise<CommunityPost[]> {
  return await database
    .select()
    .from(communityPost)
    .where(eq(communityPost.userId, userId))
    .orderBy(desc(communityPost.createdAt));
}

export async function updatePost(
  postId: string,
  data: {
    title?: string | null;
    content: string;
    category?: string;
  }
): Promise<CommunityPost | null> {
  // Get existing post to preserve category if not provided
  const existingPost = await findPostById(postId);
  if (!existingPost) {
    return null;
  }

  // Update the post
  const [updated] = await database
    .update(communityPost)
    .set({
      title: data.title || null,
      content: data.content,
      category: data.category || existingPost.category,
      updatedAt: new Date(),
    })
    .where(eq(communityPost.id, postId))
    .returning();

  return updated || null;
}

export async function deletePost(postId: string): Promise<boolean> {
  // Soft delete by setting deletedAt timestamp
  const [updated] = await database
    .update(communityPost)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(communityPost.id, postId))
    .returning();

  return updated !== undefined;
}

export async function pinPost(
  postId: string,
  isPinned: boolean
): Promise<CommunityPost | null> {
  const [updated] = await database
    .update(communityPost)
    .set({
      isPinned,
      updatedAt: new Date(),
    })
    .where(eq(communityPost.id, postId))
    .returning();

  return updated || null;
}
