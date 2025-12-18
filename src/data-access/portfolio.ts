import { eq, desc } from "drizzle-orm";
import { database } from "~/db";
import {
  portfolioItem,
  type PortfolioItem,
  type CreatePortfolioItemData,
  type UpdatePortfolioItemData,
} from "~/db/schema";

/**
 * Create a new portfolio item
 */
export async function createPortfolioItem(
  data: CreatePortfolioItemData
): Promise<PortfolioItem> {
  const [newItem] = await database
    .insert(portfolioItem)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return newItem;
}

/**
 * Get portfolio item by ID
 */
export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const [result] = await database
    .select()
    .from(portfolioItem)
    .where(eq(portfolioItem.id, id))
    .limit(1);

  return result || null;
}

/**
 * Get all portfolio items for a user
 */
export async function getUserPortfolioItems(userId: string): Promise<PortfolioItem[]> {
  return database
    .select()
    .from(portfolioItem)
    .where(eq(portfolioItem.userId, userId))
    .orderBy(desc(portfolioItem.createdAt));
}

/**
 * Update a portfolio item
 */
export async function updatePortfolioItem(
  id: string,
  data: UpdatePortfolioItemData
): Promise<PortfolioItem | null> {
  const [updated] = await database
    .update(portfolioItem)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(portfolioItem.id, id))
    .returning();

  return updated || null;
}

/**
 * Delete a portfolio item
 */
export async function deletePortfolioItem(id: string): Promise<boolean> {
  const [deleted] = await database
    .delete(portfolioItem)
    .where(eq(portfolioItem.id, id))
    .returning();

  return deleted !== undefined;
}

/**
 * Check if user owns portfolio item
 */
export async function userOwnsPortfolioItem(
  userId: string,
  itemId: string
): Promise<boolean> {
  const item = await getPortfolioItemById(itemId);
  return item?.userId === userId;
}
