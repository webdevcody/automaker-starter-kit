import { LikeButton } from "./LikeButton";
import {
  usePostReactionStatus,
  useTogglePostReaction,
} from "~/hooks/useReactions";

interface PostLikeButtonProps {
  postId: string;
  size?: "sm" | "default";
  className?: string;
}

export function PostLikeButton({
  postId,
  size = "default",
  className,
}: PostLikeButtonProps) {
  const { data: reactionStatus, isLoading: statusLoading } =
    usePostReactionStatus(postId);
  const toggleReaction = useTogglePostReaction();

  const handleToggle = () => {
    toggleReaction.mutate(postId);
  };

  return (
    <LikeButton
      isLiked={reactionStatus?.isLiked ?? false}
      likeCount={reactionStatus?.likeCount ?? 0}
      isLoading={statusLoading || toggleReaction.isPending}
      onClick={handleToggle}
      size={size}
      className={className}
    />
  );
}
