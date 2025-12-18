import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  recentPostsQueryOptions,
  postQueryOptions,
  userPostsQueryOptions,
  isAdminQueryOptions,
} from "~/queries/posts";
import {
  createPostFn,
  updatePostFn,
  deletePostFn,
  pinPostFn,
  type PostCategory,
} from "~/fn/posts";
import { savePostAttachmentsFn } from "~/fn/attachments";
import { updatePostAttachments } from "~/utils/attachments";
import { getErrorMessage } from "~/utils/error";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";

// Query hooks
export function useRecentPosts(category?: PostCategory, enabled = true) {
  return useQuery({
    ...recentPostsQueryOptions(category),
    enabled,
  });
}

export function usePost(postId: string, enabled = true) {
  return useQuery({
    ...postQueryOptions(postId),
    enabled: enabled && !!postId,
  });
}

export function useUserPosts(enabled = true) {
  return useQuery({
    ...userPostsQueryOptions(),
    enabled,
  });
}

export function useIsAdmin(enabled = true) {
  return useQuery({
    ...isAdminQueryOptions(),
    enabled,
  });
}

// Mutation hooks
interface CreatePostData {
  title?: string;
  content: string;
  category?: PostCategory;
  attachments?: MediaUploadResult[];
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const { attachments, ...postData } = data;

      // Create the post
      const newPost = await createPostFn({ data: postData });

      // If there are attachments, save them
      if (attachments && attachments.length > 0) {
        await savePostAttachmentsFn({
          data: {
            postId: newPost.id,
            attachments: attachments.map((att, index) => ({
              id: att.id,
              fileKey: att.fileKey,
              fileName: att.fileName,
              fileSize: att.fileSize,
              mimeType: att.mimeType,
              type: att.type,
              position: index,
            })),
          },
        });
      }

      return newPost;
    },
    onSuccess: () => {
      toast.success("Post created successfully!", {
        description: "Your post has been published to the community.",
      });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      navigate({ to: "/dashboard/community", search: { category: undefined } });
    },
    onError: (error) => {
      toast.error("Failed to create post", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Hook for updating posts
interface UpdatePostData {
  id: string;
  title?: string;
  content: string;
  category?: PostCategory;
  newAttachments?: MediaUploadResult[];
  deletedAttachmentIds?: string[];
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePostData) => {
      const { newAttachments, deletedAttachmentIds, ...postData } = data;

      // Update the post
      const updatedPost = await updatePostFn({ data: postData });

      // Update attachments (delete removed, add new)
      await updatePostAttachments(updatedPost.id, {
        newAttachments,
        deletedAttachmentIds,
      });

      return updatedPost;
    },
    onSuccess: (updatedPost) => {
      toast.success("Post updated successfully", {
        description: "Your changes have been saved.",
      });
      // Invalidate all post-related queries
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["community-post", updatedPost.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-attachments", updatedPost.id],
      });
    },
    onError: (error) => {
      toast.error("Failed to update post", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Hook for deleting posts
export function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => deletePostFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Post deleted successfully", {
        description: "Your post has been removed from the community.",
      });
      // Invalidate all post-related queries
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({ queryKey: ["community-post"] });
      // Navigate back to community page if on post detail page
      navigate({ to: "/dashboard/community", search: { category: undefined } });
    },
    onError: (error) => {
      toast.error("Failed to delete post", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Hook for pinning/unpinning posts (admin only)
export function usePinPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; isPinned: boolean }) =>
      pinPostFn({ data }),
    onSuccess: (updatedPost) => {
      const action = updatedPost.isPinned ? "pinned" : "unpinned";
      toast.success(`Post ${action} successfully`, {
        description: `The post has been ${action}.`,
      });
      // Invalidate all post-related queries
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["community-post", updatedPost.id],
      });
    },
    onError: (error) => {
      toast.error("Failed to update pin status", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Combined hook for post management
export function usePostManagement() {
  const queryClient = useQueryClient();

  const invalidatePostsData = (postId?: string) => {
    queryClient.invalidateQueries({ queryKey: ["community-posts"] });

    if (postId) {
      queryClient.invalidateQueries({ queryKey: ["community-post", postId] });
    }
  };

  const refreshPosts = () => {
    queryClient.invalidateQueries({ queryKey: ["community-posts"] });
  };

  const refreshPost = (postId: string) => {
    queryClient.invalidateQueries({ queryKey: ["community-post", postId] });
  };

  return {
    posts: useRecentPosts(),
    invalidatePostsData,
    refreshPosts,
    refreshPost,
  };
}
