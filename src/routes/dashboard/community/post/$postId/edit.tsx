import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, MessageSquare, Save } from "lucide-react";
import { useUpdatePost } from "~/hooks/usePosts";
import { postQueryOptions } from "~/queries/posts";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { PostForm, type PostFormDataWithAttachments } from "~/components/PostForm";
import { authClient } from "~/lib/auth-client";
import { POST_CATEGORIES, type PostCategory } from "~/fn/posts";
import { usePostAttachments } from "~/hooks/useAttachments";

export const Route = createFileRoute("/dashboard/community/post/$postId/edit")({
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    await queryClient.prefetchQuery(postQueryOptions(postId));
  },
  component: EditPost,
});

function EditPost() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useQuery(postQueryOptions(postId));
  const { data: existingAttachments = [], isLoading: attachmentsLoading } = usePostAttachments(postId);
  const { data: session } = authClient.useSession();
  const updatePostMutation = useUpdatePost();

  const isOwner = session?.user?.id === post?.userId;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Community", href: "/dashboard/community", search: { category: undefined }, icon: Users },
    { label: post?.title || "Post", href: `/dashboard/community/post/${postId}` },
    { label: "Edit" },
  ];

  const handleSubmit = async (data: PostFormDataWithAttachments) => {
    if (!postId) return;

    const { attachments, deletedAttachmentIds, ...postData } = data;

    updatePostMutation.mutate(
      {
        id: postId,
        ...postData,
        newAttachments: attachments,
        deletedAttachmentIds,
      },
      {
        onSuccess: () => {
          navigate({ to: `/dashboard/community/post/${postId}` });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate({ to: `/dashboard/community/post/${postId}` });
  };

  if (isLoading || attachmentsLoading) {
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

  if (!isOwner) {
    return (
      <Page>
        <div className="text-center space-y-4 py-12">
          <h1 className="text-2xl font-bold text-destructive">Unauthorized</h1>
          <p className="text-muted-foreground">
            You can only edit your own posts.
          </p>
          <Link
            to="/dashboard/community/post/$postId"
            params={{ postId }}
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Back to Post
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb items={breadcrumbItems} />
        <PageTitle
          title="Edit Post"
          description="Update your post content and details"
        />

        <div className="max-w-2xl">
          <PostForm
            defaultValues={{
              title: post.title || "",
              content: post.content,
              category:
                post.category &&
                POST_CATEGORIES.includes(post.category as PostCategory)
                  ? (post.category as PostCategory)
                  : ("general" as PostCategory),
            }}
            onSubmit={handleSubmit}
            isPending={updatePostMutation.isPending}
            submitLabel="Save Changes"
            submitIcon={<Save className="h-4 w-4 mr-2" />}
            onCancel={handleCancel}
            cancelLabel="Cancel"
            showMediaUpload={true}
            existingAttachments={existingAttachments}
          />
        </div>
      </div>
    </Page>
  );
}
