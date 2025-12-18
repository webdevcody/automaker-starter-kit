import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getPostAttachmentsFn,
  getCommentAttachmentsFn,
  getAttachmentUrlFn,
  getMultipleAttachmentUrlsFn,
  savePostAttachmentsFn,
  saveCommentAttachmentsFn,
  deleteAttachmentFn,
} from "~/fn/attachments";
import { getErrorMessage } from "~/utils/error";
import type { PostAttachment } from "~/db/schema";

// Query options
export const postAttachmentsQueryOptions = (postId: string) => ({
  queryKey: ["post-attachments", postId],
  queryFn: () => getPostAttachmentsFn({ data: { postId } }),
});

export const commentAttachmentsQueryOptions = (commentId: string) => ({
  queryKey: ["comment-attachments", commentId],
  queryFn: () => getCommentAttachmentsFn({ data: { commentId } }),
});

// Query hooks
export function usePostAttachments(postId: string, enabled = true) {
  return useQuery({
    ...postAttachmentsQueryOptions(postId),
    enabled: enabled && !!postId,
  });
}

export function useCommentAttachments(commentId: string, enabled = true) {
  return useQuery({
    ...commentAttachmentsQueryOptions(commentId),
    enabled: enabled && !!commentId,
  });
}

// Attachment URL hook with caching
export function useAttachmentUrl(fileKey: string | null | undefined) {
  return useQuery({
    queryKey: ["attachment-url", fileKey],
    queryFn: async () => {
      if (!fileKey) return null;
      const { url } = await getAttachmentUrlFn({ data: { fileKey } });
      return url;
    },
    enabled: !!fileKey,
    staleTime: 30 * 60 * 1000, // 30 minutes (presigned URLs last 1 hour)
  });
}

// Multiple attachment URLs hook
export function useAttachmentUrls(attachments: PostAttachment[]) {
  const fileKeys = attachments.map((a) => a.fileKey);

  return useQuery({
    queryKey: ["attachment-urls", fileKeys],
    queryFn: async () => {
      if (fileKeys.length === 0) return {};
      const { urls } = await getMultipleAttachmentUrlsFn({
        data: { fileKeys },
      });
      return urls;
    },
    enabled: fileKeys.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Mutation hooks
export function useSavePostAttachments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Parameters<typeof savePostAttachmentsFn>[0]["data"]
    ) => savePostAttachmentsFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-attachments", variables.postId],
      });
    },
    onError: (error) => {
      toast.error("Failed to save attachments", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useSaveCommentAttachments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Parameters<typeof saveCommentAttachmentsFn>[0]["data"]
    ) => saveCommentAttachmentsFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comment-attachments", variables.commentId],
      });
    },
    onError: (error) => {
      toast.error("Failed to save attachments", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAttachmentFn({ data: { id } }),
    onSuccess: () => {
      // Invalidate all attachment queries
      queryClient.invalidateQueries({ queryKey: ["post-attachments"] });
      queryClient.invalidateQueries({ queryKey: ["comment-attachments"] });
    },
    onError: (error) => {
      toast.error("Failed to delete attachment", {
        description: getErrorMessage(error),
      });
    },
  });
}
