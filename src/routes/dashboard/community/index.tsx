import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Home,
  Users,
  Plus,
  MessageSquare,
  Pin,
  PinOff,
  Trash2,
  Edit,
  ArrowRight,
} from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { EmptyState } from "~/components/EmptyState";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Panel } from "~/components/ui/panel";
import { recentPostsQueryOptions } from "~/queries/posts";
import { postCommentCountQueryOptions } from "~/queries/comments";
import { formatRelativeTime } from "~/utils/song";
import type { PostWithUser } from "~/data-access/posts";
import { authClient } from "~/lib/auth-client";
import { DeletePostDialog } from "~/components/DeletePostDialog";
import { UserAvatarLink } from "~/components/UserAvatarLink";
import { UserNameLink } from "~/components/UserNameLink";
import { CategoryFilter } from "~/components/CategoryFilter";
import { POST_CATEGORIES, type PostCategory } from "~/fn/posts";
import { useIsAdmin, usePinPost } from "~/hooks/usePosts";
import { PostLikeButton } from "~/components/PostLikeButton";
import { MediaGallery } from "~/components/MediaGallery";
import { usePostAttachments } from "~/hooks/useAttachments";

export const Route = createFileRoute("/dashboard/community/")({
  validateSearch: (search: Record<string, unknown>) => {
    const category = search.category as string | undefined;
    return {
      category:
        category && POST_CATEGORIES.includes(category as PostCategory)
          ? (category as PostCategory)
          : undefined,
    };
  },
  loaderDeps: ({ search: { category } }) => ({ category }),
  loader: async ({ context, deps: { category } }) => {
    const { queryClient } = context;
    queryClient.ensureQueryData(recentPostsQueryOptions(category));
  },
  component: Community,
});

function PostCard({ post, isAdmin }: { post: PostWithUser; isAdmin: boolean }) {
  const { data: session } = authClient.useSession();
  const { data: commentCount = 0 } = useQuery(
    postCommentCountQueryOptions(post.id)
  );
  const { data: attachments = [] } = usePostAttachments(post.id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const pinPost = usePinPost();
  const isOwner = session?.user?.id === post.userId;

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    pinPost.mutate({ id: post.id, isPinned: !post.isPinned });
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case "question":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "discussion":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "announcement":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "feedback":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "showcase":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength).trim() + "...";
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/dashboard/community/post/${post.id}/edit`;
  };

  return (
    <>
      <Panel className="overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group relative p-5">
        <div className="flex items-start gap-4">
          <UserAvatarLink
            userId={post.user.id}
            imageKey={post.user.image}
            name={post.user.name}
            size="md"
            className="shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <UserNameLink
                userId={post.user.id}
                name={post.user.name}
                className="text-sm font-medium"
              />
              <span className="text-muted-foreground text-xs">
                {formatRelativeTime(new Date(post.createdAt).toISOString())}
              </span>
              {post.isPinned && (
                <Badge
                  variant="secondary"
                  className="text-xs px-1.5 py-0 gap-1 bg-primary/10 text-primary border-primary/20"
                >
                  <Pin className="h-3 w-3" />
                  Pinned
                </Badge>
              )}
            </div>

            {post.title && (
              <Link
                to="/dashboard/community/post/$postId"
                params={{ postId: post.id }}
                className="block"
              >
                <h3 className="font-semibold text-base leading-tight mb-2 hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            )}

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
              {truncateContent(post.content)}
            </p>

            {/* Post Attachments */}
            {attachments.length > 0 && (
              <div className="mb-3">
                <MediaGallery
                  attachments={attachments}
                  size="md"
                  maxVisible={4}
                  layout="thumbnails"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {post.category && (
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </Badge>
                )}
                {post.isQuestion && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                  >
                    Question
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <PostLikeButton postId={post.id} size="sm" />
                <Link
                  to="/dashboard/community/post/$postId"
                  params={{ postId: post.id }}
                  className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{commentCount}</span>
                </Link>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border/50">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full bg-background/30 hover:bg-background/50"
              >
                <Link
                  to="/dashboard/community/post/$postId"
                  params={{ postId: post.id }}
                >
                  View Post
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {(isOwner || isAdmin) && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            {isAdmin && (
              <Button
                size="sm"
                variant="ghost"
                className={`h-8 w-8 p-0 ${post.isPinned ? "text-primary hover:text-primary" : ""} hover:bg-accent`}
                onClick={handlePinClick}
                disabled={pinPost.isPending}
                title={post.isPinned ? "Unpin post" : "Pin post"}
              >
                {post.isPinned ? (
                  <PinOff className="h-4 w-4" />
                ) : (
                  <Pin className="h-4 w-4" />
                )}
              </Button>
            )}
            {isOwner && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-accent"
                  onClick={handleEditClick}
                  title="Edit post"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleDeleteClick}
                  title="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </Panel>

      <DeletePostDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        post={post}
      />
    </>
  );
}

function PostListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Panel key={i} className="overflow-hidden p-5">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-muted/50 animate-pulse shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-muted/50 rounded w-24 animate-pulse" />
                <div className="h-3 bg-muted/50 rounded w-16 animate-pulse" />
              </div>
              <div className="h-5 bg-muted/50 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
                <div className="h-4 bg-muted/50 rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 bg-muted/50 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function Community() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: posts, isLoading } = useQuery(
    recentPostsQueryOptions(category)
  );
  const { data: adminData } = useIsAdmin();
  const isAdmin = adminData?.isAdmin ?? false;

  const handleCategoryChange = (newCategory: PostCategory | undefined) => {
    navigate({
      to: "/dashboard/community",
      search: { category: newCategory },
    });
  };

  const getEmptyStateMessage = () => {
    if (category) {
      return `No posts found in the "${category}" category. Try selecting a different category or create a new post.`;
    }
    return "Be the first to share something with the community. Start a discussion, ask a question, or showcase your work.";
  };

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Community", icon: Users },
          ]}
        />

        <div className="flex items-center justify-between">
          <PageTitle
            title="Recent Posts"
            description="Stay connected with the community"
          />
          <Button asChild className="bg-primary/90 hover:bg-primary">
            <Link
              to="/dashboard/community/create-post"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>

        <CategoryFilter
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />

        <section className="space-y-4" aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">
            Community Posts
          </h2>

          {isLoading ? (
            <PostListSkeleton count={5} />
          ) : posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} isAdmin={isAdmin} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MessageSquare className="h-10 w-10 text-primary/60" />}
              title={category ? `No ${category} posts` : "No posts yet"}
              description={getEmptyStateMessage()}
              actionLabel="Create First Post"
              onAction={() => {
                window.location.href = "/dashboard/community/create-post";
              }}
            />
          )}
        </section>
      </div>
    </Page>
  );
}
