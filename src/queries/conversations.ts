import { queryOptions } from "@tanstack/react-query";
import {
  getConversationsFn,
  getConversationByIdFn,
} from "~/fn/conversations";

export const conversationsQueryOptions = () =>
  queryOptions({
    queryKey: ["conversations"],
    queryFn: () => getConversationsFn(),
  });

export const conversationQueryOptions = (conversationId: string) =>
  queryOptions({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationByIdFn({ data: { conversationId } }),
    enabled: !!conversationId,
  });
