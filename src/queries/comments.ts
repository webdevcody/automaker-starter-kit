import { queryOptions } from "@tanstack/react-query";
import {
  getPostCommentsFn,
  getCommentRepliesFn,
  getPostCommentCountFn,
} from "~/fn/comments";

export const postCommentsQueryOptions = (
  postId: string,
  limit: number = 50,
  offset: number = 0
) =>
  queryOptions({
    queryKey: ["post-comments", postId, { limit, offset }],
    queryFn: () => getPostCommentsFn({ data: { postId, limit, offset } }),
  });

export const commentRepliesQueryOptions = (commentId: string) =>
  queryOptions({
    queryKey: ["comment-replies", commentId],
    queryFn: () => getCommentRepliesFn({ data: { commentId } }),
  });

export const postCommentCountQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post-comment-count", postId],
    queryFn: () => getPostCommentCountFn({ data: { postId } }),
  });
