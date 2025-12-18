import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  messagesQueryOptions,
  unreadMessageCountQueryOptions,
} from "~/queries/messages";
import {
  sendMessageFn,
  markMessagesAsReadFn,
} from "~/fn/messages";
import { getErrorMessage } from "~/utils/error";

export function useMessages(
  conversationId: string,
  limit: number = 50,
  offset: number = 0,
  enabled = true
) {
  return useQuery({
    ...messagesQueryOptions(conversationId, limit, offset),
    enabled: enabled && !!conversationId,
  });
}

export function useUnreadMessageCount(enabled = true) {
  return useQuery({
    ...unreadMessageCountQueryOptions(),
    enabled,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => sendMessageFn({ data: { conversationId, content } }),
    onSuccess: (_, variables) => {
      // Invalidate messages for this conversation
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
      // Invalidate conversations list (to update last message preview)
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useMarkMessagesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      markMessagesAsReadFn({ data: { conversationId } }),
    onSuccess: (_, conversationId) => {
      // Invalidate messages for this conversation
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
      // Invalidate conversations list (to update unread count)
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate unread count
      queryClient.invalidateQueries({ queryKey: ["messages", "unread-count"] });
    },
  });
}
