import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  Reply,
  Home,
  Filter,
} from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { Button } from "~/components/ui/button";
import { Panel, PanelContent } from "~/components/ui/panel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useUnreadCount,
} from "~/hooks/useNotifications";
import { assertAuthenticatedFn } from "~/fn/guards";
import { cn } from "~/lib/utils";
import type { NotificationWithUser } from "~/data-access/notifications";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
  beforeLoad: async () => {
    await assertAuthenticatedFn();
  },
});

function getNotificationIcon(type: string) {
  switch (type) {
    case "post-reply":
      return <MessageSquare className="h-5 w-5 text-primary" />;
    case "comment-reply":
      return <Reply className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
}

function NotificationCard({
  notification,
  onMarkAsRead,
  isPending,
}: {
  notification: NotificationWithUser;
  onMarkAsRead: (id: string) => void;
  isPending: boolean;
}) {
  return (
    <Panel
      className={cn(
        "transition-colors",
        !notification.isRead &&
          "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.05)]"
      )}
    >
      <PanelContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={cn(
                    "text-sm",
                    !notification.isRead && "font-semibold"
                  )}
                >
                  {notification.title}
                </p>
                {notification.content && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.content}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkAsRead(notification.id)}
                    disabled={isPending}
                    title="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                {notification.relatedId &&
                  notification.relatedType === "post" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to="/dashboard/community/post/$postId"
                        params={{ postId: notification.relatedId }}
                        onClick={() => {
                          if (!notification.isRead) {
                            onMarkAsRead(notification.id);
                          }
                        }}
                      >
                        View
                      </Link>
                    </Button>
                  )}
              </div>
            </div>
          </div>
          {!notification.isRead && (
            <div className="shrink-0">
              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
            </div>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}

type FilterType = "all" | "unread" | "read";

function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: notifications, isLoading } = useNotifications(50, 0, true);
  const { data: countData } = useUnreadCount(true);
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = countData?.count ?? 0;

  const filteredNotifications = notifications?.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Notifications", icon: Bell },
  ];

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <PageTitle
            title="Notifications"
            description={
              unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "You're all caught up!"
            }
          />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 backdrop-blur-sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" && "All"}
                  {filter === "unread" && "Unread"}
                  {filter === "read" && "Read"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("unread")}>
                  Unread only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("read")}>
                  Read only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAsRead.mutate()}
                disabled={markAllAsRead.isPending}
                className="bg-background/50 backdrop-blur-sm"
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredNotifications && filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={(id) => markAsRead.mutate(id)}
                isPending={markAsRead.isPending}
              />
            ))}
          </div>
        ) : (
          <Panel>
            <PanelContent className="py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {filter === "unread"
                  ? "No unread notifications"
                  : filter === "read"
                    ? "No read notifications"
                    : "No notifications yet"}
              </h3>
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "When someone replies to your posts or comments, you'll see notifications here."
                  : "Try changing the filter to see other notifications."}
              </p>
            </PanelContent>
          </Panel>
        )}
      </div>
    </Page>
  );
}
