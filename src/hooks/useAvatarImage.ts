import { useQuery } from "@tanstack/react-query";
import { getImageUrlQuery } from "~/queries/storage";

/**
 * Hook to fetch avatar image URL from R2 bucket
 * @param imageKey - The image key from the user's profile (can be null)
 * @returns Object with avatarUrl, isLoading, error, and refetch
 */
export function useAvatarImage(imageKey: string | null) {
  const avatarQuery = useQuery({
    ...getImageUrlQuery(imageKey || ""),
    enabled: !!imageKey,
  });

  return {
    avatarUrl: (avatarQuery.data?.imageUrl as string | undefined) || null,
    isLoading: avatarQuery.isLoading,
    error: avatarQuery.error,
    refetch: avatarQuery.refetch,
  };
}
