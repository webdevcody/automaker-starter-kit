import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Loader2, MessageSquarePlus, Save } from "lucide-react";
import { POST_CATEGORIES } from "~/fn/posts";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MediaUploadToggle } from "~/components/MediaUploadToggle";
import { AttachmentPreviewGrid } from "~/components/AttachmentPreviewGrid";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";
import { revokeFilePreview } from "~/utils/storage/media-helpers";
import type { PostAttachment } from "~/db/schema";
import { useAttachmentUrls } from "~/hooks/useAttachments";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters"),
  category: z.enum(POST_CATEGORIES),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export interface PostFormDataWithAttachments extends PostFormData {
  attachments: MediaUploadResult[];
  deletedAttachmentIds?: string[];
}

export const CATEGORY_LABELS: Record<(typeof POST_CATEGORIES)[number], string> =
  {
    general: "General",
    question: "Question",
    discussion: "Discussion",
    announcement: "Announcement",
    feedback: "Feedback",
    showcase: "Showcase",
  };

export const CATEGORY_DESCRIPTIONS: Record<
  (typeof POST_CATEGORIES)[number],
  string
> = {
  general: "General topics and conversations",
  question: "Ask the community for help",
  discussion: "Start a discussion on a topic",
  announcement: "Share important updates",
  feedback: "Share feedback or suggestions",
  showcase: "Show off your work",
};

interface PostFormProps {
  defaultValues?: Partial<PostFormData>;
  onSubmit: (data: PostFormDataWithAttachments) => void | Promise<void>;
  isPending?: boolean;
  submitLabel?: string;
  submitIcon?: React.ReactNode;
  onCancel?: () => void;
  cancelLabel?: string;
  showMediaUpload?: boolean;
  existingAttachments?: PostAttachment[];
}

export function PostForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Publish Post",
  submitIcon = <MessageSquarePlus className="h-4 w-4 mr-2" />,
  onCancel,
  cancelLabel = "Cancel",
  showMediaUpload = true,
  existingAttachments = [],
}: PostFormProps) {
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResult[]>([]);
  const [deletedAttachmentIds, setDeletedAttachmentIds] = useState<string[]>(
    []
  );

  // Filter out deleted attachments for display
  const visibleExistingAttachments = existingAttachments.filter(
    (att) => !deletedAttachmentIds.includes(att.id)
  );

  // Fetch URLs for existing attachments
  const { data: existingUrlMap = {} } = useAttachmentUrls(
    visibleExistingAttachments
  );

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "general",
      ...defaultValues,
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
      // Revoke the preview URL when removing
      if (media?.previewUrl) {
        revokeFilePreview(media.previewUrl);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const removeExistingAttachment = (id: string) => {
    setDeletedAttachmentIds((prev) => [...prev, id]);
  };

  const handleSubmit = async (data: PostFormData) => {
    await onSubmit({
      ...data,
      attachments: uploadedMedia,
      deletedAttachmentIds:
        deletedAttachmentIds.length > 0 ? deletedAttachmentIds : undefined,
    });
    // Cleanup preview URLs after successful submission
    uploadedMedia.forEach((media) => {
      if (media.previewUrl) {
        revokeFilePreview(media.previewUrl);
      }
    });
  };

  const totalAttachments =
    visibleExistingAttachments.length + uploadedMedia.length;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {POST_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex flex-col">
                        <span>{CATEGORY_LABELS[category]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {CATEGORY_DESCRIPTIONS[field.value]}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Give your post a title"
                  className="h-11 text-base"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/200 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Content *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[200px] text-base resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/10000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media Upload Section */}
        {showMediaUpload && (
          <div className="space-y-3">
            {/* Existing and Uploaded Media Preview */}
            <AttachmentPreviewGrid
              existingAttachments={visibleExistingAttachments}
              uploadedAttachments={uploadedMedia}
              existingUrlMap={existingUrlMap}
              deletedAttachmentIds={deletedAttachmentIds}
              size="lg"
              showDelete={true}
              onDeleteExisting={removeExistingAttachment}
              onDeleteUploaded={removeUploadedMedia}
              deleteDisabled={isPending}
              label={totalAttachments > 0 ? "Attached Media" : undefined}
            />

            {/* Toggle dropzone button or dropzone */}
            <MediaUploadToggle
              onUploadsComplete={handleUploadsComplete}
              maxFiles={10}
              currentAttachmentCount={totalAttachments}
              disabled={isPending}
              buttonVariant="outline"
              buttonClassName="w-full"
              buttonLabel="Add Images or Videos"
              maxFilesReachedLabel="Maximum files reached"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 pt-4 border-t border-border">
          <div className="flex gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isPending}
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {submitIcon}
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
