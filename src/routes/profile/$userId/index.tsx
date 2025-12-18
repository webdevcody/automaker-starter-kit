import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Home,
  Users,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Calendar,
  MapPin,
  Briefcase,
  Sparkles,
  Lock,
  Edit,
} from "lucide-react";
import { Page } from "~/components/Page";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { UserAvatar } from "~/components/UserAvatar";
import { PortfolioItemCard } from "~/components/PortfolioItemCard";
import { StartConversationButton } from "~/components/StartConversationButton";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "~/components/ui/panel";
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
            <Link to="/dashboard/members" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Members
            </Link>
          </Button>
        </div>
      </Page>
    );
  }

  const { user, profile, portfolioItems } = profileData;
  const socialLinks = [
    { url: profile?.githubUrl, icon: Github, label: "GitHub" },
    { url: profile?.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
    { url: profile?.twitterUrl, icon: Twitter, label: "Twitter" },
    { url: profile?.websiteUrl, icon: Globe, label: "Website" },
  ].filter((link) => link.url);

  return (
    <Page>
      <div className="space-y-8 max-w-4xl mx-auto">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Members", href: "/members", icon: Users },
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
                  {/* Send Message button - only show if viewing someone else's profile and logged in */}
                  {!isOwnProfile && session?.user && (
                    <StartConversationButton
                      userId={userId}
                      variant="default"
                    />
                  )}
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

              {/* Looking For */}
              {profile?.lookingFor && (
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">
                        Looking for
                      </p>
                      <p className="text-sm text-foreground/80">
                        {profile.lookingFor}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm text-foreground transition-colors"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </PanelContent>
        </Panel>

        {/* Skills Section */}
        {profile?.skills && profile.skills.length > 0 && (
          <Panel className="border-border/60">
            <PanelHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <PanelTitle className="text-lg">
                  Skills & Technologies
                </PanelTitle>
              </div>
            </PanelHeader>
            <PanelContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </PanelContent>
          </Panel>
        )}

        {/* Portfolio Section */}
        {portfolioItems && portfolioItems.length > 0 && (
          <Panel className="border-border/60">
            <PanelHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <PanelTitle className="text-lg">Portfolio</PanelTitle>
              </div>
            </PanelHeader>
            <PanelContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item) => (
                  <PortfolioItemCard
                    key={item.id}
                    item={item}
                    isOwner={false}
                  />
                ))}
              </div>
            </PanelContent>
          </Panel>
        )}

        {/* Back button */}
        <div className="flex justify-center pb-8">
          <Button asChild variant="outline">
            <Link to="/dashboard/members" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Members
            </Link>
          </Button>
        </div>
      </div>
    </Page>
  );
}
