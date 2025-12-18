import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { togglePostReactionFn, toggleCommentReactionFn } from "~/fn/reactions";
import {
  getPostReactionStatusQuery,
  getPostLikeCountQuery,
  getCommentReactionStatusQuery,
  getCommentLikeCountQuery,
} from "~/queries/reactions";

// Post reaction hooks
export function usePostReactionStatus(postId: string, enabled = true) {
  return useQuery({
    ...getPostReactionStatusQuery(postId),
    enabled,
  });
}

export function usePostLikeCount(postId: string, enabled = true) {
  return useQuery({
    ...getPostLikeCountQuery(postId),
    enabled,
  });
}

export function useTogglePostReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => togglePostReactionFn({ data: { postId } }),
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["post-reaction-status", postId],
      });
      await queryClient.cancelQueries({
        queryKey: ["post-like-count", postId],
      });

      // Snapshot the previous value
      const previousStatus = queryClient.getQueryData<{
        isLiked: boolean;
        likeCount: number;
      }>(["post-reaction-status", postId]);

      // Optimistically update
      if (previousStatus) {
        queryClient.setQueryData(["post-reaction-status", postId], {
          isLiked: !previousStatus.isLiked,
          likeCount: previousStatus.isLiked
            ? previousStatus.likeCount - 1
            : previousStatus.likeCount + 1,
        });
        queryClient.setQueryData(["post-like-count", postId], {
          likeCount: previousStatus.isLiked
            ? previousStatus.likeCount - 1
            : previousStatus.likeCount + 1,
        });
      }

      return { previousStatus };
    },
    onError: (_err, postId, context) => {
      // Rollback on error
      if (context?.previousStatus) {
        queryClient.setQueryData(
          ["post-reaction-status", postId],
          context.previousStatus
        );
        queryClient.setQueryData(["post-like-count", postId], {
          likeCount: context.previousStatus.likeCount,
        });
      }
    },
    onSettled: (_data, _error, postId) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({
        queryKey: ["post-reaction-status", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-like-count", postId],
      });
    },
  });
}

// Comment reaction hooks
export function useCommentReactionStatus(commentId: string, enabled = true) {
  return useQuery({
    ...getCommentReactionStatusQuery(commentId),
    enabled,
  });
}

export function useCommentLikeCount(commentId: string, enabled = true) {
  return useQuery({
    ...getCommentLikeCountQuery(commentId),
    enabled,
  });
}

export function useToggleCommentReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      toggleCommentReactionFn({ data: { commentId } }),
    onMutate: async (commentId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["comment-reaction-status", commentId],
      });
      await queryClient.cancelQueries({
        queryKey: ["comment-like-count", commentId],
      });

      // Snapshot the previous value
      const previousStatus = queryClient.getQueryData<{
        isLiked: boolean;
        likeCount: number;
      }>(["comment-reaction-status", commentId]);

      // Optimistically update
      if (previousStatus) {
        queryClient.setQueryData(["comment-reaction-status", commentId], {
          isLiked: !previousStatus.isLiked,
          likeCount: previousStatus.isLiked
            ? previousStatus.likeCount - 1
            : previousStatus.likeCount + 1,
        });
        queryClient.setQueryData(["comment-like-count", commentId], {
          likeCount: previousStatus.isLiked
            ? previousStatus.likeCount - 1
            : previousStatus.likeCount + 1,
        });
      }

      return { previousStatus };
    },
    onError: (_err, commentId, context) => {
      // Rollback on error
      if (context?.previousStatus) {
        queryClient.setQueryData(
          ["comment-reaction-status", commentId],
          context.previousStatus
        );
        queryClient.setQueryData(["comment-like-count", commentId], {
          likeCount: context.previousStatus.likeCount,
        });
      }
    },
    onSettled: (_data, _error, commentId) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({
        queryKey: ["comment-reaction-status", commentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["comment-like-count", commentId],
      });
    },
  });
}
