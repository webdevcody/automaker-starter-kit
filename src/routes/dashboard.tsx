import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { cn } from "~/lib/utils";
import {
  BookOpen,
  Users,
  CalendarDays,
  UserCircle,
  MessageSquare,
  Bell,
  Settings,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { redirect } from "@tanstack/react-router";
import { DashboardBackground } from "~/components/DashboardBackground";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: "/dashboard" },
      });
    }
  },
  component: DashboardLayout,
});

interface NavItem {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Classroom",
    href: "/dashboard/classroom",
    icon: BookOpen,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: UserCircle,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function DashboardLayout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] relative">
      <DashboardBackground />

      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-white/5 bg-background/30 backdrop-blur-md supports-backdrop-filter:bg-background/20 z-20 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div
          className={cn(
            "flex items-center p-4 pb-2",
            isCollapsed ? "justify-center" : "justify-end"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-4 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? currentPath === "/dashboard"
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                {!isCollapsed && (
                  <span className="animate-in fade-in duration-200 whitespace-nowrap overflow-hidden">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar - Hidden for now, can be enhanced later */}
      <div className="md:hidden">
        {/* Mobile navigation can be added here using Sheet component */}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
