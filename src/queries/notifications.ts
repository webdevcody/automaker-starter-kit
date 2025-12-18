import { queryOptions } from "@tanstack/react-query";
import {
  getNotificationsFn,
  getRecentNotificationsFn,
  getUnreadCountFn,
} from "~/fn/notifications";

export const notificationsQueryOptions = (
  limit: number = 20,
  offset: number = 0
) =>
  queryOptions({
    queryKey: ["notifications", { limit, offset }],
    queryFn: () => getNotificationsFn({ data: { limit, offset } }),
  });

export const recentNotificationsQueryOptions = () =>
  queryOptions({
    queryKey: ["notifications", "recent"],
    queryFn: () => getRecentNotificationsFn(),
  });

export const unreadCountQueryOptions = () =>
  queryOptions({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => getUnreadCountFn(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
