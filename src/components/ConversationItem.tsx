import { UserAvatar } from "./UserAvatar";
import { cn } from "~/lib/utils";
import type { ConversationWithParticipant } from "~/data-access/conversations";

interface ConversationItemProps {
  conversation: ConversationWithParticipant;
  isActive: boolean;
  onClick: () => void;
}

function formatTimeAgo(date: Date | null): string {
  if (!date) return "";

  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  const { otherParticipant, lastMessage, unreadCount } = conversation;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 flex items-start gap-3 text-left transition-colors rounded-lg",
        isActive
          ? "bg-primary/10 border-l-2 border-primary"
          : "hover:bg-muted/50"
      )}
    >
      <UserAvatar
        imageKey={otherParticipant.image}
        name={otherParticipant.name}
        size="md"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "font-medium truncate",
            unreadCount > 0 && "text-foreground"
          )}>
            {otherParticipant.name}
          </span>
          {lastMessage && (
            <span className="text-xs text-muted-foreground shrink-0">
              {formatTimeAgo(lastMessage.createdAt)}
            </span>
          )}
        </div>

        {lastMessage && (
          <p className={cn(
            "text-sm truncate mt-0.5",
            unreadCount > 0
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          )}>
            {lastMessage.content}
          </p>
        )}
      </div>

      {unreadCount > 0 && (
        <span className="shrink-0 h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
