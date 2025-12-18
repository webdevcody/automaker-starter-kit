import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  postCommentsQueryOptions,
  commentRepliesQueryOptions,
  postCommentCountQueryOptions,
} from "~/queries/comments";
import {
  createCommentFn,
  updateCommentFn,
  deleteCommentFn,
} from "~/fn/comments";
import { saveCommentAttachmentsFn } from "~/fn/attachments";
import { updateCommentAttachments } from "~/utils/attachments";
import { getErrorMessage } from "~/utils/error";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";

// Query hooks
export function usePostComments(postId: string, enabled = true) {
  return useQuery({
    ...postCommentsQueryOptions(postId),
    enabled: enabled && !!postId,
  });
}

export function useCommentReplies(commentId: string, enabled = true) {
  return useQuery({
    ...commentRepliesQueryOptions(commentId),
    enabled: enabled && !!commentId,
  });
}

export function usePostCommentCount(postId: string, enabled = true) {
  return useQuery({
    ...postCommentCountQueryOptions(postId),
    enabled: enabled && !!postId,
  });
}

// Mutation hooks
interface CreateCommentData {
  postId: string;
  content: string;
  parentCommentId?: string;
  attachments?: MediaUploadResult[];
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentData) => {
      const { attachments, ...commentData } = data;

      // Create the comment
      const newComment = await createCommentFn({ data: commentData });

      // If there are attachments, save them
      if (attachments && attachments.length > 0) {
        await saveCommentAttachmentsFn({
          data: {
            commentId: newComment.id,
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

      return newComment;
    },
    onSuccess: (_, variables) => {
      toast.success("Comment posted successfully");
      // Invalidate comments list
      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.postId],
      });
      // Invalidate comment count
      queryClient.invalidateQueries({
        queryKey: ["post-comment-count", variables.postId],
      });
      // If it's a reply, also invalidate the parent's replies
      if (variables.parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: ["comment-replies", variables.parentCommentId],
        });
      }
      // Invalidate comment attachments
      queryClient.invalidateQueries({
        queryKey: ["comment-attachments"],
      });
    },
    onError: (error) => {
      toast.error("Failed to post comment", {
        description: getErrorMessage(error),
      });
    },
  });
}

interface UpdateCommentData {
  id: string;
  content: string;
  newAttachments?: MediaUploadResult[];
  deletedAttachmentIds?: string[];
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCommentData) => {
      const { newAttachments, deletedAttachmentIds, ...commentData } = data;

      // Update the comment
      const updatedComment = await updateCommentFn({ data: commentData });

      // Update attachments (delete removed, add new)
      await updateCommentAttachments(updatedComment.id, {
        newAttachments,
        deletedAttachmentIds,
      });

      return updatedComment;
    },
    onSuccess: (updatedComment) => {
      toast.success("Comment updated successfully");
      // Invalidate all comment queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment-replies"] });
      queryClient.invalidateQueries({
        queryKey: ["comment-attachments", updatedComment.id],
      });
    },
    onError: (error) => {
      toast.error("Failed to update comment", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCommentFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      // Invalidate all comment queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment-replies"] });
      queryClient.invalidateQueries({ queryKey: ["post-comment-count"] });
    },
    onError: (error) => {
      toast.error("Failed to delete comment", {
        description: getErrorMessage(error),
      });
    },
  });
}
