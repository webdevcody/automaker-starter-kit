import { queryOptions } from "@tanstack/react-query";
import {
  getMyProfileFn,
  getPublicProfileFn,
} from "~/fn/profiles";

/**
 * Query for current user's profile
 */
export const myProfileQueryOptions = () =>
  queryOptions({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfileFn(),
  });

/**
 * Query for a public profile by user ID
 */
export const publicProfileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["public-profile", userId],
    queryFn: () => getPublicProfileFn({ data: { userId } }),
  });
