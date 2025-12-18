import { ilike, desc, count } from "drizzle-orm";
import { database } from "~/db";
import { user, type User } from "~/db/schema";

export type MemberWithUser = Pick<User, "id" | "name" | "image" | "createdAt">;

export interface MemberFilters {
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export async function getAllMembers(
  filters: MemberFilters = {}
): Promise<MemberWithUser[]> {
  const { searchQuery, limit = 50, offset = 0 } = filters;

  const baseQuery = database
    .select({
      id: user.id,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user);

  // Apply search filter if provided (search by name only)
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = `%${searchQuery.trim()}%`;
    const results = await baseQuery
      .where(ilike(user.name, searchTerm))
      .orderBy(desc(user.createdAt))
      .limit(limit)
      .offset(offset);
    return results;
  }

  // No search filter - return all members
  const results = await baseQuery
    .orderBy(desc(user.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

export async function getMembersCount(
  filters: MemberFilters = {}
): Promise<number> {
  const { searchQuery } = filters;

  if (searchQuery && searchQuery.trim()) {
    const searchTerm = `%${searchQuery.trim()}%`;
    const results = await database
      .select({ count: count() })
      .from(user)
      .where(ilike(user.name, searchTerm));
    return results[0]?.count || 0;
  }

  // No search filter - return total count
  const results = await database
    .select({ count: count() })
    .from(user);
  
  return results[0]?.count || 0;
}

