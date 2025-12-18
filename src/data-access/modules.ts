import { eq, desc, and, max } from "drizzle-orm";
import { database } from "~/db";
import {
  classroomModule,
  moduleContent,
  user,
  type ClassroomModule,
  type CreateClassroomModuleData,
  type UpdateClassroomModuleData,
  type ModuleContent,
  type CreateModuleContentData,
  type UpdateModuleContentData,
  type User,
} from "~/db/schema";

export type ClassroomModuleWithUser = ClassroomModule & {
  user: Pick<User, "id" | "name" | "image">;
};

export type ClassroomModuleWithContents = ClassroomModule & {
  user: Pick<User, "id" | "name" | "image">;
  contents: ModuleContent[];
};

// Module operations
export async function createModule(
  data: CreateClassroomModuleData
): Promise<ClassroomModule> {
  const [newModule] = await database
    .insert(classroomModule)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return newModule;
}

export async function getNextModuleOrder(): Promise<number> {
  const result = await database
    .select({ maxOrder: max(classroomModule.order) })
    .from(classroomModule);

  const currentMax = result[0]?.maxOrder ?? 0;
  return currentMax + 1;
}

export async function findModuleById(
  id: string
): Promise<ClassroomModule | null> {
  const [result] = await database
    .select()
    .from(classroomModule)
    .where(eq(classroomModule.id, id))
    .limit(1);

  return result || null;
}

export async function findModuleByIdWithUser(
  id: string
): Promise<ClassroomModuleWithUser | null> {
  const result = await database
    .select({
      id: classroomModule.id,
      title: classroomModule.title,
      description: classroomModule.description,
      order: classroomModule.order,
      isPublished: classroomModule.isPublished,
      createdBy: classroomModule.createdBy,
      createdAt: classroomModule.createdAt,
      updatedAt: classroomModule.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(classroomModule)
    .innerJoin(user, eq(classroomModule.createdBy, user.id))
    .where(eq(classroomModule.id, id))
    .limit(1);

  return result[0] || null;
}

export async function findModuleByIdWithContents(
  id: string
): Promise<ClassroomModuleWithContents | null> {
  const moduleResult = await database
    .select({
      id: classroomModule.id,
      title: classroomModule.title,
      description: classroomModule.description,
      order: classroomModule.order,
      isPublished: classroomModule.isPublished,
      createdBy: classroomModule.createdBy,
      createdAt: classroomModule.createdAt,
      updatedAt: classroomModule.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(classroomModule)
    .innerJoin(user, eq(classroomModule.createdBy, user.id))
    .where(eq(classroomModule.id, id))
    .limit(1);

  if (!moduleResult[0]) {
    return null;
  }

  const contents = await database
    .select()
    .from(moduleContent)
    .where(eq(moduleContent.moduleId, id))
    .orderBy(moduleContent.position);

  return {
    ...moduleResult[0],
    contents,
  };
}

export async function findAllModules(): Promise<ClassroomModuleWithUser[]> {
  const results = await database
    .select({
      id: classroomModule.id,
      title: classroomModule.title,
      description: classroomModule.description,
      order: classroomModule.order,
      isPublished: classroomModule.isPublished,
      createdBy: classroomModule.createdBy,
      createdAt: classroomModule.createdAt,
      updatedAt: classroomModule.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(classroomModule)
    .innerJoin(user, eq(classroomModule.createdBy, user.id))
    .orderBy(desc(classroomModule.order));

  return results;
}

export async function findPublishedModules(): Promise<ClassroomModuleWithUser[]> {
  const results = await database
    .select({
      id: classroomModule.id,
      title: classroomModule.title,
      description: classroomModule.description,
      order: classroomModule.order,
      isPublished: classroomModule.isPublished,
      createdBy: classroomModule.createdBy,
      createdAt: classroomModule.createdAt,
      updatedAt: classroomModule.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(classroomModule)
    .innerJoin(user, eq(classroomModule.createdBy, user.id))
    .where(eq(classroomModule.isPublished, true))
    .orderBy(desc(classroomModule.order));

  return results;
}

export async function updateModule(
  id: string,
  data: UpdateClassroomModuleData
): Promise<ClassroomModule> {
  const [updatedModule] = await database
    .update(classroomModule)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(classroomModule.id, id))
    .returning();

  return updatedModule;
}

export async function deleteModule(id: string): Promise<void> {
  await database.delete(classroomModule).where(eq(classroomModule.id, id));
}

// Module Content operations
export async function createModuleContent(
  data: CreateModuleContentData
): Promise<ModuleContent> {
  const [newContent] = await database
    .insert(moduleContent)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return newContent;
}

export async function getNextContentPosition(moduleId: string): Promise<number> {
  const result = await database
    .select({ maxPosition: max(moduleContent.position) })
    .from(moduleContent)
    .where(eq(moduleContent.moduleId, moduleId));

  const currentMax = result[0]?.maxPosition ?? 0;
  return currentMax + 1;
}

export async function findContentById(
  id: string
): Promise<ModuleContent | null> {
  const [result] = await database
    .select()
    .from(moduleContent)
    .where(eq(moduleContent.id, id))
    .limit(1);

  return result || null;
}

export async function findModuleContents(
  moduleId: string
): Promise<ModuleContent[]> {
  const results = await database
    .select()
    .from(moduleContent)
    .where(eq(moduleContent.moduleId, moduleId))
    .orderBy(moduleContent.position);

  return results;
}

export async function updateModuleContent(
  id: string,
  data: UpdateModuleContentData
): Promise<ModuleContent> {
  const [updatedContent] = await database
    .update(moduleContent)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(moduleContent.id, id))
    .returning();

  return updatedContent;
}

export async function deleteModuleContent(id: string): Promise<void> {
  await database.delete(moduleContent).where(eq(moduleContent.id, id));
}
