import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useUpdateComment } from "~/hooks/useComments";
import {
  useCommentAttachments,
  useAttachmentUrls,
} from "~/hooks/useAttachments";
import type { CommentWithUser } from "~/data-access/comments";
import { Loader2 } from "lucide-react";
import { MediaUploadToggle } from "~/components/MediaUploadToggle";
import { AttachmentPreviewGrid } from "~/components/AttachmentPreviewGrid";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";
import { revokeFilePreview } from "~/utils/storage/media-helpers";

const editCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(5000, "Comment must be less than 5000 characters"),
});

type EditCommentFormData = z.infer<typeof editCommentSchema>;

interface EditCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: CommentWithUser | null;
}

export function EditCommentDialog({
  open,
  onOpenChange,
  comment,
}: EditCommentDialogProps) {
  const updateCommentMutation = useUpdateComment();
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResult[]>([]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [deletedAttachmentIds, setDeletedAttachmentIds] = useState<string[]>(
    []
  );

  // Fetch existing attachments
  const { data: existingAttachments = [], isLoading: attachmentsLoading } =
    useCommentAttachments(comment?.id || "", open && !!comment?.id);

  // Filter out deleted attachments for display
  const visibleExistingAttachments = existingAttachments.filter(
    (att) => !deletedAttachmentIds.includes(att.id)
  );

  // Fetch URLs for existing attachments
  const { data: existingUrlMap = {} } = useAttachmentUrls(
    visibleExistingAttachments
  );

  const form = useForm<EditCommentFormData>({
    resolver: zodResolver(editCommentSchema),
    defaultValues: {
      content: comment?.content || "",
    },
  });

  // Reset form and media state when comment changes or dialog opens
  useEffect(() => {
    if (comment && open) {
      form.reset({ content: comment.content });
      setUploadedMedia([]);
      setDeletedAttachmentIds([]);
      setShowDropzone(false);
    }
  }, [comment, open, form]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      uploadedMedia.forEach((media) => {
        if (media.previewUrl) {
          revokeFilePreview(media.previewUrl);
        }
      });
    };
  }, []);

  const handleUploadsComplete = (results: MediaUploadResult[]) => {
    setUploadedMedia((prev) => [...prev, ...results]);
  };

  const removeUploadedMedia = (id: string) => {
    setUploadedMedia((prev) => {
      const media = prev.find((m) => m.id === id);
      if (media?.previewUrl) {
        revokeFilePreview(media.previewUrl);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const removeExistingAttachment = (id: string) => {
    setDeletedAttachmentIds((prev) => [...prev, id]);
  };

  const totalAttachments =
    visibleExistingAttachments.length + uploadedMedia.length;

  const onSubmit = (data: EditCommentFormData) => {
    if (comment) {
      updateCommentMutation.mutate(
        {
          id: comment.id,
          content: data.content,
          newAttachments: uploadedMedia.length > 0 ? uploadedMedia : undefined,
          deletedAttachmentIds:
            deletedAttachmentIds.length > 0 ? deletedAttachmentIds : undefined,
        },
        {
          onSuccess: () => {
            // Cleanup preview URLs
            uploadedMedia.forEach((media) => {
              if (media.previewUrl) {
                revokeFilePreview(media.previewUrl);
              }
            });
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Edit your comment..."
                      className="min-h-[100px] resize-none"
                      disabled={updateCommentMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media Section */}
            <div className="space-y-3">
              <AttachmentPreviewGrid
                existingAttachments={visibleExistingAttachments}
                uploadedAttachments={uploadedMedia}
                existingUrlMap={existingUrlMap}
                deletedAttachmentIds={deletedAttachmentIds}
                size="md"
                showDelete={true}
                onDeleteExisting={removeExistingAttachment}
                onDeleteUploaded={removeUploadedMedia}
                deleteDisabled={updateCommentMutation.isPending}
                isLoading={attachmentsLoading}
                label={totalAttachments > 0 ? "Attached Media" : undefined}
              />

              {/* Toggle dropzone button or dropzone */}
              <MediaUploadToggle
                onUploadsComplete={handleUploadsComplete}
                maxFiles={5}
                currentAttachmentCount={totalAttachments}
                disabled={updateCommentMutation.isPending}
                buttonVariant="ghost"
                buttonSize="sm"
                buttonClassName="text-muted-foreground"
                buttonLabel="Add media"
                maxFilesReachedLabel="Maximum files reached"
                compact={false}
                showDropzone={showDropzone}
                onShowDropzoneChange={setShowDropzone}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateCommentMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateCommentMutation.isPending}>
                {updateCommentMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
