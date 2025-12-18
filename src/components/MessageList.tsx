import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { MessageItem } from "./MessageItem";
import { useMessages, useMarkMessagesAsRead } from "~/hooks/useMessages";
import { authClient } from "~/lib/auth-client";

interface MessageListProps {
  conversationId: string;
}

export function MessageList({ conversationId }: MessageListProps) {
  const { data: session } = authClient.useSession();
  const { data, isLoading, error } = useMessages(conversationId);
  const markAsRead = useMarkMessagesAsRead();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMarkedAsRead = useRef(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data?.messages]);

  // Mark messages as read when viewing
  useEffect(() => {
    if (
      conversationId &&
      data?.messages &&
      data.messages.length > 0 &&
      !hasMarkedAsRead.current
    ) {
      hasMarkedAsRead.current = true;
      markAsRead.mutate(conversationId);
    }
  }, [conversationId, data?.messages]);

  // Reset the read marker when conversation changes
  useEffect(() => {
    hasMarkedAsRead.current = false;
  }, [conversationId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Failed to load messages
        </p>
      </div>
    );
  }

  if (!data?.messages || data.messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No messages yet. Say hello!
        </p>
      </div>
    );
  }

  const currentUserId = session?.user?.id;

  // Group messages by date
  const groupedMessages: { date: string; messages: typeof data.messages }[] = [];
  let currentDate = "";

  for (const message of data.messages) {
    const messageDate = new Date(message.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({ date: messageDate, messages: [] });
    }

    groupedMessages[groupedMessages.length - 1].messages.push(message);
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {groupedMessages.map((group) => (
        <div key={group.date} className="space-y-3">
          <div className="flex items-center justify-center">
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {group.date}
            </span>
          </div>
          {group.messages.map((message, index) => {
            const prevMessage = group.messages[index - 1];
            const showAvatar =
              !prevMessage || prevMessage.senderId !== message.senderId;

            return (
              <MessageItem
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === currentUserId}
                showAvatar={showAvatar}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
