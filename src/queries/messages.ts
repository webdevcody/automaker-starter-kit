import { queryOptions } from "@tanstack/react-query";
import {
  getMessagesFn,
  getUnreadMessageCountFn,
} from "~/fn/messages";

export const messagesQueryOptions = (
  conversationId: string,
  limit: number = 50,
  offset: number = 0
) =>
  queryOptions({
    queryKey: ["messages", conversationId, { limit, offset }],
    queryFn: () => getMessagesFn({ data: { conversationId, limit, offset } }),
    enabled: !!conversationId,
  });

export const unreadMessageCountQueryOptions = () =>
  queryOptions({
    queryKey: ["messages", "unread-count"],
    queryFn: () => getUnreadMessageCountFn(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
