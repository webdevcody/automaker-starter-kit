import { Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useUnreadMessageCount } from "~/hooks/useMessages";

export function MessagesBell() {
  const { data: countData } = useUnreadMessageCount(true);

  const unreadCount = countData?.count ?? 0;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  return (
    <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
      <Link to="/dashboard/messages" search={{ conversation: undefined }}>
        <MessageSquare className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {displayCount}
          </span>
        )}
        <span className="sr-only">
          {unreadCount > 0
            ? `${unreadCount} unread messages`
            : "Messages"}
        </span>
      </Link>
    </Button>
  );
}
