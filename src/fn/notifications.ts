import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  findUserNotifications,
  countUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  findNotificationById,
} from "~/data-access/notifications";

// Get user's notifications
export const getNotificationsFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      limit: z.number().optional().default(20),
      offset: z.number().optional().default(0),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    return await findUserNotifications(context.userId, data.limit, data.offset);
  });

// Get recent notifications for dropdown (limited to 3)
export const getRecentNotificationsFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    return await findUserNotifications(context.userId, 3, 0);
  });

// Get unread notifications count
export const getUnreadCountFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const count = await countUnreadNotifications(context.userId);
    return { count };
  });

// Mark notification as read
export const markAsReadFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      notificationId: z.string().min(1, "Notification ID is required"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const notification = await findNotificationById(data.notificationId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.userId !== context.userId) {
      throw new Error(
        "Unauthorized: You can only mark your own notifications as read"
      );
    }

    const updated = await markNotificationAsRead(
      data.notificationId,
      context.userId
    );

    if (!updated) {
      throw new Error("Failed to mark notification as read");
    }

    return updated;
  });

// Mark all notifications as read
export const markAllAsReadFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const count = await markAllNotificationsAsRead(context.userId);
    return { count };
  });
