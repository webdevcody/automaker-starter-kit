import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { conversationsQueryOptions } from "~/queries/conversations";
import { getOrCreateConversationFn } from "~/fn/conversations";
import { getErrorMessage } from "~/utils/error";

export function useConversations(enabled = true) {
  return useQuery({
    ...conversationsQueryOptions(),
    enabled,
  });
}

export function useStartConversation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (otherUserId: string) =>
      getOrCreateConversationFn({ data: { otherUserId } }),
    onSuccess: (conversation) => {
      // Invalidate conversations list
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Navigate to the messages page with this conversation
      navigate({ to: "/dashboard/messages", search: { conversation: conversation.id } });
    },
    onError: (error) => {
      toast.error("Failed to start conversation", {
        description: getErrorMessage(error),
      });
    },
  });
}
