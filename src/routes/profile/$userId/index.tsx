import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Home, ArrowLeft, Calendar, Lock, Edit } from "lucide-react";
import { Page } from "~/components/Page";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { UserAvatar } from "~/components/UserAvatar";
import { Button } from "~/components/ui/button";
import { Panel, PanelContent } from "~/components/ui/panel";
import { publicProfileQueryOptions } from "~/queries/profiles";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/profile/$userId/")({
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    await queryClient.prefetchQuery(publicProfileQueryOptions(userId));
  },
  component: Profile,
});

function Profile() {
  const { userId } = Route.useParams();
  const { data: session } = authClient.useSession();
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery(publicProfileQueryOptions(userId));

  const isOwnProfile = session?.user?.id === userId;

  if (isLoading) {
    return (
      <Page>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted/50 rounded w-1/3"></div>
            <div className="h-64 bg-muted/50 rounded"></div>
            <div className="h-32 bg-muted/50 rounded"></div>
          </div>
        </div>
      </Page>
    );
  }

  if (error || !profileData) {
    return (
      <Page>
        <div className="text-center space-y-4 py-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Profile Not Available
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            This profile doesn't exist or is set to private.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </Page>
    );
  }

  const { user, profile } = profileData;

  return (
    <Page>
      <div className="space-y-8 max-w-4xl mx-auto">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Dashboard", href: "/dashboard" },
            { label: user.name || "Profile" },
          ]}
        />

        {/* Profile Header Card */}
        <Panel className="overflow-hidden border-border/60">
          {/* Background gradient */}
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoMnptMC0xMHY2aC0ydi02aDJ6bTAtMTB2NmgtMlYxNGgyem0xMCAyMHY2aC0ydi02aDJ6bTAtMTB2NmgtMnYtNmgyem0wLTEwdjZoLTJ2LTZoMnptLTIwIDIwdjZoLTJ2LTZoMnptMC0xMHY2aC0ydi02aDJ6bTAtMTB2NmgtMlYxNGgyem0tMTAgMjB2NmgtMnYtNmgyem0wLTEwdjZoLTJ2LTZoMnptMC0xMHY2aC0yVjE0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          </div>

          <PanelContent className="relative px-8 pb-8">
            {/* Avatar overlapping the header */}
            <div className="-mt-16 mb-4">
              <UserAvatar
                imageKey={user.image}
                name={user.name}
                size="xl"
                className="ring-4 ring-card bg-background"
              />
            </div>

            <div className="space-y-4">
              {/* Name and basic info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">
                    {user.name || "Anonymous"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Edit button - only show if viewing own profile */}
                  {isOwnProfile && (
                    <Button asChild variant="outline">
                      <Link
                        to="/dashboard/settings"
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profile?.bio && (
                <p className="text-foreground/80 leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              )}
            </div>
          </PanelContent>
        </Panel>

        {/* Back button */}
        <div className="flex justify-center pb-8">
          <Button asChild variant="outline">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </Page>
  );
}
