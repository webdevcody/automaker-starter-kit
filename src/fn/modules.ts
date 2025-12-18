import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { assertAdminMiddleware, authenticatedMiddleware } from "./middleware";
import {
  createModule,
  createModuleContent,
  updateModule,
  updateModuleContent,
  deleteModule,
  deleteModuleContent,
  findModuleById,
  findModuleByIdWithUser,
  findModuleByIdWithContents,
  findAllModules,
  findPublishedModules,
  findModuleContents,
  findContentById,
  getNextModuleOrder,
  getNextContentPosition,
} from "~/data-access/modules";
import { isUserAdmin } from "~/data-access/users";
import { getStorage } from "~/utils/storage";

export const MODULE_CONTENT_TYPES = [
  "video",
  "task",
  "image",
  "pdf",
  "text",
] as const;

export type ModuleContentType = (typeof MODULE_CONTENT_TYPES)[number];

// Create Module
const createModuleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  isPublished: z.boolean().optional().default(false),
});

export const createModuleFn = createServerFn({
  method: "POST",
})
  .inputValidator(createModuleSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data, context }) => {
    const order = await getNextModuleOrder();

    const moduleData = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      order,
      isPublished: data.isPublished ?? false,
      createdBy: context.userId,
    };

    const newModule = await createModule(moduleData);
    return newModule;
  });

// Get Modules (for admins: all, for users: published only)
export const getModulesFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const isAdmin = await isUserAdmin(context.userId);

    if (isAdmin) {
      return await findAllModules();
    }

    return await findPublishedModules();
  });

// Get Module by ID with contents
export const getModuleByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const moduleData = await findModuleByIdWithContents(data.id);

    if (!moduleData) {
      throw new Error("Module not found");
    }

    // Check if user can view unpublished modules
    const isAdmin = await isUserAdmin(context.userId);
    if (!moduleData.isPublished && !isAdmin) {
      throw new Error("Module not found");
    }

    // Add presigned URLs for content with file keys
    const { storage } = getStorage();
    const contentsWithUrls = await Promise.all(
      moduleData.contents.map(async (content) => {
        if (content.fileKey) {
          const url = await storage.getPresignedUrl(content.fileKey);
          return { ...content, url };
        }
        return content;
      })
    );

    return {
      ...moduleData,
      contents: contentsWithUrls,
    };
  });

// Update Module
const updateModuleSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  isPublished: z.boolean().optional(),
  order: z.number().int().positive().optional(),
});

export const updateModuleFn = createServerFn({
  method: "POST",
})
  .inputValidator(updateModuleSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data }) => {
    const existingModule = await findModuleById(data.id);
    if (!existingModule) {
      throw new Error("Module not found");
    }

    const moduleData = {
      title: data.title,
      description: data.description || null,
      isPublished: data.isPublished,
      order: data.order,
    };

    const updatedModule = await updateModule(data.id, moduleData);
    return updatedModule;
  });

// Delete Module
export const deleteModuleFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([assertAdminMiddleware])
  .handler(async ({ data }) => {
    const existingModule = await findModuleById(data.id);
    if (!existingModule) {
      throw new Error("Module not found");
    }

    await deleteModule(data.id);
    return { success: true };
  });

// Create Module Content
const createModuleContentSchema = z.object({
  moduleId: z.string(),
  type: z.enum(MODULE_CONTENT_TYPES),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  fileKey: z.string().optional().or(z.literal("")),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
});

export const createModuleContentFn = createServerFn({
  method: "POST",
})
  .inputValidator(createModuleContentSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data }) => {
    // Verify module exists
    const existingModule = await findModuleById(data.moduleId);
    if (!existingModule) {
      throw new Error("Module not found");
    }

    const position = await getNextContentPosition(data.moduleId);

    const contentData = {
      id: crypto.randomUUID(),
      moduleId: data.moduleId,
      type: data.type,
      title: data.title,
      description: data.description || null,
      fileKey: data.fileKey || null,
      url: data.url || null,
      content: data.content || null,
      position,
    };

    const newContent = await createModuleContent(contentData);
    return newContent;
  });

// Get Module Contents
export const getModuleContentsFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ moduleId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify module exists and user can access it
    const moduleData = await findModuleByIdWithUser(data.moduleId);
    if (!moduleData) {
      throw new Error("Module not found");
    }

    const isAdmin = await isUserAdmin(context.userId);
    if (!moduleData.isPublished && !isAdmin) {
      throw new Error("Module not found");
    }

    const contents = await findModuleContents(data.moduleId);

    // Add presigned URLs for content with file keys
    const { storage } = getStorage();
    const contentsWithUrls = await Promise.all(
      contents.map(async (content) => {
        if (content.fileKey) {
          const url = await storage.getPresignedUrl(content.fileKey);
          return { ...content, url };
        }
        return content;
      })
    );

    return contentsWithUrls;
  });

// Update Module Content
const updateModuleContentSchema = z.object({
  id: z.string(),
  type: z.enum(MODULE_CONTENT_TYPES).optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  fileKey: z.string().optional().or(z.literal("")),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
  position: z.number().int().positive().optional(),
});

export const updateModuleContentFn = createServerFn({
  method: "POST",
})
  .inputValidator(updateModuleContentSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data }) => {
    const existingContent = await findContentById(data.id);
    if (!existingContent) {
      throw new Error("Content not found");
    }

    const contentData = {
      type: data.type,
      title: data.title,
      description: data.description !== undefined ? (data.description || null) : undefined,
      fileKey: data.fileKey !== undefined ? (data.fileKey || null) : undefined,
      url: data.url !== undefined ? (data.url || null) : undefined,
      content: data.content !== undefined ? (data.content || null) : undefined,
      position: data.position,
    };

    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(contentData).filter(([_, v]) => v !== undefined)
    );

    const updatedContent = await updateModuleContent(data.id, cleanedData);
    return updatedContent;
  });

// Delete Module Content
export const deleteModuleContentFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([assertAdminMiddleware])
  .handler(async ({ data }) => {
    const existingContent = await findContentById(data.id);
    if (!existingContent) {
      throw new Error("Content not found");
    }

    await deleteModuleContent(data.id);
    return { success: true };
  });
