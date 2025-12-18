import { MessageSquare, Loader2 } from "lucide-react";
import { ConversationItem } from "./ConversationItem";
import { useConversations } from "~/hooks/useConversations";
import type { ConversationWithParticipant } from "~/data-access/conversations";

interface ConversationListProps {
  activeConversationId: string | null;
  onSelectConversation: (conversation: ConversationWithParticipant) => void;
}

export function ConversationList({
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const { data: conversations, isLoading, error } = useConversations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Failed to load conversations
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4">
        <div className="p-3 rounded-full bg-muted mb-3">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          No conversations yet
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Visit a member's profile to start a conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={() => onSelectConversation(conversation)}
        />
      ))}
    </div>
  );
}
