import { useState } from "react";
import { Clock, MessageSquare, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { UserAvatarLink } from "~/components/UserAvatarLink";
import { UserNameLink } from "~/components/UserNameLink";
import { formatRelativeTime } from "~/utils/song";
import type { CommentWithUser } from "~/data-access/comments";
import { CommentForm } from "./CommentForm";
import { useCommentReplies } from "~/hooks/useComments";
import { useCommentAttachments } from "~/hooks/useAttachments";
import { EditCommentDialog } from "./EditCommentDialog";
import { DeleteCommentDialog } from "./DeleteCommentDialog";
import { CommentLikeButton } from "./CommentLikeButton";
import { MediaGallery } from "./MediaGallery";

const MAX_VISIBLE_COMMENT_ATTACHMENTS = 5;

interface CommentItemProps {
  comment: CommentWithUser;
  postId: string;
  currentUserId?: string;
  depth?: number;
  maxDepth?: number;
}

export function CommentItem({
  comment,
  postId,
  currentUserId,
  depth = 0,
  maxDepth = 3,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: replies = [], isLoading: repliesLoading } = useCommentReplies(
    comment.id,
    showReplies
  );
  const { data: attachments = [] } = useCommentAttachments(comment.id);

  const isOwner = currentUserId === comment.userId;
  const canReply = depth < maxDepth;
  const hasReplies = replies.length > 0;
  const isEdited =
    comment.updatedAt &&
    comment.createdAt &&
    new Date(comment.updatedAt).getTime() -
      new Date(comment.createdAt).getTime() >
      1000;

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex gap-3">
            <UserAvatarLink
              userId={comment.user.id}
              imageKey={comment.user.image}
              name={comment.user.name}
              size="sm"
              className="shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <UserNameLink
                  userId={comment.user.id}
                  name={comment.user.name}
                  className="text-sm"
                />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(
                    new Date(comment.createdAt).toISOString()
                  )}
                </span>
                {isEdited && (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground mt-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
              {/* Comment Attachments */}
              {attachments.length > 0 && (
                <div className="mt-2">
                  <MediaGallery
                    attachments={attachments}
                    size="md"
                    maxVisible={MAX_VISIBLE_COMMENT_ATTACHMENTS}
                    layout="thumbnails"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <CommentLikeButton commentId={comment.id} size="sm" />
                {canReply && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                )}
                {isOwner && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setEditDialogOpen(true)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-destructive hover:text-destructive"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-2 ml-6">
          <CommentForm
            postId={postId}
            parentCommentId={comment.id}
            placeholder={`Reply to ${comment.user.name}...`}
            autoFocus
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      {hasReplies && (
        <div className="mt-2 space-y-2">
          {repliesLoading ? (
            <div className="ml-6 text-sm text-muted-foreground">
              Loading replies...
            </div>
          ) : (
            replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                currentUserId={currentUserId}
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            ))
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <EditCommentDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        comment={comment}
      />

      {/* Delete Dialog */}
      <DeleteCommentDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        comment={comment}
      />
    </div>
  );
}
