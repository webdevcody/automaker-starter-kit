import { LikeButton } from "./LikeButton";
import {
  useCommentReactionStatus,
  useToggleCommentReaction,
} from "~/hooks/useReactions";

interface CommentLikeButtonProps {
  commentId: string;
  size?: "sm" | "default";
  className?: string;
}

export function CommentLikeButton({
  commentId,
  size = "sm",
  className,
}: CommentLikeButtonProps) {
  const { data: reactionStatus, isLoading: statusLoading } =
    useCommentReactionStatus(commentId);
  const toggleReaction = useToggleCommentReaction();

  const handleToggle = () => {
    toggleReaction.mutate(commentId);
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
