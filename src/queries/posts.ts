import { queryOptions } from "@tanstack/react-query";
import {
  getRecentPostsFn,
  getPostByIdFn,
  getUserPostsFn,
  checkIsAdminFn,
  type PostCategory,
} from "~/fn/posts";

export const recentPostsQueryOptions = (category?: PostCategory) =>
  queryOptions({
    queryKey: ["community-posts", "recent", category ?? "all"],
    queryFn: () => getRecentPostsFn({ data: category ? { category } : undefined }),
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["community-post", postId],
    queryFn: () => getPostByIdFn({ data: { id: postId } }),
  });

export const userPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["community-posts", "user"],
    queryFn: () => getUserPostsFn(),
  });

export const isAdminQueryOptions = () =>
  queryOptions({
    queryKey: ["user", "isAdmin"],
    queryFn: () => checkIsAdminFn(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });