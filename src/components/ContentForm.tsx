import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Video, FileText, Image, File, CheckSquare } from "lucide-react";
import { useState } from "react";
import { MODULE_CONTENT_TYPES, type ModuleContentType } from "~/fn/modules";
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
import { useGetUploadUrl, useConfirmUpload } from "~/hooks/useStorage";

export const contentFormSchema = z.object({
  type: z.enum(MODULE_CONTENT_TYPES),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
});

export type ContentFormData = z.infer<typeof contentFormSchema>;

export interface ContentSubmitData {
  type: ModuleContentType;
  title: string;
  description?: string;
  fileKey?: string;
  url?: string;
  content?: string;
}

const CONTENT_TYPE_LABELS: Record<ModuleContentType, string> = {
  video: "Video",
  task: "Task",
  image: "Image",
  pdf: "PDF Document",
  text: "Text Content",
};

const CONTENT_TYPE_ICONS: Record<ModuleContentType, React.ComponentType<{ className?: string }>> = {
  video: Video,
  task: CheckSquare,
  image: Image,
  pdf: File,
  text: FileText,
};

const CONTENT_TYPE_DESCRIPTIONS: Record<ModuleContentType, string> = {
  video: "Upload a video file or link to an external video",
  task: "Create a task or assignment for students",
  image: "Upload an image or diagram",
  pdf: "Upload a PDF document or resource",
  text: "Add text-based content or instructions",
};

interface ContentFormProps {
  defaultValues?: Partial<ContentFormData>;
  onSubmit: (data: ContentSubmitData) => void | Promise<void>;
  isPending?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
}

export function ContentForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Add Content",
  onCancel,
  cancelLabel = "Cancel",
}: ContentFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const getUploadUrl = useGetUploadUrl();
  const confirmUpload = useConfirmUpload();

  const form = useForm<ContentFormData>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      type: "video",
      title: "",
      description: "",
      url: "",
      content: "",
      ...defaultValues,
    },
  });

  const contentType = form.watch("type");
  const needsFileUpload = ["video", "image", "pdf"].includes(contentType);
  const needsTextContent = contentType === "text" || contentType === "task";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (data: ContentFormData) => {
    let fileKey: string | undefined;

    // Upload file if present
    if (file && needsFileUpload) {
      setIsUploading(true);
      try {
        // Get presigned URL
        const uploadData = await getUploadUrl.mutateAsync({
          fileName: file.name,
          fileType: file.type,
          folder: `modules/${contentType}`,
        });

        // Upload file directly to storage
        await fetch(uploadData.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        // Confirm upload
        await confirmUpload.mutateAsync({ key: uploadData.key });
        fileKey = uploadData.key;
      } catch (error) {
        console.error("Upload failed:", error);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    await onSubmit({
      type: data.type,
      title: data.title,
      description: data.description,
      fileKey,
      url: data.url || undefined,
      content: data.content || undefined,
    });
  };

  const isSubmitting = isPending || isUploading;
  const Icon = CONTENT_TYPE_ICONS[contentType];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Content Type *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MODULE_CONTENT_TYPES.map((type) => {
                    const TypeIcon = CONTENT_TYPE_ICONS[type];
                    return (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4" />
                          <span>{CONTENT_TYPE_LABELS[type]}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                {CONTENT_TYPE_DESCRIPTIONS[field.value]}
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
                  placeholder="Content title"
                  className="h-11 text-base"
                  disabled={isSubmitting}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description (optional)"
                  className="min-h-[80px] text-base resize-none"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {needsFileUpload && (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Upload File
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept={
                  contentType === "video"
                    ? "video/*"
                    : contentType === "image"
                      ? "image/*"
                      : "application/pdf"
                }
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="h-11"
              />
            </FormControl>
            <FormDescription>
              {contentType === "video" && "Supported formats: MP4, WebM, MOV"}
              {contentType === "image" && "Supported formats: JPG, PNG, GIF, WebP"}
              {contentType === "pdf" && "Supported format: PDF"}
            </FormDescription>
            {file && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </FormItem>
        )}

        {needsFileUpload && (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Or External URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://..."
                    className="h-11 text-base"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link to external content (YouTube, Vimeo, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {needsTextContent && (
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Content *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      contentType === "task"
                        ? "Describe the task or assignment..."
                        : "Enter your text content..."
                    }
                    className="min-h-[200px] text-base resize-y"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex flex-col gap-4 pt-4 border-t border-border">
          <div className="flex gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isUploading ? "Uploading..." : "Saving..."}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
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
