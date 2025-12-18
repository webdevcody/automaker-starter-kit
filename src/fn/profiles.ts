import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  getUserProfile,
  getOrCreateUserProfile,
  updateUserProfile,
  updateUserBio,
  updateUserSkills,
  getPublicProfile,
  toggleProfileVisibility,
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
      skills: z.array(z.string().max(50)).max(20).optional(),
      lookingFor: z.string().max(500).optional().nullable(),
      githubUrl: z.string().url().optional().nullable().or(z.literal("")),
      linkedinUrl: z.string().url().optional().nullable().or(z.literal("")),
      websiteUrl: z.string().url().optional().nullable().or(z.literal("")),
      twitterUrl: z.string().url().optional().nullable().or(z.literal("")),
      isPublic: z.boolean().optional(),
    })
  )
  .handler(async ({ data, context }) => {
    // Clean empty strings to null
    const cleanedData = {
      ...data,
      githubUrl: data.githubUrl === "" ? null : data.githubUrl,
      linkedinUrl: data.linkedinUrl === "" ? null : data.linkedinUrl,
      websiteUrl: data.websiteUrl === "" ? null : data.websiteUrl,
      twitterUrl: data.twitterUrl === "" ? null : data.twitterUrl,
    };

    const profile = await updateUserProfile(context.userId, cleanedData);
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

/**
 * Update current user's skills
 */
export const updateSkillsFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      skills: z.array(z.string().max(50)).max(20),
    })
  )
  .handler(async ({ data, context }) => {
    const profile = await updateUserSkills(context.userId, data.skills);
    return profile;
  });

/**
 * Toggle profile visibility (public/private)
 */
export const toggleProfileVisibilityFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .inputValidator(
    z.object({
      isPublic: z.boolean(),
    })
  )
  .handler(async ({ data, context }) => {
    const profile = await toggleProfileVisibility(context.userId, data.isPublic);
    return profile;
  });
