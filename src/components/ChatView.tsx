import { ArrowLeft, MessageSquare } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import type { ConversationWithParticipant } from "~/data-access/conversations";

interface ChatViewProps {
  conversation: ConversationWithParticipant | null;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatView({
  conversation,
  onBack,
  showBackButton = false,
}: ChatViewProps) {
  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="p-4 rounded-full bg-muted mb-4">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Select a conversation
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Choose a conversation from the sidebar to start messaging, or visit a
          member's profile to start a new conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4 flex items-center gap-3 bg-background">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <Link
          to="/profile/$userId"
          params={{ userId: conversation.otherParticipant.id }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <UserAvatar
            imageKey={conversation.otherParticipant.image}
            name={conversation.otherParticipant.name}
            size="md"
          />
          <div>
            <h2 className="font-semibold text-foreground">
              {conversation.otherParticipant.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              Click to view profile
            </p>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <MessageList conversationId={conversation.id} />

      {/* Message Input */}
      <MessageInput conversationId={conversation.id} />
    </div>
  );
}
