import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { data: session } = authClient.useSession();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, {session?.user?.name || "there"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            This is your dashboard overview. Start building your features here.
          </p>
        </div>
      </div>
    </div>
  );
}
