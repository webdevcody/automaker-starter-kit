import { queryOptions } from "@tanstack/react-query";
import {
  getPostReactionStatusFn,
  getPostLikeCountFn,
  getCommentReactionStatusFn,
  getCommentLikeCountFn,
} from "~/fn/reactions";

// Post reaction queries
export const getPostReactionStatusQuery = (postId: string) =>
  queryOptions({
    queryKey: ["post-reaction-status", postId],
    queryFn: () => getPostReactionStatusFn({ data: { postId } }),
  });

export const getPostLikeCountQuery = (postId: string) =>
  queryOptions({
    queryKey: ["post-like-count", postId],
    queryFn: () => getPostLikeCountFn({ data: { postId } }),
  });

// Comment reaction queries
export const getCommentReactionStatusQuery = (commentId: string) =>
  queryOptions({
    queryKey: ["comment-reaction-status", commentId],
    queryFn: () => getCommentReactionStatusFn({ data: { commentId } }),
  });

export const getCommentLikeCountQuery = (commentId: string) =>
  queryOptions({
    queryKey: ["comment-like-count", commentId],
    queryFn: () => getCommentLikeCountFn({ data: { commentId } }),
  });
