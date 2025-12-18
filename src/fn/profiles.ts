import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  getOrCreateUserProfile,
  updateUserProfile,
  updateUserBio,
  getPublicProfile,
} from "~/data-access/profiles";

/**
 * Get current user's profile
 */
export const getMyProfileFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const profile = await getOrCreateUserProfile(context.userId);
    return profile;
  });

/**
 * Get a public profile by user ID (no authentication required)
 */
export const getPublicProfileFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const profile = await getPublicProfile(data.userId);
    if (!profile) {
      throw new Error("Profile not found or is private");
    }
    return profile;
  });

/**
 * Update current user's profile
 */
export const updateMyProfileFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      bio: z.string().max(1000).optional().nullable(),
    })
  )
  .handler(async ({ data, context }) => {
    const profile = await updateUserProfile(context.userId, data);
    return profile;
  });

/**
 * Update current user's bio
 */
export const updateBioFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      bio: z.string().max(1000).optional().nullable(),
    })
  )
  .handler(async ({ data, context }) => {
    const profile = await updateUserBio(context.userId, data.bio ?? null);
    return profile;
  });
