import { UserAvatar } from "./UserAvatar";
import { cn } from "~/lib/utils";
import type { MessageWithSender } from "~/data-access/messages";

interface MessageItemProps {
  message: MessageWithSender;
  isOwnMessage: boolean;
  showAvatar?: boolean;
}

function formatMessageTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function MessageItem({
  message,
  isOwnMessage,
  showAvatar = true,
}: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isOwnMessage ? "flex-row-reverse" : "flex-row"
      )}
    >
      {showAvatar && !isOwnMessage && (
        <UserAvatar
          imageKey={message.sender.image}
          name={message.sender.name}
          size="sm"
          className="shrink-0"
        />
      )}
      {!showAvatar && !isOwnMessage && <div className="w-8 shrink-0" />}

      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isOwnMessage
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p
          className={cn(
            "text-xs mt-1",
            isOwnMessage
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
