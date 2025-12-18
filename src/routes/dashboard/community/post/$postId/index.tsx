import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Home, Users, Clock, Trash2, Edit, Pin, PinOff } from "lucide-react";
import { Page } from "~/components/Page";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { postQueryOptions } from "~/queries/posts";
import { formatRelativeTime } from "~/utils/song";
import { authClient } from "~/lib/auth-client";
import { DeletePostDialog } from "~/components/DeletePostDialog";
import { UserAvatarLink } from "~/components/UserAvatarLink";
import { UserNameLink } from "~/components/UserNameLink";
import { CommentList } from "~/components/CommentList";
import { useIsAdmin, usePinPost } from "~/hooks/usePosts";
import { PostLikeButton } from "~/components/PostLikeButton";
import { MediaGallery } from "~/components/MediaGallery";
import { usePostAttachments } from "~/hooks/useAttachments";

const MAX_VISIBLE_ATTACHMENTS = 6;

export const Route = createFileRoute("/dashboard/community/post/$postId/")({
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    // Use prefetchQuery instead of ensureQueryData to avoid throwing on errors
    // The component will handle the error state
    await queryClient.prefetchQuery(postQueryOptions(postId));
  },
  component: PostDetail,
});

function getCategoryVariant(
  category: string | null
): "default" | "secondary" | "outline" {
  switch (category) {
    case "announcement":
      return "default";
    case "question":
      return "secondary";
    default:
      return "outline";
  }
}

function PostDetail() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useQuery(postQueryOptions(postId));
  const { data: session } = authClient.useSession();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: adminData } = useIsAdmin();
  const pinPost = usePinPost();
  const { data: attachments = [] } = usePostAttachments(postId);
  const isOwner = session?.user?.id === post?.userId;
  const isAdmin = adminData?.isAdmin ?? false;

  const handleEditClick = () => {
    navigate({ to: `/dashboard/community/post/$postId/edit`, params: { postId } });
  };

  const handlePinClick = () => {
    if (post) {
      pinPost.mutate({ id: post.id, isPinned: !post.isPinned });
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    {
      label: "Community",
      href: "/dashboard/community",
      search: { category: undefined },
      icon: Users,
    },
    { label: post?.title || "Post" },
  ];

  if (isLoading) {
    return (
      <Page>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </Page>
    );
  }

  if (error || !post) {
    return (
      <Page>
        <div className="text-center space-y-4 py-12">
          <h1 className="text-2xl font-bold text-destructive">
            Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/dashboard/community"
            search={{ category: undefined }}
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Back to Community
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="space-y-8 max-w-4xl mx-auto">
        <AppBreadcrumb items={breadcrumbItems} />

        {/* Main Post */}
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                {/* Category and Pinned Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {post.category && (
                    <Badge variant={getCategoryVariant(post.category)}>
                      {post.category}
                    </Badge>
                  )}
                  {post.isPinned && (
                    <Badge variant="secondary" className="gap-1">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </Badge>
                  )}
                </div>

                {/* Title */}
                {post.title && (
                  <h1 className="text-3xl font-bold">{post.title}</h1>
                )}

                {/* Author and Timestamp */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <UserAvatarLink
                      userId={post.user.id}
                      imageKey={post.user.image}
                      name={post.user.name}
                      size="md"
                    />
                    <div>
                      <UserNameLink
                        userId={post.user.id}
                        name={post.user.name}
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatRelativeTime(
                            new Date(post.createdAt).toISOString()
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {(isOwner || isAdmin) && (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${post.isPinned ? "text-primary hover:text-primary" : ""} hover:bg-accent`}
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
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent"
                        onClick={handleEditClick}
                        title="Edit post"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteDialogOpen(true)}
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Post Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Post Attachments */}
            {attachments.length > 0 && (
              <MediaGallery
                attachments={attachments}
                size="lg"
                maxVisible={MAX_VISIBLE_ATTACHMENTS}
                layout="thumbnails"
                className="mt-4"
              />
            )}

            {/* Like Button */}
            <div className="pt-2 border-t border-border">
              <PostLikeButton postId={post.id} />
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <CommentList postId={postId} />

        {/* Delete Post Dialog */}
        {post && (
          <DeletePostDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            post={post}
          />
        )}
      </div>
    </Page>
  );
}
