import { eq, desc, and, sql, count } from "drizzle-orm";
import { database } from "~/db";
import {
  notification,
  user,
  type Notification,
  type CreateNotificationData,
  type User,
} from "~/db/schema";

export type NotificationWithUser = Notification & {
  user: Pick<User, "id" | "name" | "image">;
};

export async function createNotification(
  notificationData: CreateNotificationData
): Promise<Notification> {
  const [newNotification] = await database
    .insert(notification)
    .values(notificationData)
    .returning();

  return newNotification;
}

export async function findNotificationById(id: string): Promise<Notification | null> {
  const [result] = await database
    .select()
    .from(notification)
    .where(eq(notification.id, id))
    .limit(1);

  return result || null;
}

export async function findUserNotifications(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<NotificationWithUser[]> {
  const results = await database
    .select({
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      content: notification.content,
      relatedId: notification.relatedId,
      relatedType: notification.relatedType,
      isRead: notification.isRead,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(notification)
    .innerJoin(user, eq(notification.userId, user.id))
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

export async function findUnreadNotifications(
  userId: string,
  limit: number = 20
): Promise<NotificationWithUser[]> {
  const results = await database
    .select({
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      content: notification.content,
      relatedId: notification.relatedId,
      relatedType: notification.relatedType,
      isRead: notification.isRead,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(notification)
    .innerJoin(user, eq(notification.userId, user.id))
    .where(
      and(
        eq(notification.userId, userId),
        eq(notification.isRead, false)
      )
    )
    .orderBy(desc(notification.createdAt))
    .limit(limit);

  return results;
}

export async function countUnreadNotifications(userId: string): Promise<number> {
  const [result] = await database
    .select({ count: count() })
    .from(notification)
    .where(
      and(
        eq(notification.userId, userId),
        eq(notification.isRead, false)
      )
    );

  return result?.count ?? 0;
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
): Promise<Notification | null> {
  const [updated] = await database
    .update(notification)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notification.id, notificationId),
        eq(notification.userId, userId)
      )
    )
    .returning();

  return updated || null;
}

export async function markAllNotificationsAsRead(
  userId: string
): Promise<number> {
  const result = await database
    .update(notification)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notification.userId, userId),
        eq(notification.isRead, false)
      )
    )
    .returning();

  return result.length;
}

export async function deleteNotification(
  notificationId: string,
  userId: string
): Promise<boolean> {
  const [deleted] = await database
    .delete(notification)
    .where(
      and(
        eq(notification.id, notificationId),
        eq(notification.userId, userId)
      )
    )
    .returning();

  return deleted !== undefined;
}
