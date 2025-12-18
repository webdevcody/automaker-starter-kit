import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageSquarePlus, Users } from "lucide-react";
import { useCreatePost } from "~/hooks/usePosts";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { PostForm, type PostFormDataWithAttachments } from "~/components/PostForm";

export const Route = createFileRoute("/dashboard/community/create-post")({
  component: CreatePost,
});

function CreatePost() {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();

  const onSubmit = (data: PostFormDataWithAttachments) => {
    createPostMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate({ to: "/dashboard/community", search: { category: undefined } });
  };

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Community", href: "/dashboard/community", search: { category: undefined }, icon: Users },
            { label: "Create Post" },
          ]}
        />
        <PageTitle
          title="Create Post"
          description="Share your thoughts with the community"
        />

        <div className="max-w-2xl">
          <PostForm
            onSubmit={onSubmit}
            isPending={createPostMutation.isPending}
            submitLabel="Publish Post"
            submitIcon={<MessageSquarePlus className="h-4 w-4 mr-2" />}
            onCancel={handleCancel}
            cancelLabel="Cancel"
          />
        </div>
      </div>
    </Page>
  );
}
