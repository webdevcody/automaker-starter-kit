import { Link } from "@tanstack/react-router";
import { Bell, Check, MessageSquare, Reply } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  useUnreadCount,
  useRecentNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "~/hooks/useNotifications";
import { cn } from "~/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { NotificationWithUser } from "~/data-access/notifications";

function getNotificationIcon(type: string) {
  switch (type) {
    case "post-reply":
      return <MessageSquare className="h-4 w-4 text-primary" />;
    case "comment-reply":
      return <Reply className="h-4 w-4 text-blue-500" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: NotificationWithUser;
  onMarkAsRead: (id: string) => void;
}) {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <DropdownMenuItem asChild>
      <Link
        to="/dashboard/community/post/$postId"
        params={{ postId: notification.relatedId || "" }}
        onClick={handleClick}
        className={cn(
          "flex items-start gap-3 p-3 cursor-pointer",
          !notification.isRead && "bg-primary/5"
        )}
      >
        <div className="shrink-0 mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm", !notification.isRead && "font-medium")}>
            {notification.title}
          </p>
          {notification.content && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {notification.content}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        {!notification.isRead && (
          <div className="shrink-0">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        )}
      </Link>
    </DropdownMenuItem>
  );
}

export function NotificationBell() {
  const { data: countData } = useUnreadCount(true);
  const { data: notifications } = useRecentNotifications(true);
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = countData?.count ?? 0;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {displayCount}
            </span>
          )}
          <span className="sr-only">
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "Notifications"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0 font-semibold">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs"
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notifications && notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={(id) => markAsRead.mutate(id)}
              />
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/dashboard/notifications"
                className="flex items-center justify-center py-2 text-sm font-medium text-primary hover:text-primary"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
