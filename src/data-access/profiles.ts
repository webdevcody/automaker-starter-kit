import { eq } from "drizzle-orm";
import { database } from "~/db";
import {
  userProfile,
  user,
  type UserProfile,
  type CreateUserProfileData,
  type UpdateUserProfileData,
  type User,
} from "~/db/schema";

export type ProfileWithUser = UserProfile & {
  user: Pick<User, "id" | "name" | "image" | "createdAt">;
};

export type PublicProfile = {
  user: Pick<User, "id" | "name" | "image" | "createdAt">;
  profile: UserProfile | null;
};

/**
 * Get user profile by user ID
 * Creates profile if it doesn't exist (one-to-one mapping)
 */
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const [result] = await database
    .select()
    .from(userProfile)
    .where(eq(userProfile.id, userId))
    .limit(1);

  // If profile doesn't exist, create it (one-to-one mapping)
  if (!result) {
    try {
      const [newProfile] = await database
        .insert(userProfile)
        .values({
          id: userId,
          updatedAt: new Date(),
        })
        .returning();

      return newProfile;
    } catch (error: any) {
      // If insert fails (e.g., user doesn't exist), return null
      return null;
    }
  }

  return result;
}

/**
 * Get or create user profile - ensures profile exists
 */
export async function getOrCreateUserProfile(
  userId: string
): Promise<UserProfile | null> {
  // getUserProfile already handles creating the profile if it doesn't exist
  return getUserProfile(userId);
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<UserProfile> {
  // First ensure profile exists
  const profile = await getOrCreateUserProfile(userId);
  if (!profile) {
    throw new Error(
      "User profile table does not exist. Please run database migrations."
    );
  }

  // Then update it
  const [updated] = await database
    .update(userProfile)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userProfile.id, userId))
    .returning();

  return updated;
}

/**
 * Update user bio
 */
export async function updateUserBio(
  userId: string,
  bio: string | null
): Promise<UserProfile> {
  return updateUserProfile(userId, { bio });
}

/**
 * Get public profile with user info
 */
export async function getPublicProfile(
  userId: string
): Promise<PublicProfile | null> {
  // Get user first
  const [userData] = await database
    .select({
      id: user.id,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!userData) {
    return null;
  }

  // Get or create profile (lazily create if doesn't exist)
  const profile = await getOrCreateUserProfile(userId);

  // If profile doesn't exist (table not migrated), return basic profile
  if (!profile) {
    return {
      user: userData,
      profile: null,
    };
  }

  return {
    user: userData,
    profile,
  };
}
