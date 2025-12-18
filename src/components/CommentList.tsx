import { MessageSquare } from "lucide-react";
import { usePostComments, usePostCommentCount } from "~/hooks/useComments";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { authClient } from "~/lib/auth-client";

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data: comments = [], isLoading: commentsLoading } =
    usePostComments(postId);
  const { data: commentCount = 0 } = usePostCommentCount(postId);
  const { data: session } = authClient.useSession();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">
          Comments ({commentCount})
        </h2>
      </div>

      {/* Comment Form */}
      {session?.user && (
        <CommentForm postId={postId} />
      )}

      {!session?.user && (
        <p className="text-sm text-muted-foreground">
          Sign in to leave a comment.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-3">
        {commentsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-muted rounded-lg h-24"
              />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              currentUserId={session?.user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
