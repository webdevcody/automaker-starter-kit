import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  createPortfolioItem,
  getPortfolioItemById,
  getUserPortfolioItems,
  updatePortfolioItem,
  deletePortfolioItem,
  userOwnsPortfolioItem,
} from "~/data-access/portfolio";

/**
 * Get current user's portfolio items
 */
export const getMyPortfolioItemsFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const items = await getUserPortfolioItems(context.userId);
    return items;
  });

/**
 * Get portfolio items for a specific user (no authentication required)
 */
export const getUserPortfolioItemsFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const items = await getUserPortfolioItems(data.userId);
    return items;
  });

/**
 * Create a new portfolio item
 */
export const createPortfolioItemFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      title: z.string().min(1).max(100),
      description: z.string().max(1000).optional().nullable(),
      imageKey: z.string().optional().nullable(),
      url: z.string().url().optional().nullable().or(z.literal("")),
      technologies: z.array(z.string().max(50)).max(10).optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const item = await createPortfolioItem({
      id: crypto.randomUUID(),
      userId: context.userId,
      title: data.title,
      description: data.description ?? null,
      imageKey: data.imageKey ?? null,
      url: data.url === "" ? null : data.url ?? null,
      technologies: data.technologies ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return item;
  });

/**
 * Update a portfolio item
 */
export const updatePortfolioItemFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      id: z.string(),
      title: z.string().min(1).max(100).optional(),
      description: z.string().max(1000).optional().nullable(),
      imageKey: z.string().optional().nullable(),
      url: z.string().url().optional().nullable().or(z.literal("")),
      technologies: z.array(z.string().max(50)).max(10).optional(),
    })
  )
  .handler(async ({ data, context }) => {
    // Verify ownership
    const owns = await userOwnsPortfolioItem(context.userId, data.id);
    if (!owns) {
      throw new Error("You can only edit your own portfolio items");
    }

    const { id, ...updateData } = data;
    const cleanedData = {
      ...updateData,
      url: updateData.url === "" ? null : updateData.url,
    };

    const item = await updatePortfolioItem(id, cleanedData);
    if (!item) {
      throw new Error("Portfolio item not found");
    }

    return item;
  });

/**
 * Delete a portfolio item
 */
export const deletePortfolioItemFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    // Verify ownership
    const owns = await userOwnsPortfolioItem(context.userId, data.id);
    if (!owns) {
      throw new Error("You can only delete your own portfolio items");
    }

    const deleted = await deletePortfolioItem(data.id);
    if (!deleted) {
      throw new Error("Portfolio item not found");
    }

    return { success: true };
  });

/**
 * Get a single portfolio item by ID
 */
export const getPortfolioItemFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const item = await getPortfolioItemById(data.id);
    if (!item) {
      throw new Error("Portfolio item not found");
    }
    return item;
  });
