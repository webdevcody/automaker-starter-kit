import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Users,
  CalendarDays,
  UserCircle,
  MessageSquare,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "~/components/ui/panel";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const quickLinks = [
  {
    title: "Classroom",
    description: "Access educational modules and learning resources",
    href: "/dashboard/classroom",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    title: "Community",
    description: "Connect with other members and share ideas",
    href: "/dashboard/community",
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "Calendar",
    description: "View upcoming events and schedule",
    href: "/dashboard/calendar",
    icon: CalendarDays,
    color: "text-green-500",
  },
  {
    title: "Members",
    description: "Browse member directory and profiles",
    href: "/dashboard/members",
    icon: UserCircle,
    color: "text-orange-500",
  },
  {
    title: "Messages",
    description: "Chat with other members",
    href: "/dashboard/messages",
    icon: MessageSquare,
    color: "text-cyan-500",
  },
  {
    title: "Notifications",
    description: "Stay updated with latest activity",
    href: "/dashboard/notifications",
    icon: Bell,
    color: "text-pink-500",
  },
];

function DashboardHome() {
  const { data: session } = authClient.useSession();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, {session?.user?.name || "there"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your Full Stack Campus dashboard
          </p>
        </div>

        {/* Quick Links Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Panel
                  key={link.href}
                  className="group hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                >
                  <PanelHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`h-8 w-8 ${link.color}`} />
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <PanelTitle className="text-lg">{link.title}</PanelTitle>
                  </PanelHeader>
                  <PanelContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {link.description}
                    </p>
                    <Link to={link.href}>
                      <Button
                        variant="outline"
                        className="w-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                      >
                        Go to {link.title}
                      </Button>
                    </Link>
                  </PanelContent>
                </Panel>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section - Placeholder for future enhancement */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Panel>
            <PanelContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                Activity feed coming soon...
              </p>
            </PanelContent>
          </Panel>
        </div>
      </div>
    </div>
  );
}
