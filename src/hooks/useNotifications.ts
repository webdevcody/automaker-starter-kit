import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  notificationsQueryOptions,
  recentNotificationsQueryOptions,
  unreadCountQueryOptions,
} from "~/queries/notifications";
import { markAsReadFn, markAllAsReadFn } from "~/fn/notifications";
import { getErrorMessage } from "~/utils/error";

// Query hooks
export function useNotifications(limit: number = 20, offset: number = 0, enabled = true) {
  return useQuery({
    ...notificationsQueryOptions(limit, offset),
    enabled,
  });
}

export function useRecentNotifications(enabled = true) {
  return useQuery({
    ...recentNotificationsQueryOptions(),
    enabled,
  });
}

export function useUnreadCount(enabled = true) {
  return useQuery({
    ...unreadCountQueryOptions(),
    enabled,
  });
}

// Mutation hooks
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markAsReadFn({ data: { notificationId } }),
    onSuccess: () => {
      // Invalidate all notification queries
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notification as read", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllAsReadFn(),
    onSuccess: (result) => {
      if (result.count > 0) {
        toast.success(`Marked ${result.count} notifications as read`);
      }
      // Invalidate all notification queries
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notifications as read", {
        description: getErrorMessage(error),
      });
    },
  });
}
