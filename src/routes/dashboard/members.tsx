import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Home, Users, Search, X } from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { EmptyState } from "~/components/EmptyState";
import { Input } from "~/components/ui/input";
import { Panel } from "~/components/ui/panel";
import { MemberCard } from "~/components/MemberCard";
import { getMembersQuery } from "~/queries/members";

export const Route = createFileRoute("/dashboard/members")({
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.ensureQueryData(
      getMembersQuery({
        limit: 100,
        offset: 0,
      })
    );
  },
  component: Members,
});

function MemberGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Panel key={i} className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted/50 animate-pulse shrink-0" />
            <div className="space-y-2 w-full">
              <div className="h-4 bg-muted/50 rounded w-3/4 mx-auto animate-pulse" />
              <div className="h-3 bg-muted/50 rounded w-full animate-pulse" />
              <div className="h-3 bg-muted/50 rounded w-2/3 mx-auto animate-pulse" />
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function Members() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery(
    getMembersQuery({
      searchQuery: searchQuery.trim() || undefined,
      limit: 100,
      offset: 0,
    })
  );

  const members = data?.members || [];
  const hasResults = members.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Members", icon: Users },
          ]}
        />

        <PageTitle
          title="Members Directory"
          description="Discover and connect with community members"
        />

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-8 bg-background/50 backdrop-blur-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Members Grid */}
        <section className="space-y-6" aria-labelledby="members-heading">
          <div className="flex items-center justify-between">
            <h2 id="members-heading" className="text-lg font-semibold">
              Community Members
            </h2>
            {!isLoading && data && (
              <p className="text-sm text-muted-foreground">
                {hasSearchQuery ? (
                  <>
                    Found{" "}
                    <span className="font-medium text-foreground">
                      {data.total}
                    </span>{" "}
                    member{data.total !== 1 ? "s" : ""}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </>
                ) : (
                  <>
                    <span className="font-medium text-foreground">
                      {data.total}
                    </span>{" "}
                    total member{data.total !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            )}
          </div>

          {isLoading ? (
            <MemberGridSkeleton count={8} />
          ) : hasResults ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Users className="h-10 w-10 text-primary/60" />}
              title={hasSearchQuery ? "No members found" : "No members yet"}
              description={
                hasSearchQuery
                  ? `No members match "${searchQuery}". Try a different search term.`
                  : "There are no members in the community yet."
              }
            />
          )}
        </section>
      </div>
    </Page>
  );
}
