import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useCreateComment } from "~/hooks/useComments";
import { Loader2, Send } from "lucide-react";
import { MediaUploadToggle } from "~/components/MediaUploadToggle";
import { AttachmentPreviewGrid } from "~/components/AttachmentPreviewGrid";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";
import { revokeFilePreview } from "~/utils/storage/media-helpers";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(5000, "Comment must be less than 5000 characters"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
  onSuccess?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  showMediaUpload?: boolean;
}

export function CommentForm({
  postId,
  parentCommentId,
  onSuccess,
  placeholder = "Write a comment...",
  autoFocus = false,
  showMediaUpload = true,
}: CommentFormProps) {
  const createCommentMutation = useCreateComment();
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResult[]>([]);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

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

  const onSubmit = (data: CommentFormData) => {
    createCommentMutation.mutate(
      {
        postId,
        content: data.content,
        parentCommentId,
        attachments: uploadedMedia,
      },
      {
        onSuccess: () => {
          // Cleanup preview URLs
          uploadedMedia.forEach((media) => {
            if (media.previewUrl) {
              revokeFilePreview(media.previewUrl);
            }
          });
          form.reset();
          setUploadedMedia([]);
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="min-h-[80px] resize-none"
                  disabled={createCommentMutation.isPending}
                  autoFocus={autoFocus}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media Upload Section */}
        {showMediaUpload && (
          <div className="space-y-2">
            {/* Uploaded Media Preview */}
            <AttachmentPreviewGrid
              uploadedAttachments={uploadedMedia}
              size="md"
              showDelete={true}
              onDeleteUploaded={removeUploadedMedia}
              deleteDisabled={createCommentMutation.isPending}
            />

            {/* Toggle dropzone */}
            <MediaUploadToggle
              onUploadsComplete={handleUploadsComplete}
              maxFiles={5}
              currentAttachmentCount={uploadedMedia.length}
              disabled={createCommentMutation.isPending}
              buttonVariant="ghost"
              buttonSize="sm"
              buttonClassName="text-muted-foreground"
              buttonLabel="Add media"
              compact={false}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createCommentMutation.isPending}
            size="sm"
          >
            {createCommentMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
